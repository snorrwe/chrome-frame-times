chrome.action.onClicked.addListener(async (tab) => {
    const resp = await chrome.tabs.sendMessage(tab.id, { ty: "toggle" });
    if (resp) {
        chrome.action.setIcon({
            path: { 32: "/images/32-sanic.png" },
        });
    } else {
        chrome.action.setIcon({
            path: { 32: "/images/32.png" },
        });
    }
});
