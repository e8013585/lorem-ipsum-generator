# Lorem Ipsum Generator

A lightweight Chrome extension for instantly generating Lorem Ipsum placeholder text in four modes: **paragraphs**, **words**, **bytes**, or **lists**.

## Features

- **Paragraphs** – Full paragraphs of varied sentence length (3–7 sentences, 5–14 words each)
- **Words** – Exact word-count output capped at 9999
- **Bytes** – Approximate byte-accurate generation (UTF-8 encoded) up to ~999,999 bytes
- **Lists** – Bulleted list items with randomized starters and endings
- **Copy-to-clipboard** – One-click copy with visual confirmation
- **Dark theme** – Clean, modern dark UI
- **Persistent state** – Your last-used mode and quantity are saved between popup opens

## Permissions

| Permission | Reason |
|---|---|
| `storage` | Saves the selected mode (paragraphs/words/bytes/lists) and quantity across popup sessions via `chrome.storage.local`. No data is synced or sent anywhere. |
| `clipboardWrite` | Allows the one-click *Copy* button to write generated text to the system clipboard. The extension never reads the clipboard. |

No network access, no host permissions, no tracking.

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in top-right)
4. Click **Load unpacked** and select the extension folder
5. The extension icon will appear in the toolbar

## Usage

1. Click the extension icon in the toolbar
2. Choose a generation mode (Paragraphs, Words, Bytes, or Lists)
3. Set the desired quantity with the +/- buttons or type a number
4. Click **Generate** (or press `Ctrl+Enter`)
5. Click **Copy** (or press `Ctrl+Shift+C`) to copy the output

## Files

```
lorem-ipsum-generator/
├── icons/
│   ├── icon16.svg
│   ├── icon48.svg
│   └── icon128.svg
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
└── README.md
```

## Chrome Web Store Description

> Instantly generate Lorem Ipsum placeholder text right from your browser toolbar. Choose between paragraphs, exact word counts, byte-accurate output, or bulleted lists. A dark, minimal interface with one-click copy — perfect for designers, developers, and writers who need quick, no-fuss placeholder content.
>
> **Features:**
> - Four generation modes: paragraphs, words, bytes, and lists
> - Adjustable quantity with simple +/- controls
> - One-click copy to clipboard
> - Dark theme, easy on the eyes
> - Remembers your last selection
> - Lightweight — no unnecessary permissions
> - Free and open source
