import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor:{
        'dark-mode':'hsl(207, 26%, 17%)',
        'light-mode':'hsl(0, 0%, 90%)'

      },
      colors:{
        'dark-blue-dark-element':'hsl(209, 23%, 22%)',
        'dark-blue-light-text':'hsl(200, 15%, 8%)',
        'white-dark-text':'hsl(0, 0%, 100%)',
        'white-light-element':'hsl(0, 0%, 100%)',
        'dark-gray-input':'hsl(0, 0%, 52%)'
      },
      fontSize:{
        'homepage-items':'0.9rem',
        'detailpage':'1rem',

      }
    },
  },
  plugins: [],
}
export default config
