<template>
  <v-row>
    <v-col cols="12" class="pr-0" align="center">
      <v-divider></v-divider>
      <p class="text-button">
        Agregar redes sociales:
      </p>
      <v-btn
        outlined
        color="blue"
        class="mr-1"
        @click="addSocialMedia('facebook')"
      >
        <v-icon>
          mdi-facebook
        </v-icon>
        <v-icon small>
          mdi-plus
        </v-icon>
      </v-btn>
      <v-btn
        outlined
        color="#0e76a8"
        class="mr-1"
        @click="addSocialMedia('linkedin')"
      >
        <v-icon>
          mdi-linkedin
        </v-icon>
        <v-icon small>
          mdi-plus
        </v-icon>
      </v-btn>
      <v-btn
        outlined
        color="#bc2a8d"
        class="mr-1"
        @click="addSocialMedia('instagram')"
      >
        <v-icon>
          mdi-instagram
        </v-icon>
        <v-icon small>
          mdi-plus
        </v-icon>
      </v-btn>
      <v-btn
        outlined
        color="#00acee"
        class="mr-1"
        @click="addSocialMedia('twitter')"
      >
        <v-icon>
          mdi-twitter
        </v-icon>
        <v-icon small>
          mdi-plus
        </v-icon>
      </v-btn>

      <v-btn @click="addSocialMedia('other')" outlined color="#8E8E8E">
        <v-icon class="mr-2">
          mdi-account-multiple-plus-outline
        </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="10" class="pr-0">
      <v-text-field
        v-for="(socialMedia, index) in socialMedias.format"
        :key="index"
        v-model="socialMedia.value"
        :rules="rules[socialMedia.type]"
        :prepend-icon="socialMedia.icon"
        :label="socialMedia.title"
        outlined
        @change="updateValue(socialMedia.value)"
      ></v-text-field>
    </v-col>
    <v-col cols="2" class="pl-0 pt-5">
      <v-btn
        large
        icon
        class="mb-10"
        v-for="(socialMedia, index) in socialMedias.format"
        :key="index"
        @click="deleteSocialMedia(index)"
      >
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldSocialMediasMultiple',
  mixins: [rulesMixin],
  props: {
    field: {
      type: Object,
      required: true,
    },
    resetHandler: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      socialMedias: {
        fields: [],
        format: [],
      },
    };
  },
  watch: {
    resetHandler() {
      if (!this.resetHandler) this.resetValues();
    },
  },
  methods: {
    updateValue(value) {
      const [, , , profile] = value.split('/');
      if (profile) {
        this.field.value = this.socialMedias.format.map((socialMedia) => {
          return { type: socialMedia.type, url: socialMedia.value };
        });
      }
    },
    addSocialMedia(type) {
      const verification = this.socialMedias.fields.includes(type);
      if (!verification) {
        this.socialMedias.fields.push(type);
        this.socialMedias.format.push({
          title: type === 'other' ? 'otro' : type,
          value:
            type === 'other' ? 'https://otra.com/' : `https://${type}.com/`,
          type,
          icon: type === 'other' ? 'mdi-account-supervisor' : `mdi-${type}`,
        });
      }
    },
    deleteSocialMedia(index) {
      this.socialMedias.format.splice(index, 1);
      this.socialMedias.fields.splice(index, 1);
      if (this.field.value) this.field.value.splice(index, 1);
    },
    resetValues() {
      delete this.field.value;
      this.socialMedias = {
        fields: [],
        format: [],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn:not(.v-btn--round).v-size--default {
  padding: 0 0px;
}
</style>
