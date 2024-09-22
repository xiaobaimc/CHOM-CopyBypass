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
        args: [info.selectionText]
      });
    });
  }
});

function copySelectedText(selectedText) {
  navigator.clipboard.writeText(selectedText).catch(err => {
    // 保留错误处理，但不输出到控制台
    // console.error("复制失败:", err);
  });
}
