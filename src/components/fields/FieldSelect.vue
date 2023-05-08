<template>
  <div>
    <v-select
      :value="field.value"
      :prepend-icon="field.icon"
      :items="items"
      item-text="name"
      item-value="name"
      :rules="field.select ? rules.select : []"
      outlined
      hide-details="auto"
      :class="[field.isRequired ? 'required' : '']"
      :label="field.label || 'Seleccionar'"
    ></v-select>
  </div>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldSelect',
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
