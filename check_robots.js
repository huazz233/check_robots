// ==UserScript==
// @name         Check Robots.txt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Check if a website has a robots.txt file
// @author       huazz233@163.com
// @homepageURL  https://github.com/huazz233/check_robots
// @supportURL   https://github.com/huazz233/check_robots/issues
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Function to check if robots.txt file exists
    function checkRobotsTxt() {
        const url = new URL(window.location.href);
        const robotsUrl = `${url.origin}/robots.txt`;

        const xhr = new XMLHttpRequest();
        xhr.open('GET', robotsUrl, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    displayPopup(xhr.responseText);
                } else {
                    alert(`robots.txt file not found: ${robotsUrl}`);
                }
            }
        };
        xhr.send();
    }

    // Create and add the button
    function addButton() {
        const settings = loadSettings();

        const button = document.createElement('button');
        button.id = 'check-robots-btn';
        button.textContent = settings.buttonText || 'Check Robots';
        button.style.position = 'fixed';
        button.style.top = settings.top || '10px';
        button.style.right = settings.right || '10px';
        button.style.backgroundColor = settings.buttonColor || '#6c757d';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.padding = '10px 20px';
        button.style.zIndex = '10000';
        button.style.fontSize = '14px';
        button.style.pointerEvents = 'auto'; // Allow clicking
        button.style.width = settings.buttonWidth || 'auto';
        button.style.height = settings.buttonHeight || 'auto'; // Ensure this can be applied

        // Add click event
        button.addEventListener('click', function() {
            checkRobotsTxt();
        });

        document.body.appendChild(button);
    }

    // Display the popup with robots.txt content
    function displayPopup(content) {
        const existingPopup = document.getElementById('popup');
        if (existingPopup) {
            existingPopup.remove();
        }

        const popup = document.createElement('div');
        popup.id = 'popup';
        popup.style.position = 'fixed';
        popup.style.top = '10px';
        popup.style.right = '10px';
        popup.style.backgroundColor = '#fff';
        popup.style.border = '1px solid #ddd';
        popup.style.borderRadius = '5px';
        popup.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        popup.style.zIndex = '10001';
        popup.style.padding = '20px';
        popup.style.maxWidth = '80vw';
        popup.style.maxHeight = '80vh';
        popup.style.overflow = 'auto';

        const closeButton = document.createElement('span');
        closeButton.textContent = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.color = '#ccc';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '24px';
        closeButton.style.fontWeight = 'bold';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.addEventListener('click', function() {
            popup.remove();
        });

        popup.appendChild(closeButton);

        // Create button settings row
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'space-between';
        buttonContainer.style.alignItems = 'center';
        buttonContainer.style.marginBottom = '10px';

        const viewRobotsButton = document.createElement('a');
        viewRobotsButton.href = `${window.location.origin}/robots.txt`;
        viewRobotsButton.textContent = 'View robots.txt';
        viewRobotsButton.style.color = '#007bff';
        viewRobotsButton.style.textDecoration = 'none';
        viewRobotsButton.style.fontSize = '14px';

        const settingsButton = document.createElement('span');
        settingsButton.textContent = 'Settings';
        settingsButton.style.color = '#007bff';
        settingsButton.style.cursor = 'pointer';
        settingsButton.style.fontSize = '14px';
        settingsButton.style.marginRight = '32px';
        settingsButton.addEventListener('click', function() {
            document.getElementById('popup').remove(); // Hide the popup
            toggleSettingsPopup();
        });

        buttonContainer.appendChild(viewRobotsButton);
        buttonContainer.appendChild(settingsButton);

        popup.appendChild(buttonContainer);

        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = `<pre>${content}</pre>`;
        popup.appendChild(contentDiv);

        document.body.appendChild(popup);
    }

    // Toggle settings popup visibility
    function toggleSettingsPopup() {
        let settingsPopup = document.getElementById('settings-popup');
        if (settingsPopup) {
            settingsPopup.remove();
            return;
        }

        settingsPopup = document.createElement('div');
        settingsPopup.id = 'settings-popup';
        settingsPopup.style.position = 'fixed';
        settingsPopup.style.top = '50%';
        settingsPopup.style.left = '50%';
        settingsPopup.style.transform = 'translate(-50%, -50%)';
        settingsPopup.style.backgroundColor = '#fff';
        settingsPopup.style.border = '1px solid #ddd';
        settingsPopup.style.borderRadius = '5px';
        settingsPopup.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        settingsPopup.style.zIndex = '10002';
        settingsPopup.style.padding = '20px';
        settingsPopup.style.maxWidth = '300px';
        settingsPopup.style.overflow = 'auto';

        const title = document.createElement('h3');
        title.textContent = 'Settings';
        title.style.textAlign = 'center';
        title.style.marginBottom = '20px';
        settingsPopup.appendChild(title);

        const settingsFields = [
            { label: 'Button Text:', id: 'settings-button-text', type: 'text', value: 'Check Robots' },
            { label: 'Button Color:', id: 'settings-button-color', type: 'color', value: '#6c757d' },
            { label: 'Button Top Margin:', id: 'settings-top', type: 'text', value: '10px' },
            { label: 'Button Right Margin:', id: 'settings-right', type: 'text', value: '10px' },
            { label: 'Button Width:', id: 'settings-button-width', type: 'text', value: 'auto' },
            { label: 'Button Height:', id: 'settings-button-height', type: 'text', value: 'auto' }
        ];

        settingsFields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field.label;
            label.style.display = 'block'; // Display each field on a new line
            label.style.marginBottom = '5px';
            settingsPopup.appendChild(label);
            const input = document.createElement('input');
            input.id = field.id;
            input.type = field.type;
            input.value = field.value;
            input.style.width = '100%'; // Full width
            settingsPopup.appendChild(input);
        });

        // Button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.marginTop = '20px';

        // Confirm button
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirm';
        confirmButton.style.backgroundColor = '#007bff';
        confirmButton.style.color = '#fff';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '5px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.padding = '10px 20px';
        confirmButton.style.fontSize = '14px';
        confirmButton.style.marginRight = '10px'; // Right margin
        confirmButton.addEventListener('click', function() {
            saveSettings();
            settingsPopup.remove();
        });

        // Reset button
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset';
        resetButton.style.backgroundColor = '#dc3545';
        resetButton.style.color = '#fff';
        resetButton.style.border = 'none';
        resetButton.style.borderRadius = '5px';
        resetButton.style.cursor = 'pointer';
        resetButton.style.padding = '10px 20px';
        resetButton.style.fontSize = '14px';
        resetButton.addEventListener('click', function() {
            resetSettings();
            settingsPopup.remove();
        });

        buttonContainer.appendChild(confirmButton);
        buttonContainer.appendChild(resetButton);

        settingsPopup.appendChild(buttonContainer);
        document.body.appendChild(settingsPopup);

        // Load settings into form
        const settings = loadSettings();
        document.getElementById('settings-button-text').value = settings.buttonText || 'Check Robots';
        document.getElementById('settings-button-color').value = settings.buttonColor || '#6c757d';
        document.getElementById('settings-top').value = settings.top || '10px';
        document.getElementById('settings-right').value = settings.right || '10px';
        document.getElementById('settings-button-width').value = settings.buttonWidth || 'auto';
        document.getElementById('settings-button-height').value = settings.buttonHeight || 'auto';
    }

    // Save settings to localStorage
    function saveSettings() {
        const settings = {
            buttonText: document.getElementById('settings-button-text').value,
            buttonColor: document.getElementById('settings-button-color').value,
            top: document.getElementById('settings-top').value,
            right: document.getElementById('settings-right').value,
            buttonWidth: document.getElementById('settings-button-width').value,
            buttonHeight: document.getElementById('settings-button-height').value
        };
        localStorage.setItem('checkRobotsSettings', JSON.stringify(settings));
        location.reload(); // Reload the page to apply new settings
    }

    // Load settings from localStorage
    function loadSettings() {
        const settings = localStorage.getItem('checkRobotsSettings');
        return settings ? JSON.parse(settings) : {};
    }

    // Reset settings to default
    function resetSettings() {
        localStorage.removeItem('checkRobotsSettings');
        location.reload(); // Reload the page to apply default settings
    }

    // Initialize the script
    addButton();
})();
