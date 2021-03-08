module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      top: '#ebf5ff',
      contents: '#edf2f7',
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      href: '#0f83fd',
    }),
    extend: {
      minHeight: {
        main: 'calc(100vh - 8rem)', // ヘッダーとフッター分を小さく
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/custom-forms')],
}
