<template>
  <v-text-field
    v-model="date"
    @input="formatDate"
    @keydown.backspace="deleteDate"
    outlined
    clearable
    v-mask="'##/##'"
    hide-details="auto"
    :dense="field.edit"
    :label="field.label"
    :prepend-icon="generateIcon(field.icon, 'mdi-calendar')"
    placeholder="Día/Mes"
  ></v-text-field>
</template>

<script>
import { fieldsMixin } from '@/mixins/fieldsMixin';

export default {
  name: 'FieldBirthday',
  mixins: [fieldsMixin],
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
  data() {
    return {
      date: this.field.value || '',
    };
  },
  watch: {
    resetValues(value) {
      if (!value) this.resetValues();
    },
  },
  methods: {
    deleteDate() {
      this.date = '';
      this.field.value = this.date;
    },
    formatDate(value) {
      if (value) {
        const [day, month] = value.split('/');
        if (day.length === 1) {
          this.date = `0${day}/01`;
        }
        if (parseInt(day, 10) > 31) {
          this.date = `0${day.split('')[0]}/${day.split('')[1]}`;
        }
        if (parseInt(day, 10) === 0) {
          this.date = `01${day.split('')[0]}/${day.split('')[1]}`;
        }
        if (month) {
          if (month.length === 1) {
            this.date = `${day}/0${month}`;
          }
          if (parseInt(month, 10) === 0) {
            this.date = `${day}/01`;
          }
          if (parseInt(month[0], 10) > 1) {
            this.date = `${day}/01`;
          }
          if (parseInt(month, 10) > 12) {
            this.date = `${day}/12`;
          }
        } else {
          this.date = `${day}/01`;
        }
      }
      this.field.value = this.date;
    },
    resetValues() {
      delete this.field.value;
      this.date = '';
    },
  },
};
</script>
