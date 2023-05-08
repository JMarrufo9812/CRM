<template>
  <BaseModalFilters
    :isOpen="isOpenModalFilter"
    :isIcon="isIcon"
    @save="saveFilter"
    @statusModal="statusModal"
  >
    <v-row>
      <v-col cols="12">
        <Select
          name="Filtrar por"
          :defaultSelect="defaultFilter.filterBy"
          :list="listFilterBy"
          @change="changeFilterBy"
        ></Select>
      </v-col>
      <v-col cols="12">
        <SelectUsers
          all
          :defaultSelect="defaultFilter.users"
          @change="changeUsers"
        ></SelectUsers>
      </v-col>
      <v-col cols="12">
        <SelectPipeline
          :defaultSelect="defaultFilter.pipeline"
          @change="changePipeline"
        ></SelectPipeline>
      </v-col>
      <v-col cols="12">
        <PeriodPredefined
          :defaultSelect="defaultFilter.periodPredefined"
          @change="changePeriodPredefined"
        ></PeriodPredefined>
      </v-col>
      <v-col cols="12" v-if="!isPreview">
        <ComparePeriodBars
          :periodPredefined="filters.periodPredefined[0]"
          @change="changeComparePeriod"
        ></ComparePeriodBars>
      </v-col>
    </v-row>
  </BaseModalFilters>
</template>

<script>
import ComparePeriodBars from '@/components/charts/filters/ComparePeriodBars.vue';
import BaseModalFilters from '@/components/charts/layout/BaseModalFilters.vue';
import SelectUsers from '@/components/charts/filters/SelectUsers.vue';
import SelectPipeline from '@/components/charts/filters/SelectPipeline.vue';
import { chartFiltersMethodsMixin } from '@/mixins/chartFiltersMixin';
import PeriodPredefined from '@/components/charts/filters/PeriodPredefined.vue';
import { periodsToCompare } from '@/constants/periods';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import Select from '@/components/charts/filters/Select.vue';

export default {
  name: 'DonutLostReasonFilter',
  components: {
    BaseModalFilters,
    SelectUsers,
    Select,
    SelectPipeline,
    PeriodPredefined,
    ComparePeriodBars,
  },
  // mixins: [chartsModalFiltersMixin],
  mixins: [chartFiltersMethodsMixin],
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          filterBy: 'count',
          users: [],
          pipeline: {},
          periodRange: {
            start: '',
            end: '',
          },
          periodPredefined: ['THIS_MONTH'],
          periodRangeToCompare: {
            period: '',
            start: '',
            end: '',
          },
          typeCompare: 'none',
        };
      },
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listCompare: periodsToCompare,
      listFilterBy: FILTER_TYPE_VALUE,
      isOpenModalFilter: false,
      filters: {
        filterBy: 'count',
        users: [],
        pipeline: {},
        periodRange: {
          start: '',
          end: '',
        },
        periodPredefined: ['THIS_MONTH'],
        periodRangeToCompare: {
          period: '',
          start: '',
          end: '',
        },
        typeCompare: 'none',
      },
    };
  },
  methods: {
    findPeriod(idPeriod) {
      return this.listCompare.find((period) => period.id === idPeriod);
    },
    updatePeriodSelected(idPeriod) {
      if (idPeriod !== 'CUSTOM') {
        const resultPeriod = this.findPeriod(idPeriod);
        const periodRange = resultPeriod
          ? resultPeriod.get(this.filters.periodPredefined[0])
          : [];

        if (periodRange) {
          [
            this.filters.periodRangeToCompare.start,
            this.filters.periodRangeToCompare.end,
          ] = periodRange;
        }
      }
    },
    changeStatusDeal(status) {
      this.filters.dealsFilter = status;
    },
    statusModal(status) {
      this.isOpenModalFilter = status;
    },
    changeTime(timeSelected) {
      this.filters.filterTime = timeSelected;
    },
    changeFilterBy(filterBy) {
      this.filters.filterBy = filterBy;
    },
    changeUser(user) {
      this.filters.user = user;
    },
    changeUsers(users) {
      this.filters.users = users;
    },
    changePipeline(pipeline) {
      this.filters.pipeline = pipeline;
    },
    changePeriodPredefined(periodPredefined) {
      this.filters.periodPredefined = periodPredefined;
      [
        ,
        [this.filters.periodRange.start, this.filters.periodRange.end],
      ] = periodPredefined;
      if (this.typeCompare === 'date') {
        this.updatePeriodSelected(this.filters.periodRangeToCompare.period);
      }
    },
    changeComparePeriod({ isCompare, typeCompare, periodCompare }) {
      if (isCompare) {
        if (typeCompare === 'date') {
          if (periodCompare) {
            this.filters.typeCompare = typeCompare;
            this.filters.periodRangeToCompare.period =
              periodCompare.periodSelected;
            if (periodCompare.periodRange.length > 0) {
              [
                this.filters.periodRangeToCompare.start,
                this.filters.periodRangeToCompare.end,
              ] = periodCompare.periodRange;
            }
          }
        }
      } else {
        this.filters.typeCompare = typeCompare;
        this.filters.periodRangeToCompare.period = '';
        this.filters.periodRangeToCompare.start = '';
        this.filters.periodRangeToCompare.end = '';
      }
    },
    saveFilter() {
      this.changeChart({
        id: 'donut-lostReason',
        filtersFull: {
          ...this.noReactive(this.filters),
          periodRange: {
            __typename: 'PeriodRange',
            ...this.filters.periodRange,
          },
        },
      });
      this.isOpenModalFilter = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
