const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./views/**/*.{html,js,hbs}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
