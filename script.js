
// --- SETTINGS YOU MIGHT WANT TO CHANGE ---
const DATA_FOLDER = "Bible_Data";   // folder that holds OT/ and NT/
const TARGET_WORDS = 20;            // keep adding verses until we have this many viable words
const MIN_WORD_LENGTH = 3;          // words shorter than this are not viable
const SHOW_REFERENCE = true;        // later this will be hidden until the player wins

// Keys used for saving/loading dropdown choices.
// Both the save code and the load code use THESE constants,
// so the spelling can never get out of sync.
const STORAGE_KEYS = {
    translation: "Bible_Translation",
    book: "Bible_Book"
};

// Words that can never be swapped for an antonym. Add more as you find them.
const STOP_WORDS = new Set([
    "come", "go", "be", "is", "are", "was", "were", "am", "the", "a", "an", "and", "said", "ham"
]);

// Used by the daily game's share text
const CATEGORY_EMOJIS = ["🟨", "🟩", "🟦", "🟪"];

// [name, number of chapters, testament, folder code]
const BIBLE_BOOKS = [
    ["Genesis", 50, "OT", "GEN"], ["Exodus", 40, "OT", "EXO"], ["Leviticus", 27, "OT", "LEV"],
    ["Numbers", 36, "OT", "NUM"], ["Deuteronomy", 34, "OT", "DEU"], ["Joshua", 24, "OT", "JOS"],
    ["Judges", 21, "OT", "JDG"], ["Ruth", 4, "OT", "RUT"], ["1 Samuel", 31, "OT", "1SA"],
    ["2 Samuel", 24, "OT", "2SA"], ["1 Kings", 22, "OT", "1KI"], ["2 Kings", 25, "OT", "2KI"],
    ["1 Chronicles", 29, "OT", "1CH"], ["2 Chronicles", 36, "OT", "2CH"], ["Ezra", 10, "OT", "EZR"],
    ["Nehemiah", 13, "OT", "NEH"], ["Esther", 10, "OT", "EST"], ["Job", 42, "OT", "JOB"],
    ["Psalms", 150, "OT", "PSA"], ["Proverbs", 31, "OT", "PRO"], ["Ecclesiastes", 12, "OT", "ECC"],
    ["Song of Solomon", 8, "OT", "SNG"], ["Isaiah", 66, "OT", "ISA"], ["Jeremiah", 52, "OT", "JER"],
    ["Lamentations", 5, "OT", "LAM"], ["Ezekiel", 48, "OT", "EZK"], ["Daniel", 12, "OT", "DAN"],
    ["Hosea", 14, "OT", "HOS"], ["Joel", 3, "OT", "JOL"], ["Amos", 9, "OT", "AMO"],
    ["Obadiah", 1, "OT", "OBA"], ["Jonah", 4, "OT", "JON"], ["Micah", 7, "OT", "MIC"],
    ["Nahum", 3, "OT", "NAH"], ["Habakkuk", 3, "OT", "HAB"], ["Zephaniah", 3, "OT", "ZEP"],
    ["Haggai", 2, "OT", "HAG"], ["Zechariah", 14, "OT", "ZEC"], ["Malachi", 4, "OT", "MAL"],
    ["Matthew", 28, "NT", "MAT"], ["Mark", 16, "NT", "MRK"], ["Luke", 24, "NT", "LUK"],
    ["John", 21, "NT", "JHN"], ["Acts", 28, "NT", "ACT"], ["Romans", 16, "NT", "ROM"],
    ["1 Corinthians", 16, "NT", "1CO"], ["2 Corinthians", 13, "NT", "2CO"], ["Galatians", 6, "NT", "GAL"],
    ["Ephesians", 6, "NT", "EPH"], ["Philippians", 4, "NT", "PHP"], ["Colossians", 4, "NT", "COL"],
    ["1 Thessalonians", 5, "NT", "1TH"], ["2 Thessalonians", 3, "NT", "2TH"], ["1 Timothy", 6, "NT", "1TI"],
    ["2 Timothy", 4, "NT", "2TI"], ["Titus", 3, "NT", "TIT"], ["Philemon", 1, "NT", "PHM"],
    ["Hebrews", 13, "NT", "HEB"], ["James", 5, "NT", "JAS"], ["1 Peter", 5, "NT", "1PE"],
    ["2 Peter", 3, "NT", "2PE"], ["1 John", 5, "NT", "1JN"], ["2 John", 1, "NT", "2JN"],
    ["3 John", 1, "NT", "3JN"], ["Jude", 1, "NT", "JUD"], ["Revelation", 22, "NT", "REV"]
];

// --- GAME STATE ---
let translation = "ESV";
let bookChoice = "Entire Bible";
const bookCache = {};   // remembers books we already downloaded so we don't fetch twice

// --- DAILY GAME STATE ---
// randomFunc is the "dice" used for every random choice.
// Normal games use Math.random; the daily game will use a seeded one.
let randomFunc = Math.random;
let isDailyMode = false;
let dailyDayNumber = 0;
let guessHistoryColors = [];
let hasFailedDailyBook = false; // Tracks if we had to swap out of a seeded book
let currentPuzzle = [];
let flipPercent = 50;


// =====================================================
// START-UP
// =====================================================
populateBookDropdown();
restoreSavedSettings();
setupEventListeners();


// =====================================================
// SETUP SCREEN
// =====================================================
function populateBookDropdown() {
    const bookSelect = document.getElementById("book-select");
    bookSelect.innerHTML = "";

    const names = ["Entire Bible", "Old Testament", "New Testament"];
    BIBLE_BOOKS.forEach(book => names.push(book[0]));

    names.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        bookSelect.appendChild(option);
    });
}

// Runs once at page load: storage -> dropdowns
function restoreSavedSettings() {
    const savedTranslation = localStorage.getItem(STORAGE_KEYS.translation);
    const savedBook = localStorage.getItem(STORAGE_KEYS.book);
    const savedFlipPercent = localStorage.getItem(STORAGE_KEYS.flipPercent);


    if (savedTranslation) {
        document.getElementById("translation-select").value = savedTranslation;
    }
    if (savedBook) {
        document.getElementById("book-select").value = savedBook;
    }
    if (savedFlipPercent) {
        flipPercent = parseInt(savedFlipPercent);
        document.getElementById("flip-slider").value = flipPercent;
        document.getElementById("flip-value").textContent = flipPercent;
    }
}

// Runs when Generate is clicked: dropdowns -> variables -> storage
function readAndSaveSettings() {
    translation = document.getElementById("translation-select").value;
    bookChoice = document.getElementById("book-select").value;
    flipPercent = parseInt(document.getElementById("flip-slider").value);

    localStorage.setItem(STORAGE_KEYS.translation, translation);
    localStorage.setItem(STORAGE_KEYS.book, bookChoice);
    localStorage.setItem(STORAGE_KEYS.flipPercent, flipPercent);
}

// Normal (random) game: make sure daily settings are switched off first
function startRandomGame() {
    isDailyMode = false;
    hasFailedDailyBook = false;
    randomFunc = Math.random;
    startBoardGeneration();
}

function setupEventListeners() {
    document.getElementById("generate-btn").addEventListener("click", startRandomGame);
    document.getElementById("how-to-play-btn").addEventListener("click", showHowToPlay);
    document.getElementById("new-verses-btn").addEventListener("click", startRandomGame);
    document.getElementById("back-btn").addEventListener("click", () => showScreen("setup"));
    document.getElementById("flip-slider").addEventListener("input", () => {
        flipPercent = parseInt(document.getElementById("flip-slider").value);
        document.getElementById("flip-value").textContent = flipPercent;
    });


    // Daily game button, inserted just under How To Play
    const howToPlayBtn = document.getElementById("how-to-play-btn");
    const dailyBtn = document.createElement("button");
    dailyBtn.id = "daily-game-btn";
    dailyBtn.className = "ctk-btn primary-btn";
    dailyBtn.textContent = "Play Daily Game";
    dailyBtn.style.marginTop = "10px";
    howToPlayBtn.insertAdjacentElement("afterend", dailyBtn);
    dailyBtn.addEventListener("click", startDailyGame);
}

function showHowToPlay() {
    alert(
        "HOW TO PLAY:\n\n" +
        "• Verses from the Bible will be chosen at random.\n" +
        "• Each word with a viable antonym may be replaced with its antonym.\n" +
        "• These words get a drop down so you can pick between the original and the opposite.\n" +
        "• Your goal is to use as few guesses as possible to restore the verse to its original message!\n\n" +
        "- Created by Matthew Kearney"
    );
}

function showScreen(which) {
    document.getElementById("setup-screen").style.display = (which === "setup") ? "flex" : "none";
    document.getElementById("game-screen").style.display = (which === "game") ? "flex" : "none";
}


// =====================================================
// WORD HELPERS
// =====================================================

// Returns an array of the viable words in a piece of text.
// (An array, not a Set, so a word used twice counts twice.)
function getWords(text) {
    const rawWords = text.toLowerCase().match(/[a-z]+(?:['\-][a-z]+)*/g) || [];
    return rawWords.filter(word => !STOP_WORDS.has(word) && word.length >= MIN_WORD_LENGTH);
}

// Tidies up raw verse text from the JSON files
function cleanText(text) {
    return String(text || "")
        .replace(/—/g, " ").replace(/–/g, " ")
        .replace(/<[^>]+>/g, "")
        .replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
}

function tokenizeVerse(text) {
    const pieces = text.split(/([a-z]+(?:['\-][a-z]+)*)/i);

    return pieces
        .map((piece, index) => ({
            text: piece,
            isWord: index % 2 === 1   // odd positions are the words
        }))
        .filter(token => token.text !== "");
}

// Can this word possibly be swapped for an antonym?
function isEligibleWord(word) {
    return !STOP_WORDS.has(word.toLowerCase()) && word.length >= MIN_WORD_LENGTH;
}



// Builds one verse: tokens + grammar + antonym options.
async function buildVerse(verse) {
    const tokens = tokenizeVerse(verse.text).map(token => ({
        ...token,
        eligible: token.isWord && isEligibleWord(token.text)
    }));
    addGrammar(tokens, verse.text);

    // Look up antonyms for all eligible words at the same time
    const eligible = tokens.filter(t => t.eligible);
    const lists = await Promise.all(eligible.map(t => fetchAntonyms(t.base)));
    eligible.forEach((t, i) => {
        t.options = lists[i];
        t.hasAntonym = lists[i].length > 0;
    });

    return { num: verse.num, tokens: tokens };
}

// Given a word and the tags compromise gave it IN CONTEXT,
// returns its base form and what was stripped off.
function getBaseForm(word, tags) {
    const has = tag => tags.includes(tag);
    let form = "none";
    let base = word.toLowerCase();

    // 1. Decide the form from the tags (order matters: check the most specific first)
    if (has("Gerund")) form = "gerund";
    else if (has("PastTense")) form = "past";
    else if (has("Plural")) form = "plural";
    else if (has("PresentTense")) form = "present";

    // 2. Reduce the word, based on the form
    const doc = nlp(word);
    if (form === "gerund" || form === "past" || form === "present") {
        doc.verbs().toInfinitive();
        base = doc.text().toLowerCase();
    } else if (form === "plural") {
        doc.nouns().toSingular();
        base = doc.text().toLowerCase();
    }

    // 3. "present" is only "third person" (walks) if the word actually changed
    if (form === "present") {
        form = (base === word.toLowerCase()) ? "none" : "third";
    }
    if (base === word.toLowerCase()) {
        form = "none";
    }
    return { base: base, form: form };
}

// Runs compromise on the whole verse and adds tags, base, and form
// to each eligible word token.
function addGrammar(tokens, verseText) {
    const terms = nlp(verseText).json().flatMap(sentence => sentence.terms);
    let nextTerm = 0;

    tokens.forEach(token => {
        if (!token.eligible) return;

        // Safe defaults, in case compromise can't match this word
        token.tags = [];
        token.base = token.text.toLowerCase();
        token.form = "none";

        // Walk forward through compromise's words to find this one
        const wanted = token.text.toLowerCase();
        for (let i = nextTerm; i < terms.length; i++) {
            const found = terms[i].text.toLowerCase().replace(/[^a-z'\-]/g, "");
            if (found === wanted) {
                token.tags = terms[i].tags;
                nextTerm = i + 1;
                break;
            }
        }

        const grammar = getBaseForm(token.text, token.tags);
        token.base = grammar.base;
        token.form = grammar.form;
    });
}


// --- ANTONYM LOOKUP ---

// --- OFFLINE ANTONYM LIST (loaded from antonyms.csv) ---
const ANTONYM_CSV = "antonyms.csv";
const CSV_BOTH_DIRECTIONS = true;   // true: a row "love,hate" also makes "hate" -> "love"
const USE_DATAMUSE = true;          // false = use only your CSV (faster, fully predictable)

const OFFLINE_ANTONYMS = {};        // word -> LIST of antonyms
let offlineLoadPromise = null;

function addToOfflineList(word, antonym) {
    if (!OFFLINE_ANTONYMS[word]) OFFLINE_ANTONYMS[word] = [];
    if (!OFFLINE_ANTONYMS[word].includes(antonym)) {
        OFFLINE_ANTONYMS[word].push(antonym);
    }
}

// Safe to call many times: the file is only downloaded once.
function loadOfflineAntonyms() {
    if (!offlineLoadPromise) offlineLoadPromise = readAntonymCsv();
    return offlineLoadPromise;
}

async function readAntonymCsv() {
    try {
        const response = await fetch(ANTONYM_CSV);
        if (!response.ok) throw new Error(`status ${response.status}`);
        const text = await response.text();

        text.replace(/^\uFEFF/, "").split(/\r?\n/).forEach(line => {
            const [word, antonym] = line.split(",")
                .map(cell => cell.trim().replace(/^"|"$/g, "").toLowerCase());
            if (!word || !antonym || word === "word") return;   // skip blanks and the header

            addToOfflineList(word, antonym);
            if (CSV_BOTH_DIRECTIONS) addToOfflineList(antonym, word);
        });
        console.log("Loaded offline antonyms for", Object.keys(OFFLINE_ANTONYMS).length, "words");
    } catch (error) {
        console.warn("Could not load", ANTONYM_CSV, "-", error);
    }
}


const antonymCache = new Map();   // base word -> antonym (or null if none)

// Returns an antonym for a base word, or null if there isn't one.
const MAX_ANTONYM_CHOICES = 4;   // how many of Datamuse's top answers we'll randomly pick from

// Returns a LIST of single-word antonyms for a base word (empty list if none).
async function fetchAntonyms(base) {
    await loadOfflineAntonyms();
    if (antonymCache.has(base)) return antonymCache.get(base);

        let fromDatamuse = [];
    if (USE_DATAMUSE) {
        try {
            const url = `https://api.datamuse.com/words?rel_ant=${encodeURIComponent(base)}&max=10&src=${encodeURIComponent(location.host)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Datamuse status ${response.status}`);
            const results = await response.json();

            fromDatamuse = results
                .map(r => r.word)
                .filter(w => !w.includes(" ") && w !== base);
        } catch (error) {
            console.warn("Datamuse failed for", base, "- using offline list only.", error);
        }
    }

    // Your curated words come first, then Datamuse's, with no duplicates
    const curated = OFFLINE_ANTONYMS[base] || [];
    const extras = fromDatamuse.filter(w => !curated.includes(w));
    const options = [...curated, ...extras].slice(0, MAX_ANTONYM_CHOICES);

    if (options.length === 0) {
        console.info("No antonym found for:", base);
    }

    antonymCache.set(base, options);
    return options;
}
// Picks one antonym from the options. The `chosen` Map is created fresh for each verse,
// so a base word that repeats within a verse always gets the same antonym.
function chooseAntonym(options, base, chosen) {
    if (chosen.has(base)) return chosen.get(base);

    const pick = options[Math.floor(randomFunc() * options.length)];
    chosen.set(base, pick);
    return pick;
}

// Makes the antonym start with a capital if the original word did.
function matchCase(original, word) {
    if (original[0] !== original[0].toLowerCase()) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
}

// Picks which words get flipped and gives each one its two dropdown options.
// Gives EVERY word that has an antonym a dropdown.
// The slider (flipPercent) is the chance that a dropdown starts on the antonym.
function flipWords(puzzle) {
    puzzle.forEach(verse => {
        const chosen = new Map();   // fresh for each verse, so repeats of a word agree
        verse.tokens.forEach(token => {
            if (!token.hasAntonym) return;

            const antonym = matchCase(token.text, chooseAntonym(token.options, token.base, chosen));
            token.hasDropdown = true;
            token.antonym = antonym;
            token.choices = deterministicShuffle([token.text, antonym]);
            token.selected = (randomFunc() * 100 < flipPercent) ? antonym : token.text;
        });
    });
}

// =====================================================
// LOADING VERSES
// =====================================================

// Which books can we pick from, based on the dropdown?
function getBooksForChoice(choice) {
    if (choice === "Entire Bible") return BIBLE_BOOKS;
    if (choice === "Old Testament") return BIBLE_BOOKS.filter(b => b[2] === "OT");
    if (choice === "New Testament") return BIBLE_BOOKS.filter(b => b[2] === "NT");
    return BIBLE_BOOKS.filter(b => b[0] === choice);
}

// Downloads one book's JSON and reshapes it into:
// [ { name: "Genesis 1", verses: [ {num: "1", text: "..."}, ... ] }, ... ]
async function loadBook(book) {
    const [bookName, , testament, code] = book;
    const path = `${DATA_FOLDER}/${testament}/${code}/${translation}.json`;

    if (bookCache[path]) return bookCache[path];

    const response = await fetch(path);
    if (!response.ok) {
        // Not hidden on purpose: if a path is wrong we WANT to see it.
        throw new Error(`Could not load ${path} (status ${response.status})`);
    }
    const data = await response.json();

    const chapters = (data.text || []).map(chapter => {
        const chapNum = String(chapter.name || "").split(" ").pop().replace(/\D/g, "") || "1";
        const verses = (chapter.text || []).map(v => ({
            num: String(v.ID),
            text: cleanText(v.text)
        }));
        return { name: `${bookName} ${chapNum}`, verses: verses };
    });

    bookCache[path] = chapters;
    return chapters;
}

// Picks a random book -> random chapter -> random starting verse,
// then keeps adding the next verse until we have enough viable words.
// Returns null if it can't find a long-enough passage.
const MAX_VERSES = 8;   // give up on a passage that needs more verses than this

async function pickVerses() {
    const books = getBooksForChoice(bookChoice);

    for (let attempt = 0; attempt < 20; attempt++) {
        const book = books[Math.floor(randomFunc() * books.length)];
        const chapters = await loadBook(book);
        if (chapters.length === 0) continue;

        const chapter = chapters[Math.floor(randomFunc() * chapters.length)];
        if (chapter.verses.length === 0) continue;

        const startIndex = Math.floor(randomFunc() * chapter.verses.length);
        const puzzle = [];
        let flippable = 0;

        for (let i = startIndex;
             i < chapter.verses.length && flippable < TARGET_WORDS && puzzle.length < MAX_VERSES;
             i++) {
            const built = await buildVerse(chapter.verses[i]);
            puzzle.push(built);
            flippable += built.tokens.filter(t => t.hasAntonym).length;
        }

        if (flippable >= TARGET_WORDS) {
            const first = puzzle[0].num;
            const last = puzzle[puzzle.length - 1].num;
            const range = (first === last) ? first : `${first}-${last}`;
            return {
                reference: `${chapter.name}:${range}`,
                puzzle: puzzle,
                flippable: flippable
            };
        }
    }
    return null;
}

// =====================================================
// SHOWING THE GAME
// =====================================================
async function startBoardGeneration() {
    readAndSaveSettings();
    showScreen("game");

    const message = document.getElementById("msg-label");
    const display = document.getElementById("verse-display");

    updateGameTitle();
    display.innerHTML = "";
    message.textContent = "Loading...";

    try {
        const result = await pickVerses();
        if (result === null) {
            message.textContent = "Couldn't find enough verses. Try another book.";
            return;
        }
        currentPuzzle = result.puzzle
        flipWords(currentPuzzle);
        console.log("Picked:", result.reference, "viable words:", result.flippable);
        message.textContent = "";
        renderVerses(result, currentPuzzle);
    } catch (error) {
        console.error(error);
        message.textContent = "Error loading verses. Press F12 and check the console.";
    }
}

function makeDropdown(token) {
    const select = document.createElement("select");
    select.className = "swap";

    token.choices.forEach(choice => {
        const option = document.createElement("option");
        option.value = choice;
        option.textContent = choice;
        select.appendChild(option);
    });

    select.value = token.selected;
    select.addEventListener("change", () => {
        token.selected = select.value;   // remember the player's pick
    });
    return select;
}

function renderVerses(result, puzzle) {
    const display = document.getElementById("verse-display");
    display.innerHTML = "";

    const paragraph = document.createElement("p");

    puzzle.forEach(verse => {
        const number = document.createElement("sup");
        number.className = "verse-num";
        number.textContent = verse.num;
        paragraph.appendChild(number);

        verse.tokens.forEach(token => {
    if (token.hasDropdown){
        paragraph.appendChild(makeDropdown(token));
    } else {
        const span = document.createElement("span");
        span.textContent = token.text;
        paragraph.appendChild(span);
    }
});

        paragraph.appendChild(document.createTextNode(" "));
    });
    display.appendChild(paragraph);

    if (SHOW_REFERENCE) {
        const ref = document.createElement("div");
        ref.className = "reference";
        ref.textContent = `${result.reference} (${translation})`;
        display.appendChild(ref);
    }
}


// =====================================================
// DAILY GAME (kept from the original; not wired up yet)
// =====================================================

function updateGameTitle() {
    let suffix = "";
    if (isDailyMode) {
        // Toggle square brackets if the script failed on a prior book
        suffix = hasFailedDailyBook ? `[Daily: ${bookChoice}]` : `(Daily: ${bookChoice})`;
    } else {
        suffix = `(${bookChoice})`;
    }
    const fullTitle = `Bizarro Bible ${suffix}`;

    document.title = fullTitle;

    const gameTitleEl = document.getElementById("game-title");
    if (gameTitleEl) {
        gameTitleEl.textContent = fullTitle.toUpperCase();
    }
}

// --- DETERMINISTIC RNG ---
function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
}

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function deterministicShuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(randomFunc() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function startDailyGame() {
    isDailyMode = true;
    hasFailedDailyBook = false;

    const now = new Date();
    const todayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const epochLocal = new Date(2024, 0, 1);

    dailyDayNumber = Math.floor((todayLocal.getTime() - epochLocal.getTime()) / (1000 * 60 * 60 * 24));

    startBoardGeneration();
}

// --- SHARE RESULTS LOGIC ---
function shareResults() {
    const todayString = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    let emojiText = `Daily Bizzare Bible - ${todayString} - ${bookChoice}\n\n`;

    guessHistoryColors.forEach(rowColors => {
        emojiText += rowColors.map(colorIndex => CATEGORY_EMOJIS[colorIndex]).join("") + "\n";
    });

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
        navigator.share({
            title: 'Bizzare Bible',
            text: emojiText
        }).catch((error) => {
            copyToClipboardFallback(emojiText);
        });
    } else {
        copyToClipboardFallback(emojiText);
    }
}

function copyToClipboardFallback(text) {
    navigator.clipboard.writeText(text).then(() => {
        const msgLabel = document.getElementById("msg-label");
        msgLabel.textContent = "Copied to clipboard!";
        msgLabel.className = "msg-text status-green";
    }).catch(err => {
        alert("Failed to copy results. You can manually select and copy:\n\n" + text);
    });
}

