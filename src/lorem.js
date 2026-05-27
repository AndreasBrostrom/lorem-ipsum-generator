// Full Lorem Ipsum corpus - 25+ distinct sentences
const SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  'Ut labore et dolore magnam aliquam quaerat voluptatem.',
  'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.',
  'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
  'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint.',
  'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.',
  'Curabitur pretium tincidunt lacus nulla mauris vestibulum commodo ut facilisis tellus.',
  'Vivamus adipiscing fermentum quam varius pellentesque feugiat nisi faucibus ornare.',
  'Donec commodo posuere pede mauris cursus lacus sem eu velit iaculis nisl.',
  'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  'Proin accumsan faucibus magna sed aliquam tortor lobortis id venenatis risus.',
  'Maecenas dignissim quam tempor posuere vulputate nisl praesent vehicula risus erat.',
  'Nullam a nisl sit amet ante fringilla dapibus nec vel lectus.',
  'Fusce ultrices fringilla metus a finibus ornare blandit nibh commodo velit.',
  'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
  'Quisque facilisis erat a dui nam malesuada ornare dolor eget erat amet.',
  'Integer in mauris eu nibh euismod gravida duis lectus orci porttitor.',
  'Phasellus ultricies nulla ut lorem semper sagittis posuere ornare leo.',
  'Aenean commodo ligula eget dolor aenean massa cum sociis natoque penatibus.',
  'Donec quam felis ultricies nec pellentesque eu pretium quis sem nulla consequat.',
  'Morbi leo risus porta acc consequat vitae vestibulum libero nisl id varius.',
];

const WORDS = SENTENCES.join(' ').replace(/[.,]/g, '').split(/\s+/);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getWords(n) {
  n = Math.max(1, Math.min(n, 1000));
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(WORDS[randomInt(0, WORDS.length - 1)]);
  }
  return result.join(' ');
}

export function getSentences(n, classic = true) {
  n = Math.max(1, Math.min(n, 500));
  const result = [];
  if (classic) {
    result.push(SENTENCES[0]);
    for (let i = 1; i < n; i++) {
      result.push(SENTENCES[randomInt(1, SENTENCES.length - 1)]);
    }
  } else {
    for (let i = 0; i < n; i++) {
      result.push(SENTENCES[randomInt(0, SENTENCES.length - 1)]);
    }
  }
  return result.join(' ');
}

export function getParagraphs(n, classic = true) {
  n = Math.max(1, Math.min(n, 100));
  const paragraphs = [];
  for (let p = 0; p < n; p++) {
    const sentenceCount = randomInt(3, 6);
    const sentences = [];
    if (p === 0 && classic) {
      sentences.push(SENTENCES[0]);
      for (let i = 1; i < sentenceCount; i++) {
        sentences.push(SENTENCES[randomInt(1, SENTENCES.length - 1)]);
      }
    } else {
      for (let i = 0; i < sentenceCount; i++) {
        sentences.push(SENTENCES[randomInt(0, SENTENCES.length - 1)]);
      }
    }
    paragraphs.push(sentences.join(' '));
  }
  return paragraphs.join('\n\n');
}
