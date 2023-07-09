/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  variants: {
    extend: {
      backdropFilter: ['responsive'], // enable backdrop-filter variants
    }
  },
  theme: {
    extend: {
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)', // or another value that suits your needs
      },
    },
  },
  plugins: [],
}