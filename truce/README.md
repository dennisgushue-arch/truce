# TRUCE (Web)

TRUCE is a conflict de-escalation app that helps users pick a stressful situation pack and respond with calmer, actionable scripts.

## Local setup

Prerequisites:

- Node.js 20+
- npm 10+

Install dependencies:

1. Open the `truce/` folder.
2. Run `npm install`.

Start dev server:

- `npm run dev`

Build for production:

- `npm run build`

Preview production build locally:

- `npm run preview`

## Available scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint checks
- `npm run lint:fix` — auto-fix lint issues where possible
- `npm run format` — check Prettier formatting
- `npm run format:write` — apply Prettier formatting
- `npm run test` — run Vitest in watch mode
- `npm run test:run` — run Vitest once (CI-friendly)

## Architecture (short)

The app is a small React + Vite SPA.

- `src/App.jsx` manages top-level UI state (`darkMode`, selected pack/action).
- `src/data/packs.js` contains all static pack content and scripts.
- `src/components/PackGrid.jsx` and `PackTile.jsx` render pack cards and action buttons.
- `src/components/ActionPanel.jsx` renders contextual action content (`reset`, `say`, `rewrite`, `next`, `repair`).
- `src/components/ResetTimer.jsx` provides the guided 90-second reset interaction.

Testing is powered by Vitest + React Testing Library, with baseline tests in:

- `src/components/__tests__/PackGrid.test.jsx`
- `src/components/__tests__/App.ActionPanel.test.jsx`
- `src/components/__tests__/ResetTimer.test.jsx`

## CI

GitHub Actions workflow: `.github/workflows/web-ci.yml`

On every push/PR affecting the web app, CI runs:

1. `npm ci`
2. `npm run lint`
3. `npm run format`
4. `npm run build`

## Screenshots / GIF

Add media under `docs/media/` (tracked with `.gitkeep`), for example:

- `docs/media/home.png`
- `docs/media/action-panel.png`
- `docs/media/reset-timer.gif`

Then embed them here:

![TRUCE home](docs/media/home.png)
![Action panel](docs/media/action-panel.png)
![Reset timer flow](docs/media/reset-timer.gif)
