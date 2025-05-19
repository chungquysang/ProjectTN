/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // For React projects
    "./src/**/*.{js,jsx,ts,tsx}",
    // For Next.js projects
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}