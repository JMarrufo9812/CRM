<template>
  <v-text-field
    v-model="field.value"
    class="inputPhone"
    :prepend-icon="field.icon ? field.icon : 'mdi-phone'"
    :rules="
      field.isRequired
        ? [...rules.isRequired, ...rules.phoneNumber]
        : rules.phoneNumber
    "
    hide-details="auto"
    outlined
    v-mask="'##########'"
    type="tel"
    :class="[field.isRequired ? 'required' : '']"
    :label="field.label || 'Teléfono'"
  ></v-text-field>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldPhone',
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
