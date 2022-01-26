// Find term in text
function findText(inputText, term) {
  let pattern = new RegExp(term, "gi");
  return inputText.replace(pattern, (matchedText) => {
    return `<mark>${matchedText}</mark>`;
  });
}

function findTextCount() {
  const marked = document.querySelectorAll("mark");
  return marked.length;
}

// Replcae term in text
function replaceText(inputText, findTerm, replaceTerm) {
  let pattern = new RegExp(findTerm, "gi");
  return inputText.replace(pattern, replaceTerm);
}

// Remove extra spaces
function removeExtraSpaces(inputText) {
  return inputText.replace(/\s+/g, " ");
}
git;

// Number of characters
function numberOfCharsWithSpace(inputText) {
  return inputText.length;
}

// count only words
function numberOfWords(input) {
  let wordsPattern = /\b\S+\b/g;
  const result = input.match(wordsPattern);
  return result ? result.length : 0;
}

// number of sentences
function numberOfSentences(input) {
  let wordsPattern = /\./g;
  const result = input.match(wordsPattern);
  return result ? result.length : 0;
}

// Count words in text array
function countWords(inputText) {
  let wordsPattern = /\b\S+\b/g;

  let wordCount = 0;
  let wordDictionary = {};
  for (let word of inputText.matchAll(wordsPattern)) {
    wordCount++;

    if (wordDictionary[word]) {
      wordDictionary[word]++;
    } else {
      wordDictionary[word] = 1;
    }
  }
  return [wordCount, wordDictionary];
}

function getCommonWords() {
  return ["a", "the", "is", "in", "of", "to", "and"];
}

function sortObject(obj) {
  let arrResult = Object.entries(obj);
  arrResult.sort(function (first, second) {
    return second[1] - first[1];
  });

  return arrResult;
}

function getStatistics(input) {
  let [wordCount, wordDictionary] = countWords(input);

  let sortedWord = sortObject(wordDictionary);

  let commonWords = getCommonWords();

  //filter array
  return sortedWord.filter(function (item) {
    return !commonWords.includes(item[0], 0);
  });
}

// Test program
console.log(findText("hello welcome hello again", "hel"));
console.log(replaceText("hello welcome hello again", "hel", "wel"));
console.log(removeExtraSpaces("There    are a   lot    of spaces."));
console.log(numberOfCharsWithSpace("This  is a text"));
const textOfBook =
  "This is a text is text in text is from my favorite text my book. book my of notes";

// using split() with ReegExp
// console.log("1, 2, 3,\n4, 5".split(","));
// console.log("1, 2, 3,\n4, 5".split(/\s*,\s*/));

//--------------------------------------------------------------------
//RegExp constructor  - be careful with \ escape

// let patt27 = new RegExp("\\d{5}", "gi");

// console.log(findTextCount());

// Refrence DOM elements
//======================

const inputText = document.querySelector("#inputText");
const word = document.querySelector("#word");
const character = document.querySelector("#character");
const sentence = document.querySelector("#sentence");
const staticMax = document.querySelector("#static-max");
const staticMin = document.querySelector("#static-min");
const characterNoSpace = document.querySelector("#characterNoSpace");

inputText.addEventListener("input", (e) => {
  let input = inputText.value;
  word.textContent = numberOfWords(input);
  character.textContent = numberOfCharsWithSpace(input);
  sentence.textContent = numberOfSentences(input);
  staticMax.textContent = getStatistics(input).slice(0, 2);
  staticMin.textContent = getStatistics(input).slice(-2);
});
