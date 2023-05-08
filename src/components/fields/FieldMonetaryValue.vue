<template>
  <VuetifyMoney
    v-model.number="field.value"
    :dense="inputProps ? inputProps.isDense : false"
    :prependIcon="field.icon ? field.icon : 'mdi-cash-multiple'"
    :rules="field.isRequired ? rules.isRequired : []"
    :class="[
      inputProps ? inputProps.class : '',
      field.isRequired ? 'required' : '',
    ]"
    :label="field.label || 'Cantidad'"
    :hide-details="'auto'"
    :outlined="true"
    :options="inputMoneyOptions"
  />
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { vuetifyMoneyMixin } from '@/mixins/vuetifyMoneyMixin';

export default {
  name: 'FieldMonetaryValue',
  mixins: [rulesMixin, vuetifyMoneyMixin],
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
