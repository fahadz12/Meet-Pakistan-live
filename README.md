# Meet Pakistan — Professional Network

A React + Vite single-page application showcasing Pakistan's professionals, leaders, interviews, and career resources.

## Tech Stack
- React 18
- Vite 5
- Inline CSS-in-JS (no external UI framework required)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

Build for production:

```bash
npm run build
```

The optimized output will be generated in the `dist/` folder.

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
meet-pakistan/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    └── App.jsx
```

## Deployment (Vercel)

1. Push this project to a GitHub repository.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Vercel auto-detects the Vite framework — no extra configuration needed.
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy 🚀
