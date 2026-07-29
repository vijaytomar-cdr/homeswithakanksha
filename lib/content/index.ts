import { LocalContentProvider } from "./local-provider";
import type { ContentProvider } from "./types";

/**
 * Replace this local provider with a Sanity adapter when a project, dataset,
 * schema, preview strategy, and publishing workflow are approved.
 */
export function getContentProvider(): ContentProvider {
  return new LocalContentProvider();
}

export type { ContentProvider } from "./types";
