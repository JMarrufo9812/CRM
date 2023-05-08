<template>
  <v-text-field
    outlined
    hide-details="auto"
    v-model="field.value"
    :type="field.type"
    :dense="field.edit"
    :prepend-icon="generateIcon(field.icon, 'mdi-email')"
    :rules="
      field.isRequired
        ? [...rules.email, ...rules.isRequired]
        : [...rules.email]
    "
    :class="[field.isRequired ? 'required' : '']"
    :label="field.label || 'Correo'"
    maxlength="50"
  ></v-text-field>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { fieldsMixin } from '@/mixins/fieldsMixin';

export default {
  name: 'FieldEmail',
  mixins: [rulesMixin, fieldsMixin],
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
