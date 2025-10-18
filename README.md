# Universal Search Page

A beautiful, modern search page with a dark theme and multi-search engine support.

## Features

- **Progressive Web App (PWA)**: Installable as a standalone app on desktop and mobile devices
- **Offline Support**: Service worker enables offline functionality
- **Dark Theme**: Modern dark design with subtle gradient effects
- **Multi-Search Engine Support**: Choose from 6 popular search engines:
  - Brave Search
  - Google
  - DuckDuckGo
  - Bing
  - Yahoo
  - Startpage
- **Smart Search Suggestions with Recent Searches**: Real-time search suggestions and search history, just like a normal browser homepage
  - **Recent Searches**: Stores and displays your recent searches (up to 8) when you focus on the search box
  - **Visual Indicators**: Clock icon for recent searches, search icon for suggestions
  - **Remove Individual Items**: Hover over recent searches to reveal a remove button (X icon)
  - **Smart Merging**: When typing, shows matching recent searches combined with API suggestions
  - Automatically fetches live suggestions from the selected search engine
  - Keyboard navigation support (Arrow keys, Enter, Escape)
  - Click to select any suggestion or recent search
  - Debounced API calls for optimal performance
  - Works with Google, DuckDuckGo, Bing, and Yahoo
  - All data stored locally in your browser (privacy-friendly)
- **Persistent Preferences**: Your search engine choice is saved automatically
- **Fully Functional**: Real search that redirects to your chosen engine
- **Responsive Design**: Works on desktop and mobile devices
- **Clean Interface**: Minimalist design focused on usability

## Usage

Simply open `index.html` in your browser:
1. Type your search query
2. See real-time search suggestions appear as you type
3. Use arrow keys to navigate suggestions or click to select
4. Select your preferred search engine from the dropdown
5. Press Enter or click the search button
6. You'll be redirected to your chosen search engine with your query

### Search Suggestions & Recent Searches
The search feature works just like a modern browser homepage:

**Recent Searches:**
- Click or focus on the empty search box to see your recent searches
- Recent searches are marked with a clock icon
- Hover over any recent search to reveal the remove button (X)
- Click the X to remove individual items from your history
- Recent searches are stored locally and persist across sessions

**Live Suggestions:**
- Start typing to get real-time suggestions from your selected search engine
- Matching recent searches appear at the top of suggestions
- API suggestions appear below (marked with search icon)
- Use ↑↓ arrow keys to navigate through all suggestions
- Press Enter to select any suggestion
- Press Escape to close the suggestions dropdown
- Click any suggestion to search immediately

## Installing as PWA

You can install this as a standalone app on your device:

### Desktop (Chrome, Edge, Brave)
1. Visit the website
2. Look for the install icon in the address bar (or menu → "Install app")
3. Click "Install" to add it to your system
4. Launch it like any other app from your desktop or start menu

### Mobile (Android/iOS)
1. Visit the website in your browser
2. **Android**: Tap the menu (⋮) → "Install app" or "Add to Home Screen"
3. **iOS**: Tap the share button → "Add to Home Screen"
4. The app will appear on your home screen like a native app

## Technologies

- Pure HTML5
- Modern CSS3 with custom properties
- Vanilla JavaScript (no dependencies)
- LocalStorage for preference persistence
- Service Worker API for offline support and caching
- Web App Manifest for PWA functionality

## Browser Compatibility

Works in all modern browsers that support:
- CSS custom properties
- ES6 JavaScript
- LocalStorage API
- HTML5 form elements

---

© 2025 Universal Search
