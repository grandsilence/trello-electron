# Trello Electron [![Build Status](https://travis-ci.com/grandsilence/todoist-trello.svg?branch=master)](https://travis-ci.com/grandsilence/todoist-trello)
It's a web wrapper for Windows / Linux based on Electron Framework.

![Trello web like interface on Windows](https://raw.githubusercontent.com/grandsilence/todoist-electron/master/assets/images/todoist.gif)

# Features
- Disabled Google Analytics
- Replaced fonts to GDI-safe (nice readable when DirectWrite disabled)
- Removed anoyable elements: social, "all tasks done"

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