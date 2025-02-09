export default defineAppConfig({
  ui: {
    colors: {
      primary: "lime",
      neutral: "zinc",
    },
    button: {
      slots: {
        base: "cursor-pointer",
      },
    },
    navigationMenu: {
      slots: {
        linkLabel: "text-md",
      },
    },
  },
});
