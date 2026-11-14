export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF6EA', ivory: '#FFFCF5', sand: '#F3E9D2', gold: '#B08D3F', 'gold-soft': '#E6D3A3',
        'gold-light': '#F3E2A9', maroon: '#7A1E2E', wine: '#4A1020', ink: '#3A2A22',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Tiro Devanagari Marathi"', 'serif'],
        body: ['Mukta', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(122,30,46,0.18)',
        lift: '0 30px 60px -20px rgba(74,16,32,0.35), 0 8px 20px -8px rgba(74,16,32,0.2)',
      },
    },
  },
  plugins: [],
}
