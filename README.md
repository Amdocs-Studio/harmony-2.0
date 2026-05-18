# Harmony 2.0

> Production-ready React, out of the box.
> A batteries-included starter-kit for fast onboarding into React + Redux web apps —
> opinionated, modular, and focused on performance and best practices.

**Live documentation:** **[amdocs-studio.github.io/harmony-2.0](https://amdocs-studio.github.io/harmony-2.0)**

Built by the [Amdocs Experience & Digital Engineering Studio](https://amdocs-studio.github.io/harmony-2.0).

---

## What is Harmony 2.0?

Harmony 2.0 is the documentation site for the Harmony framework — a curated stack
and folder architecture for building modern, scalable React applications. It
ships with predefined scripts, sensible defaults, and a modular `ui-modules`
structure so teams can deliver features instead of wiring up boilerplate.

## What's inside

- Best practice scripts that let you ship your app as fast as you can
- Static typing — TypeScript built-in with a pre-defined rule-set for safer code
- Real-time dispatching — Redux actions across clients via WebSockets out of the box
- Multilingual — easy to add and support multiple languages with `react-intl`
- Authentication mechanism wired into the SDK
- Modular architecture — opinionated `ui-modules` structure with Storybook and MSW ready

## Tech stack

| Layer           | Technology                                                            |
| --------------- | --------------------------------------------------------------------- |
| UI              | [React 19](https://react.dev) + [MUI](https://mui.com)                |
| State           | [Redux Toolkit](https://redux-toolkit.js.org) + `redux-persist`       |
| Styling         | [Tailwind CSS](https://tailwindcss.com) + Emotion                     |
| Language        | [TypeScript](https://www.typescriptlang.org)                          |
| Build           | [Vite](https://vite.dev) + `babel-plugin-react-compiler`              |
| Routing         | [React Router](https://reactrouter.com)                               |
| i18n            | [react-intl](https://formatjs.io/docs/react-intl)                     |
| Component dev   | [Storybook](https://storybook.js.org)                                 |
| API mocking     | [MSW](https://mswjs.io)                                               |

## Getting started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5001)
npm start

# Type-check, lint and build for production
npm run build

# Preview the production build locally
npm run preview
```

### Storybook

```bash
npm run storybook         # dev (http://localhost:6006)
npm run build-storybook   # static build
```

### Quick start a new Harmony project

```bash
npx harmony2 create
```

## Project layout

```
src/
  base-modules/        # sdk, theme, common-components, app-intl, mocks, feedback-handler
  ui-modules/          # self-contained, opinionated feature modules
  pages/               # routed pages (landing + docs)
```

Path aliases used throughout the codebase:

| Alias                | Path                                  |
| -------------------- | ------------------------------------- |
| `@sdk`               | `src/base-modules/sdk`                |
| `@theme`             | `src/base-modules/theme`              |
| `@ui-modules`        | `src/ui-modules`                      |
| `@pages`             | `src/pages`                           |
| `@msgs`              | `src/base-modules/app-intl`           |
| `@common-components` | `src/base-modules/common-components`  |
| `@feedback-handler`  | `src/base-modules/feedback-handler`   |
| `@mocks`             | `src/base-modules/mocks`              |

## Scripts

| Script                    | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| `npm start`               | Start the Vite dev server                            |
| `npm run build`           | Lint, type-check and produce a production build      |
| `npm run watch`           | Rebuild in watch mode (development)                  |
| `npm run preview`         | Serve the production build locally                   |
| `npm run lint`            | Run ESLint with auto-fix                             |
| `npm run storybook`       | Run Storybook in dev mode                            |
| `npm run build-storybook` | Build a static Storybook                             |
| `npm run deploy`          | Build and publish to GitHub Pages                    |

## Deployment

The docs site is deployed to GitHub Pages from the `dist/` folder via the
`gh-pages` package:

```bash
npm run deploy
```

The published site is available at
**[amdocs-studio.github.io/harmony-2.0](https://amdocs-studio.github.io/harmony-2.0)**.

## Documentation

For the full guide — getting started, client extensions, modules, flow manager,
multilingual support, RBAC, error handling, Storybook setup, and more — see the
live documentation:

> **[https://amdocs-studio.github.io/harmony-2.0](https://amdocs-studio.github.io/harmony-2.0)**

## License

Copyright (c) 2025 Amdocs Experience & Digital Engineering Studio.
See the [License](https://amdocs-studio.github.io/harmony-2.0) page in the docs
for details.
