import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#05060A',
        surface: '#111827',
        accent: '#FF3B5C',
        glow: '#61DAFF',
      },
      boxShadow: {
        glow: '0 0 32px rgba(99, 102, 241, 0.18)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
