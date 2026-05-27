// Nonsense word generator using English-like phoneme rules

const ONSETS = [
  'bl',
  'br',
  'cl',
  'cr',
  'dr',
  'fl',
  'fr',
  'gl',
  'gr',
  'pl',
  'pr',
  'sc',
  'sk',
  'sl',
  'sm',
  'sn',
  'sp',
  'st',
  'str',
  'sw',
  'tr',
  'th',
  'wh',
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'p',
  'r',
  's',
  't',
  'v',
  'w',
  'z',
  'sh',
  'ch',
  'ph',
];

const VOWELS = [
  'a',
  'e',
  'i',
  'o',
  'u',
  'ai',
  'ea',
  'oo',
  'ou',
  'ae',
];

const CODAS = [
  'nd',
  'nt',
  'rd',
  'st',
  'nk',
  'ble',
  'tle',
  'ze',
  'le',
  'nel',
  'vel',
  'n',
  'm',
  't',
  'k',
  's',
  'r',
  'l',
  'ng',
  'sh',
  'th',
];

// Simple seeded-ish LCG for reproducible-per-session words
let seed = Date.now() & 0xffffffff;
function rand(max) {
  seed = (seed * 1664525 + 1013904223) & 0xffffffff;
  return Math.abs(seed) % max;
}

function randomFrom(arr) {
  return arr[rand(arr.length)];
}

function makeSyllable(isFirst) {
  const useOnset = isFirst ? true : rand(2) === 0;
  const useCoda = rand(3) !== 0; // ~67% chance of coda
  let syllable = '';
  if (useOnset) syllable += randomFrom(ONSETS);
  syllable += randomFrom(VOWELS);
  if (useCoda) syllable += randomFrom(CODAS);
  return syllable;
}

function makeWord(syllableCount) {
  let word = '';
  for (let i = 0; i < syllableCount; i++) {
    word += makeSyllable(i === 0);
  }
  return word;
}

// Cache generated words for reuse so they feel consistent
const wordCache = [];
const CACHE_SIZE = 200;

function seedCache() {
  for (let i = 0; i < CACHE_SIZE; i++) {
    const syllables = 1 + rand(3); // 1-3 syllables
    wordCache.push(makeWord(syllables));
  }
}
seedCache();

function getNonsenseWord() {
  return wordCache[rand(wordCache.length)];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function withSuffix(word, suffix) {
  // Avoid double consonant issues simply
  return word + suffix;
}

function nounPlural(word) {
  return word.endsWith('s') ? word + 'es' : word + 's';
}

function verbPast(word) {
  if (word.endsWith('e')) return word + 'd';
  return word + 'ed';
}

function verb3p(word) {
  return word.endsWith('s') ? word + 'es' : word + 's';
}

function verbIng(word) {
  return word + 'ing';
}

const ADJECTIVES = [
  'ancient',
  'small',
  'bright',
  'dark',
  'swift',
  'quiet',
  'bold',
  'strange',
  'hollow',
  'silver',
  'distant',
  'faint',
  'luminous',
  'pale',
  'vast',
  'crimson',
  'twisted',
  'narrow',
  'deep',
  'cold',
  'golden',
  'brittle',
  'jagged',
  'smooth',
  'withered',
  'mossy',
  'amber',
  'clouded',
  'shimmering',
  'murky',
  'dense',
  'fragile',
  'towering',
  'sunken',
  'glowing',
  'tangled',
  'frozen',
  'fleeting',
  'heavy',
  'ashen',
  'scattered',
  'wandering',
  'forgotten',
  'crumbling',
  'vivid',
  'solemn',
  'weary',
  'relentless',
  'barren',
  'sullen',
  'glittering',
  'frail',
  'colossal',
  'translucent',
  'restless',
  'haunted',
  'serene',
  'rugged',
  'timeless',
  'trembling',
  'winding',
  'desolate',
  'radiant',
  'veiled',
  'sunlit',
  'grim',
  'hushed',
  'thunderous',
  'misty',
  'jagged',
  'splintered',
  'bleached',
  'tarnished',
  'drifting',
  'smoldering',
  'tattered',
  'overgrown',
  'sunken',
  'charred',
  'weathered',
  'skeletal',
  'knotted',
  'swollen',
  'parched',
  'gilded',
  'ebony',
  'ivory',
  'obsidian',
  'azure',
  'scarlet',
  'violet',
  'emerald',
  'copper',
  'iron',
  'marble',
  'granite',
  'velvet',
  'crooked',
  'looming',
  'flickering',
  'rippling',
  'churning',
  'dwindling',
  'surging',
  'drifting',
  'cascading',
  'lurking',
  'sprawling',
  'smoldering',
  'echoing',
  'billowing',
  'creeping',
  'seething',
  'towering',
  'plummeting',
  'trembling',
  'brooding',
  'piercing',
  'gnawing',
  'fading',
  'brazen',
  'stoic',
  'muted',
  'stark',
  'bleak',
  'languid',
  'turbulent',
  'volatile',
];

const ADVERBS = [
  'slowly',
  'swiftly',
  'quietly',
  'deeply',
  'boldly',
  'strangely',
  'silently',
  'brightly',
  'gently',
  'fiercely',
  'endlessly',
  'barely',
  'sharply',
  'dimly',
  'gravely',
  'softly',
  'steadily',
  'suddenly',
  'faintly',
  'restlessly',
  'calmly',
  'wildly',
  'distantly',
  'heavily',
  'narrowly',
  'vividly',
  'mournfully',
  'aimlessly',
  'ceaselessly',
  'urgently',
  'solemnly',
  'listlessly',
  'keenly',
  'numbly',
  'tenderly',
  'warily',
  'relentlessly',
  'absently',
  'furiously',
  'merrily',
  'pensively',
  'tirelessly',
  'hazily',
  'defiantly',
  'effortlessly',
  'grimly',
  'breathlessly',
  'carelessly',
  'recklessly',
  'mindlessly',
  'tirelessly',
  'dutifully',
  'hungrily',
  'longingly',
  'hopelessly',
  'haplessly',
  'doggedly',
  'eagerly',
  'anxiously',
  'serenely',
  'methodically',
  'instinctively',
  'blindly',
  'knowingly',
  'tersely',
  'coldly',
  'warmly',
  'coolly',
  'bluntly',
  'harshly',
  'delicately',
  'precisely',
  'loosely',
  'roughly',
  'barely',
  'wholly',
  'partly',
  'nearly',
  'forever',
  'briefly',
  'swiftly',
  'once',
  'twice',
  'always',
  'never',
  'seldom',
];

const PREPOSITIONS = [
  'through',
  'beneath',
  'within',
  'across',
  'beyond',
  'amid',
  'upon',
  'beside',
  'below',
  'above',
  'along',
  'between',
  'underneath',
  'throughout',
  'against',
  'around',
  'behind',
  'before',
  'inside',
  'outside',
  'past',
  'toward',
  'near',
  'atop',
  'into',
  'over',
  'under',
  'without',
  'among',
  'down',
  'up',
  'off',
  'alongside',
  'opposite',
  'despite',
  'concerning',
  'regarding',
  'following',
  'surrounding',
  'encircling',
  'bordering',
  'overlapping',
  'intersecting',
  'away from',
  'close to',
  'far from',
  'in front of',
  'in place of',
];

const DETERMINERS = [
  'the',
  'a',
  'each',
  'every',
  'another',
  'some',
  'that',
  'this',
  'one',
  'any',
  'no',
  'its',
  'their',
  'her',
  'his',
  'our',
  'your',
  'both',
  'all',
  'few',
  'many',
  'much',
  'more',
  'most',
  'other',
  'either',
  'neither',
  'certain',
  'several',
  'such',
  'whatever',
  'whichever',
];

function randomAdj() {
  return ADJECTIVES[rand(ADJECTIVES.length)];
}
function randomAdv() {
  return ADVERBS[rand(ADVERBS.length)];
}
function randomPrep() {
  return PREPOSITIONS[rand(PREPOSITIONS.length)];
}
function randomDet() {
  return DETERMINERS[rand(DETERMINERS.length)];
}

// 6 sentence templates
function makeSentence() {
  const template = rand(6);
  const w = () => getNonsenseWord();

  let sentence;
  switch (template) {
    case 0:
      // "The [adj] [noun] [verb-past] [prep] the [adj] [noun]."
      sentence = `The ${randomAdj()} ${w()} ${verbPast(w())} ${randomPrep()} the ${randomAdj()} ${w()}.`;
      break;
    case 1:
      // "A [noun] has [verb-past] [adv] through [det] [noun]."
      sentence = `A ${w()} has ${verbPast(w())} ${randomAdv()} through ${randomDet()} ${w()}.`;
      break;
    case 2:
      // "[noun-plural] [verb-3p] [prep] the [adj] [noun]."
      sentence = `${capitalize(nounPlural(w()))} ${verb3p(w())} ${randomPrep()} the ${randomAdj()} ${w()}.`;
      break;
    case 3:
      // "The [adj] [noun] and the [noun] [verb-past] [adv]."
      sentence = `The ${randomAdj()} ${w()} and the ${w()} ${verbPast(w())} ${randomAdv()}.`;
      break;
    case 4:
      // "Beneath the [noun], a [adj] [noun] [verb-3p] [adv]."
      sentence = `Beneath the ${w()}, a ${randomAdj()} ${w()} ${verb3p(w())} ${randomAdv()}.`;
      break;
    case 5:
      // "[adj] [noun-plural] [verb-past] [prep] [det] [adj] [noun] [adv]."
      sentence = `${capitalize(randomAdj())} ${nounPlural(w())} ${verbPast(w())} ${randomPrep()} ${randomDet()} ${randomAdj()} ${w()} ${randomAdv()}.`;
      break;
  }
  return sentence;
}

export function getNonsenseWords(n) {
  n = Math.max(1, Math.min(n, 1000));
  const words = [];
  for (let i = 0; i < n; i++) {
    words.push(getNonsenseWord());
  }
  return words.join(' ');
}

export function getNonsenseSentences(n) {
  n = Math.max(1, Math.min(n, 500));
  const sentences = [];
  for (let i = 0; i < n; i++) {
    sentences.push(makeSentence());
  }
  return sentences.join(' ');
}

export function getNonsenseParagraphs(n) {
  n = Math.max(1, Math.min(n, 100));
  const paragraphs = [];
  for (let p = 0; p < n; p++) {
    const count = 3 + rand(4); // 3-6 sentences
    const sentences = [];
    for (let i = 0; i < count; i++) {
      sentences.push(makeSentence());
    }
    paragraphs.push(sentences.join(' '));
  }
  return paragraphs.join('\n\n');
}
