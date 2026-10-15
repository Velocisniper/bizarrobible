// --- CONFIGURATION & CATALOGS ---
const AVAILABLE_TRANSLATIONS = ["AMP", "ASV", "CPDV", "ERV", "ESV", "KJV", "NASB", "WEB"];

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

const STOP_WORDS = new Set([
    "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren", 
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", 
    "can", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", 
    "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him", "himself", 
    "his", "how", "if", "in", "into", "is", "it", "its", "itself", "just", "me", "more", "most", 
    "my", "myself", "no", "nor", "not", "now", "of", "off", "on", "once", "only", "or", "other", "our", 
    "ours", "ourselves", "out", "over", "own", "s", "same", "she", "should", "so", "some", "such", "t", 
    "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", 
    "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "were", "what", 
    "when", "where", "which", "while", "who", "whom", "why", "will", "with", "you", "your", "yours", 
    "yourself", "yourselves", "shall", "unto", "thou", "thy", "thine", "ye", "also", "even", "let",
    "therefore", "upon", "whoever", "however", "whose", "lord", "god", "man", "king", "son", "israel", 
    "day", "people", "house", "hand", "word", "father", "name", "land", "earth", "city", "heaven", 
    "eye", "year", "brother", "heart", "spirit", "face", "blood", "voice", "water", "priest", "woman", 
    "law", "head", "sword", "month", "mountain", "way", "servant", "master", "peace", "truth", "world", 
    "time", "fire", "temple", "flesh", "mouth", "gold", "altar", "offering", "death", "gate", "field", 
    "sin", "soul", "tree", "wood", "morning", "night", "mother", "sister", "wife", "husband", "nation", 
    "tribe", "leader", "army", "stone", "sea", "wind", "cloud", "beast", "bird", "child", "daughter", 
    "prophet", "judge", "covenant", "sacrifice", "wine", "bread", "oil", "garment", "jesus", "say", 
    "speak", "do", "make", "go", "come", "see", "hear", "give", "take", "know", "call", "bring", 
    "let", "put", "find", "tell", "keep", "live", "die", "stand", "fall", "love", "hate", "save", 
    "destroy", "build", "send", "walk", "follow", "lead", "teach", "believe", "pray", "praise", 
    "worship", "bless", "curse", "rule", "judge", "fight", "kill", "eat", "drink", "sleep", "rose", 
    "sit", "look", "listen", "command", "remember", "forget", "forgive", "sin", "repent", "hope", 
    "trust", "fear", "wait", "show", "hide", "reveal", "cover", "open", "close", "turn", "return", 
    "leave", "remain", "depart", "good", "evil", "great", "small", "holy", "righteous", "wicked", 
    "clean", "unclean", "high", "low", "first", "last", "new", "old", "true", "false", "wise", 
    "foolish", "strong", "weak", "rich", "poor", "full", "empty", "living", "dead", "pure", 
    "defiled", "perfect", "broken", "beautiful", "light", "dark", "sweet", "bitter", "right", 
    "wrong", "just", "unjust", "faithful", "mighty", "humble", "proud", "glad", "sad", "angry", 
    "blind", "whole", "sick", "spoke", "said", "saying"
]);

const CATEGORY_COLORS = ["#f9df6d", "#a0c35a", "#b0c4ef", "#ba81c5"];
const CATEGORY_EMOJIS = ["🟨", "🟩", "🟦", "🟪"];

// --- GAME STATE variables ---
let translation = "ESV";
let bookChoice = "Entire Bible";
let zoomLevel = 1.0; // Increased base zoom by 0.1

let versePool = {};
let boardCategories = {};
let categoryColorMap = {};
let wordToColorIndex = {}; 
let allWords = [];
let selectedWords = [];
let solvedCategories = [];
let pastGuesses = new Set();
let lives = 7;
let isGameOver = false;

// --- DAILY STATE Variables ---
let randomFunc = Math.random; 
let isDailyMode = false;
let dailyDayNumber = 0;
let guessHistoryColors = []; 
let jsonCache = {}; 
let globalChapterWords = {};
let hasFailedDailyBook = false; // Tracks if we had to swap out of a seeded book

// --- INITIALIZATION ---
console.log("🔌 Script successfully loaded and connected to HTML!");

populateBookDropdown();
restoreSavedSettings();
setupEventListeners();

function restoreSavedSettings() {
    const savedTranslation = localStorage.getItem("bibleConn_translation");
    const savedBookChoice = localStorage.getItem("bibleConn_bookChoice");
    
    if (savedTranslation && document.getElementById("translation-select")) {
        document.getElementById("translation-select").value = savedTranslation;
    }
    if (savedBookChoice && document.getElementById("book-select")) {
        document.getElementById("book-select").value = savedBookChoice;
    }
}

function populateBookDropdown() {
    const bookSelect = document.getElementById("book-select");
    if (!bookSelect) return;
    
    bookSelect.innerHTML = ""; 

    const broadOptions = ["Entire Bible", "Old Testament", "New Testament"];
    broadOptions.forEach(optVal => {
        const opt = document.createElement("option");
        opt.value = optVal;
        opt.textContent = optVal;
        bookSelect.appendChild(opt);
    });

    BIBLE_BOOKS.forEach(book => {
        const opt = document.createElement("option");
        opt.value = book[0];
        opt.textContent = book[0];
        bookSelect.appendChild(opt);
    });
}

function setupEventListeners() {
    document.getElementById("generate-btn").addEventListener("click", () => {
        isDailyMode = false;
        hasFailedDailyBook = false;
        randomFunc = Math.random; 
        startBoardGeneration();
    });
    
    document.getElementById("how-to-play-btn").addEventListener("click", showHowToPlay);
    
    const howToPlayBtn = document.getElementById("how-to-play-btn");
    if (howToPlayBtn) {
        const dailyBtn = document.createElement("button");
        dailyBtn.id = "daily-game-btn";
        dailyBtn.className = "ctk-btn primary-btn";
        dailyBtn.textContent = "Play Daily Game";
        dailyBtn.style.marginTop = "10px";
        
        howToPlayBtn.insertAdjacentElement('afterend', dailyBtn);
        dailyBtn.addEventListener("click", startDailyGame);
    }

    document.getElementById("shuffle-btn").addEventListener("click", shuffleBoard);
    document.getElementById("deselect-btn").addEventListener("click", deselectAll);
    document.getElementById("submit-btn").addEventListener("click", submitGuess);
    document.getElementById("zoom-in-btn").addEventListener("click", () => adjustZoom(0.1));
    document.getElementById("zoom-out-btn").addEventListener("click", () => adjustZoom(-0.1));

    const mediaQuery = window.matchMedia("(max-width: 650px)");
    function handleScreenChange(e) {
        zoomLevel = e.matches ? 0.7 : 1.0; // Increased by 0.1 for both views
        document.documentElement.style.setProperty('--zoom', zoomLevel);
        if (allWords.length > 0 || solvedCategories.length > 0) {
            renderGrid();
            renderSolvedCategories();
        }
    }
    mediaQuery.addEventListener("change", handleScreenChange);
    handleScreenChange(mediaQuery);
}

function showHowToPlay() {
    alert(
        "HOW TO PLAY:\n\n" +
        "• Find groups of 4 words sharing a common Bible verse.\n" +
        "• Select 4 words and tap 'Submit' to guess.\n" +
        "• You have 7 lives to solve the entire board.\n" +
        "• Anchors represent a guaranteed word for each hidden verse.\n" +
        "• Box colors mark Bible position (Yellow = earliest, Purple = latest).\n" +
        "• Feel free to use a Bible, but don't use a search tool \n \n" +
        "- Created by Matthew Kearney"
    );
}

// --- CORE UTILITIES ---
function getWords(text) {
    const rawWords = text.toLowerCase().match(/[a-z]+(?:['\-][a-z]+)*/g) || [];
    const validWords = rawWords.filter(word => !STOP_WORDS.has(word) && word.length > 3);
    return new Set(validWords);
}

function adjustZoom(amount) {
    zoomLevel = Math.max(0.4, Math.min(2.0, round(zoomLevel + amount, 1)));
    document.documentElement.style.setProperty('--zoom', zoomLevel);
    renderGrid();
    renderSolvedCategories();
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function getVerseSortKey(ref) {
    try {
        let bookName = ref;
        let chapNum = 0, verseNum = 0;
        if (ref.includes(":")) {
            const parts = ref.split(":");
            const totalParts = parts.length;
            verseNum = parseInt(parts[totalParts - 1].replace(/\D/g, '')) || 0;
            
            const bookChapStr = parts.slice(0, totalParts - 1).join(":");
            const bookChap = bookChapStr.lastIndexOf(" ");
            bookName = bookChapStr.substring(0, bookChap).trim();
            chapNum = parseInt(bookChapStr.substring(bookChap).trim()) || 0;
        }
        const bookIdx = BIBLE_BOOKS.findIndex(b => b[0] === bookName);
        return [bookIdx !== -1 ? bookIdx : 999, chapNum, verseNum];
    } catch (e) {
        return [999, 0, 0];
    }
}

function sortReferencesChronologically(refs) {
    return refs.sort((a, b) => {
        const keyA = getVerseSortKey(a);
        const keyB = getVerseSortKey(b);
        if (keyA[0] !== keyB[0]) return keyA[0] - keyB[0];
        if (keyA[1] !== keyB[1]) return keyA[1] - keyB[1];
        return keyA[2] - keyB[2];
    });
}

function updateGameTitle() {
    let suffix = "";
    if (isDailyMode) {
        // Toggle square brackets if the script failed on a prior book
        suffix = hasFailedDailyBook ? `[Daily: ${bookChoice}]` : `(Daily: ${bookChoice})`;
    } else {
        suffix = `(${bookChoice})`;
    }
    const fullTitle = `Bible Connections ${suffix}`;
    
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

// --- BULK FETCHING SCOUTING ENGINE ---
async function fetchVersePool() {
    let selectedBookData = BIBLE_BOOKS.find(b => b[0] === bookChoice);
    const useComplexFiltering = (bookChoice !== "Entire Bible" && 
                                 bookChoice !== "Old Testament" && 
                                 bookChoice !== "New Testament" && 
                                 selectedBookData && selectedBookData[1] <= 4) ? false : true;

    let validBooks = [];
    if (bookChoice === "Entire Bible") validBooks = BIBLE_BOOKS;
    else if (bookChoice === "Old Testament") validBooks = BIBLE_BOOKS.filter(b => b[2] === "OT");
    else if (bookChoice === "New Testament") validBooks = BIBLE_BOOKS.filter(b => b[2] === "NT");
    else validBooks = BIBLE_BOOKS.filter(b => b[0] === bookChoice);

    let basePool = [];
    globalChapterWords = {}; 

    for (let book of validBooks) {
        const [bName, maxChapters, testament, abbrev] = book;
        const filePath = `Bible_Data/${testament}/${abbrev}/${translation}.json`;
        
        try {
            let data;
            if (jsonCache[filePath]) {
                data = jsonCache[filePath];
            } else {
                const response = await fetch(filePath);
                if (!response.ok) continue;
                data = await response.json();
                jsonCache[filePath] = data;
            }

            const chapters = data.text || [];
            chapters.forEach(chapter => {
                let rawName = String(chapter.name || "");
                let chapNum = rawName.split(' ').pop().replace(/\D/g, '') || "1";
                const verses = chapter.text || [];
                
                verses.forEach(verse => {
                    let verseNum = String(verse.ID || "?");
                    let key = `${bName} ${chapNum}:${verseNum}`;
                    let text = (verse.text || "")
                        .replace(/—/g, ' ').replace(/–/g, ' ')
                        .replace(/<[^>]+>/g, '')
                        .replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

                    let chapterId = `${bName} ${chapNum}`;

                    if (isDailyMode) {
                        if (!globalChapterWords[chapterId]) {
                            globalChapterWords[chapterId] = new Set();
                        }
                        getWords(text).forEach(w => globalChapterWords[chapterId].add(w));
                    }

                    basePool.push({
                        key: key,
                        text: text,
                        chapterIdentifier: chapterId
                    });
                });
            });
        } catch (e) {}
    }

    if (basePool.length === 0) return {};

    basePool = deterministicShuffle(basePool);

    if (!useComplexFiltering) {
        let finalVersesPool = {};
        const finalSelection = basePool.slice(0, 25);
        finalSelection.forEach(v => {
            finalVersesPool[v.key] = v.text;
        });
        return finalVersesPool;
    }

    const scoutPoolSize = Math.min(50, basePool.length);
    let potentialVersesList = basePool.slice(0, scoutPoolSize);

    const wordChapterMap = {};
    potentialVersesList.forEach(v => {
        const words = getWords(v.text);
        words.forEach(word => {
            if (!wordChapterMap[word]) wordChapterMap[word] = new Set();
            wordChapterMap[word].add(v.chapterIdentifier);
        });
    });

    potentialVersesList = potentialVersesList.map(v => {
        const words = getWords(v.text);
        let score = 0;
        let maxLength = 0;
        
        words.forEach(w => {
            if (wordChapterMap[w] && wordChapterMap[w].size === 1) score++;
            if (w.length > maxLength) maxLength = w.length;
        });
        
        return { ...v, score, maxLength };
    });

    potentialVersesList.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.maxLength - a.maxLength;
    });

    let finalSelection = potentialVersesList.slice(0, 25);
    let finalVersesPool = {};
    finalSelection.forEach(v => {
        finalVersesPool[v.key] = v.text;
    });

    return finalVersesPool;
}

function getCombinations(array, k) {
    let result = [];
    function helper(start, combo) {
        if (combo.length === k) {
            result.push([...combo]);
            return;
        }
        for (let i = start; i < array.length; i++) {
            combo.push(array[i]);
            helper(i + 1, combo);
            combo.pop();
        }
    }
    helper(0, []);
    return result;
}

function startDailyGame() {
    isDailyMode = true;
    hasFailedDailyBook = false;
    translation = document.getElementById("translation-select") ? document.getElementById("translation-select").value : "ESV";
    
    const now = new Date();
    const todayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const epochLocal = new Date(2024, 0, 1);
    
    dailyDayNumber = Math.floor((todayLocal.getTime() - epochLocal.getTime()) / (1000 * 60 * 60 * 24));
    
    startBoardGeneration();
}

async function startBoardGeneration() {
    if (!isDailyMode) {
        translation = document.getElementById("translation-select").value;
        bookChoice = document.getElementById("book-select").value;
        randomFunc = Math.random; 
    }

    localStorage.setItem("bibleConn_translation", translation);
    localStorage.setItem("bibleConn_bookChoice", bookChoice);

    const setupScreen = document.getElementById("setup-screen");
    setupScreen.innerHTML = `<h1>Searching the Scriptures...</h1><p style='color: var(--text-muted); font-size:18px;'>Generating your board...</p>`;

    let success = false;
    let cycleIndex = 0;
    
    // In Daily mode, it will try up to 10 different books (cycles) before giving up entirely.
    const MAX_CYCLES = isDailyMode ? 10 : 1; 

    while (cycleIndex < MAX_CYCLES && !success) {
        
        // If we loop back up here and cycleIndex > 0, it means the previous book failed
        if (cycleIndex > 0) {
            hasFailedDailyBook = true;
        }
        
        if (isDailyMode) {
            // Seed generation to lock in ONE book for this specific cycle
            let seedStr = `Daily-${dailyDayNumber}-BookCycle-${cycleIndex}`;
            let seed = cyrb128(seedStr)[0];
            randomFunc = mulberry32(seed);

            const r = randomFunc();
            if (r < 0.05) { bookChoice = "Entire Bible"; }
            else if (r < 0.10) { bookChoice = "Old Testament"; }
            else if (r < 0.15) { bookChoice = "New Testament"; }
            else {
                const randomBook = BIBLE_BOOKS[Math.floor(randomFunc() * BIBLE_BOOKS.length)];
                bookChoice = randomBook[0];
            }
        }
        
        updateGameTitle();

        // Try 20 attempts on the current book
        const MAX_ATTEMPTS = 20; 
        for (let localAttempt = 0; localAttempt < MAX_ATTEMPTS; localAttempt++) {
            
            if (isDailyMode) {
                // Ensure a unique determinable seed per attempt so we fetch a different batch of 25 verses
                let localSeedStr = `Daily-${dailyDayNumber}-BookCycle-${cycleIndex}-Local-${localAttempt}`;
                let localSeed = cyrb128(localSeedStr)[0];
                randomFunc = mulberry32(localSeed);
            }

            versePool = await fetchVersePool(); 
            let poolKeys = Object.keys(versePool);
            
            if (poolKeys.length < 4) {
                if (isDailyMode) break; // If book is fundamentally too small, skip straight to the next book cycle
                else continue; 
            }

            poolKeys = deterministicShuffle(poolKeys);

            let verseWords = {};
            poolKeys.forEach(k => { verseWords[k] = getWords(versePool[k]); });

            const combos = getCombinations(poolKeys, 4);

            let selectedBookData = BIBLE_BOOKS.find(b => b[0] === bookChoice);
            let useComplexFiltering = (bookChoice !== "Entire Bible" && 
                                       bookChoice !== "Old Testament" && 
                                       bookChoice !== "New Testament" && 
                                       selectedBookData && selectedBookData[1] <= 4) ? false : true;

            // In Daily Mode, all 20 attempts use the strict filter.
            let isStrictFilter = isDailyMode;

            for (let combo of combos) {
                let tempBoard = {};
                let validBoard = true;
                let puzzleChapters = [];

                for (let k of combo) {
                    puzzleChapters.push(k.substring(0, k.lastIndexOf(":")));
                }

                if (useComplexFiltering) {
                    let uniqueChapters = new Set(puzzleChapters);
                    if (uniqueChapters.size < 4) continue;
                }

                for (let i = 0; i < combo.length; i++) {
                    let k = combo[i];
                    let chapterId = puzzleChapters[i];
                    let otherWords = new Set();
                    
                    if (isStrictFilter) {
                        for (let j = 0; j < puzzleChapters.length; j++) {
                            if (i !== j) {
                                let otherChap = puzzleChapters[j];
                                if (globalChapterWords[otherChap]) {
                                    globalChapterWords[otherChap].forEach(w => otherWords.add(w));
                                }
                            }
                        }
                    } else {
                        // Standard validation for non-daily mode
                        for (let j = 0; j < combo.length; j++) {
                            if (i !== j) {
                                verseWords[combo[j]].forEach(w => otherWords.add(w));
                            }
                        }
                    }

                    let uniqueToK = [...verseWords[k]].filter(w => !otherWords.has(w));
                    
                    if (uniqueToK.length < 4) {
                        validBoard = false;
                        break;
                    }
                    
                    uniqueToK.sort((a, b) => b.length - a.length);
                    tempBoard[k] = uniqueToK.slice(0, 4);
                }

                if (validBoard) {
                    boardCategories = tempBoard;
                    success = true;
                    break;
                }
            }
            
            if (success) {
                break; // Break the local attempts loop
            }
        }
        
        cycleIndex++;
    }
    
    if (success) {
        allWords = [];
        Object.values(boardCategories).forEach(words => allWords.push(...words));
        allWords = deterministicShuffle(allWords);

        const sortedRefs = sortReferencesChronologically(Object.keys(boardCategories));
        categoryColorMap = {};
        wordToColorIndex = {}; 
        
        sortedRefs.forEach((ref, idx) => {
            const colorIndex = idx % CATEGORY_COLORS.length;
            categoryColorMap[ref] = CATEGORY_COLORS[colorIndex];
            boardCategories[ref].forEach(w => wordToColorIndex[w] = colorIndex);
        });

        lives = 7;
        solvedCategories = [];
        selectedWords = [];
        guessHistoryColors = [];
        pastGuesses.clear();
        isGameOver = false;

        document.getElementById("setup-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "flex";

        const anchors = sortedRefs.map(ref => boardCategories[ref][0].toUpperCase());
        document.getElementById("anchors-hint").textContent = `Anchors: ${anchors.join(", ")}`;
        
        document.getElementById("msg-label").textContent = "";
        document.getElementById("lives-label").textContent = `Lives: ${"❤️ ".repeat(lives)}`;
        
        renderGrid();
        renderSolvedCategories();
    } else {
        alert("Could not generate a valid board. Please check your network connection or choose a larger book!");
        location.reload(); 
    }
}

// --- INTERACTIVE LAYOUT RENDERING ---
function renderGrid() {
    const gridFrame = document.getElementById("grid-frame");
    gridFrame.innerHTML = "";

    if (isGameOver) return; 

    allWords.forEach(word => {
        const btn = document.createElement("button");
        btn.className = "grid-btn";
        if (selectedWords.includes(word)) btn.classList.add("selected");
        
        let textToDisplay = word.toUpperCase(); 
        if (textToDisplay.length > 8) {
            textToDisplay = textToDisplay.slice(0, 5) + '\u00AD' + textToDisplay.slice(5);
        }
        btn.textContent = textToDisplay;
        btn.addEventListener("click", () => toggleWord(word));
        gridFrame.appendChild(btn);
    });
}

function toggleWord(word) {
    if (isGameOver) return;
    if (selectedWords.includes(word)) {
        selectedWords = selectedWords.filter(w => w !== word);
    } else {
        if (selectedWords.length < 4) selectedWords.push(word);
    }

    document.getElementById("deselect-btn").disabled = selectedWords.length === 0;
    document.getElementById("submit-btn").disabled = selectedWords.length !== 4;
    document.getElementById("msg-label").textContent = "";
    renderGrid();
}

function deselectAll() {
    selectedWords = [];
    document.getElementById("deselect-btn").disabled = true;
    document.getElementById("submit-btn").disabled = true;
    renderGrid();
}

function shuffleBoard() {
    if (isGameOver) return;
    allWords = deterministicShuffle(allWords);
    renderGrid();
}

// --- CORE GUESS LOGIC MECHANICS ---
function submitGuess() {
    if (selectedWords.length !== 4 || isGameOver) return;

    const currentGuessSet = new Set(selectedWords);
    const guessFrozen = [...currentGuessSet].sort().join(",");
    const msgLabel = document.getElementById("msg-label");

    if (pastGuesses.has(guessFrozen)) {
        msgLabel.textContent = "Already guessed!";
        msgLabel.className = "msg-text status-orange";
        deselectAll();
        return;
    }
    pastGuesses.add(guessFrozen);

    const guessColors = selectedWords.map(w => wordToColorIndex[w]);
    guessHistoryColors.push(guessColors);

    let matchFound = false;

    for (let [ref, words] of Object.entries(boardCategories)) {
        const categorySet = new Set(words);
        const intersection = [...currentGuessSet].filter(w => categorySet.has(w));

        if (intersection.length === 4) {
            matchFound = true;
            solvedCategories.push(ref);
            
            allWords = allWords.filter(w => !currentGuessSet.has(w));
            selectedWords = [];

            msgLabel.textContent = "Correct!";
            msgLabel.className = "msg-text status-green";

            renderSolvedCategories();
            renderGrid();

            if (allWords.length === 0) endGame(true);
            break;
        }
    }

    if (!matchFound) {
        let oneAwayHint = null;

        for (let [ref, words] of Object.entries(boardCategories)) {
            const categorySet = new Set(words);
            const intersection = [...currentGuessSet].filter(w => categorySet.has(w));
            
            if (intersection.length === 3) {
                if (["Entire Bible", "Old Testament", "New Testament"].includes(bookChoice)) {
                    oneAwayHint = ref.substring(0, ref.lastIndexOf(" ")).trim();
                } else {
                    oneAwayHint = "Chapter " + ref.split(":")[0].split(" ").pop();
                }
                break;
            }
        }

        lives--;
        document.getElementById("lives-label").textContent = `Lives: ${"❤️ ".repeat(lives)}`;

        if (oneAwayHint) {
            msgLabel.textContent = `One Away! (Hint: 3 are from ${oneAwayHint})`;
            msgLabel.className = "msg-text status-orange";
        } else {
            msgLabel.textContent = "Incorrect.";
            msgLabel.className = "msg-text status-red";
        }

        if (lives <= 0) endGame(false);
    }

    document.getElementById("deselect-btn").disabled = true;
    document.getElementById("submit-btn").disabled = true;
}

// --- RENDER SOLVED CATEGORIES WITH RICH HIGHLIGHTING ---
function renderSolvedCategories() {
    const solvedFrame = document.getElementById("solved-frame");
    solvedFrame.innerHTML = "";

    solvedCategories.forEach(ref => {
        const color = categoryColorMap[ref] || CATEGORY_COLORS[0];
        const words = boardCategories[ref];
        let originalText = versePool[ref];

        words.forEach(w => {
            const regex = new RegExp(`\\b${w}\\b`, 'gi');
            originalText = originalText.replace(regex, match => `<strong>${match}</strong>`);
        });

        const solvedBox = document.createElement("div");
        solvedBox.className = "solved-box";
        solvedBox.style.backgroundColor = color;

        const textContent = document.createElement("div");
        textContent.className = "solved-text-content";
        textContent.innerHTML = `<span style="font-weight:bold; font-size:calc(16px * var(--zoom));">${ref}</span><br>${originalText}`;
        
        solvedBox.appendChild(textContent);
        solvedFrame.appendChild(solvedBox);
    });
}

function endGame(win) {
    isGameOver = true;
    const msgLabel = document.getElementById("msg-label");

    if (win) {
        msgLabel.textContent = "Nice job! You solved the board!";
        msgLabel.className = "msg-text status-green";
    } else {
        msgLabel.textContent = "Game Over. Better luck next time!";
        msgLabel.className = "msg-text status-red";
        
        const sortedRefs = sortReferencesChronologically(Object.keys(boardCategories));
        sortedRefs.forEach(ref => {
            if (!solvedCategories.includes(ref)) solvedCategories.push(ref);
        });
        
        renderSolvedCategories();
    }

    allWords = [];
    renderGrid();

    const ctrlFrame = document.querySelector(".ctrl-frame");
    if (ctrlFrame) {
        ctrlFrame.innerHTML = `<button id="play-again-btn" class="ctk-btn primary-btn" style="width:200px;">Play Again</button>`;
        
        if (isDailyMode) {
            const shareBtn = document.createElement("button");
            shareBtn.id = "share-btn";
            shareBtn.className = "ctk-btn primary-btn"; 
            shareBtn.style.width = "200px";
            shareBtn.style.marginLeft = "10px";
            shareBtn.textContent = "Share Results";
            shareBtn.addEventListener("click", shareResults);
            ctrlFrame.appendChild(shareBtn);
        }

        document.getElementById("play-again-btn").addEventListener("click", () => {
            location.reload();
        });
    }
}

// --- SHARE RESULTS LOGIC ---
function shareResults() {
    const todayString = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric' 
    });

    let emojiText = `Daily Bible Connections - ${todayString} - ${bookChoice}\n\n`;
    
    guessHistoryColors.forEach(rowColors => {
        emojiText += rowColors.map(colorIndex => CATEGORY_EMOJIS[colorIndex]).join("") + "\n";
    });

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
        navigator.share({
            title: 'Bible Connections',
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
