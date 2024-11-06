/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg1': "url('/public/hero-bg1.jpg')",
        'hero-bg2': "url('/public/hero-bg2.jpg')",
        'hero-bg3': "url('/public/hero-bg3.webp')",
      },
      gridTemplateColumns: {
        'hero': '1fr 2fr',
      },
      gridTemplateRows: {
        hero: "1fr 1fr 1fr 1fr",
      }
    },
  },
  plugins: [],
}

