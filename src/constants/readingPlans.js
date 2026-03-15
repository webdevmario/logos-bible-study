/**
 * Curated reading plans.
 * Each plan has a unique id, title, description, estimated duration, and a list of daily readings.
 * Daily readings are arrays so multiple passages can be assigned to a single day.
 */

export const READING_PLANS = [
  {
    id: "gospel-of-john",
    title: "Gospel of John in 21 days",
    description: "One chapter per day through John's Gospel — the best starting point for understanding who Jesus is and what He claimed.",
    duration: 21,
    category: "beginner",
    readings: Array.from({ length: 21 }, (_, i) => ({
      day: i + 1,
      label: `John ${i + 1}`,
      passages: [{ book: "John", chapter: i + 1 }],
    })),
  },
  {
    id: "psalms-30-day",
    title: "Psalms in 30 days",
    description: "Five Psalms per day for a month. Poetry, worship, lament, and praise — the prayer book of the Bible.",
    duration: 30,
    category: "devotional",
    readings: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      label: `Psalms ${i * 5 + 1}–${Math.min((i + 1) * 5, 150)}`,
      passages: Array.from({ length: 5 }, (__, j) => {
        const ch = i * 5 + j + 1;
        return ch <= 150 ? { book: "Psalms", chapter: ch } : null;
      }).filter(Boolean),
    })),
  },
  {
    id: "romans-deep-dive",
    title: "Romans deep study — 16 days",
    description: "One chapter per day through Paul's masterwork on salvation, grace, and Christian living. The theological backbone of the New Testament.",
    duration: 16,
    category: "study",
    readings: Array.from({ length: 16 }, (_, i) => ({
      day: i + 1,
      label: `Romans ${i + 1}`,
      passages: [{ book: "Romans", chapter: i + 1 }],
    })),
  },
  {
    id: "genesis-foundations",
    title: "Genesis — 50 days of foundations",
    description: "The first book of the Bible: creation, the fall, the flood, Abraham, Isaac, Jacob, and Joseph. Every story that follows builds on this.",
    duration: 50,
    category: "study",
    readings: Array.from({ length: 50 }, (_, i) => ({
      day: i + 1,
      label: `Genesis ${i + 1}`,
      passages: [{ book: "Genesis", chapter: i + 1 }],
    })),
  },
  {
    id: "proverbs-31-day",
    title: "Proverbs in 31 days",
    description: "One chapter per day — practical wisdom for daily life. Many people read the Proverb matching today's date each month.",
    duration: 31,
    category: "devotional",
    readings: Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      label: `Proverbs ${i + 1}`,
      passages: [{ book: "Proverbs", chapter: i + 1 }],
    })),
  },
  {
    id: "life-of-jesus",
    title: "The life of Jesus — 28 days",
    description: "Walk through the four Gospels chronologically, covering the major events from birth to resurrection.",
    duration: 28,
    category: "beginner",
    readings: [
      { day: 1, label: "The birth of Jesus", passages: [{ book: "Luke", chapter: 1 }, { book: "Luke", chapter: 2 }] },
      { day: 2, label: "Jesus' childhood & baptism", passages: [{ book: "Matthew", chapter: 2 }, { book: "Matthew", chapter: 3 }] },
      { day: 3, label: "Temptation & early ministry", passages: [{ book: "Matthew", chapter: 4 }] },
      { day: 4, label: "Sermon on the Mount (I)", passages: [{ book: "Matthew", chapter: 5 }] },
      { day: 5, label: "Sermon on the Mount (II)", passages: [{ book: "Matthew", chapter: 6 }] },
      { day: 6, label: "Sermon on the Mount (III)", passages: [{ book: "Matthew", chapter: 7 }] },
      { day: 7, label: "Miracles & authority", passages: [{ book: "Mark", chapter: 1 }, { book: "Mark", chapter: 2 }] },
      { day: 8, label: "Parables of the Kingdom", passages: [{ book: "Matthew", chapter: 13 }] },
      { day: 9, label: "Feeding 5,000 & walking on water", passages: [{ book: "John", chapter: 6 }] },
      { day: 10, label: "The Good Samaritan & prayer", passages: [{ book: "Luke", chapter: 10 }, { book: "Luke", chapter: 11 }] },
      { day: 11, label: "The bread of life", passages: [{ book: "John", chapter: 6 }] },
      { day: 12, label: "Peter's confession & transfiguration", passages: [{ book: "Mark", chapter: 8 }, { book: "Mark", chapter: 9 }] },
      { day: 13, label: "The Good Shepherd", passages: [{ book: "John", chapter: 10 }] },
      { day: 14, label: "Parables of grace", passages: [{ book: "Luke", chapter: 15 }] },
      { day: 15, label: "Lazarus raised", passages: [{ book: "John", chapter: 11 }] },
      { day: 16, label: "Teaching on discipleship", passages: [{ book: "Luke", chapter: 14 }] },
      { day: 17, label: "The rich young ruler & Zacchaeus", passages: [{ book: "Mark", chapter: 10 }, { book: "Luke", chapter: 19 }] },
      { day: 18, label: "Triumphal entry", passages: [{ book: "Matthew", chapter: 21 }] },
      { day: 19, label: "Confrontation at the temple", passages: [{ book: "Mark", chapter: 11 }, { book: "Mark", chapter: 12 }] },
      { day: 20, label: "End times discourse", passages: [{ book: "Matthew", chapter: 24 }, { book: "Matthew", chapter: 25 }] },
      { day: 21, label: "The Last Supper", passages: [{ book: "John", chapter: 13 }, { book: "John", chapter: 14 }] },
      { day: 22, label: "The vine & promise of the Spirit", passages: [{ book: "John", chapter: 15 }, { book: "John", chapter: 16 }] },
      { day: 23, label: "Jesus' high priestly prayer", passages: [{ book: "John", chapter: 17 }] },
      { day: 24, label: "Gethsemane & arrest", passages: [{ book: "Matthew", chapter: 26 }] },
      { day: 25, label: "Trial & denial", passages: [{ book: "Mark", chapter: 14 }, { book: "Mark", chapter: 15 }] },
      { day: 26, label: "The crucifixion", passages: [{ book: "John", chapter: 19 }] },
      { day: 27, label: "The resurrection", passages: [{ book: "John", chapter: 20 }, { book: "Matthew", chapter: 28 }] },
      { day: 28, label: "Appearance & commission", passages: [{ book: "John", chapter: 21 }, { book: "Luke", chapter: 24 }] },
    ],
  },
  {
    id: "new-testament-90",
    title: "New Testament in 90 days",
    description: "Read through the entire New Testament in three months — roughly 3 chapters per day.",
    duration: 90,
    category: "comprehensive",
    readings: (() => {
      const ntBooks = [
        { name: "Matthew", chapters: 28 }, { name: "Mark", chapters: 16 },
        { name: "Luke", chapters: 24 }, { name: "John", chapters: 21 },
        { name: "Acts", chapters: 28 }, { name: "Romans", chapters: 16 },
        { name: "1 Corinthians", chapters: 16 }, { name: "2 Corinthians", chapters: 13 },
        { name: "Galatians", chapters: 6 }, { name: "Ephesians", chapters: 6 },
        { name: "Philippians", chapters: 4 }, { name: "Colossians", chapters: 4 },
        { name: "1 Thessalonians", chapters: 5 }, { name: "2 Thessalonians", chapters: 3 },
        { name: "1 Timothy", chapters: 6 }, { name: "2 Timothy", chapters: 4 },
        { name: "Titus", chapters: 3 }, { name: "Philemon", chapters: 1 },
        { name: "Hebrews", chapters: 13 }, { name: "James", chapters: 5 },
        { name: "1 Peter", chapters: 5 }, { name: "2 Peter", chapters: 3 },
        { name: "1 John", chapters: 5 }, { name: "2 John", chapters: 1 },
        { name: "3 John", chapters: 1 }, { name: "Jude", chapters: 1 },
        { name: "Revelation", chapters: 22 },
      ];
      // Flatten all chapters
      const allChapters = [];
      for (const book of ntBooks) {
        for (let ch = 1; ch <= book.chapters; ch++) {
          allChapters.push({ book: book.name, chapter: ch });
        }
      }
      // Distribute ~3 chapters per day across 90 days
      const perDay = Math.ceil(allChapters.length / 90);
      const readings = [];
      for (let d = 0; d < 90; d++) {
        const start = d * perDay;
        const end = Math.min(start + perDay, allChapters.length);
        const dayPassages = allChapters.slice(start, end);
        if (dayPassages.length === 0) break;
        const first = dayPassages[0];
        const last = dayPassages[dayPassages.length - 1];
        const label =
          first.book === last.book
            ? `${first.book} ${first.chapter}–${last.chapter}`
            : `${first.book} ${first.chapter} – ${last.book} ${last.chapter}`;
        readings.push({ day: d + 1, label, passages: dayPassages });
      }
      return readings;
    })(),
  },
];

/**
 * Get the user's active reading plan progress from localStorage.
 * Returns { planId, startDate, completedDays: Set<number> } or null.
 */
export function getReadingPlanProgress(planId) {
  try {
    const raw = localStorage.getItem(`logos_plan_${planId}`);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return {
      ...data,
      completedDays: new Set(data.completedDays || []),
    };
  } catch {
    return null;
  }
}

/**
 * Save reading plan progress.
 */
export function saveReadingPlanProgress(planId, progress) {
  const data = {
    ...progress,
    completedDays: Array.from(progress.completedDays),
  };
  localStorage.setItem(`logos_plan_${planId}`, JSON.stringify(data));
}
