import { describe, it, expect } from "vitest";
import { getCrossReferences } from "../constants/crossReferences";

describe("getCrossReferences", () => {
  it("returns cross-references for an exact match", () => {
    const refs = getCrossReferences("John 3:16");
    expect(refs.length).toBeGreaterThan(0);
    expect(refs).toContain("Romans 5:8");
  });

  it("returns empty array for unknown reference", () => {
    const refs = getCrossReferences("Obadiah 1:99");
    expect(refs).toEqual([]);
  });

  it("returns empty array for null input", () => {
    expect(getCrossReferences(null)).toEqual([]);
    expect(getCrossReferences(undefined)).toEqual([]);
    expect(getCrossReferences("")).toEqual([]);
  });

  it("handles range references by matching base", () => {
    const refs = getCrossReferences("Ephesians 2:8-9");
    expect(refs.length).toBeGreaterThan(0);
  });

  it("contains expected theological connections", () => {
    const refs = getCrossReferences("Romans 6:23");
    expect(refs).toContain("Genesis 2:17");
    expect(refs).toContain("John 3:36");
  });
});
