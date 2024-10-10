import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,page.tsx,api.ts,api.tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.page.tsx", "**/*.api.ts", "**/*.api.tsx"],
};
export default config;
