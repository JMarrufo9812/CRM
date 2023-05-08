<template>
  <BaseModalFilters
    :isOpen="isOpenModalFilter"
    :isIcon="isIcon"
    @save="saveFilter"
    @statusModal="statusModal"
  >
    <v-row>
      <v-col cols="12">
        <SelectUsers
          all
          :defaultSelect="defaultFilter.usesr"
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
        <ComparePeriodLines
          :periodPredefined="filters.periodPredefined[0]"
          @change="changeComparePeriod"
        ></ComparePeriodLines>
      </v-col>
    </v-row>
  </BaseModalFilters>
</template>

<script>
import SelectUsers from '@/components/charts/filters/SelectUsers.vue';
import SelectPipeline from '@/components/charts/filters/SelectPipeline.vue';
import {
  FILTER_STATUS_ACTIVITY,
  FILTER_STATUS_DEAL,
} from '@/constants/filtersChart';
import { linesFilterMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineSentEmailsByWeekFilter',
  components: {
    SelectUsers,
    SelectPipeline,
  },
  mixins: [linesFilterMixin],
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
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
  },
  data() {
    return {
      listStatusActivities: FILTER_STATUS_ACTIVITY,
      listStatusDeals: FILTER_STATUS_DEAL,
      filters: {
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
    saveFilter() {
      this.changeChart({
        id: 'bar-activitiesBySalesman',
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
