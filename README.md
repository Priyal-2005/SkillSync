# SkillSync Autofill Extension

SkillSync Autofill is a Chrome extension designed to help students and professionals quickly fill out repetitive information on job applications and freelance websites. It stores a centralized profile and automatically populates forms with your details.

## Features

- **Centralized Profile**: Store your Name, Email, Phone, Skills, Portfolio URL, and Bio in one place.
- **One-Click Autofill**: Automatically fill forms on any webpage with a single click.
- **Smart Matching**: Intelligent field matching for common attributes (name, email, phone, bio, etc.).
- **Privacy Focused**: All data is stored locally in your browser (`chrome.storage.local`). No external servers.
- **Modern UI**: Clean and responsive popup interface.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked**.
5. Select the project directory (`/Users/priyalsarda/Documents/Projects/SkillSync`).

## Usage

1. Click the SkillSync icon in your Chrome toolbar.
2. Fill in your professional details in the popup.
3. Click **Save Profile**.
4. Navigate to any job application or form page.
5. Click the extension icon and select **Auto Fill Current Page**.
6. Watch as the form fields are automatically populated!

## File Structure

- `manifest.json`: Extension configuration (Manifest V3).
- `popup.html`: The user interface for the extension popup.
- `popup.css`: Styling for the popup.
- `popup.js`: Logic for saving profile and triggering autofill.
- `background.js`: Service worker that handles the autofill messages and script injection.
- `content.js`: The script that runs on the web page to find and fill form fields.

## Development

- Built with HTML, CSS, and Vanilla JavaScript.
- Uses Chrome Extension Manifest V3.
