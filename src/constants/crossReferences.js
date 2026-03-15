/**
 * Cross-reference data for Bible verses.
 *
 * Structure: { "BookName Chapter:Verse": ["Related Ref 1", "Related Ref 2", ...] }
 *
 * This is a curated starter set of the most commonly cross-referenced passages.
 * A full cross-reference database (like Treasury of Scripture Knowledge) contains
 * 300,000+ entries. For production, consider loading from an external JSON file
 * or API rather than bundling inline.
 */
export const CROSS_REFERENCES = {
  "Genesis 1:1": ["John 1:1-3", "Hebrews 11:3", "Psalm 33:6", "Colossians 1:16-17", "Isaiah 45:18"],
  "Genesis 1:26-27": ["Genesis 5:1-2", "Genesis 9:6", "1 Corinthians 11:7", "Colossians 3:10", "James 3:9"],
  "Genesis 3:15": ["Romans 16:20", "Galatians 4:4", "Revelation 12:9", "1 John 3:8", "Hebrews 2:14"],
  "Genesis 12:1-3": ["Acts 7:2-3", "Galatians 3:8", "Hebrews 11:8", "Genesis 18:18", "Genesis 22:18"],
  "Exodus 20:1-17": ["Deuteronomy 5:6-21", "Matthew 19:17-19", "Romans 13:9", "Mark 12:29-31"],
  "Deuteronomy 6:4-5": ["Mark 12:29-30", "Matthew 22:37", "Luke 10:27", "1 Corinthians 8:4-6"],
  "Psalm 22:1": ["Matthew 27:46", "Mark 15:34", "Psalm 22:16-18", "John 19:24"],
  "Psalm 23:1": ["John 10:11", "Isaiah 40:11", "Ezekiel 34:11-12", "Hebrews 13:20", "1 Peter 2:25"],
  "Psalm 51:10": ["Ezekiel 36:26", "2 Corinthians 5:17", "Psalm 24:4", "Psalm 73:1"],
  "Psalm 119:105": ["Proverbs 6:23", "2 Peter 1:19", "Psalm 19:8", "Psalm 43:3"],
  "Proverbs 3:5-6": ["Psalm 37:5", "Isaiah 26:3-4", "Jeremiah 17:7-8", "Psalm 62:8"],
  "Isaiah 7:14": ["Matthew 1:23", "Luke 1:31", "Isaiah 9:6", "Micah 5:2"],
  "Isaiah 9:6": ["Luke 2:11", "John 1:1", "Micah 5:2", "Isaiah 7:14", "Titus 2:13"],
  "Isaiah 40:31": ["Psalm 27:14", "Psalm 37:34", "Lamentations 3:25", "Romans 8:25"],
  "Isaiah 53:5": ["1 Peter 2:24", "Romans 4:25", "2 Corinthians 5:21", "Hebrews 9:28", "1 John 2:2"],
  "Jeremiah 29:11": ["Proverbs 19:21", "Romans 8:28", "Psalm 33:11", "Isaiah 14:24"],
  "Daniel 7:13-14": ["Matthew 24:30", "Matthew 26:64", "Revelation 1:7", "Acts 1:9-11"],
  "Micah 5:2": ["Matthew 2:6", "Luke 2:4-7", "John 7:42", "Isaiah 9:6"],
  "Matthew 1:23": ["Isaiah 7:14", "Luke 1:31", "John 1:14"],
  "Matthew 5:3-12": ["Luke 6:20-23", "Psalm 1:1-2", "Isaiah 61:1-3", "James 1:12"],
  "Matthew 6:9-13": ["Luke 11:2-4", "Psalm 103:19", "1 Chronicles 29:11-13"],
  "Matthew 28:19-20": ["Mark 16:15", "Acts 1:8", "Luke 24:47", "Romans 10:14-15"],
  "Mark 12:29-31": ["Deuteronomy 6:4-5", "Leviticus 19:18", "Matthew 22:37-40", "Luke 10:27", "Romans 13:9"],
  "John 1:1": ["Genesis 1:1", "1 John 1:1", "Revelation 19:13", "Philippians 2:6", "Colossians 1:17"],
  "John 1:14": ["Philippians 2:7", "1 Timothy 3:16", "Hebrews 2:14", "Isaiah 7:14", "Colossians 2:9"],
  "John 3:16": ["Romans 5:8", "1 John 4:9-10", "Romans 8:32", "2 Corinthians 5:21", "Galatians 2:20"],
  "John 10:11": ["Psalm 23:1", "Isaiah 40:11", "Hebrews 13:20", "1 Peter 2:25", "1 Peter 5:4"],
  "John 14:6": ["Acts 4:12", "1 Timothy 2:5", "Hebrews 10:19-20", "John 10:9", "John 11:25"],
  "John 14:26": ["John 15:26", "John 16:13", "Acts 1:8", "1 Corinthians 2:13", "1 John 2:27"],
  "Acts 1:8": ["Matthew 28:19", "Luke 24:49", "Mark 16:15", "John 15:26-27", "Acts 2:1-4"],
  "Acts 2:38": ["Acts 3:19", "Mark 1:4", "Luke 24:47", "Acts 22:16", "Romans 6:3-4"],
  "Romans 3:23": ["Romans 3:10", "Psalm 14:3", "Ecclesiastes 7:20", "1 John 1:8", "Isaiah 64:6"],
  "Romans 5:8": ["John 3:16", "1 John 4:10", "Ephesians 2:4-5", "Titus 3:4-5"],
  "Romans 6:23": ["Genesis 2:17", "James 1:15", "Ezekiel 18:20", "John 3:36", "Romans 5:12"],
  "Romans 8:28": ["Jeremiah 29:11", "Genesis 50:20", "Ephesians 1:11", "1 Thessalonians 5:18"],
  "Romans 8:38-39": ["John 10:28-29", "Romans 8:35", "Ephesians 3:18-19", "2 Timothy 1:12"],
  "Romans 10:9-10": ["Acts 16:31", "John 3:16", "Ephesians 2:8", "1 John 4:15", "Philippians 2:11"],
  "1 Corinthians 13:4-7": ["Colossians 3:14", "1 Peter 4:8", "Romans 13:10", "Galatians 5:22-23"],
  "1 Corinthians 15:3-4": ["Isaiah 53:5-6", "Hosea 6:2", "Luke 24:46", "Acts 2:23-24"],
  "2 Corinthians 5:17": ["Galatians 6:15", "Ephesians 4:24", "Colossians 3:10", "Romans 6:4"],
  "2 Corinthians 5:21": ["Isaiah 53:6", "1 Peter 2:24", "Galatians 3:13", "Romans 8:3-4"],
  "Galatians 2:20": ["Romans 6:6", "Philippians 1:21", "Colossians 3:3-4", "2 Corinthians 5:15"],
  "Galatians 5:22-23": ["Ephesians 5:9", "Colossians 3:12-15", "Romans 14:17", "2 Peter 1:5-8"],
  "Ephesians 2:8-9": ["Romans 3:24", "Romans 4:16", "Titus 3:5", "2 Timothy 1:9", "Romans 11:6"],
  "Ephesians 6:10-18": ["Romans 13:12", "2 Corinthians 10:4", "1 Thessalonians 5:8", "1 Peter 5:8-9"],
  "Philippians 4:6-7": ["Matthew 6:25-34", "1 Peter 5:7", "Psalm 55:22", "Isaiah 26:3"],
  "Philippians 4:13": ["2 Corinthians 12:9-10", "Isaiah 40:29-31", "John 15:5", "Ephesians 6:10"],
  "Colossians 1:16-17": ["John 1:3", "Hebrews 1:2-3", "Genesis 1:1", "1 Corinthians 8:6"],
  "2 Timothy 3:16-17": ["2 Peter 1:20-21", "Hebrews 4:12", "Psalm 19:7-11", "John 17:17"],
  "Hebrews 4:12": ["2 Timothy 3:16", "Isaiah 55:11", "Jeremiah 23:29", "Ephesians 6:17"],
  "Hebrews 11:1": ["Romans 8:24-25", "2 Corinthians 4:18", "2 Corinthians 5:7", "1 Peter 1:8-9"],
  "James 1:5": ["Proverbs 2:3-6", "1 Kings 3:9-12", "Matthew 7:7", "Colossians 1:9"],
  "1 Peter 2:24": ["Isaiah 53:5", "2 Corinthians 5:21", "Galatians 3:13", "Romans 6:11"],
  "1 Peter 5:7": ["Philippians 4:6", "Psalm 55:22", "Matthew 6:25-34", "Psalm 37:5"],
  "1 John 1:9": ["Psalm 32:5", "Proverbs 28:13", "2 Chronicles 7:14", "Isaiah 1:18"],
  "1 John 4:8": ["1 John 4:16", "John 3:16", "2 Corinthians 13:11", "Exodus 34:6"],
  "Revelation 3:20": ["Song of Solomon 5:2", "John 14:23", "Luke 12:36-37"],
  "Revelation 21:4": ["Isaiah 25:8", "Isaiah 65:17-19", "Revelation 7:17", "2 Corinthians 5:1-4"],
};

/**
 * Get cross-references for a verse reference.
 * Attempts exact match first, then tries the chapter:verse without range suffix.
 */
export function getCrossReferences(ref) {
  if (!ref) return [];

  // Try exact match
  if (CROSS_REFERENCES[ref]) return CROSS_REFERENCES[ref];

  // Try without verse range (e.g., "Genesis 1:26-27" -> "Genesis 1:26")
  const baseRef = ref.replace(/-\d+$/, "");
  if (CROSS_REFERENCES[baseRef]) return CROSS_REFERENCES[baseRef];

  // Try with common range expansions
  for (const key of Object.keys(CROSS_REFERENCES)) {
    const keyBase = key.replace(/-\d+$/, "");
    if (keyBase === baseRef || keyBase === ref) {
      return CROSS_REFERENCES[key];
    }
  }

  return [];
}
