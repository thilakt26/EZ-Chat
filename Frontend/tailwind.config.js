/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This line tells Tailwind to look for classes in these file types
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
