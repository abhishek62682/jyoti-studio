// Tailwind CDN (Play) config — keeps the font-primary / font-secondary
// utilities working the same way the old @theme build used to.
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        primary: ["Soligant", "Georgia", "Times New Roman", "serif"],
        secondary: ["Barlow", "sans-serif"],
      },
    },
  },
};
