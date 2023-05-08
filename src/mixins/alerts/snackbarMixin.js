export const snackbarMixin = {
  data() {
    return {
      snackbar: {
        isOpen: false,
        color: '',
        text: '',
      },
    };
  },
  methods: {
    snackbarHandler({ isOpen, color, text }) {
      this.snackbar = { isOpen, color, text };
    },
  },
};
