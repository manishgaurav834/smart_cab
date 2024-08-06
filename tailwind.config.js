/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg1': "url('/src/images/bg1.jpg')",
        'bg2': "url('/src/images/bg5.jpg')",
        
        
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

