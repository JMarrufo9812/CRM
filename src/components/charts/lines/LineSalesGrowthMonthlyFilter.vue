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
          :defaultSelect="defaultFilter.filterTime"
          :list="listTime"
          @change="changeTime"
        ></Select>
      </v-col>
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
import SelectUsers from '@/components/charts/filters/SelectUsers.vue';
import Select from '@/components/charts/filters/Select.vue';
import SelectPipeline from '@/components/charts/filters/SelectPipeline.vue';
import {
  FILTER_TYPE_PERIOD,
  FILTER_TYPE_VALUE,
} from '@/constants/filtersChart';
import { linesFilterMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineSalesGrowthMonthlyFilter',
  components: {
    SelectUsers,
    SelectPipeline,
    Select,
  },
  mixins: [linesFilterMixin],
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          filterBy: 'count',
          filterTimep: 'MONTHS',
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
          ownerToCompare: {},
          typeCompare: 'none',
        };
      },
    },
  },
  data() {
    return {
      listTime: FILTER_TYPE_PERIOD,
      listFilterBy: FILTER_TYPE_VALUE,
      filters: {
        filterBy: 'count',
        filterTimep: 'MONTHS',
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
        ownerToCompare: {},
        typeCompare: 'none',
      },
    };
  },
  methods: {
    saveFilter() {
      this.changeChart({
        id: 'line-salesGrowthMonthly',
        filtersFull: {
          ...this.noReactive(this.filters),
          periodRange: {
            __typename: 'PeriodRange',
            ...this.filters.periodRange,
          },
          ownerToCompare: { ...this.filters.ownerToCompare },
        },
      });
      this.isOpenModalFilter = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
