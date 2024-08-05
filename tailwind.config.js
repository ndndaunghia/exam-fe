/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#009e6a',
          light: '#33b187',
          dark: '#006e4a',
        },
        secondary: {
          DEFAULT: '#00799c',
          light: '#008498',
          dark: '#006E9A',
        },
        third: {
          DEFAULT: '#c6ff00',
          light: '#d1ff33',
          dark: '#8ab200',
        },
        dark: {
          DEFAULT: '#0f172a',
          light: '#1e293b'
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(304deg, rgba(0,158,106,1) 0%, rgba(0,121,156,1) 100%)',
      },
    },
},
plugins: [],
}

