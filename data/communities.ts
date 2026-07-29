export type Community = {
  name: string;
  slug: string;
  eyebrow: string;
  imagePosition: string;
};

export type CommunityImageCredit = {
  photographer: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

export function getCommunityImage(slug: string) {
  return `/images/communities/${slug}.jpg`;
}

export const communityImageCredits: Record<string, CommunityImageCredit> = {
  phoenix: { photographer: "Bravo1", license: "Public domain", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceUrl: "https://commons.wikimedia.org/wiki/File:Phoenix_skyline_Arizona_USA.jpg" },
  peoria: { photographer: "Christian M. Williams", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:PeoriaCenterforthePerformingArtsbyChristianWilliams.jpg" },
  surprise: { photographer: "Venske", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:City_Hall_-_Surprise,_AZ,_USA_2250127.JPG" },
  glendale: { photographer: "Tony the Marine", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Glendale-Downtown_Glendale.jpg" },
  "sun-city": { photographer: "Ken Lund", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Sun_City,_Arizona_(101300784).jpg" },
  "sun-city-west": { photographer: "Mark Wagner", license: "CC BY 2.5", licenseUrl: "https://creativecommons.org/licenses/by/2.5", sourceUrl: "https://commons.wikimedia.org/wiki/File:Sun_City_West_entrance_sign_20061227.jpg" },
  scottsdale: { photographer: "Joseph Plotz", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Scottsdale_waterfront.jpg" },
  chandler: { photographer: "Ixnayonthetimmay", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Chandler_AZ_downtown.jpg" },
  gilbert: { photographer: "Cygnusloop99", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Downtown_Gilbert_-_SWC_Gilbert_%26_Page_-_2009-03-23.JPG" },
  mesa: { photographer: "Ixnayonthetimmay", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Downtown_Mesa_Arizona.jpg" },
  goodyear: { photographer: "RandomMainstream", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Goodyear_City_Hall_2023.jpg" },
  buckeye: { photographer: "Northwalker", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", sourceUrl: "https://commons.wikimedia.org/wiki/File:Buckeye_Arizona_seen_from_the_air.jpg" },
  avondale: { photographer: "Marine 69-71", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Avondale-Historic_Downtown.jpg" },
  "el-mirage": { photographer: "Ken Lund", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:US_Route_60_-_Arizona_-_4266739181.jpg" },
};

export const featuredCommunities: Community[] = [
  { name: "Phoenix", slug: "phoenix", eyebrow: "Central Valley", imagePosition: "50% 45%" },
  { name: "Peoria", slug: "peoria", eyebrow: "West Valley", imagePosition: "50% 50%" },
  { name: "Surprise", slug: "surprise", eyebrow: "Northwest Valley", imagePosition: "50% 50%" },
  { name: "Glendale", slug: "glendale", eyebrow: "West Valley", imagePosition: "50% 50%" },
  { name: "Sun City", slug: "sun-city", eyebrow: "Northwest Valley", imagePosition: "50% 50%" },
  { name: "Sun City West", slug: "sun-city-west", eyebrow: "Northwest Valley", imagePosition: "50% 50%" },
  { name: "Scottsdale", slug: "scottsdale", eyebrow: "East Valley", imagePosition: "50% 50%" },
  { name: "Chandler", slug: "chandler", eyebrow: "East Valley", imagePosition: "50% 50%" },
  { name: "Gilbert", slug: "gilbert", eyebrow: "East Valley", imagePosition: "50% 50%" },
  { name: "Mesa", slug: "mesa", eyebrow: "East Valley", imagePosition: "50% 50%" },
  { name: "Goodyear", slug: "goodyear", eyebrow: "Southwest Valley", imagePosition: "50% 50%" },
  { name: "Buckeye", slug: "buckeye", eyebrow: "West Valley", imagePosition: "50% 50%" },
  { name: "Avondale", slug: "avondale", eyebrow: "Southwest Valley", imagePosition: "50% 50%" },
  { name: "El Mirage", slug: "el-mirage", eyebrow: "Northwest Valley", imagePosition: "50% 50%" },
];

export const allCommunities = featuredCommunities;

// Homepage curation is intentionally limited. The full directory remains
// available on /communities without turning the homepage into a photo catalog.
const homepageCommunitySlugs = ["phoenix", "peoria", "scottsdale", "gilbert", "goodyear"];
export const homepageCommunities = homepageCommunitySlugs.map(
  (slug) => featuredCommunities.find((community) => community.slug === slug)!,
);
