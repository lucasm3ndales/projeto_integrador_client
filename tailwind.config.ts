import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
      './src/**/*.{html,js,jsx,ts,tsx}',
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "#f1f5f9",
          primary: "#1e3a8a",
          secondary: "#475569",
          tertiary: "#1e293b",
          error: "#e11d48",
          success: "#059669",
          
          dark: {
            background: "#1e293b",
            primary: "#fbbf24",
            secondary: "#f1f5f9",
            tertiary: "#475569",
          }
        }
      },
    },
    darkMode: 'class',
    plugins: [nextui()]
}
export default config
