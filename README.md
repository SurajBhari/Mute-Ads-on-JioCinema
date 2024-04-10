Mute JioCinema Ads Chrome Extension and Tampermonkey Script
This repository contains the code for a Chrome extension and a Tampermonkey script that automatically mutes ads during JioCinema live cricket matches.

Features
Automatically mutes ads during live cricket matches on JioCinema.
Unmutes the video when the ads are over.
Remembers the user's mute/unmute preference.
How to use the Chrome Extension
Clone or download this repository to your local machine.
Open the Chrome browser and navigate to chrome://extensions/.
Enable the "Developer mode" toggle in the top right corner of the page.
Click the "Load unpacked" button and select the folder containing the downloaded repository.
The extension is now installed and active. You can disable or remove it from the same chrome://extensions/ page.
How to use the Tampermonkey Script
Install the Tampermonkey extension for your browser if you haven't already.
Click on the Tampermonkey icon in your browser toolbar and select "Create a new script."
Copy the entire Tampermonkey script (including the metadata block) from below and paste it into the Tampermonkey editor.
Save the script by clicking the disk icon or pressing Ctrl + S (Cmd + S on macOS).
The script is now installed and active. You can disable or remove it from the Tampermonkey dashboard.
javascript
Copy code
// ==UserScript==
// @name         Mute Ads on JioCinema
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Mute ads on JioCinema live cricket matches
// @author       You
// @match        *://*.jiocinema.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let userMutePreference = false;

    const checkForAd = () => {
        const adImgElement = document.querySelector('img[alt="Adds logo"]');

        if (adImgElement && adImgElement.src) {
            // Ad is being displayed
            if (!window.navigator.muted) {
                window.navigator.muted = true;
            }
        } else {
            // Ad is not being displayed
            if (window.navigator.muted !== userMutePreference) {
                window.navigator.muted = userMutePreference;
            }
        }
    };

    const muteVolume = (mute) => {
        const video = document.querySelector('video');
        if (video) {
            video.muted = mute;
        }
    };

    Object.defineProperty(window.navigator, 'muted', {
        set: (mute) => {
            muteVolume(mute);
        },
        get: () => {
            const video = document.querySelector('video');
            return video ? video.muted : false;
        }
    });

    setInterval(checkForAd, 500); // Check for ads every 0.5 second

    // Listen for user's mute/unmute action
    document.addEventListener('click', (event) => {
        const muteButton = document.querySelector('.hlsPlayerRoot .mute-button');
        if (muteButton && event.target.closest('.mute-button')) {
            userMutePreference = !userMutePreference;
        }
    });
})();
Notes
The Chrome extension is using manifest_version 2 as Chrome is transitioning to manifest_version 3. Converting the script to work with manifest_version 3 is more complex and beyond the scope of this README. Keep in mind that at some point, you may need to update the extension