/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#2d5f4f', light: '#3d7a65', dark: '#1e4038', muted: '#4a9e6b' },
        secondary: { DEFAULT: '#ff8c42', light: '#ffa564', dark: '#e6702a' },
        sand:      { DEFAULT: '#f7f5f0', dark: '#ece7dc' },
        cocais:    { cream: '#faf9f6', dark: '#12241d' },
        gold:      '#c4834a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        cocais: '0 15px 40px rgba(45,95,79,0.15)',
        earth: '0 12px 35px rgba(29, 64, 56, 0.18)',
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 10px 35px rgba(45,95,79,0.18)',
      },
      backgroundImage: {
        'gradient-cocais': 'linear-gradient(135deg, #2d5f4f 0%, #3d7a65 45%, #ff8c42 100%)',
      },
    },
  },
  plugins: [],
}