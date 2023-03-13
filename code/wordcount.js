export default class WordCounter {
  constructor() {}

  findText(text, term) {
    let pattern = new RegExp(term, "gi");
    return text.replace(pattern, (matchedText) => {
      return `<mark>${matchedText}</mark>`;
    });
  }

  replaceText(text, findTerm, replaceTerm) {
    let pattern = new RegExp(findTerm, "gi");
    return text.replace(pattern, replaceTerm);
  }

  removeExtraSpaces(text) {
    return text.replace(/\s+/g, " ");
  }

  numberOfCharsWithSpace(text) {
    return text.length;
  }

  numberOfNoSpace(text) {
    let wordsPattern = /\S/g;
    const result = text.match(wordsPattern);
    return result ? result.length : 0;
  }

  numberOfWords(text) {
    let wordsPattern = /\b\S+\b/g;
    const result = text.match(wordsPattern);
    return result ? result.length : 0;
  }

  numberOfSentences(text) {
    let wordsPattern = /\./g;
    const result = text.match(wordsPattern);
    return result ? result.length : 0;
  }

  countWords(text) {
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
  }
}
