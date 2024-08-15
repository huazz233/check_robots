// ==UserScript==
// @name         检查 robots.txt
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  检查 robots.txt 是否存在，并根据结果打开新标签或显示警告。按钮可以拖动，设置可以自定义。
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 函数：检查 robots.txt 文件是否存在
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
                    alert(`robots.txt 文件不存在: ${robotsUrl}`);
                }
            }
        };
        xhr.send();
    }

    // 创建并添加按钮
    function addButton() {
        const settings = loadSettings();

        const button = document.createElement('button');
        button.id = 'check-robots-btn';
        button.textContent = settings.buttonText || '查看协议';
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
        button.style.pointerEvents = 'auto'; // 允许点击
        button.style.width = settings.buttonWidth || 'auto';
        button.style.height = settings.buttonHeight || 'auto';

        // 添加点击事件
        button.addEventListener('click', function() {
            console.log('“查看协议”按钮被点击');
            checkRobotsTxt();
        });

        document.body.appendChild(button);
    }

    // 显示弹出框
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

        // 创建按钮设置行
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'space-between';
        buttonContainer.style.alignItems = 'center';
        buttonContainer.style.marginBottom = '10px';

        const viewRobotsButton = document.createElement('a');
        viewRobotsButton.href = `${window.location.origin}/robots.txt`;
        viewRobotsButton.textContent = '查看 robots.txt 文件';
        viewRobotsButton.style.color = '#007bff';
        viewRobotsButton.style.textDecoration = 'none';
        viewRobotsButton.style.fontSize = '14px';

        const settingsButton = document.createElement('span');
        settingsButton.textContent = '设置';
        settingsButton.style.color = '#007bff';
        settingsButton.style.cursor = 'pointer';
        settingsButton.style.fontSize = '14px';
        settingsButton.style.marginRight = '32px';
        settingsButton.addEventListener('click', function() {
            document.getElementById('popup').remove(); // 隐藏查看协议弹出框
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

    // 显示/隐藏设置弹出框
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
        title.textContent = '设置';
        title.style.textAlign = 'center';
        title.style.marginBottom = '20px';
        settingsPopup.appendChild(title);

        const settingsFields = [
            { label: '按钮名称:', id: 'settings-button-text', type: 'text', value: '查看协议' },
            { label: '按钮颜色:', id: 'settings-button-color', type: 'color', value: '#6c757d' },
            { label: '按钮上方距离:', id: 'settings-top', type: 'text', value: '10px' },
            { label: '按钮右侧距离:', id: 'settings-right', type: 'text', value: '10px' },
            { label: '按钮宽度:', id: 'settings-button-width', type: 'text', value: 'auto' },
            { label: '按钮高度:', id: 'settings-button-height', type: 'text', value: 'auto' }
        ];

        settingsFields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field.label;
            label.style.display = 'block'; // 单独一行显示
            label.style.marginBottom = '5px';
            settingsPopup.appendChild(label);
            const input = document.createElement('input');
            input.id = field.id;
            input.type = field.type;
            input.value = field.value;
            input.style.width = '100%'; // 宽度自适应
            settingsPopup.appendChild(input);
        });

        // 按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.marginTop = '20px';

        // 确认按钮
        const confirmButton = document.createElement('button');
        confirmButton.textContent = '确认';
        confirmButton.style.backgroundColor = '#007bff';
        confirmButton.style.color = '#fff';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '5px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.padding = '10px 20px';
        confirmButton.style.fontSize = '14px';
        confirmButton.style.marginRight = '10px'; // 添加右边距
        confirmButton.addEventListener('click', function() {
            saveSettings();
            settingsPopup.remove();
        });

        // 重置按钮
        const resetButton = document.createElement('button');
        resetButton.textContent = '重置';
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
    }

    // 加载设置
    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('settings')) || {};
        return settings;
    }

    // 保存设置
    function saveSettings() {
        const settings = {
            buttonText: document.getElementById('settings-button-text').value,
            buttonColor: document.getElementById('settings-button-color').value,
            top: document.getElementById('settings-top').value,
            right: document.getElementById('settings-right').value,
            buttonWidth: document.getElementById('settings-button-width').value,
            buttonHeight: document.getElementById('settings-button-height').value
        };
        localStorage.setItem('settings', JSON.stringify(settings));
        applySettings();
    }

    // 重置设置
    function resetSettings() {
        localStorage.removeItem('settings');
        applySettings();
    }

    // 应用设置
    function applySettings() {
        const settings = loadSettings();

        // 应用按钮样式
        const button = document.getElementById('check-robots-btn');
        if (button) {
            button.textContent = settings.buttonText || '查看协议';
            button.style.top = settings.top || '10px';
            button.style.right = settings.right || '10px';
            button.style.backgroundColor = settings.buttonColor || '#6c757d';
            button.style.width = settings.buttonWidth || 'auto';
            button.style.height = settings.buttonHeight || 'auto';
        }
    }

    // 初始化按钮和设置
    addButton();
    applySettings();
})();
