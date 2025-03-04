export default defineAppConfig({
  ui: {
    colors: {
      primary: 'sky',
      neutral: 'zinc',
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    selectMenu: {
      slots: {
        base: 'cursor-pointer'
      }
    },
    navigationMenu: {
      slots: {
        linkLabel: 'text-md',
      },
    },
  },
})
