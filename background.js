// background.js

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'analyze_url') {
    analyzeFeatures(message.data, sendResponse);
    return true; // Keep the message channel open for asynchronous response
  }
});

// Send features to the API and handle the response
async function analyzeFeatures(features, sendResponse) {
  try {
    // Check if 'features' is an array, log its structure
    console.log('Features before sending:', features);

    // If features is an object, convert it to an array or extract the necessary data
    if (!Array.isArray(features)) {
      // You can handle the transformation here if features is an object
      // For example, if it's an object with the array as a value:
      features = Object.values(features); // Convert object values to array
      console.log('Features transformed into array:', features);
    }

    const response = await fetch('https://phishshield-backend.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        features  // Ensure this is an array
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`API error: ${data.error}`);
    }

    const prediction = data.prediction;
    console.log('Prediction:', prediction);

    // Save the prediction so the popup can display it
    chrome.storage.local.set({ prediction });

    // Show a notification if phishing is predicted
    if (prediction === 1) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/phishshield128.png',
        title: 'Phishing Alert',
        message: 'This site appears to be a phishing site.'
      });
    }

    // Send the prediction back to the content script
    sendResponse({ prediction });
  } catch (error) {
    console.error('Error analyzing features:', error);
    sendResponse({ error: error.message });
  }
}
