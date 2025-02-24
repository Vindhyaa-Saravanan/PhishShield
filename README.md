<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Vindhyaa-Saravanan/PhishShield">
    <img src="PhishShield.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">PhishShield</h3>
  
  <p align="center">
    A Chrome extension that alerts users when they navigate to potentially malicious or phishing websites. Built for RobHacks conducted by Nosu.
    <br />
    <a href="https://github.com/Vindhyaa-Saravanan/PhishShield"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Vindhyaa-Saravanan/PhishShield">View Demo</a>
    ·
    <a href="https://github.com/Vindhyaa-Saravanan/PhishShield/issues">Report Bug</a>
    ·
    <a href="https://github.com/Vindhyaa-Saravanan/PhishShield/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Issues</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details><br>



<!-- ABOUT THE PROJECT -->
## About The Project

PhishShield is a lightweight, AI-powered browser extension designed to detect and prevent phishing attacks in real time. By analyzing URLs using machine learning models, it helps users identify potentially malicious links before they interact with them.

PhishShield leverages a trained classification model to assess URL attributes and predict the likelihood of a phishing attempt. The extension seamlessly integrates with the browser to provide instant warnings, enhancing cybersecurity for everyday users.

### Built With

[![tools](https://skillicons.dev/icons?i=py,js,sklearn,html,css,github,gcp)](https://skillicons.dev)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these steps:

### Cloning the repository

```bash
> git clone https://github.com/Vindhyaa-Saravanan/PhishShield.git
```

### Setting up the extension

1. Open Google Chrome and navigate to ```chrome://extensions/```

2. Enable Developer Mode (toggle in the top right corner)

3. Click Load Unpacked and select the PhishShield project directory

4. The extension should now be available in your browser

### Running the machine learning model

PhishShield uses a pre-trained model for phishing detection. The model is lightweight and optimized for browser-based execution.

Ensure the saved model file (phishshield_model.onnx) is present in the extension directory. The extension will automatically load and use the model when analyzing URLs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ISSUES -->
## Issues

See the [open issues](https://github.com/Vindhyaa-Saravanan/PhishShield/issues) for a full list of known issues, priorities and assignees.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CREATED BY -->
## Created by

* Vindhyaa Saravanan - [@Vindhyaa-Saravanan](https://github.com/Vindhyaa-Saravanan) - sc21vs@leeds.ac.uk


### Project Links:

* [Project Repository](https://github.com/Vindhyaa-Saravanan/PhishShield)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

