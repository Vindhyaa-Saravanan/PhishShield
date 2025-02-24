document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('prediction', (data) => {
    const predictionText = document.getElementById('prediction-text');
    if (data.prediction === 1) {
      predictionText.textContent = 'Warning: This site may be phishing!';
      predictionText.style.color = 'red';
    } else {
      predictionText.textContent = 'This site appears safe.';
      predictionText.style.color = 'green';
    }
  });

  document.getElementById('refresh').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  });
});
