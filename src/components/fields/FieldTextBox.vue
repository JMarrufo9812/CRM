<template>
  <v-textarea
    v-model="field.value"
    :dense="inputProps ? inputProps.isDense : false"
    :prepend-icon="field.icon ? field.icon : 'mdi-format-textbox '"
    :rules="field.isRequired ? rules.isRequired : []"
    hide-details="auto"
    outlined
    :class="[field.isRequired ? 'required' : '']"
    :label="field.label || 'Texto'"
  ></v-textarea>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldText',
  mixins: [rulesMixin],
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
