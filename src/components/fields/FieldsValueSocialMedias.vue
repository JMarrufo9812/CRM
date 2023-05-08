<template>
  <v-btn
    icon
    @click.stop="pushExteriorUrl(socialFormat.url)"
    :color="socialFormat.color"
    target="_blank"
  >
    <v-icon>{{ socialFormat.icon }}</v-icon>
  </v-btn>
</template>

<script>
// Mixins
import { socialMediaMixin } from '@/mixins/socialMediaMixin';

export default {
  name: 'FieldsValueSocialMedias',
  mixins: [socialMediaMixin],
  props: {
    social: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // Social media formated
    socialFormat() {
      return this.getSocialMedia(this.social);
    },
  },
};
</script>
