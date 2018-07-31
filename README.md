# Trello Electron [![Build Status](https://travis-ci.com/grandsilence/todoist-trello.svg?branch=master)](https://travis-ci.com/grandsilence/todoist-trello)
It's a web wrapper for Windows / Linux based on Electron Framework.

# Features
- Disabled Google Analytics / Trello Analytics
- Replaced fonts to GDI-safe (nice readable when DirectWrite disabled)
- Removed anoyable elements

# Roadmap
- Tray icon
- Borderless window
- Custom loader

## How to build
```cmd
git clone https://github.com/grandsilence/trello-electron.git
cd trello-electron
npm install
```
**Windows**: `npm run build-win`  
**Linux**: `npm run build-linux`  
**Mac OS**: `npm run build-mac`