chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.tabs.get(details.tabId, (tab) => {
        if (tab && tab.url) {
            checkPhishing(tab.url, details.tabId);
        }
    });
});

function checkPhishing(url, tabId) {
    const phishingKeywords = ["login", "verify", "update", "secure", "account"];
    
    if (phishingKeywords.some(keyword => url.includes(keyword))) {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/phishshield48.png",
            title: "⚠️ Phishing Alert!",
            message: `This site (${url}) might be suspicious!`,
            buttons: [{ title: "Report" }]
        });
    }
}
