# Check Robots.txt

## 简介

**Check Robots.txt** 是一个简单的浏览器脚本，用于检查当前网站是否有 `robots.txt` 文件，并显示其内容。如果没有找到 `robots.txt` 文件，则会弹出提示。该脚本允许用户自定义按钮的外观和位置。

## 功能

- 检查网站的 `robots.txt` 文件。
- 弹出窗口显示 `robots.txt` 文件的内容。
- 支持自定义按钮文本、颜色、位置、宽度和高度。
- 可以通过设置面板进行自定义设置。

## 安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 扩展。
2. 打开 Tampermonkey 面板，点击“创建新脚本”。
3. 将以下脚本粘贴到编辑器中并保存：

    ```javascript
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
        // Your script here...
    })();
    ```

4. 保存并启用脚本。

## 使用

1. 打开任意网站，页面右上角会显示一个按钮。
2. 点击按钮即可检查 `robots.txt` 文件并显示其内容。

## 设置

点击弹出窗口中的“设置”按钮，可以自定义按钮的文本、颜色、位置、宽度和高度。设置会自动保存并应用到按钮上。

## 贡献

欢迎提出问题和建议！请通过 [GitHub Issues](https://github.com/huazz233/check_robots/issues) 提交您的反馈。

## 联系方式

如果您有任何问题或需要进一步的帮助，请通过以下方式联系我：

- **邮箱**: huazz233@163.com
- **GitHub**: [https://github.com/huazz233/check_robots](https://github.com/huazz233/check_robots)

## 许可证

本项目采用 MIT 许可证。有关详细信息，请参见 [LICENSE.txt](LICENSE.txt)。

---

# Check Robots.txt

## Introduction

**Check Robots.txt** is a simple browser script that checks if the current website has a `robots.txt` file and displays its content. If the `robots.txt` file is not found, a notification will pop up. The script allows users to customize the button's appearance and position.

## Features

- Check for the presence of a `robots.txt` file on a website.
- Display the content of the `robots.txt` file in a popup window.
- Supports customization of button text, color, position, width, and height.
- Customizable settings through the settings panel.

## Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension.
2. Open the Tampermonkey dashboard and click “Create a new script.”
3. Paste the following script into the editor and save:

    ```javascript
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
        // Your script here...
    })();
    ```

4. Save and enable the script.

## Usage

1. Open any website and a button will appear at the top right corner of the page.
2. Click the button to check the `robots.txt` file and display its content.

## Settings

Click the “Settings” button in the popup window to customize the button's text, color, position, width, and height. Settings are automatically saved and applied to the button.

## Contributing

Feedback and suggestions are welcome! Please submit your feedback through [GitHub Issues](https://github.com/huazz233/check_robots/issues).

## Contact

If you have any questions or need further assistance, please contact me via:

- **Email**: huazz233@163.com
- **GitHub**: [https://github.com/huazz233/check_robots](https://github.com/huazz233/check_robots)

## License

This project is licensed under the MIT License. See [LICENSE.txt](LICENSE.txt) for details.
