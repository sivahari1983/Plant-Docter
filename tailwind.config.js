/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#F0FAF4',
          200: '#B7E4C7',
          400: '#40916C',
          500: '#52B788',
          600: '#2D6A4F',
          700: '#2D6A4F',
          900: '#1A3D2B',
        },
        sage: {
          100: '#D8F3DC',
          200: '#B7E4C7',
          300: '#74C69D',
        },
        soil: {
          50:  '#FDF6F0',
          200: '#E8C9B0',
          500: '#A0522D',
          600: '#6B4226',
          800: '#5C3D2E',
        },
        cream: {
          50:  '#FAFAF5',
          100: '#FAFAF5',
          300: '#EDE8D5',
        },
        amber: {
          50:  '#FFFBEB',
          400: '#F59E0B',
        },
        red: {
          50:  '#FEF2F2',
          500: '#EF4444',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['Nunito', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl:    '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        card:         '0 4px 24px rgba(0,0,0,0.08)',
        'card-lg':    '0 8px 40px rgba(0,0,0,0.12)',
        'card-hover': '0 4px 24px 0 rgba(26,61,43,0.14)',
        fab:          '0 4px 14px 0 rgba(45,106,79,0.35)',
      },
    },
  },
  plugins: [],
}
