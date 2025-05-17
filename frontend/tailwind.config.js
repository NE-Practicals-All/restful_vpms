/** @type {import('@tailwindcss/postcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       primary: '#059669',        // Emerald green
        secondary: '#10B981',      // Light green
        accent: '#D1FAE5',         // Soft green background

        // 📊 Chart/Alert colors
        chartRed: '#DC2626',       // Strong red for danger
        chartGreen: '#22C55E',     // Bright green for success
        chartYellow: '#EAB308',    // Golden yellow for warnings

        // 🎨 Optional Extras (UI)
        background: '#F0FDF4',     // Very light green background
        dark: '#065F46',           // Deep green for footers or emphasis
        muted: '#6B7280',          // 
      },
    },
  },
  plugins: [],
}