import { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "var(--color-text-primary)",
        muted: "var(--color-text-muted)",
        "primary-hover": "var(--color-text-primary-hover)",
        inverted: "var(--color-text-inverted)",
      },
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        muted: "var(--color-bg-muted)",
        active: "var(--color-bg-active)",
        border: "var(--color-bg-border)",
      },
      borderColor: {
        primary: "var(--color-border-primary)",
        secondary: "var(--color-border-secondary)",
      },
      button: {
        primary: {
          base: "var(--color-button-primary-base)",
          hover: "var(--color-button-primary-hover)",
          active: "var(--color-button-primary-hover)",
          border: "var(--color-button-primary-border)",
        },
        secondary: {
          base: "var(--color-button-secondary-base)",
          hover: "var(--color-button-secondary-hover)",
          active: "var(--color-button-secondary-active)",
          border: "var(--color-button-secondary-border)",
        },
        accent: {
          base: "var(--color-button-accent-base)",
          hover: "var(--color-button-accent-hover)",
          active: "var(--color-button-accent-active)",
          border: "var(--color-button-accent-border)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
