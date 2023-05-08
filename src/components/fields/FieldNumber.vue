<template>
  <v-text-field
    @input="updateValue"
    :value="field.value ? field.value : 0"
    :dense="inputProps ? inputProps.isDense : false"
    :prepend-icon="field.icon ? field.icon : 'mdi-numeric'"
    type="number"
    :rules="field.isRequired ? rules.isRequired : []"
    :min="0"
    hide-details="auto"
    outlined
    :class="[
      inputProps ? inputProps.class : '',
      field.isRequired ? 'required' : '',
    ]"
    :label="field.label || 'Número'"
  ></v-text-field>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldNumber',
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
  mixins: [rulesMixin],
  mounted() {
    this.field.value = this.field.value ? this.field.value : 0;
  },
  watch: {
    resetValues(value) {
      if (!value) this.resetValues();
    },
  },
  methods: {
    updateValue(value) {
      if (value > 0) {
        this.field.value = parseInt(value, 10);
      } else {
        this.field.value = 0;
      }
    },
    resetValues() {
      delete this.field.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .no-icon } from ../../../../scss/components/fields';
</style>
