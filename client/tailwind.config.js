module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        'dark-main': '#1f292f',
        'dark-detail': '#2c3d47',
        'dark-contrast': '#6fbbe0',
        'dark-text': '#94a3b8',
        'dark-contrast-detail': '#e5e7eb',
        'dark-highlight': '#35b0e9',
        'light-text': '#888',
        'light-detail': '#fff',
        'light-highlight': '#000',
        'light-main': '#f6f6f6',
        'light-contrast': '#888',
        'light-contrast-detail': '#000'
      },
      boxShadow: {
        'dark-inner': 'inset 0 0 0 1px #ffffff1a'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
