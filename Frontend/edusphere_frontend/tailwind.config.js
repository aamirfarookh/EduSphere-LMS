/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',  // Include HTML files in the src directory and its subdirectories
    './src/**/*.ts',    // Include TypeScript files (for Angular components) to scan for class usage
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

