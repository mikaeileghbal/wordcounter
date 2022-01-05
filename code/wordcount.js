function replaceText(inputText, replaceText) {
	let pattern = new RegExp(replaceText, "gi");
	return inputText.replace(pattern, (matchedText) => {
		return `<span class="marked">${matchedText}</span>`;
	});
}

console.log(replaceText("hello welcome hello again", "hello"));
