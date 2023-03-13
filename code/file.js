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
