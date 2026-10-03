# 🎮 PlayTrail

A modern, lightweight Windows desktop game tracker built with **Tauri v2, React, TypeScript, Tailwind CSS, and Rust**.

PlayTrail is a personal game-tracking application designed to automatically detect running games, track active and AFK playtime, and provide a centralized library for managing games, notes, goals, and related events.

> 🚧 **Project Status: In Development**
>
> PlayTrail is currently being developed as a personal project. The UI foundation is complete, while the Rust process-monitoring and persistent data layers are being implemented.

---

## ✨ Planned Features

### 🎮 Automatic Game Tracking

PlayTrail is designed to monitor running Windows processes and automatically identify registered games.

Planned tracking capabilities include:

- Detect running game executables
- Automatically match processes to registered games
- Detect the currently focused application
- Track active gameplay time
- Track AFK/idle time
- Automatically start and end play sessions

### 📚 Game Library

The game library provides a centralized place to manage personal games.

Current UI functionality includes:

- Game library grid/list
- Game status management
- Custom tags
- Game search/filtering
- Hidden games
- Personal notes
- In-game goal checklists
- Game details view
- Currently Playing display

### 📊 Playtime Analytics

The tracking engine will eventually provide:

- Total playtime
- Daily playtime
- Weekly playtime
- Monthly playtime
- Session history
- Active vs. AFK breakdown
- Last played time
- Session statistics

### 🎯 Personal Game Management

PlayTrail also includes lightweight personal game-management features:

- Backlog tracking
- Game status
- Custom tags
- Modpack notes
- Personal goals
- Achievement/checklist tracking

### 📅 Game Events & Gacha Companion

Planned integrations include:

- Game event calendar
- Patch/update schedules
- Livestream reminders
- Daily/weekly routine tracking
- Local timezone conversion
- Desktop notifications
- Windows system tray integration

---

# 🏗️ Development Roadmap

## Phase 1 — Dashboard & Library Management UI ✅

**React + TypeScript + Tailwind CSS**

Completed:

- [x] Dark-themed dashboard
- [x] Responsive application layout
- [x] Navigation sidebar
- [x] Currently Playing card
- [x] Active/AFK time visualization
- [x] Game library
- [x] Game status filtering
- [x] Custom game tags
- [x] Game details modal
- [x] Personal notes
- [x] Goal/checklist system
- [x] Frontend state synchronization

The current UI uses local/mock data while the persistence and tracking layers are being developed.

---

## Phase 2 — Core Process Tracking Engine 🚧

**Rust + Tauri**

Currently in development:

- [ ] Windows process scanning
- [ ] Running executable detection
- [ ] Active foreground window detection
- [ ] Game process matching
- [ ] Active vs. AFK detection
- [ ] Session lifecycle management
- [ ] Rust → React state updates

Planned Rust components:

```text
Process Scanner
      ↓
Game Matcher
      ↓
Foreground Window Detector
      ↓
Activity / AFK Detector
      ↓
Session Manager
      ↓
Frontend State
```

---

## Phase 3 — Data Persistence

**SQLite + Rust**

Planned:

- [ ] SQLite database
- [ ] Game metadata persistence
- [ ] Session history
- [ ] Process mappings
- [ ] Unknown process queue
- [ ] Game settings
- [ ] Persistent statistics

The application is designed around a **local-first architecture**, keeping personal game-tracking data on the user's machine.

---

## Phase 4 — Analytics, Calendar & System Integrations

Planned:

- [ ] Playtime analytics
- [ ] Session history and timelines
- [ ] Weekly/monthly/yearly statistics
- [ ] Game event calendar
- [ ] Timezone conversion
- [ ] RAWG metadata integration
- [ ] Windows system tray
- [ ] Desktop notifications
- [ ] Windows auto-start
- [ ] Event reminders

---

# 🛠️ Tech Stack

### Frontend

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**

### Desktop / Backend

- **Tauri v2**
- **Rust**

### Planned Data Layer

- **SQLite**

### Planned System Monitoring

- **sysinfo**
- Windows foreground-window detection

---

# 🏛️ Architecture

PlayTrail is designed as a local desktop application where React handles the user interface and Rust handles system-level functionality.

```text
┌──────────────────────────────────────┐
│          React + TypeScript          │
│                                      │
│ Dashboard │ Library │ Calendar       │
│ Settings  │ Game Details             │
└──────────────────┬───────────────────┘
                   │
              Tauri IPC
                   │
┌──────────────────▼───────────────────┐
│                 Rust                 │
│                                      │
│ Process Scanner                      │
│ Game Matcher                         │
│ Window Detection                     │
│ AFK Detection                        │
│ Session Manager                      │
└──────────────────┬───────────────────┘
                   │
                   ▼
             SQLite Database
```

This separation allows the frontend to focus on presentation and user interaction while Rust handles Windows/system-level operations.

---

# 💻 Development

### Requirements

- Node.js
- Rust
- Tauri v2 prerequisites
- Windows development environment

### Run the development application

```bash
npm run tauri dev
```

### Run the frontend only

```bash
npm run dev
```

### Build the desktop application

```bash
npm run tauri build
```

---

# 📌 Project Goals

PlayTrail is being developed primarily as a **personal desktop application and software engineering portfolio project**.

The project provides practical experience with:

- React application architecture
- TypeScript
- Rust
- Tauri desktop development
- Windows process monitoring
- Inter-process communication
- Local database design
- Session/time-based data modelling
- Data visualization
- Desktop system integration

---

# 📄 License

Copyright © 2026 Chan Kwok Ferng.

PlayTrail is a personal, non-commercial project.

The source code is available for inspection and personal learning. Commercial redistribution, resale, or monetized deployment of the project requires explicit permission from the author.