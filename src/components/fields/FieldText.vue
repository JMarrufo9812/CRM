<template>
  <v-text-field
    outlined
    hide-details="auto"
    v-model="field.value"
    :rules="inputRules"
    :dense="field.edit ? field.edit : inputProps ? inputProps.isDense : false"
    :class="[
      inputProps ? inputProps.class : '',
      field.isRequired ? 'required' : '',
    ]"
    :label="field.label || 'Texto'"
    :prepend-icon="generateIcon(field.icon, 'mdi-format-text')"
    maxlength="50"
  ></v-text-field>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { fieldsMixin } from '@/mixins/fieldsMixin';

export default {
  name: 'FieldText',
  mixins: [rulesMixin, fieldsMixin],
  props: {
    field: {
      type: Object,
      required: true,
    },
    inputProps: {
      type: Object,
      required: false,
    },
    resetHandler: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputRules() {
      if (this.field.keyInput === 'name') {
        return this.rules.general;
      }
      if (this.field.keyInput === 'website') {
        return this.rules.website;
      }
      if (this.field.isRequired) {
        return this.rules.isRequired;
      }
      return [];
    },
  },
  watch: {
    resetValues(value) {
      if (!value) this.resetValues();
    },
  },
  methods: {
    resetValues() {
      delete this.field.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .no-icon } from ../../../../scss/components/fields';
</style>
