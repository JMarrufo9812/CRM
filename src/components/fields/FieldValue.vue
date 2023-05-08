<template>
  <div>
    <template>
      <span class="black--text break">
        {{ getValueField(this.field) }}
      </span>
      <span v-if="field.keyInput === 'value'">MXN</span>
    </template>
    <template v-if="field.keyInput === 'phones'">
      <span
        class="black--text d-block"
        v-for="(phone, index) in field.value"
        :key="index"
      >
        {{ phone.number }}
      </span>
    </template>
    <template v-else-if="field.type === 'SOCIAL_MEDIAS'">
      <span
        class="black--text"
        v-for="social in field.value"
        :key="social.type"
      >
        <FieldsValueSocialMedias
          :social="social"
          v-if="social.url"
        ></FieldsValueSocialMedias>
      </span>
    </template>
    <template v-else-if="field.type === 'CHECKBOX'">
      <span
        class="black--text d-block"
        v-for="(value, index) in field.value"
        :key="index"
      >
        {{ value }}
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FieldValue',
  components: {
    FieldsValueSocialMedias: () =>
      import('@/components/fields/FieldsValueSocialMedias.vue'),
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listSocial: [
        {
          type: 'facebook',
          url: '',
        },
        {
          type: 'twitter',
          icon: 'url',
        },
        {
          type: 'linkedin',
          icon: 'url',
        },
        {
          type: 'instagram',
          url: '',
        },
        {
          type: 'other',
          url: '',
        },
      ],
    };
  },
  methods: {
    getValueField(field) {
      if (field.keyInput) {
        if (field.keyInput === 'phones') {
          return '';
        }
        if (field.keyInput === 'isClient') {
          return field.value ? 'Cliente antiguo' : 'Cliente nuevo';
        }
        if (field.keyInput === 'socialMedias') {
          return '';
        }
      }
      if (field.keyInput === 'value') {
        return field.value.toFixed(2);
      }
      if (field.type === 'CHECKBOX') {
        return '';
      }
      return field.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.break {
  word-break: break-word;
}
</style>
