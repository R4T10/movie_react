/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',      
        'sml': '512px',     
        'sm': '640px',     
        'md2s': '600px',    
        'mds': '655px',     
        'mdl': '690px',     
        'md': '768px',      
        'lgs': '850px',     
        'lgl': '928px',     
        'lg': '1024px',     
        'xl': '1280px',     
        '2xl': '1536px',    
      },
    },
  },
  plugins: [],
}
