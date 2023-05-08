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
        <ComparePeriod
          :periodPredefined="filters.periodPredefined[0]"
          @change="changeComparePeriod"
        ></ComparePeriod>
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
import { cardsFilterMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardRottenDealsFilter',
  components: {
    SelectUsers,
    SelectPipeline,
    Select,
  },
  mixins: [cardsFilterMixin],
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
      listTime: FILTER_TYPE_PERIOD,
      listFilterBy: FILTER_TYPE_VALUE,
      filters: {
        filterBy: 'count',
        filterTime: 'WEEKS',
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
      },
    };
  },
  methods: {
    changeComparePeriod({ isCompare, periodCompare }) {
      if (isCompare) {
        if (periodCompare) {
          this.filters.periodRangeToCompare.period =
            periodCompare.periodSelected;
          if (periodCompare.periodRange.length > 0) {
            [
              this.filters.periodRangeToCompare.start,
              this.filters.periodRangeToCompare.end,
            ] = periodCompare.periodRange;
          }
        }
      } else {
        this.filters.periodRangeToCompare.period = '';
        this.filters.periodRangeToCompare.start = '';
        this.filters.periodRangeToCompare.end = '';
      }
    },
    saveFilter() {
      this.changeChart({
        id: 'card-rottenDeals',
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
