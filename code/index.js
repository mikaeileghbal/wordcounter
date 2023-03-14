import getCommonWords from "./commonWords.js";
import WordCounter from "./wordcount.js";

window.addEventListener("load", init);

function init() {
  const inputText = document.querySelector("#inputText");
  const word = document.querySelector("#word");
  const character = document.querySelector("#character");
  const sentence = document.querySelector("#sentence");
  const nospace = document.querySelector("#nospace");
  const staticMax = document.querySelector("#static-max");
  const staticMin = document.querySelector("#static-min");
  const characterNoSpace = document.querySelector("#characterNoSpace");

  const wordCounter = new WordCounter();

  let timer = null;
  inputText.addEventListener("keyup", (event) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(startCounting, 300);
  });

  function startCounting(event) {
    let input = inputText.value;
    word.textContent = wordCounter.numberOfWords(input);
    character.textContent = wordCounter.numberOfCharsWithSpace(input);
    sentence.textContent = wordCounter.numberOfSentences(input);
    nospace.textContent = wordCounter.numberOfNoSpace(input);
    const max = getStatistics(input).slice(0, 5);
    const min = getStatistics(input).slice(-5);

    setMaxTable(max);
    setMinTable(min);
  }

  function setMaxTable(max) {
    staticMax.innerHTML = "";
    for (let i = 0; i < max.length; i++) {
      let item = document.createElement("li");
      item.innerText = `${max[i][0]} : ${max[i][1]}`;
      staticMax.appendChild(item);
    }
  }

  function setMinTable(min) {
    staticMin.innerHTML = "";
    for (let i = 0; i < min.length; i++) {
      let item = document.createElement("li");
      item.innerText = `${min[i][0]} : ${min[i][1]}`;
      staticMin.appendChild(item);
    }
  }

  function sortObject(obj) {
    let arrResult = Object.entries(obj);
    arrResult.sort(function (first, second) {
      return second[1] - first[1];
    });

    return arrResult;
  }

  function getStatistics(input) {
    let [wordCount, wordDictionary] = wordCounter.countWords(input);

    let sortedWord = sortObject(wordDictionary);

    let commonWords = getCommonWords();

    //filter array
    return sortedWord.filter(function (item) {
      return !commonWords.includes(item[0].toLowerCase(), 0);
    });
  }
}
