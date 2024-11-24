/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gradientColorStops: {
        'transparent-orange': 'rgba(214, 83, 38, 0)',
        orange: '#D65326',
      },
    },
  },
  plugins: [],
}