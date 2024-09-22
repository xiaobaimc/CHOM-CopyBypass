chrome.runtime.onMessage.addListener((request) => {
  if (request.text) {
    const textarea = document.createElement("textarea");
    textarea.value = request.text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
});
