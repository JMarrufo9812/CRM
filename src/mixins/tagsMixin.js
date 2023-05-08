export const tagsMixin = {
  methods: {
    // getTags(type) {
    //   this.isLoading = true;
    //   this.type = type;
    //   this.$apollo
    //     .query({
    //       query: GET_TAGS,
    //       variables: {
    //         filters: { type },
    //       },
    //     })
    //     .then(({ data: { customTags } }) => {
    //       this.tags = this.formatTags(customTags);
    //       this.isLoading = false;
    //     })
    //     .catch(() => {
    //       this.isError = true;
    //     });
    // },
    getBestColor(color) {
      // Validation a color hex with #
      if (color && color.includes('#')) {
        // Remove # of the hex color
        // Assign RGB number
        const [r, g, b] = color
          .replace('#', '')
          .match(/.{1,2}/g)
          .map((number) => parseInt(number, 16));
        // Formule to check is a color dark or white
        const hsp = Math.sqrt(
          0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b),
        );
        // Umbral to decite if is dark or white
        if (hsp > 135) {
          return 'dark';
        }
        return 'white';
      }
      // Return default or empty
      return '';
    },
  },
};
