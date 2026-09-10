# Marvel Prep

An unofficial fan-made Marvel preparation planner built with React and Vite.

## What it does

Instead of asking users to watch the entire MCU before a new release, Marvel Prep creates a focused preparation path for a selected movie or show.

Each title in the path includes:
- Relevance level
- Why it matters
- Release or chronological viewing order
- Movie/show filtering
- Watchlist saving
- Completion tracking

## Tech stack

- React
- JavaScript / JSX
- CSS
- Vite
- Lucide React
- Browser localStorage

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  main.jsx
  styles.css
index.html
package.json
```

## Notes

This is an unofficial fan project and is not affiliated with Marvel, Disney, or their respective rights holders.

The current version uses seeded demo data. A future production version could connect to a movie/TV database and use a relationship-based relevance engine to generate preparation paths dynamically.

## Portfolio focus

The project demonstrates:
- Component-based React UI
- React state and derived data
- Client-side filtering and sorting
- Responsive CSS
- localStorage persistence
- Interactive navigation and UI state
- Product-focused UX rather than a simple CRUD demo
