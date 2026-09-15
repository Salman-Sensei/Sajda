/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EC',
        card: '#FDFBF7',
        charcoal: '#2B2B27',
        ink: '#55534D',
        line: '#E7E1D4',
        sage: '#5B7A5B',
        sagelight: '#EAF0E7',
        rose: '#B5615B',
        roselight: '#F6E9E7',
        neutral2: '#9C978B',
        neutrallight: '#EFEDE7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
      },
      transitionDuration: {
        150: '150ms',
        250: '250ms',
      },
    },
  },
  plugins: [],
}
