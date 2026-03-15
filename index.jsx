import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ─── Constants & Data ────────────────────────────────────────────────────────
const BIBLE_API = "https://bible-api.com";
const BOOKS = {
  old: [
    { id: "GEN", name: "Genesis", chapters: 50, author: "Moses (traditionally)", date: "~1440–1400 BC", genre: "Law/Narrative", testament: "OT" },
    { id: "EXO", name: "Exodus", chapters: 40, author: "Moses", date: "~1440–1400 BC", genre: "Law/Narrative", testament: "OT" },
    { id: "LEV", name: "Leviticus", chapters: 27, author: "Moses", date: "~1440–1400 BC", genre: "Law", testament: "OT" },
    { id: "NUM", name: "Numbers", chapters: 36, author: "Moses", date: "~1440–1400 BC", genre: "Law/Narrative", testament: "OT" },
    { id: "DEU", name: "Deuteronomy", chapters: 34, author: "Moses", date: "~1400 BC", genre: "Law", testament: "OT" },
    { id: "JOS", name: "Joshua", chapters: 24, author: "Joshua", date: "~1350 BC", genre: "Narrative", testament: "OT" },
    { id: "JDG", name: "Judges", chapters: 21, author: "Samuel (traditionally)", date: "~1050 BC", genre: "Narrative", testament: "OT" },
    { id: "RUT", name: "Ruth", chapters: 4, author: "Unknown (possibly Samuel)", date: "~1000 BC", genre: "Narrative", testament: "OT" },
    { id: "1SA", name: "1 Samuel", chapters: 31, author: "Samuel, Nathan, Gad", date: "~930 BC", genre: "Narrative", testament: "OT" },
    { id: "2SA", name: "2 Samuel", chapters: 24, author: "Nathan, Gad", date: "~930 BC", genre: "Narrative", testament: "OT" },
    { id: "1KI", name: "1 Kings", chapters: 22, author: "Jeremiah (traditionally)", date: "~560 BC", genre: "Narrative", testament: "OT" },
    { id: "2KI", name: "2 Kings", chapters: 25, author: "Jeremiah (traditionally)", date: "~560 BC", genre: "Narrative", testament: "OT" },
    { id: "1CH", name: "1 Chronicles", chapters: 29, author: "Ezra (traditionally)", date: "~450 BC", genre: "Narrative", testament: "OT" },
    { id: "2CH", name: "2 Chronicles", chapters: 36, author: "Ezra (traditionally)", date: "~450 BC", genre: "Narrative", testament: "OT" },
    { id: "EZR", name: "Ezra", chapters: 10, author: "Ezra", date: "~440 BC", genre: "Narrative", testament: "OT" },
    { id: "NEH", name: "Nehemiah", chapters: 13, author: "Nehemiah", date: "~430 BC", genre: "Narrative", testament: "OT" },
    { id: "EST", name: "Esther", chapters: 10, author: "Unknown (possibly Mordecai)", date: "~470 BC", genre: "Narrative", testament: "OT" },
    { id: "JOB", name: "Job", chapters: 42, author: "Unknown (possibly Moses)", date: "Unknown (~2000–500 BC)", genre: "Wisdom/Poetry", testament: "OT" },
    { id: "PSA", name: "Psalms", chapters: 150, author: "David, Asaph, Sons of Korah, others", date: "~1400–400 BC", genre: "Poetry/Worship", testament: "OT" },
    { id: "PRO", name: "Proverbs", chapters: 31, author: "Solomon, Agur, Lemuel", date: "~970–700 BC", genre: "Wisdom", testament: "OT" },
    { id: "ECC", name: "Ecclesiastes", chapters: 12, author: "Solomon (traditionally)", date: "~935 BC", genre: "Wisdom", testament: "OT" },
    { id: "SNG", name: "Song of Solomon", chapters: 8, author: "Solomon", date: "~960 BC", genre: "Poetry", testament: "OT" },
    { id: "ISA", name: "Isaiah", chapters: 66, author: "Isaiah", date: "~740–680 BC", genre: "Prophecy", testament: "OT" },
    { id: "JER", name: "Jeremiah", chapters: 52, author: "Jeremiah", date: "~627–585 BC", genre: "Prophecy", testament: "OT" },
    { id: "LAM", name: "Lamentations", chapters: 5, author: "Jeremiah", date: "~586 BC", genre: "Poetry", testament: "OT" },
    { id: "EZK", name: "Ezekiel", chapters: 48, author: "Ezekiel", date: "~593–571 BC", genre: "Prophecy", testament: "OT" },
    { id: "DAN", name: "Daniel", chapters: 12, author: "Daniel", date: "~536 BC", genre: "Prophecy/Narrative", testament: "OT" },
    { id: "HOS", name: "Hosea", chapters: 14, author: "Hosea", date: "~750–715 BC", genre: "Prophecy", testament: "OT" },
    { id: "JOL", name: "Joel", chapters: 3, author: "Joel", date: "~835–800 BC", genre: "Prophecy", testament: "OT" },
    { id: "AMO", name: "Amos", chapters: 9, author: "Amos", date: "~760–750 BC", genre: "Prophecy", testament: "OT" },
    { id: "OBA", name: "Obadiah", chapters: 1, author: "Obadiah", date: "~586 BC", genre: "Prophecy", testament: "OT" },
    { id: "JON", name: "Jonah", chapters: 4, author: "Jonah", date: "~760 BC", genre: "Narrative", testament: "OT" },
    { id: "MIC", name: "Micah", chapters: 7, author: "Micah", date: "~735–700 BC", genre: "Prophecy", testament: "OT" },
    { id: "NAM", name: "Nahum", chapters: 3, author: "Nahum", date: "~663–612 BC", genre: "Prophecy", testament: "OT" },
    { id: "HAB", name: "Habakkuk", chapters: 3, author: "Habakkuk", date: "~609–605 BC", genre: "Prophecy", testament: "OT" },
    { id: "ZEP", name: "Zephaniah", chapters: 3, author: "Zephaniah", date: "~630 BC", genre: "Prophecy", testament: "OT" },
    { id: "HAG", name: "Haggai", chapters: 2, author: "Haggai", date: "~520 BC", genre: "Prophecy", testament: "OT" },
    { id: "ZEC", name: "Zechariah", chapters: 14, author: "Zechariah", date: "~520–480 BC", genre: "Prophecy", testament: "OT" },
    { id: "MAL", name: "Malachi", chapters: 4, author: "Malachi", date: "~430 BC", genre: "Prophecy", testament: "OT" },
  ],
  new: [
    { id: "MAT", name: "Matthew", chapters: 28, author: "Matthew (Levi)", date: "~55–65 AD", genre: "Gospel", testament: "NT" },
    { id: "MRK", name: "Mark", chapters: 16, author: "John Mark", date: "~55–70 AD", genre: "Gospel", testament: "NT" },
    { id: "LUK", name: "Luke", chapters: 24, author: "Luke", date: "~59–63 AD", genre: "Gospel", testament: "NT" },
    { id: "JHN", name: "John", chapters: 21, author: "John (the Apostle)", date: "~85–95 AD", genre: "Gospel", testament: "NT" },
    { id: "ACT", name: "Acts", chapters: 28, author: "Luke", date: "~63–70 AD", genre: "Narrative", testament: "NT" },
    { id: "ROM", name: "Romans", chapters: 16, author: "Paul", date: "~57 AD", genre: "Epistle", testament: "NT" },
    { id: "1CO", name: "1 Corinthians", chapters: 16, author: "Paul", date: "~55 AD", genre: "Epistle", testament: "NT" },
    { id: "2CO", name: "2 Corinthians", chapters: 13, author: "Paul", date: "~56 AD", genre: "Epistle", testament: "NT" },
    { id: "GAL", name: "Galatians", chapters: 6, author: "Paul", date: "~49–55 AD", genre: "Epistle", testament: "NT" },
    { id: "EPH", name: "Ephesians", chapters: 6, author: "Paul", date: "~60–62 AD", genre: "Epistle", testament: "NT" },
    { id: "PHP", name: "Philippians", chapters: 4, author: "Paul", date: "~61–62 AD", genre: "Epistle", testament: "NT" },
    { id: "COL", name: "Colossians", chapters: 4, author: "Paul", date: "~60–62 AD", genre: "Epistle", testament: "NT" },
    { id: "1TH", name: "1 Thessalonians", chapters: 5, author: "Paul", date: "~51 AD", genre: "Epistle", testament: "NT" },
    { id: "2TH", name: "2 Thessalonians", chapters: 3, author: "Paul", date: "~51–52 AD", genre: "Epistle", testament: "NT" },
    { id: "1TI", name: "1 Timothy", chapters: 6, author: "Paul", date: "~63–65 AD", genre: "Epistle", testament: "NT" },
    { id: "2TI", name: "2 Timothy", chapters: 4, author: "Paul", date: "~66–67 AD", genre: "Epistle", testament: "NT" },
    { id: "TIT", name: "Titus", chapters: 3, author: "Paul", date: "~63–65 AD", genre: "Epistle", testament: "NT" },
    { id: "PHM", name: "Philemon", chapters: 1, author: "Paul", date: "~60–62 AD", genre: "Epistle", testament: "NT" },
    { id: "HEB", name: "Hebrews", chapters: 13, author: "Unknown (Paul, Apollos, or Barnabas)", date: "~64–68 AD", genre: "Epistle", testament: "NT" },
    { id: "JAS", name: "James", chapters: 5, author: "James (brother of Jesus)", date: "~45–49 AD", genre: "Epistle", testament: "NT" },
    { id: "1PE", name: "1 Peter", chapters: 5, author: "Peter", date: "~62–64 AD", genre: "Epistle", testament: "NT" },
    { id: "2PE", name: "2 Peter", chapters: 3, author: "Peter", date: "~65–68 AD", genre: "Epistle", testament: "NT" },
    { id: "1JN", name: "1 John", chapters: 5, author: "John", date: "~85–95 AD", genre: "Epistle", testament: "NT" },
    { id: "2JN", name: "2 John", chapters: 1, author: "John", date: "~85–95 AD", genre: "Epistle", testament: "NT" },
    { id: "3JN", name: "3 John", chapters: 1, author: "John", date: "~85–95 AD", genre: "Epistle", testament: "NT" },
    { id: "JUD", name: "Jude", chapters: 1, author: "Jude (brother of Jesus)", date: "~65–80 AD", genre: "Epistle", testament: "NT" },
    { id: "REV", name: "Revelation", chapters: 22, author: "John", date: "~95 AD", genre: "Apocalyptic/Prophecy", testament: "NT" },
  ],
};

const ALL_BOOKS = [...BOOKS.old, ...BOOKS.new];

const TRANSLATIONS = [
  { id: "web", name: "World English Bible", abbr: "WEB", desc: "Modern English, public domain, based on ASV revision", philosophy: "Formal equivalence" },
  { id: "kjv", name: "King James Version", abbr: "KJV", desc: "1611 classic, formal language, widely memorized", philosophy: "Formal equivalence" },
  { id: "bbe", name: "Bible in Basic English", abbr: "BBE", desc: "Limited 1,000-word vocabulary for accessibility", philosophy: "Dynamic equivalence" },
  { id: "oeb-us", name: "Open English Bible (US)", abbr: "OEB", desc: "Modern, open-license, US English", philosophy: "Dynamic equivalence" },
  { id: "clementine", name: "Clementine Vulgate", abbr: "VULG", desc: "Latin text, 1592 standard Catholic edition", philosophy: "Latin source text" },
  { id: "almeida", name: "Almeida (Portuguese)", abbr: "ALM", desc: "Classic Portuguese translation", philosophy: "Formal equivalence" },
];

const TOPIC_CATEGORIES = [
  {
    name: "When I'm feeling...",
    topics: [
      { label: "Anxious or worried", query: "peace anxiety worry", verses: ["Philippians 4:6-7", "Matthew 6:25-27", "1 Peter 5:7", "Isaiah 41:10", "Psalm 46:1-3"] },
      { label: "Lonely or abandoned", query: "alone lonely comfort", verses: ["Deuteronomy 31:6", "Psalm 23:4", "Isaiah 49:15-16", "Matthew 28:20", "Hebrews 13:5"] },
      { label: "Angry or frustrated", query: "anger patience", verses: ["James 1:19-20", "Proverbs 15:1", "Ephesians 4:26-27", "Psalm 37:8", "Proverbs 14:29"] },
      { label: "Sad or depressed", query: "comfort sadness joy", verses: ["Psalm 34:18", "Psalm 42:11", "Romans 8:28", "2 Corinthians 1:3-4", "Revelation 21:4"] },
      { label: "Grateful and blessed", query: "thanksgiving praise grateful", verses: ["1 Thessalonians 5:18", "Psalm 107:1", "James 1:17", "Colossians 3:15", "Psalm 136:1"] },
      { label: "Fearful or scared", query: "fear courage strength", verses: ["2 Timothy 1:7", "Isaiah 41:10", "Psalm 27:1", "Joshua 1:9", "Psalm 56:3-4"] },
      { label: "Lost or confused", query: "guidance direction wisdom", verses: ["Proverbs 3:5-6", "James 1:5", "Psalm 119:105", "Isaiah 30:21", "Jeremiah 29:11"] },
      { label: "Tempted", query: "temptation resist strength", verses: ["1 Corinthians 10:13", "James 4:7", "Hebrews 4:15-16", "Matthew 26:41", "Ephesians 6:11"] },
    ],
  },
  {
    name: "Life situations",
    topics: [
      { label: "Making a big decision", query: "wisdom decision guidance", verses: ["James 1:5", "Proverbs 3:5-6", "Psalm 32:8", "Isaiah 58:11", "Proverbs 16:9"] },
      { label: "Financial hardship", query: "provision trust money", verses: ["Philippians 4:19", "Matthew 6:31-33", "Malachi 3:10", "Proverbs 22:7", "Luke 12:15"] },
      { label: "Relationship struggles", query: "love forgiveness relationships", verses: ["1 Corinthians 13:4-7", "Ephesians 4:32", "Colossians 3:13", "Proverbs 17:17", "1 Peter 4:8"] },
      { label: "Grief and loss", query: "grief comfort mourning", verses: ["Psalm 34:18", "Matthew 5:4", "John 11:35", "Psalm 147:3", "2 Corinthians 1:3-4"] },
      { label: "Starting something new", query: "new beginning faith", verses: ["Isaiah 43:19", "Jeremiah 29:11", "2 Corinthians 5:17", "Philippians 3:13-14", "Lamentations 3:22-23"] },
      { label: "Health concerns", query: "healing health trust", verses: ["Jeremiah 17:14", "Psalm 103:2-3", "James 5:14-15", "3 John 1:2", "Isaiah 53:5"] },
    ],
  },
  {
    name: "Growing in faith",
    topics: [
      { label: "Prayer and communion", query: "prayer communication God", verses: ["Matthew 6:9-13", "Philippians 4:6", "1 Thessalonians 5:17", "Mark 11:24", "James 5:16"] },
      { label: "Understanding God's love", query: "God love unconditional", verses: ["Romans 8:38-39", "John 3:16", "1 John 4:9-10", "Psalm 136:26", "Ephesians 2:4-5"] },
      { label: "Forgiveness", query: "forgiveness mercy grace", verses: ["Ephesians 4:32", "Matthew 6:14-15", "Colossians 3:13", "1 John 1:9", "Psalm 103:12"] },
      { label: "Faith and trust", query: "faith trust believe", verses: ["Hebrews 11:1", "Hebrews 11:6", "Romans 10:17", "Mark 9:24", "Proverbs 3:5-6"] },
      { label: "Serving others", query: "serve others love", verses: ["Galatians 5:13", "Mark 10:45", "1 Peter 4:10", "Matthew 25:40", "Philippians 2:3-4"] },
      { label: "The Holy Spirit", query: "Holy Spirit gifts", verses: ["John 14:26", "Acts 1:8", "Galatians 5:22-23", "Romans 8:26", "1 Corinthians 12:4-7"] },
    ],
  },
];

const GREEK_WORD_STUDIES = {
  love: [
    { greek: "ἀγάπη", transliteration: "agapē", strongs: "G26", meaning: "Unconditional, selfless, sacrificial love. The highest form of love — God's love for humanity.", usage: "Used 116 times in NT. John 3:16, 1 Corinthians 13, 1 John 4:8" },
    { greek: "φιλία", transliteration: "philia", strongs: "G5373", meaning: "Brotherly love, deep friendship, mutual affection between equals.", usage: "Root used in James 4:4. Related to Philadelphia — 'city of brotherly love'" },
    { greek: "ἔρως", transliteration: "erōs", strongs: "N/A", meaning: "Romantic, passionate love. Not found in the New Testament but present in Greek culture.", usage: "Absent from NT — possibly intentionally replaced by agapē in Christian theology" },
    { greek: "στοργή", transliteration: "storgē", strongs: "N/A", meaning: "Natural affection, especially family love — parent-child bond.", usage: "Compound form (astorgos — 'without natural affection') in Romans 1:31, 2 Timothy 3:3" },
  ],
  faith: [
    { greek: "πίστις", transliteration: "pistis", strongs: "G4102", meaning: "Faith, belief, trust, confidence. Conviction of truth, especially reliance on Christ for salvation.", usage: "Used 244 times in NT. Hebrews 11:1, Romans 10:17, Ephesians 2:8" },
    { greek: "πιστεύω", transliteration: "pisteuō", strongs: "G4100", meaning: "To believe, trust, have faith in. Active verb form implying ongoing trust and commitment.", usage: "Used 248 times in NT. John 3:16, Mark 9:24, Acts 16:31" },
  ],
  sin: [
    { greek: "ἁμαρτία", transliteration: "hamartia", strongs: "G266", meaning: "Literally 'missing the mark' — like an archer's arrow falling short. Used for sin as a principle and as individual acts.", usage: "Used 174 times in NT. Romans 3:23, Romans 6:23, 1 John 1:8" },
    { greek: "παράβασις", transliteration: "parabasis", strongs: "G3847", meaning: "A stepping across, transgression — deliberately crossing a known boundary.", usage: "Romans 4:15, Hebrews 2:2, 1 Timothy 2:14" },
    { greek: "ἀνομία", transliteration: "anomia", strongs: "G458", meaning: "Lawlessness, contempt for law — willful violation of God's law.", usage: "Matthew 7:23, 1 John 3:4, 2 Thessalonians 2:7" },
  ],
  grace: [
    { greek: "χάρις", transliteration: "charis", strongs: "G5485", meaning: "Grace, unmerited favor, the divine influence on the heart and its reflection in life. Gift freely given.", usage: "Used 156 times in NT. Ephesians 2:8-9, Romans 3:24, 2 Corinthians 12:9" },
  ],
  peace: [
    { greek: "εἰρήνη", transliteration: "eirēnē", strongs: "G1515", meaning: "Peace, harmony, tranquility. From Hebrew shalom — wholeness and completeness, not merely the absence of conflict.", usage: "Used 92 times in NT. John 14:27, Philippians 4:7, Romans 5:1" },
  ],
  spirit: [
    { greek: "πνεῦμα", transliteration: "pneuma", strongs: "G4151", meaning: "Spirit, breath, wind. Used for the Holy Spirit, the human spirit, and spiritual beings. Implies an invisible, powerful force.", usage: "Used 385 times in NT. John 4:24, Romans 8:16, Galatians 5:22" },
  ],
  truth: [
    { greek: "ἀλήθεια", transliteration: "alētheia", strongs: "G225", meaning: "Truth, reality, sincerity. Literally 'un-hidden' — what is revealed and genuine.", usage: "Used 109 times in NT. John 14:6, John 8:32, John 17:17" },
  ],
  salvation: [
    { greek: "σωτηρία", transliteration: "sōtēria", strongs: "G4991", meaning: "Salvation, deliverance, preservation. Rescue from danger, both physical and spiritual.", usage: "Used 46 times in NT. Ephesians 2:8, Acts 4:12, Romans 1:16" },
  ],
};

const STUDY_RESOURCES = [
  { name: "Blue Letter Bible", url: "https://www.blueletterbible.org", desc: "Comprehensive study tools: Strong's, commentaries, interlinear texts, word studies" },
  { name: "Bible Hub", url: "https://biblehub.com", desc: "Parallel translations, commentaries, Strong's concordance, cross-references" },
  { name: "Bible Gateway", url: "https://www.biblegateway.com", desc: "200+ translations, reading plans, audio Bible, study tools" },
  { name: "Got Questions", url: "https://www.gotquestions.org", desc: "Searchable database of biblical questions and theology explanations" },
  { name: "Bible Project", url: "https://bibleproject.com", desc: "Visual animated summaries of every book, word studies, and themes" },
  { name: "STEP Bible", url: "https://www.stepbible.org", desc: "Academic-grade interlinear texts, original language tools, manuscripts" },
  { name: "Open Scriptures (Strong's Data)", url: "https://github.com/openscriptures/strongs", desc: "Open-source Strong's Hebrew and Greek dictionaries in XML format" },
  { name: "NET Bible", url: "https://netbible.org", desc: "60,000+ translator notes explaining translation choices and original meanings" },
];


// ─── Utility Hooks ───────────────────────────────────────────────────────────

function useLocalNotes() {
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("logos_notes") || "{}"); }
    catch { return {}; }
  });

  const saveNote = useCallback((ref, text) => {
    setNotes((prev) => {
      const next = { ...prev, [ref]: { text, updatedAt: Date.now() } };
      localStorage.setItem("logos_notes", JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteNote = useCallback((ref) => {
    setNotes((prev) => {
      const next = { ...prev };
      delete next[ref];
      localStorage.setItem("logos_notes", JSON.stringify(next));
      return next;
    });
  }, []);

  return { notes, saveNote, deleteNote };
}

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("logos_bookmarks") || "[]"); }
    catch { return []; }
  });

  const toggleBookmark = useCallback((ref) => {
    setBookmarks((prev) => {
      const next = prev.includes(ref) ? prev.filter((b) => b !== ref) : [...prev, ref];
      localStorage.setItem("logos_bookmarks", JSON.stringify(next));
      return next;
    });
  }, []);

  return { bookmarks, toggleBookmark };
}

function useReadingHistory() {
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("logos_history") || "[]"); }
    catch { return []; }
  });

  const addToHistory = useCallback((book, chapter) => {
    setHistory((prev) => {
      const entry = { book, chapter, timestamp: Date.now() };
      const filtered = prev.filter((h) => !(h.book === book && h.chapter === chapter));
      const next = [entry, ...filtered].slice(0, 50);
      localStorage.setItem("logos_history", JSON.stringify(next));
      return next;
    });
  }, []);

  return { history, addToHistory };
}


// ─── API Fetching ────────────────────────────────────────────────────────────

async function fetchChapter(bookName, chapter, translation = "web") {
  const ref = `${bookName} ${chapter}`;
  const url = `${BIBLE_API}/${encodeURIComponent(ref)}?translation=${translation}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${ref}`);
  return res.json();
}

async function searchBible(query, translation = "web") {
  const url = `${BIBLE_API}/search?q=${encodeURIComponent(query)}&translation=${translation}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}


// ─── Sub-Components ──────────────────────────────────────────────────────────

function Icon({ name, size = 18 }) {
  const paths = {
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    bookmark: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
    bookmarkFilled: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
    edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    compass: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z",
    globe: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
    clock: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
    chevronLeft: "M15 18l-6-6 6-6",
    chevronRight: "M9 18l6-6-6-6",
    x: "M18 6L6 18M6 6l12 12",
    heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
    link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
    layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    info: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01",
    trash: "M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2",
    menu: "M3 12h18M3 6h18M3 18h18",
    home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={name === "bookmarkFilled" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4rem 0" }}>
      <div style={{
        width: 32, height: 32, border: "3px solid var(--border-light)",
        borderTopColor: "var(--accent)", borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
    </div>
  );
}

function VerseDisplay({ verse, translation, bookmarks, toggleBookmark, notes, onOpenNote, highlightTerm }) {
  const ref = verse.book_name ? `${verse.book_name} ${verse.chapter}:${verse.verse}` : verse.reference;
  const isBookmarked = bookmarks.includes(ref);
  const hasNote = notes[ref];

  let textContent = verse.text;
  if (highlightTerm && textContent) {
    const regex = new RegExp(`(${highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = textContent.split(regex);
    textContent = parts.map((part, i) =>
      regex.test(part) ? <mark key={i} style={{ background: "var(--highlight)", color: "var(--text-primary)", borderRadius: 2, padding: "0 2px" }}>{part}</mark> : part
    );
  }

  return (
    <div className="verse-row">
      <span className="verse-num">{verse.verse}</span>
      <span className="verse-text">{textContent}</span>
      <span className="verse-actions">
        <button onClick={() => toggleBookmark(ref)} className="icon-btn" title={isBookmarked ? "Remove bookmark" : "Bookmark"} aria-label="Bookmark verse">
          <Icon name={isBookmarked ? "bookmarkFilled" : "bookmark"} size={15} />
        </button>
        <button onClick={() => onOpenNote(ref, verse.text)} className="icon-btn" title="Add note" style={hasNote ? { color: "var(--accent)" } : {}} aria-label="Add note">
          <Icon name="edit" size={15} />
        </button>
      </span>
    </div>
  );
}


// ─── Panels / Views ──────────────────────────────────────────────────────────

function ReaderView({ book, chapter, translation, setBook, setChapter, bookmarks, toggleBookmark, notes, onOpenNote, addToHistory }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const readerRef = useRef(null);

  useEffect(() => {
    if (!book) return;
    setLoading(true);
    setError(null);
    fetchChapter(book.name, chapter, translation.id)
      .then((d) => { setData(d); addToHistory(book.id, chapter); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [book, chapter, translation, addToHistory]);

  useEffect(() => {
    if (readerRef.current) readerRef.current.scrollTop = 0;
  }, [book, chapter]);

  const canPrev = chapter > 1;
  const canNext = book && chapter < book.chapters;

  if (!book) {
    return (
      <div className="empty-state">
        <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.15 }}>
          <Icon name="book" size={64} />
        </div>
        <h2 style={{ margin: "0 0 8px", fontWeight: 500, fontSize: 20, color: "var(--text-primary)" }}>Select a book to begin</h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: 320, lineHeight: 1.6 }}>Choose from the Old or New Testament in the sidebar, or explore topics that speak to your day.</p>
      </div>
    );
  }

  return (
    <div className="reader-panel" ref={readerRef}>
      <div className="reader-header">
        <div>
          <h1 className="reader-title">{book.name} {chapter}</h1>
          <span className="reader-meta">{translation.abbr} — {book.genre}</span>
        </div>
        <div className="chapter-nav">
          <button onClick={() => setChapter(Math.max(1, chapter - 1))} disabled={!canPrev} className="nav-btn" aria-label="Previous chapter">
            <Icon name="chevronLeft" size={18} />
          </button>
          <select value={chapter} onChange={(e) => setChapter(Number(e.target.value))} className="chapter-select" aria-label="Select chapter">
            {Array.from({ length: book.chapters }, (_, i) => (
              <option key={i + 1} value={i + 1}>Ch. {i + 1}</option>
            ))}
          </select>
          <button onClick={() => setChapter(Math.min(book.chapters, chapter + 1))} disabled={!canNext} className="nav-btn" aria-label="Next chapter">
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      </div>
      <div className="reader-body">
        {loading && <LoadingSpinner />}
        {error && <div className="error-msg">Could not load chapter. Check your connection and try again.</div>}
        {data && data.verses && data.verses.map((v, i) => (
          <VerseDisplay key={i} verse={v} translation={translation} bookmarks={bookmarks} toggleBookmark={toggleBookmark} notes={notes} onOpenNote={onOpenNote} />
        ))}
      </div>
    </div>
  );
}

function BookInfoPanel({ book }) {
  if (!book) return null;
  return (
    <div className="book-info-card">
      <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 500 }}>About {book.name}</h3>
      <div className="info-grid">
        <div className="info-item"><span className="info-label">Author</span><span className="info-value">{book.author}</span></div>
        <div className="info-item"><span className="info-label">Date written</span><span className="info-value">{book.date}</span></div>
        <div className="info-item"><span className="info-label">Genre</span><span className="info-value">{book.genre}</span></div>
        <div className="info-item"><span className="info-label">Chapters</span><span className="info-value">{book.chapters}</span></div>
        <div className="info-item"><span className="info-label">Testament</span><span className="info-value">{book.testament === "OT" ? "Old Testament" : "New Testament"}</span></div>
      </div>
    </div>
  );
}

function SearchPanel({ translation, bookmarks, toggleBookmark, notes, onOpenNote, onNavigate }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchBible(query.trim(), translation.id);
      setResults(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [query, translation]);

  return (
    <div className="search-panel">
      <div className="search-bar">
        <Icon name="search" size={18} />
        <input
          type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={`Search the Bible (${translation.abbr})...`}
          className="search-input"
          autoFocus
        />
        <button onClick={handleSearch} disabled={!query.trim() || loading} className="search-btn">Search</button>
      </div>
      {loading && <LoadingSpinner />}
      {error && <div className="error-msg">Search failed. Please try again.</div>}
      {results && (
        <div className="search-results">
          <p className="results-count">{results.verses?.length || 0} results for "{query}"</p>
          {results.verses?.map((v, i) => (
            <div key={i} className="search-result-item" onClick={() => {
              const bookData = ALL_BOOKS.find((b) => b.name === v.book_name);
              if (bookData) onNavigate(bookData, v.chapter);
            }}>
              <span className="result-ref">{v.book_name} {v.chapter}:{v.verse}</span>
              <VerseDisplay verse={v} translation={translation} bookmarks={bookmarks} toggleBookmark={toggleBookmark} notes={notes} onOpenNote={onOpenNote} highlightTerm={query} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TopicsPanel({ onNavigate, translation }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [verseData, setVerseData] = useState({});
  const [loadingVerse, setLoadingVerse] = useState(null);

  const loadVerse = useCallback(async (ref) => {
    if (verseData[ref]) return;
    setLoadingVerse(ref);
    try {
      const url = `${BIBLE_API}/${encodeURIComponent(ref)}?translation=${translation.id}`;
      const res = await fetch(url);
      const data = await res.json();
      setVerseData((prev) => ({ ...prev, [ref]: data }));
    } catch { /* silently fail */ }
    finally { setLoadingVerse(null); }
  }, [translation, verseData]);

  useEffect(() => {
    if (selectedTopic) {
      selectedTopic.verses.forEach((ref) => loadVerse(ref));
    }
  }, [selectedTopic, loadVerse]);

  if (selectedTopic) {
    return (
      <div className="topics-detail">
        <button onClick={() => setSelectedTopic(null)} className="back-link">
          <Icon name="chevronLeft" size={16} /> Back to topics
        </button>
        <h2 className="topic-title">{selectedTopic.label}</h2>
        <div className="topic-verses">
          {selectedTopic.verses.map((ref) => (
            <div key={ref} className="topic-verse-card">
              <h4 className="topic-verse-ref">{ref}</h4>
              {loadingVerse === ref && <div style={{ color: "var(--text-tertiary)", fontSize: 13 }}>Loading...</div>}
              {verseData[ref] && (
                <p className="topic-verse-text">{verseData[ref].text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="topics-panel">
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 500, color: "var(--text-primary)" }}>What does the Bible say?</h2>
      <p style={{ margin: "0 0 24px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
        Find relevant scripture for whatever you're experiencing today.
      </p>
      {TOPIC_CATEGORIES.map((cat) => (
        <div key={cat.name} className="topic-category">
          <h3 className="topic-cat-name">{cat.name}</h3>
          <div className="topic-grid">
            {cat.topics.map((topic) => (
              <button key={topic.label} className="topic-chip" onClick={() => setSelectedTopic(topic)}>
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GreekStudyPanel() {
  const [selectedWord, setSelectedWord] = useState(null);
  const words = Object.keys(GREEK_WORD_STUDIES);

  return (
    <div className="greek-panel">
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 500 }}>Greek word studies</h2>
      <p style={{ margin: "0 0 20px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
        Explore original Greek meanings to deepen your understanding. The New Testament was written in Koine Greek — nuances often lost in English translation reveal richer theology.
      </p>
      <div className="greek-word-grid">
        {words.map((w) => (
          <button key={w} className={`greek-word-btn ${selectedWord === w ? "active" : ""}`} onClick={() => setSelectedWord(selectedWord === w ? null : w)}>
            {w}
          </button>
        ))}
      </div>
      {selectedWord && (
        <div className="greek-entries">
          {GREEK_WORD_STUDIES[selectedWord].map((entry, i) => (
            <div key={i} className="greek-entry">
              <div className="greek-header">
                <span className="greek-char">{entry.greek}</span>
                <span className="greek-translit">{entry.transliteration}</span>
                {entry.strongs !== "N/A" && <span className="greek-strongs">{entry.strongs}</span>}
              </div>
              <p className="greek-meaning">{entry.meaning}</p>
              <p className="greek-usage">{entry.usage}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TranslationsPanel({ currentTranslation, onSelect }) {
  return (
    <div className="translations-panel">
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 500 }}>Bible translations</h2>
      <p style={{ margin: "0 0 8px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
        No single translation is "best" — each serves a different purpose. Formal equivalence (word-for-word) preserves original structure; dynamic equivalence (thought-for-thought) prioritizes readability. Serious study benefits from comparing multiple translations.
      </p>
      <p style={{ margin: "0 0 24px", color: "var(--text-tertiary)", fontSize: 13, lineHeight: 1.5 }}>
        Note: Only public domain / openly licensed translations are available through this free API. Major translations like NIV, ESV, and NASB require publisher licenses.
      </p>
      <div className="translation-list">
        {TRANSLATIONS.map((t) => (
          <button
            key={t.id}
            className={`translation-card ${currentTranslation.id === t.id ? "active" : ""}`}
            onClick={() => onSelect(t)}
          >
            <div className="translation-top">
              <span className="translation-abbr">{t.abbr}</span>
              <span className="translation-philosophy">{t.philosophy}</span>
            </div>
            <div className="translation-name">{t.name}</div>
            <div className="translation-desc">{t.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ResourcesPanel() {
  return (
    <div className="resources-panel">
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 500 }}>Study resources</h2>
      <p style={{ margin: "0 0 24px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
        External tools and references for deeper research — interlinear texts, commentaries, original manuscripts, and scholarly tools.
      </p>
      <div className="resource-list">
        {STUDY_RESOURCES.map((r) => (
          <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="resource-card">
            <div className="resource-name">{r.name} <Icon name="link" size={13} /></div>
            <div className="resource-desc">{r.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function NotesPanel({ notes, deleteNote, onNavigate }) {
  const entries = Object.entries(notes).sort((a, b) => (b[1].updatedAt || 0) - (a[1].updatedAt || 0));

  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <Icon name="edit" size={48} />
        <h2 style={{ margin: "16px 0 8px", fontWeight: 500, fontSize: 18 }}>No notes yet</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Click the pencil icon on any verse to add a note.</p>
      </div>
    );
  }

  return (
    <div className="notes-panel">
      <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 500 }}>Your notes</h2>
      {entries.map(([ref, data]) => (
        <div key={ref} className="note-card">
          <div className="note-header">
            <span className="note-ref">{ref}</span>
            <button onClick={() => deleteNote(ref)} className="icon-btn" title="Delete note" aria-label="Delete note">
              <Icon name="trash" size={14} />
            </button>
          </div>
          <p className="note-text">{data.text}</p>
          <span className="note-date">{new Date(data.updatedAt).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
}

function NoteModal({ noteRef, verseText, existingNote, onSave, onClose }) {
  const [text, setText] = useState(existingNote || "");
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>Note — {noteRef}</h3>
          <button onClick={onClose} className="icon-btn"><Icon name="x" size={18} /></button>
        </div>
        {verseText && <p className="modal-verse-preview">{verseText.slice(0, 200)}{verseText.length > 200 ? "..." : ""}</p>}
        <textarea
          value={text} onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts, reflections, or study notes here..."
          className="note-textarea"
          autoFocus
          rows={6}
        />
        <div className="modal-actions">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={() => { onSave(noteRef, text); onClose(); }} className="btn-primary" disabled={!text.trim()}>Save note</button>
        </div>
      </div>
    </div>
  );
}

function BookmarksList({ bookmarks, toggleBookmark, onNavigate }) {
  if (bookmarks.length === 0) {
    return (
      <div className="empty-state">
        <Icon name="bookmark" size={48} />
        <h2 style={{ margin: "16px 0 8px", fontWeight: 500, fontSize: 18 }}>No bookmarks yet</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Bookmark verses you want to revisit.</p>
      </div>
    );
  }
  return (
    <div className="bookmarks-list">
      <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 500 }}>Bookmarks</h2>
      {bookmarks.map((ref) => (
        <div key={ref} className="bookmark-item">
          <span className="bookmark-ref" onClick={() => {
            const match = ref.match(/^(.+?)\s+(\d+):(\d+)$/);
            if (match) {
              const bookData = ALL_BOOKS.find((b) => b.name === match[1]);
              if (bookData) onNavigate(bookData, parseInt(match[2]));
            }
          }}>{ref}</span>
          <button onClick={() => toggleBookmark(ref)} className="icon-btn" title="Remove"><Icon name="x" size={14} /></button>
        </div>
      ))}
    </div>
  );
}


// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ book, setBook, setChapter, sidebarOpen, setSidebarOpen }) {
  const [expandedTestament, setExpandedTestament] = useState(null);

  const handleBookSelect = (b) => {
    setBook(b);
    setChapter(1);
    setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Books</h2>
        </div>
        <div className="sidebar-scroll">
          {[{ label: "Old Testament", key: "old", books: BOOKS.old }, { label: "New Testament", key: "new", books: BOOKS.new }].map(({ label, key, books: bookList }) => (
            <div key={key}>
              <button className="testament-toggle" onClick={() => setExpandedTestament(expandedTestament === key ? null : key)}>
                <span>{label}</span>
                <Icon name={expandedTestament === key ? "chevronLeft" : "chevronRight"} size={14} />
              </button>
              {expandedTestament === key && (
                <div className="book-list">
                  {bookList.map((b) => (
                    <button
                      key={b.id}
                      className={`book-item ${book?.id === b.id ? "active" : ""}`}
                      onClick={() => handleBookSelect(b)}
                    >
                      <span className="book-name">{b.name}</span>
                      <span className="book-chapters-count">{b.chapters}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}


// ─── Main App ────────────────────────────────────────────────────────────────

export default function LogosBibleApp() {
  const [book, setBook] = useState(null);
  const [chapter, setChapter] = useState(1);
  const [translation, setTranslation] = useState(TRANSLATIONS[0]);
  const [activeView, setActiveView] = useState("read");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [noteModal, setNoteModal] = useState(null);

  const { notes, saveNote, deleteNote } = useLocalNotes();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { history, addToHistory } = useReadingHistory();

  const handleNavigate = useCallback((bookData, ch) => {
    setBook(bookData);
    setChapter(ch);
    setActiveView("read");
  }, []);

  const handleOpenNote = useCallback((ref, verseText) => {
    setNoteModal({ ref, verseText, existing: notes[ref]?.text || "" });
  }, [notes]);

  const navItems = [
    { id: "read", icon: "book", label: "Read" },
    { id: "search", icon: "search", label: "Search" },
    { id: "topics", icon: "compass", label: "Topics" },
    { id: "greek", icon: "globe", label: "Greek" },
    { id: "translations", icon: "layers", label: "Versions" },
    { id: "notes", icon: "edit", label: "Notes" },
    { id: "bookmarks", icon: "bookmark", label: "Saved" },
    { id: "resources", icon: "link", label: "Resources" },
  ];

  const renderView = () => {
    switch (activeView) {
      case "read":
        return (
          <>
            <ReaderView book={book} chapter={chapter} translation={translation} setBook={setBook} setChapter={setChapter} bookmarks={bookmarks} toggleBookmark={toggleBookmark} notes={notes} onOpenNote={handleOpenNote} addToHistory={addToHistory} />
            {book && <BookInfoPanel book={book} />}
          </>
        );
      case "search":
        return <SearchPanel translation={translation} bookmarks={bookmarks} toggleBookmark={toggleBookmark} notes={notes} onOpenNote={handleOpenNote} onNavigate={handleNavigate} />;
      case "topics":
        return <TopicsPanel onNavigate={handleNavigate} translation={translation} />;
      case "greek":
        return <GreekStudyPanel />;
      case "translations":
        return <TranslationsPanel currentTranslation={translation} onSelect={setTranslation} />;
      case "notes":
        return <NotesPanel notes={notes} deleteNote={deleteNote} onNavigate={handleNavigate} />;
      case "bookmarks":
        return <BookmarksList bookmarks={bookmarks} toggleBookmark={toggleBookmark} onNavigate={handleNavigate} />;
      case "resources":
        return <ResourcesPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap');

        :root {
          --font-display: 'Cormorant Garamond', Georgia, serif;
          --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          --bg-primary: #faf9f6;
          --bg-secondary: #f3f1ec;
          --bg-card: #ffffff;
          --bg-sidebar: #f7f6f2;
          --text-primary: #1a1a18;
          --text-secondary: #6b6960;
          --text-tertiary: #9c9a8e;
          --border-light: #e8e6df;
          --border-medium: #d4d1c7;
          --accent: #8b6f47;
          --accent-light: #f0ebe2;
          --accent-hover: #725a39;
          --highlight: #f5e6b8;
          --danger: #c0392b;
          --danger-light: #fdecea;
          --success: #27ae60;
          --sidebar-width: 260px;
          --nav-height: 52px;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --bg-primary: #1a1917;
            --bg-secondary: #23221f;
            --bg-card: #2a2926;
            --bg-sidebar: #1f1e1b;
            --text-primary: #e8e5dd;
            --text-secondary: #a09d93;
            --text-tertiary: #6e6c63;
            --border-light: #3a3835;
            --border-medium: #4a4845;
            --accent: #c9a96e;
            --accent-light: #2e2820;
            --accent-hover: #ddbf82;
            --highlight: #4a3f25;
            --danger: #e74c3c;
            --danger-light: #3a2020;
          }
        }

        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .app-root {
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100vh;
        }

        /* ── Top Bar ── */
        .top-bar {
          height: var(--nav-height);
          display: flex;
          align-items: center;
          padding: 0 16px;
          border-bottom: 1px solid var(--border-light);
          background: var(--bg-card);
          gap: 12px;
          flex-shrink: 0;
          z-index: 20;
        }
        .menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 4px;
        }
        @media (max-width: 768px) {
          .menu-btn { display: flex; }
        }
        .app-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          white-space: nowrap;
        }
        .app-title-accent {
          color: var(--accent);
          font-style: italic;
        }
        .top-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: auto;
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .top-nav::-webkit-scrollbar { display: none; }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: none;
          background: none;
          color: var(--text-secondary);
          font-size: 13px;
          font-family: var(--font-body);
          cursor: pointer;
          border-radius: 6px;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s;
        }
        .nav-item:hover { background: var(--bg-secondary); color: var(--text-primary); }
        .nav-item.active { background: var(--accent-light); color: var(--accent); }
        .nav-item .nav-label { display: inline; }
        @media (max-width: 900px) {
          .nav-item .nav-label { display: none; }
          .nav-item { padding: 8px; }
        }

        /* ── Layout ── */
        .main-layout {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* ── Sidebar ── */
        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.3);
          z-index: 30;
        }
        @media (max-width: 768px) {
          .sidebar-overlay { display: block; }
        }
        .sidebar {
          width: var(--sidebar-width);
          background: var(--bg-sidebar);
          border-right: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 40;
            transform: translateX(-100%);
            transition: transform 0.25s ease;
          }
          .sidebar.open { transform: translateX(0); }
        }
        .sidebar-header {
          padding: 16px 16px 12px;
          border-bottom: 1px solid var(--border-light);
        }
        .sidebar-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
          color: var(--text-primary);
        }
        .sidebar-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }
        .testament-toggle {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          border: none;
          background: none;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 500;
          font-family: var(--font-body);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: color 0.15s;
        }
        .testament-toggle:hover { color: var(--text-primary); }
        .book-list {
          animation: fadeIn 0.2s ease;
        }
        .book-item {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 16px 7px 24px;
          border: none;
          background: none;
          color: var(--text-primary);
          font-size: 13.5px;
          font-family: var(--font-body);
          cursor: pointer;
          transition: background 0.12s;
          text-align: left;
        }
        .book-item:hover { background: var(--accent-light); }
        .book-item.active { background: var(--accent-light); color: var(--accent); font-weight: 500; }
        .book-chapters-count {
          font-size: 11px;
          color: var(--text-tertiary);
        }

        /* ── Content Area ── */
        .content-area {
          flex: 1;
          overflow-y: auto;
          padding: 24px 32px;
          max-width: 800px;
        }
        @media (max-width: 768px) {
          .content-area { padding: 16px; }
        }

        /* ── Reader ── */
        .reader-panel {
          animation: fadeIn 0.3s ease;
        }
        .reader-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .reader-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
        }
        .reader-meta {
          font-size: 13px;
          color: var(--text-tertiary);
          margin-top: 4px;
          display: block;
        }
        .chapter-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .nav-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-light);
          background: var(--bg-card);
          color: var(--text-secondary);
          border-radius: 6px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }
        .nav-btn:hover:not(:disabled) { border-color: var(--border-medium); color: var(--text-primary); }
        .nav-btn:disabled { opacity: 0.3; cursor: default; }
        .chapter-select {
          height: 32px;
          padding: 0 8px;
          border: 1px solid var(--border-light);
          border-radius: 6px;
          background: var(--bg-card);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 13px;
          cursor: pointer;
        }

        /* ── Verse Row ── */
        .verse-row {
          display: flex;
          align-items: baseline;
          padding: 4px 0;
          gap: 8px;
          line-height: 1.85;
        }
        .verse-num {
          font-size: 11px;
          font-weight: 500;
          color: var(--accent);
          min-width: 24px;
          text-align: right;
          flex-shrink: 0;
          padding-top: 2px;
          font-variant-numeric: tabular-nums;
        }
        .verse-text {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 400;
          color: var(--text-primary);
          line-height: 1.85;
          flex: 1;
        }
        .verse-actions {
          display: flex;
          gap: 2px;
          opacity: 0;
          transition: opacity 0.15s;
          flex-shrink: 0;
        }
        .verse-row:hover .verse-actions { opacity: 1; }
        .icon-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: none;
          color: var(--text-tertiary);
          cursor: pointer;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
        }
        .icon-btn:hover { color: var(--accent); background: var(--accent-light); }

        /* ── Book Info Card ── */
        .book-info-card {
          margin-top: 32px;
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 10px;
          border: 1px solid var(--border-light);
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }
        .info-item { display: flex; flex-direction: column; gap: 2px; }
        .info-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-tertiary); font-weight: 500; }
        .info-value { font-size: 14px; color: var(--text-primary); }

        /* ── Search ── */
        .search-panel { animation: fadeIn 0.3s ease; }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: 10px;
          margin-bottom: 20px;
          transition: border-color 0.15s;
        }
        .search-bar:focus-within { border-color: var(--accent); }
        .search-bar svg { color: var(--text-tertiary); flex-shrink: 0; }
        .search-input {
          flex: 1;
          border: none;
          background: none;
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--text-primary);
          outline: none;
        }
        .search-input::placeholder { color: var(--text-tertiary); }
        .search-btn {
          padding: 6px 16px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 6px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .search-btn:hover:not(:disabled) { background: var(--accent-hover); }
        .search-btn:disabled { opacity: 0.5; }
        .results-count { font-size: 13px; color: var(--text-secondary); margin-bottom: 16px; }
        .search-result-item {
          padding: 12px 0;
          border-bottom: 1px solid var(--border-light);
          cursor: pointer;
          transition: background 0.12s;
        }
        .search-result-item:hover { background: var(--accent-light); margin: 0 -8px; padding: 12px 8px; border-radius: 8px; }
        .result-ref {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: var(--accent);
          margin-bottom: 4px;
        }

        /* ── Topics ── */
        .topics-panel { animation: fadeIn 0.3s ease; }
        .topic-category { margin-bottom: 28px; }
        .topic-cat-name {
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-tertiary);
          margin-bottom: 10px;
        }
        .topic-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .topic-chip {
          padding: 8px 16px;
          border: 1px solid var(--border-light);
          background: var(--bg-card);
          border-radius: 20px;
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.15s;
        }
        .topic-chip:hover { border-color: var(--accent); background: var(--accent-light); color: var(--accent); }
        .topics-detail { animation: fadeIn 0.3s ease; }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: none;
          background: none;
          color: var(--accent);
          font-family: var(--font-body);
          font-size: 13px;
          cursor: pointer;
          margin-bottom: 16px;
          padding: 4px 0;
        }
        .topic-title {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 500;
          margin: 0 0 20px;
        }
        .topic-verse-card {
          padding: 16px 0;
          border-bottom: 1px solid var(--border-light);
        }
        .topic-verse-ref {
          font-size: 14px;
          font-weight: 500;
          color: var(--accent);
          margin: 0 0 6px;
        }
        .topic-verse-text {
          font-family: var(--font-display);
          font-size: 17px;
          line-height: 1.75;
          color: var(--text-primary);
          margin: 0;
        }

        /* ── Greek ── */
        .greek-panel { animation: fadeIn 0.3s ease; }
        .greek-word-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
        .greek-word-btn {
          padding: 8px 18px;
          border: 1px solid var(--border-light);
          background: var(--bg-card);
          border-radius: 6px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--text-primary);
          cursor: pointer;
          text-transform: capitalize;
          transition: all 0.15s;
        }
        .greek-word-btn:hover { border-color: var(--accent); }
        .greek-word-btn.active { background: var(--accent); color: white; border-color: var(--accent); }
        .greek-entries { animation: fadeIn 0.25s ease; }
        .greek-entry {
          padding: 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: 10px;
          margin-bottom: 12px;
        }
        .greek-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 10px; flex-wrap: wrap; }
        .greek-char {
          font-size: 26px;
          font-weight: 500;
          color: var(--accent);
          font-family: var(--font-display);
        }
        .greek-translit { font-size: 15px; font-style: italic; color: var(--text-secondary); }
        .greek-strongs {
          font-size: 12px;
          padding: 2px 8px;
          background: var(--accent-light);
          color: var(--accent);
          border-radius: 4px;
          font-weight: 500;
        }
        .greek-meaning {
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-primary);
          margin: 0 0 8px;
        }
        .greek-usage {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        /* ── Translations ── */
        .translations-panel { animation: fadeIn 0.3s ease; }
        .translation-list { display: flex; flex-direction: column; gap: 10px; }
        .translation-card {
          padding: 16px;
          border: 1px solid var(--border-light);
          background: var(--bg-card);
          border-radius: 10px;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-body);
          transition: all 0.15s;
          display: block;
          width: 100%;
        }
        .translation-card:hover { border-color: var(--accent); }
        .translation-card.active { border-color: var(--accent); background: var(--accent-light); }
        .translation-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .translation-abbr { font-size: 14px; font-weight: 500; color: var(--accent); }
        .translation-philosophy { font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.06em; }
        .translation-name { font-size: 15px; font-weight: 500; color: var(--text-primary); margin-bottom: 4px; }
        .translation-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.45; }

        /* ── Resources ── */
        .resources-panel { animation: fadeIn 0.3s ease; }
        .resource-list { display: flex; flex-direction: column; gap: 10px; }
        .resource-card {
          display: block;
          padding: 16px;
          border: 1px solid var(--border-light);
          background: var(--bg-card);
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.15s;
        }
        .resource-card:hover { border-color: var(--accent); transform: translateY(-1px); }
        .resource-name { font-size: 15px; font-weight: 500; color: var(--accent); display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
        .resource-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.45; }

        /* ── Notes ── */
        .notes-panel { animation: fadeIn 0.3s ease; }
        .note-card {
          padding: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: 10px;
          margin-bottom: 10px;
        }
        .note-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .note-ref { font-size: 14px; font-weight: 500; color: var(--accent); }
        .note-text { font-size: 14px; line-height: 1.6; color: var(--text-primary); margin: 0 0 8px; white-space: pre-wrap; }
        .note-date { font-size: 12px; color: var(--text-tertiary); }

        /* ── Bookmarks ── */
        .bookmarks-list { animation: fadeIn 0.3s ease; }
        .bookmark-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-light);
        }
        .bookmark-ref {
          font-size: 14px;
          color: var(--accent);
          cursor: pointer;
          font-weight: 500;
        }
        .bookmark-ref:hover { text-decoration: underline; }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 16px;
          animation: fadeIn 0.15s ease;
        }
        .modal-content {
          background: var(--bg-card);
          border-radius: 14px;
          padding: 24px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .modal-verse-preview {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          font-style: italic;
          line-height: 1.5;
          margin: 0 0 16px;
          padding: 10px;
          background: var(--bg-secondary);
          border-radius: 6px;
        }
        .note-textarea {
          width: 100%;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 12px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--text-primary);
          background: var(--bg-primary);
          resize: vertical;
          outline: none;
          transition: border-color 0.15s;
        }
        .note-textarea:focus { border-color: var(--accent); }
        .modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
        .btn-secondary {
          padding: 8px 16px;
          border: 1px solid var(--border-light);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 13px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-secondary:hover { border-color: var(--border-medium); color: var(--text-primary); }
        .btn-primary {
          padding: 8px 16px;
          border: none;
          background: var(--accent);
          color: white;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-primary:hover:not(:disabled) { background: var(--accent-hover); }
        .btn-primary:disabled { opacity: 0.5; }

        /* ── Empty State ── */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 20px;
          color: var(--text-tertiary);
        }

        /* ── Error ── */
        .error-msg {
          padding: 16px;
          background: var(--danger-light);
          color: var(--danger);
          border-radius: 8px;
          font-size: 14px;
          text-align: center;
        }
      `}</style>

      <header className="top-bar">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <Icon name="menu" size={20} />
        </button>
        <span className="app-title">
          <span className="app-title-accent">Logos</span> Bible Study
        </span>
        <nav className="top-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? "active" : ""}`}
              onClick={() => setActiveView(item.id)}
              aria-label={item.label}
            >
              <Icon name={item.icon} size={16} />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <div className="main-layout">
        <Sidebar book={book} setBook={setBook} setChapter={setChapter} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="content-area">
          {renderView()}
        </main>
      </div>

      {noteModal && (
        <NoteModal
          noteRef={noteModal.ref}
          verseText={noteModal.verseText}
          existingNote={noteModal.existing}
          onSave={saveNote}
          onClose={() => setNoteModal(null)}
        />
      )}
    </div>
  );
}
