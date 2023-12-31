/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio:{
        'loginForm' : '12 / 16',
        'video': '16 / 9',
        'square':'1 / 1',
        'image':'14/10'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation:{
        'pulse-slow':'pulse 2s infinite',
        'ping-slow':'ping 2s infinite'
      },
    },
  },
  plugins: [],
}
