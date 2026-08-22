# DAX Technical Portfolio

[![Deploy to GitHub Pages](https://github.com/dax0056/dax0056.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/dax0056/dax0056.github.io/actions)
[![Live URL](https://img.shields.io/badge/Live%20Demo-dax0056.github.io-38BDF8?style=flat-square&logo=github)](https://dax0056.github.io)
[![Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind-38BDF8?style=flat-square)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **Official 24/7 technical portfolio for DAX — AI & Agent Engineer.**  
> *Local-First AI • AI Agents • Developer Tools • Safe Computer Automation • Open Source*

---

## 🌐 Live Production Website

- **Production URL**: **[https://dax0056.github.io](https://dax0056.github.io)**
- **Hosting**: GitHub Pages (Static Edge CDN with HTTPS & HTTP/2)
- **Deployment**: Automated CI/CD via GitHub Actions (`.github/workflows/deploy.yml`)

---

## ⚡ Overview

A lightweight, dark-themed, high-performance personal portfolio showcasing real open-source agent engineering projects:
- **Flagship**: [`nexus-agent`](https://github.com/dax0056/nexus-agent) — Local-first AI agent reference core.
- **Code Tooling**: [`micro-coding-agent`](https://github.com/dax0056/micro-coding-agent) — Deterministic AST code verification.
- **OS Automation**: [`desktop-action-agent`](https://github.com/dax0056/desktop-action-agent) — Sandboxed desktop control & SHA-256 audit trails.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Obsidian Dark Theme)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Lightweight SVGs
- **Deployment Target**: 100% Static HTML/CSS/JS deployed to GitHub Pages

---

## 🚀 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The site will start at `http://localhost:5173`.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```
Production output is generated into the `dist/` directory.

---

## 🚢 Automated Deployment

Every push to the `main` branch triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which automatically:
1. Sets up the Node.js 20 environment.
2. Installs clean dependencies via `npm ci`.
3. Compiles TypeScript and builds production static bundles with Vite.
4. Deploys the artifact directly to the GitHub Pages environment at `https://dax0056.github.io`.

---

## 🛡️ Security & Privacy Posture

- **Zero Remote Tracking**: No Google Analytics, no third-party telemetry, no external ad trackers.
- **Zero API Keys / Secrets**: Runs purely as client-side static assets.
- **Local-First Assets**: Fonts and SVG assets are bundled locally.

---

## 📄 License

Distributed under the MIT License.
