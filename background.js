chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copySelection",
    title: "复制选中的文本",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "copySelection") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: copySelectedText,
        args: [info.selectionText] // 传递选中的文本
      });
    });
  }
});

function copySelectedText(selectedText) {
  navigator.clipboard.writeText(selectedText).then(() => {
    console.log("选中的文本已复制到剪贴板");
  }).catch(err => {
    console.error("复制失败:", err);
  });
}
