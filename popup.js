document.getElementById("whitelist-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let url = new URL(tabs[0].url).hostname;

        chrome.storage.sync.get("whitelist", (data) => {
            let whitelist = data.whitelist || [];
            if (!whitelist.includes(url)) {
                whitelist.push(url);
                chrome.storage.sync.set({ whitelist });
                alert("Added to whitelist: " + url);
            }
        });
    });
});

document.getElementById("report-btn").addEventListener("click", () => {
    alert("Phishing report sent! Thank you.");
});
