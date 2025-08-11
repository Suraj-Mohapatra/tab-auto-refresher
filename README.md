# Tab Auto Refresher

a lightweight extension that allows you to automatically refresh selected browser tabs at custom intervals. Ideal for monitoring live updates on dashboards, news sites, stock tickers, or any frequently changing webpage.

---

## Features

- Select specific tabs to auto-refresh
- Set custom refresh intervals (in seconds)
- Start and stop refresh timers per tab
- Remembers active tabs using Chrome's storage API
- Lightweight and easy to use

---

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle top-right).
4. Click **Load unpacked** and select the extension folder.
5. The extension will now appear in your toolbar.

---

## Usage

1. Click the extension icon to open the popup.
2. Select a tab from the dropdown menu.
3. Enter the desired refresh interval in seconds.
4. Click **Start** to begin auto-refreshing the selected tab.
5. Click **Stop** to stop auto-refreshing that tab.

---

## Development

This extension uses:

- Manifest V3 with a service worker as the background script.
- Chrome Storage API to persist active tabs.
- Messaging between popup and service worker for tab refresh control.

---

## File structure

