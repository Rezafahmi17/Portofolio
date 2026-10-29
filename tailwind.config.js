const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
      serif: ['"Instrument Serif"', ...defaultTheme.fontFamily.serif],
      condensed: ['"Anton"', 'Impact', ...defaultTheme.fontFamily.sans],
      display: ['"Anton"', '"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
      mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        canvas: '#F6F5F0',
        surface: '#EBE9E1',
        ink: '#121212',
        backstage: '#0E0E0E',
        cream: '#F4EFE6',
        muted: '#6E6D68',
        accent: '#FF3B00',
        cobalt: '#1D4ED8',
        stagePink: '#E83677',
        stageYellow: '#F4BE2A',
        stagePurple: '#6E44FF',
        stageBlue: '#5CC2E8',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
