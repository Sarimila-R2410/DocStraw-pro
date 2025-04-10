/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F4C81',
        'primary-dark': '#0A3A61',
        secondary: '#2C7BE5',
        accent: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 