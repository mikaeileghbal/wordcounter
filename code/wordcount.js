export default function WordCounter() {}

WordCounter.prototype.findText = function (text, term) {
  let pattern = new RegExp(term, "gi");
  return text.replace(pattern, (matchedText) => {
    return `<mark>${matchedText}</mark>`;
  });
};

WordCounter.prototype.replaceText = function replaceText(
  text,
  findTerm,
  replaceTerm
) {
  let pattern = new RegExp(findTerm, "gi");
  return text.replace(pattern, replaceTerm);
};

WordCounter.prototype.removeExtraSpaces = function (text) {
  return text.replace(/\s+/g, " ");
};

WordCounter.prototype.numberOfCharsWithSpace = function (text) {
  return text.length;
};

WordCounter.prototype.numberOfNoSpace = function (text) {
  let wordsPattern = /\S/g;
  const result = text.match(wordsPattern);
  return result ? result.length : 0;
};

WordCounter.prototype.numberOfWords = function (text) {
  let wordsPattern = /\b\S+\b/g;
  const result = text.match(wordsPattern);
  return result ? result.length : 0;
};

WordCounter.prototype.numberOfSentences = function (text) {
  let wordsPattern = /\./g;
  const result = text.match(wordsPattern);
  return result ? result.length : 0;
};

WordCounter.prototype.countWords = function (text) {
  let wordsPattern = /\b\S+\b/g;

  let wordCount = 0;
  let wordDictionary = {};
  for (let word of text.matchAll(wordsPattern)) {
    wordCount++;

    if (wordDictionary[word]) {
      wordDictionary[word]++;
    } else {
      wordDictionary[word] = 1;
    }
  }
  return [wordCount, wordDictionary];
};
