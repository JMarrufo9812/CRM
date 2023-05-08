<template>
  <v-menu
    ref="menu"
    v-model="menuSelectorRange"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="none"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        outlined
        v-bind="attrs"
        v-on="on"
        :value="dateRangeText"
        dense
        append-icon="mdi-menu-down"
        readonly
        hide-details="auto"
      ></v-text-field>
    </template>
    <v-date-picker
      class="menuPicker"
      v-model="datesSelected"
      range
      no-title
      show-adjacent-months
      color="success"
      :show-current="false"
      min="2010"
      @change="updateSelect"
    >
      <v-btn outlined color="error" @click="clearSelectorRange">
        Limpiar
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$refs.menu.save(datesSelected)">
        Aceptar
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PeriodRange',
  props: {
    defaultSelect: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      datesSelected: [],
      menuSelectorRange: false,
    };
  },
  created() {
    this.datesSelected = this.defaultSelect.length
      ? this.defaultSelect
      : [
          moment()
            .startOf('month')
            .format('YYYY-MM-DD'),
          moment()
            .endOf('month')
            .format('YYYY-MM-DD'),
        ];

    this.updateSelect();
  },
  computed: {
    dateStart() {
      return moment(this.datesSelected[0]).format();
    },
    dateEnd() {
      return moment(this.datesSelected[1]).format();
    },
    minDate() {
      return this.datesSelected.length > 0 ? this.datesSelected[0] : '';
    },
    dateRangeText() {
      return this.datesSelected.length === 2
        ? `De ${this.formatNormal(this.datesSelected[0])} a ${this.formatNormal(
            this.datesSelected[1],
          )}`
        : 'Sin rango de fecha';
    },
  },
  methods: {
    formatNormal(dateISO) {
      return moment(dateISO).format('L');
    },
    clearSelectorRange() {
      this.filterDate = '';
      this.datesSelected = [];
    },
    updateSelect() {
      this.$emit('change', [
        moment(this.datesSelected[0]).format(),
        moment(this.datesSelected[1]).format(),
      ]);
    },
  },
};
</script>

<style lang="scss" scoped>
.btnSelect ::v-deep .v-btn__content {
  opacity: 1 !important;
}
</style>
