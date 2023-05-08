export const fieldsMixin = {
  methods: {
    generateIcon(icon, defaultIcon) {
      if (icon === 'no-icon') {
        return null;
      }
      if (icon) {
        return icon;
      }
      return defaultIcon;
    },
  },
};
