/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // --- YEH AAPKA PURANA CODE HAI ---
        'fade-in-scale': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        // --- YEH NAYA CODE ADD KIYA GAYA HAI ---
        'kenburns': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(-2%, 2%)' },
        },
      },
      animation: {
        // --- YEH AAPKA PURANA CODE HAI ---
        'fade-in-scale': 'fade-in-scale 0.3s ease-out forwards',
        // --- YEH NAYA CODE ADD KIYA GAYA HAI ---
        'kenburns': 'kenburns 15s ease-out infinite alternate-reverse',
      },
    },
  },
  plugins: [],
}