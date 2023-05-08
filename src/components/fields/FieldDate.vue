<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="dateValue"
        :label="field.label || 'Fecha'"
        :dense="inputProps ? inputProps.isDense : false"
        :prepend-icon="field.icon ? field.icon : 'mdi-calendar'"
        readonly
        clearable
        v-bind="attrs"
        v-on="on"
        outlined
        hide-details="auto"
        :class="[
          inputProps ? inputProps.class : '',
          field.isRequired ? 'required' : '',
        ]"
        @click:clear="resetValues"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="field.value"
      @input="menu = false"
      :max="maxDate"
      :min="minDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
// Libraries
import moment from 'moment';
import { rulesMixin } from '@/mixins/rulesMixin';
import { dateMixin } from '@/mixins/dateMixin';

export default {
  name: 'FieldDate',
  mixins: [rulesMixin, dateMixin],
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
  data() {
    return {
      menu: false,
      // dateValue: this.field.value ? moment(this.field.value).format('LL') : '',
    };
  },
  computed: {
    dateValue() {
      if (this.field.value) return moment(this.field.value).format('LL');
      return '';
    },
  },
  watch: {
    resetHandler(value) {
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
