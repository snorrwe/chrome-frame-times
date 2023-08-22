chrome.action.onClicked.addListener(async (tab) => {
    console.log("pls");
    chrome.tabs.sendMessage(tab.id, { asd: "basd" });
});

console.log("hello");
