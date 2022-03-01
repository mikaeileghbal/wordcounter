const Wordcount = (function () {
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

  // Number of characters
  function numberOfCharsWithSpace(inputText) {
    return inputText.length;
  }

  // count only words
  function numberOfNoSpace(input) {
    let wordsPattern = /\S/g;
    const result = input.match(wordsPattern);
    return result ? result.length : 0;
  }

  // count only none space characters
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
    return ["a", "the", "is", "in", "of", "to", "and", "i"];
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
      return !commonWords.includes(item[0].toLowerCase(), 0);
    });
  }

  // Test program

  console.log(findText("hello welcome hello again", "hel"));
  console.log(replaceText("hello welcome hello again", "hel", "wel"));
  console.log(removeExtraSpaces("There    are a   lot    of spaces."));
  console.log(numberOfCharsWithSpace("This  is a text"));
  const textOfBook =
    "This is a text is text in text is from my favorite text my book. book my of notes";

  // dom references

  const inputText = document.querySelector("#inputText");
  const word = document.querySelector("#word");
  const character = document.querySelector("#character");
  const sentence = document.querySelector("#sentence");
  const nospace = document.querySelector("#nospace");
  const staticMax = document.querySelector("#static-max");
  const staticMin = document.querySelector("#static-min");
  const characterNoSpace = document.querySelector("#characterNoSpace");

  let timer = null;
  inputText.addEventListener("keyup", (event) => {
    console.log("keyup");
    if (timer) {
      console.log("clear");
      clearTimeout(timer);
    }
    timer = setTimeout(startCounting, 300);
  });

  function startCounting(event) {
    let input = inputText.value;
    word.textContent = numberOfWords(input);
    character.textContent = numberOfCharsWithSpace(input);
    sentence.textContent = numberOfSentences(input);
    nospace.textContent = numberOfNoSpace(input);
    const max = getStatistics(input).slice(0, 5);
    const min = getStatistics(input).slice(-5);

    setMaxTable(max);
    setMinTable(min);
  }

  function setMaxTable(max) {
    staticMax.innerHTML = "";
    for (i = 0; i < max.length; i++) {
      let item = document.createElement("li");
      item.innerText = `${max[i][0]} : ${max[i][1]}`;
      staticMax.appendChild(item);
    }
  }

  function setMinTable(min) {
    staticMin.innerHTML = "";
    for (i = 0; i < min.length; i++) {
      let item = document.createElement("li");
      item.innerText = `${min[i][0]} : ${min[i][1]}`;
      staticMin.appendChild(item);
    }
  }

  // Upload file feature

  const fileInput = document.querySelector("#fileInput");
  const btnOpen = document.querySelector("#btnFileOpen");

  btnOpen.addEventListener("click", (e) => {
    fileInput.value = "";
    fileInput.click(e);
  });

  fileInput.addEventListener(
    "input",
    () => {
      let file = fileInput.files.item(0);
      read(displayText, file);
    },
    false
  );

  function read(callBack, file) {
    let reader = new FileReader();

    reader.onload = function () {
      callBack(reader.result);
    };

    reader.readAsText(file);
  }

  function displayText(result) {
    inputText.value = result;
    inputText.dispatchEvent(new Event("keyup"));
  }

  // Drag and Drop feature

  const fileContainer = document.querySelector(".file-container");

  fileContainer.addEventListener("dragenter", dragEnter, false);
  fileContainer.addEventListener("dragover", dragOver, false);
  fileContainer.addEventListener("drop", drop, false);

  function dragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    document.querySelector(".file-container").style.backgroundColor =
      "rgba(244, 67, 54, 0.2)";
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const file = dt.files.item(0);

    handleFiles(file);

    document.querySelector(".file-container").style.backgroundColor = "white";
  }

  function handleFiles(file) {
    if (!file.type.startsWith("text/")) {
      showError();
    } else {
      read(displayText, file);
    }
  }

  function showError() {
    const error = document.querySelector(".error");
    error.classList.add("show");
    setTimeout(() => {
      (() => {
        error.classList.remove("show");
      })();
    }, 1000);
  }
})();
