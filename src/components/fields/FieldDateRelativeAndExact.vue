<template>
  <div>
    <v-menu
      v-if="!isRelativeDate"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="field.value"
          :label="field.label || 'Fecha'"
          :dense="inputProps ? inputProps.isDense : false"
          :prepend-icon="field.icon ? field.icon : 'mdi-calendar'"
          readonly
          v-bind="attrs"
          v-on="on"
          outlined
          hide-details="auto"
          :class="[
            inputProps ? inputProps.class : '',
            field.isRequired ? 'required' : '',
          ]"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="field.value"
        @input="menu = false"
        :max="maxDate"
        :min="minDate"
      ></v-date-picker>
    </v-menu>
    <v-select
      v-if="isRelativeDate"
      v-model="field.value"
      :items="typeTimes"
      item-text="text"
      item-value="value"
      label="Tiempo relativo"
      hide-details="auto"
      dense
      outlined
    ></v-select>
    <div class="d-flex justify-center">
      <v-btn x-small @click="isRelativeDate = !isRelativeDate">
        {{ isRelativeDate ? 'Fecha exacta' : 'Tiempo relativo' }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { dateMixin } from '@/mixins/dateMixin';

export default {
  name: 'FieldDate',
  mixins: [dateMixin],
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
      date: this.field.value,
      isRelativeDate: true,
      typeTimes: [
        { text: 'Último trimestre', value: 'last_quarter' },
        { text: 'Este trimestre', value: 'this_quarter' },
        { text: 'Ultimo mes', value: 'last_month' },
        { text: 'Este mes', value: 'this_month' },
        { text: 'Última semana', value: 'last_week' },
        { text: 'Esta semana', value: 'this_week' },
      ],
    };
  },
  mounted() {
    const format = Date.parse(this.field.value);
    if (format) {
      this.isRelativeDate = false;
    } else {
      this.isRelativeDate = true;
    }
  },
  watch: {
    isRelativeDate(value) {
      if (!value) this.field.value = moment().format('YYYY-MM-DD');
      else {
        this.field.value = '';
      }
    },
  },
  methods: {
    changeMode() {
      this.isRelativeDate = !this.isRelativeDate;
    },
    resetValues() {
      delete this.field.defaultValue;
      delete this.field.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .no-icon } from ../../../../scss/components/fields';
</style>
