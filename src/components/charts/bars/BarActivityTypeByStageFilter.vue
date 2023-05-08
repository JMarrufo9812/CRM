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
          name="Estado de trato"
          :defaultSelect="defaultFilter.dealsFilter"
          :list="listStatusDeals"
          @change="changeStatusDeal"
        ></Select>
      </v-col>
      <v-col cols="12">
        <Select
          name="Estado de actividad"
          :defaultSelect="defaultFilter.activitiesFilter"
          :list="listStatusActivities"
          @change="changeStatusActivity"
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
  FILTER_STATUS_ACTIVITY,
  FILTER_STATUS_DEAL,
} from '@/constants/filtersChart';
import { barsFilterMixin } from '@/mixins/charts/barsMixin';

export default {
  name: 'BarActivityTypeByStageFilter',
  components: {
    SelectUsers,
    SelectPipeline,
    Select,
  },
  mixins: [barsFilterMixin],
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          dealsFilter: 'ALL',
          activitiesFilter: 'ALL',
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
      listStatusActivities: FILTER_STATUS_ACTIVITY,
      listStatusDeals: FILTER_STATUS_DEAL,
      filters: {
        dealsFilter: 'ALL',
        activitiesFilter: 'ALL',
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
        id: 'bar-activityTypeByStage',
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
