<template>
  <v-row>
    <v-col cols="12">
      <v-select
        v-model="itemSelected"
        :items="itemsCompare"
        item-value="id"
        item-text="text"
        label="Comparar con:"
        outlined
        dense
        hide-details="auto"
      ></v-select>
    </v-col>
    <v-col cols="12" v-if="itemSelected === 'date'">
      <Select
        name="Elige la fecha"
        :list="listCompare"
        @change="updatePeriodSelected"
      ></Select>
    </v-col>
    <v-col
      cols="12"
      v-if="
        itemSelected === 'date' && periodCompare.periodSelected === 'CUSTOM'
      "
    >
      <PeriodRange
        :defaultSelect="periodRange"
        @change="updatePeriodRange"
      ></PeriodRange>
    </v-col>
    <v-col cols="12" v-if="itemSelected === 'user'">
      <SelectUser all @change="updateUserCompare"></SelectUser>
    </v-col>
  </v-row>
</template>

<script>
import Select from '@/components/charts/filters/Select.vue';
import PeriodRange from '@/components/charts/filters/PeriodRange.vue';
import SelectUser from '@/components/charts/filters/SelectUser.vue';
import { periodsToCompare } from '@/constants/periods';

export default {
  name: 'ComparePeriod',
  components: {
    Select,
    PeriodRange,
    SelectUser,
  },
  props: {
    periodPredefined: {
      type: String,
      default: '',
    },
    hasUserCompare: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      periodRange: [],
      periodCompare: {
        periodSelected: '',
        periodRange: '',
      },
      isCompare: false,
      periodToCompare: '',
      listCompare: periodsToCompare,
      itemSelected: 'none',
      userSelected: {},
    };
  },
  watch: {
    itemSelected: {
      handler() {
        this.update();
      },
      immediate: true,
    },
    periodPredefined: {
      handler() {
        this.updatePeriodSelected(this.periodCompare.periodSelected);
      },
      immediate: true,
    },
  },
  computed: {
    itemsCompare() {
      if (!this.hasUserCompare) {
        return [
          { id: 'none', text: 'Ninguno' },
          { id: 'date', text: 'Fecha' },
        ];
      }
      return [
        { id: 'none', text: 'Ninguno' },
        { id: 'date', text: 'Fecha' },
        { id: 'user', text: 'Usuario' },
      ];
    },
  },
  methods: {
    findPeriod(idPeriod) {
      return this.listCompare.find((period) => period.id === idPeriod);
    },
    updatePeriodRange(periodRange) {
      this.periodCompare.periodRange = periodRange;
      this.update();
    },
    updatePeriodSelected(idPeriod) {
      this.periodCompare.periodSelected = idPeriod;
      if (this.periodCompare.periodSelected !== 'CUSTOM') {
        const resultPeriod = this.findPeriod(idPeriod);
        this.periodCompare.periodRange = resultPeriod
          ? resultPeriod.get(this.periodPredefined)
          : [];
      }
      this.update();
    },
    updateUserCompare(user) {
      this.userSelected = user;
      this.update();
    },
    update() {
      const compare = {};
      if (this.itemSelected === 'date') {
        compare.periodCompare = this.periodCompare;
      }
      if (this.itemSelected === 'user') {
        compare.ownerCompare = this.userSelected;
      }
      this.$emit('change', {
        isCompare: this.itemSelected === 'date' || this.itemSelected === 'user',
        ...compare,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-input--switch {
  margin-top: 0;
  padding-top: 0;
}
</style>
