<template>
  <v-row>
    <v-col cols="12">
      <v-select
        v-model="periodSelected"
        :items="periodsPredefined"
        item-value="id"
        item-text="text"
        label="Período"
        outlined
        dense
        hide-details="auto"
        @change="updateSelect"
      ></v-select>
    </v-col>
    <v-col cols="12" v-if="periodSelected === 'CUSTOM'">
      <PeriodRange
        :defaultSelect="periodRange"
        @change="updatePeriodRange"
      ></PeriodRange>
    </v-col>
  </v-row>
</template>

<script>
import PeriodRange from '@/components/charts/filters/PeriodRange.vue';
import { periods } from '@/constants/periods';

export default {
  name: 'PeriodPredefined',
  components: { PeriodRange },
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
      periodRange: [],
      periodSelected: '',
      periodsPredefined: periods,
    };
  },
  watch: {
    defaultSelect(newValue, beforeValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(beforeValue)) {
        [this.periodSelected = '', this.periodRange = []] = newValue;
        this.updateSelect();
      }
    },
  },
  created() {
    [this.periodSelected = '', this.periodRange = []] = this.defaultSelect;
    this.updateSelect();
  },
  methods: {
    updatePeriodRange(periodRange) {
      this.periodRange = periodRange;
      this.updateSelect();
    },
    updateSelect() {
      let period = [];
      let periodText = '';
      let periodTextCompare = '';
      if (this.periodSelected.length > 0 && this.periodSelected !== 'CUSTOM') {
        period = this.getPeriod(this.periodSelected).get();
        periodText = this.getPeriod(this.periodSelected).text;
        periodTextCompare = this.getPeriod(this.periodSelected).textCompare;
      }
      if (
        this.periodSelected.length > 0 &&
        this.periodSelected === 'CUSTOM' &&
        this.periodRange.length > 0
      ) {
        period = this.periodRange;
        periodText = this.getPeriod(this.periodSelected).text;
        periodTextCompare = this.getPeriod(this.periodSelected).textCompare;
      }
      if (
        this.periodSelected.length > 0 &&
        period.length > 0 &&
        period.length > 0
      ) {
        this.$emit('change', [
          this.periodSelected,
          period,
          periodText,
          periodTextCompare,
        ]);
      }
    },
    getPeriod(id) {
      return this.periodsPredefined.find((period) => {
        return period.id === id;
      });
    },
  },
};
</script>

<style></style>
