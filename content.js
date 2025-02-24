const phishingWords = ["urgent", "password", "bank", "credit card", "login"];

document.addEventListener("DOMContentLoaded", function () {
    const pageText = document.body.innerText.toLowerCase();

    if (phishingWords.some(word => pageText.includes(word))) {
        let warningBanner = document.createElement("div");
        warningBanner.style = "position: fixed; top: 0; left: 0; width: 100%; background: red; color: white; text-align: center; padding: 10px; font-size: 18px; z-index: 9999;";
        warningBanner.innerText = "⚠️ Warning: This page contains phishing indicators!";
        document.body.prepend(warningBanner);
    }
});
