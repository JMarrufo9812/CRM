<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="field.value"
        :class="[
          inputProps ? inputProps.class : '',
          field.isRequired ? 'required' : '',
        ]"
        :rules="rules.phoneNumber"
        outlined
        :label="field.label || 'Teléfono'"
        type="tel"
        counter="10"
        maxlength="10"
        hide-details="auto"
        v-mask="'##########'"
        :prepend-icon="generateIcon(field.icon, 'mdi-format-text')"
        :dense="
          field.edit ? field.edit : inputProps ? inputProps.isDense : false
        "
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { fieldsMixin } from '@/mixins/fieldsMixin';

export default {
  name: 'FieldPhoneEdit',
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
      if (this.field.keyInput === 'phone') {
        return this.rules.general;
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
