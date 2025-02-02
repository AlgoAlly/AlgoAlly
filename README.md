# AlgoAlly Frontend

This repository holds the frontend code for the AlgoAlly Project. Please refer to the UI mockups on our figma [here](https://www.figma.com/design/fMrWwmeOtKXrEAcW4NzPUE/AlgoAlly-Mockup-Final?m=auto&t=BXy9fdfvqVKK4NrU-1). We will be basing our UI from the Linear design system found in the design doc linked above.

## Getting Started

### Using Containers

Intead of running the project on your local system, this repository comes with a Dockerfile and docker-compose file to get you started. Please ensure you have [docker](https://docs.docker.com/get-started/get-docker/) installed on your system and simply run

`npm run dev`

For a dev environment.

### Running Locally

Please ensure you have Node.js version `22.13.1` or `nvm use node --lts` running on your system. You can use the `npm run dev-local` script. Please be sure you have all dependencies installed with `npm install .`.

## Adding Pages & Components

To keep things organized please add your components in the `/src/components` folder and pages under the `src/pages` folder.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
