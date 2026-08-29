/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050608',
          900: '#090A0E',
          800: '#11131A',
          700: '#191C26',
        },
        charcoal: {
          900: '#12141C',
          800: '#1A1D28',
          700: '#252938',
          600: '#353B4E',
        },
        oak: {
          950: '#140E0A',
          900: '#1C140E',
          800: '#291D15',
          700: '#3D2B1F',
          600: '#583E2D',
          500: '#7B5740',
        },
        gold: {
          300: '#FDE087',
          400: '#F5D061',
          500: '#D4AF37',
          600: '#B89223',
          700: '#8C6E15',
        },
        amber: {
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.3))' },
          '100%': { opacity: '0.8', filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.6))' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #FDE087 0%, #D4AF37 50%, #8C6E15 100%)',
        'oak-gradient': 'linear-gradient(180deg, rgba(28, 20, 14, 0.95) 0%, rgba(9, 10, 14, 0.98) 100%)',
      },
    },
  },
  plugins: [],
};
