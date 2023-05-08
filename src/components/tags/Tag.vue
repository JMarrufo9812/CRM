<template>
  <v-chip
    :color="item.color"
    :text-color="getBestColor(item.color)"
    class="text-uppercase font-weight-bold"
    small
  >
    <v-avatar><v-icon small>mdi-tag-outline</v-icon></v-avatar>
    <span class="text-truncate">
      {{ item.name }}
    </span>
  </v-chip>
</template>

<script>
export default {
  name: 'FieldTag',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Get the best color the text to show over a background color
    // Return if is white or black, depending of the background color
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
</script>
