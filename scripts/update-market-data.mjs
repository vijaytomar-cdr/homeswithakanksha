import { createWriteStream } from "node:fs";
import { mkdir, readFile, rename, unlink } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const SOURCE_URL =
  "https://redfin-public-data.s3.us-west-2.amazonaws.com/redfin_data_center/housing_market/monthly/all_cities.csv";
const OUTPUT_PATH = resolve("data/generated/market-snapshot.json");
const HISTORY_PATH = resolve("data/generated/market-history.json");
const MAX_DATA_AGE_DAYS = 62;

const communities = [
  { city: "Phoenix", slug: "phoenix", redfinId: 14240 },
  { city: "Avondale", slug: "avondale", redfinId: 1249 },
  { city: "Buckeye", slug: "buckeye", redfinId: 2047 },
  { city: "Chandler", slug: "chandler", redfinId: 3104 },
  { city: "Gilbert", slug: "gilbert", redfinId: 6998 },
  { city: "Glendale", slug: "glendale", redfinId: 7102 },
  { city: "Goodyear", slug: "goodyear", redfinId: 7245 },
  { city: "Mesa", slug: "mesa", redfinId: 11736 },
  { city: "Peoria", slug: "peoria", redfinId: 14000 },
  { city: "Scottsdale", slug: "scottsdale", redfinId: 16660 },
  { city: "Sun City", slug: "sun-city", redfinId: 25888 },
  { city: "Sun City West", slug: "sun-city-west", redfinId: 25890 },
  { city: "Surprise", slug: "surprise", redfinId: 18267 },
  { city: "El Mirage", slug: "el-mirage", redfinId: 5724 },
];

const targets = new Map(communities.map((item) => [`${item.city}, AZ`, item]));

function parseCsvLine(line) {
  const fields = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      fields.push(value);
      value = "";
    } else {
      value += character;
    }
  }

  fields.push(value);
  return fields;
}

function columnIndex(headers, name) {
  const index = headers.indexOf(name);
  if (index < 0) throw new Error(`Required Redfin column is missing: ${name}`);
  return index;
}

function requiredNumber(value, field, city) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid ${field} for ${city}: ${value || "empty"}`);
  }
  return parsed;
}

function formatMonth(isoDate) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

async function writeAtomically(path, data) {
  const temporaryPath = `${path}.tmp`;
  await mkdir(dirname(path), { recursive: true });
  await new Promise((resolveWrite, rejectWrite) => {
    const stream = createWriteStream(temporaryPath, { encoding: "utf8" });
    stream.on("error", rejectWrite);
    stream.on("finish", resolveWrite);
    stream.end(`${JSON.stringify(data, null, 2)}\n`);
  });
  await rename(temporaryPath, path);
}

async function main() {
  const response = await fetch(SOURCE_URL, {
    headers: { "User-Agent": "HomesWithAkanksha-MarketData/1.0" },
    cache: "no-store",
  });

  if (!response.ok || !response.body) {
    throw new Error(`Redfin download failed with HTTP ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let headers;
  let indexes;
  const latestRows = new Map();

  const processLine = (line) => {
    if (!line.trim()) return;
    const fields = parseCsvLine(line);

    if (!headers) {
      headers = fields;
      indexes = {
        lastUpdated: columnIndex(headers, "LAST UPDATED"),
        frequency: columnIndex(headers, "FREQUENCY"),
        periodBegin: columnIndex(headers, "PERIOD BEGIN"),
        periodEnd: columnIndex(headers, "PERIOD END"),
        regionId: columnIndex(headers, "REGION ID"),
        regionName: columnIndex(headers, "REGION NAME"),
        homesSold: columnIndex(headers, "HOMES SOLD"),
        medianSalePrice: columnIndex(headers, "MEDIAN SALE PRICE NSA ($)"),
        medianSalePriceChange: columnIndex(headers, "MEDIAN SALE PRICE NSA YOY (%)"),
        medianDaysOnMarket: columnIndex(headers, "MEDIAN DAYS ON MARKET (DAYS)"),
      };
      return;
    }

    const regionName = fields[indexes.regionName];
    const target = targets.get(regionName);
    if (!target) return;

    const periodEnd = fields[indexes.periodEnd];
    const existing = latestRows.get(target.slug);
    if (!existing || periodEnd > existing.periodEnd) {
      latestRows.set(target.slug, {
        city: target.city,
        slug: target.slug,
        redfinId: requiredNumber(fields[indexes.regionId], "region ID", target.city),
        sourceLastUpdated: fields[indexes.lastUpdated],
        frequency: fields[indexes.frequency],
        periodBegin: fields[indexes.periodBegin],
        periodEnd,
        homesSold: requiredNumber(fields[indexes.homesSold], "homes sold", target.city),
        medianSalePrice: requiredNumber(fields[indexes.medianSalePrice], "median sale price", target.city),
        medianSalePriceChange: requiredNumber(
          fields[indexes.medianSalePriceChange],
          "median sale price YoY change",
          target.city,
        ),
        medianDaysOnMarket: requiredNumber(
          fields[indexes.medianDaysOnMarket],
          "median days on market",
          target.city,
        ),
      });
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      lines.forEach(processLine);
      if (done) break;
    }
    if (buffer) processLine(buffer);
  } finally {
    reader.releaseLock();
  }

  const missing = communities.filter(({ slug }) => !latestRows.has(slug));
  if (missing.length) {
    throw new Error(`Redfin data is missing: ${missing.map(({ city }) => city).join(", ")}`);
  }

  const markets = communities.map(({ slug, redfinId }) => {
    const row = latestRows.get(slug);
    if (row.redfinId !== redfinId) {
      throw new Error(`Unexpected Redfin region ID for ${row.city}: ${row.redfinId}`);
    }
    if (row.frequency !== "Rolling 3 Months") {
      throw new Error(`Unexpected frequency for ${row.city}: ${row.frequency}`);
    }
    if (row.medianSalePrice <= 0 || row.homesSold < 0 || row.medianDaysOnMarket < 0) {
      throw new Error(`Out-of-range market metric for ${row.city}`);
    }
    return row;
  });

  const periods = new Set(markets.map(({ periodEnd }) => periodEnd));
  const sourceUpdates = new Set(markets.map(({ sourceLastUpdated }) => sourceLastUpdated));
  if (periods.size !== 1 || sourceUpdates.size !== 1) {
    throw new Error("Redfin returned inconsistent latest periods across requested cities");
  }

  const periodEnd = markets[0].periodEnd;
  const checkedAt = new Date().toISOString();
  const ageDays = Math.floor(
    (Date.now() - new Date(`${periodEnd}T23:59:59Z`).getTime()) / 86_400_000,
  );
  const freshness = ageDays <= MAX_DATA_AGE_DAYS ? "current" : "stale";

  const snapshot = {
    metadata: {
      sourceName: "Redfin Data Center",
      sourcePageUrl: "https://www.redfin.com/news/data-center/downloads/",
      sourceDataUrl: SOURCE_URL,
      methodologyUrl: "https://www.redfin.com/news/data-center/methodology/",
      sourceLastUpdated: markets[0].sourceLastUpdated,
      checkedAt,
      reportingPeriod: `3 months ending ${formatMonth(periodEnd)}`,
      reportingPeriodISO: periodEnd.slice(0, 7),
      freshness,
      ageDays,
      maxDataAgeDays: MAX_DATA_AGE_DAYS,
    },
    markets,
  };

  let history = [];
  try {
    const existing = JSON.parse(await readFile(HISTORY_PATH, "utf8"));
    history = Array.isArray(existing) ? existing : [];
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  const archiveEntry = {
    reportingPeriodISO: snapshot.metadata.reportingPeriodISO,
    reportingPeriod: snapshot.metadata.reportingPeriod,
    periodEnd,
    sourceLastUpdated: snapshot.metadata.sourceLastUpdated,
    markets,
  };
  history = [
    ...history.filter((entry) => entry.reportingPeriodISO !== archiveEntry.reportingPeriodISO),
    archiveEntry,
  ]
    .sort((a, b) => a.reportingPeriodISO.localeCompare(b.reportingPeriodISO))
    .slice(-36);

  await writeAtomically(OUTPUT_PATH, snapshot);
  await writeAtomically(HISTORY_PATH, history);
  console.log(
    `Updated ${markets.length} city snapshots through ${periodEnd} (${freshness}, ${ageDays} days old).`,
  );
}

main().catch(async (error) => {
  await unlink(`${OUTPUT_PATH}.tmp`).catch(() => {});
  await unlink(`${HISTORY_PATH}.tmp`).catch(() => {});
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
