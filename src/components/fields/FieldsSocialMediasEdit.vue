<template>
  <div>
    <div v-for="(social, index) in this.field.value" :key="social.type">
      <v-text-field
        v-model="social.url"
        @input="updateSocialMedia(social, index)"
        :rules="rules[social.type]"
        dense
        outlined
        class="mb-1"
        hide-details="auto"
        :placeholder="
          social.type !== 'other'
            ? `https://${social.type}.com/`
            : `https://otra.com/`
        "
        :color="social.color"
        :prepend-inner-icon="social.icon"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
// Mixins
import { socialMediaMixin } from '@/mixins/socialMediaMixin';
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldSocialMediasEdit',
  mixins: [socialMediaMixin, rulesMixin],
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  // Init social media
  created() {
    this.initSocialMedia();
  },
  methods: {
    initSocialMedia() {
      // en caso de que el value no tenga ninguna red social
      if (this.field.value.length === 0) {
        this.field.value = this.listSocial.map((social) => {
          return social;
        });
      } else {
        // cuando el value tiene algunas redes sociales
        this.field.value = this.listSocial.map((socialMedia) => {
          const existSocialMedia = this.field.value.some(
            ({ type }) => type === socialMedia.type,
          );

          if (existSocialMedia) {
            const socialMediaFounded = this.field.value.find(
              ({ type }) => type === socialMedia.type,
            );
            // eslint-disable-next-line
            socialMedia.url = socialMediaFounded.url;
          }

          return socialMedia;
        });
      }
    },
    updateSocialMedia(socialMedia, index) {
      this.$emit('outValue', {
        keyInput: 'socialMedias',
        input: socialMedia,
        index,
      });
    },
  },
};
</script>
