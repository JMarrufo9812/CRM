<template>
  <BaseModalFilters
    :isOpen="isOpenModalFilter"
    :isIcon="isIcon"
    @save="saveFilter"
    @statusModal="statusModal"
  >
    <v-row>
      <v-col cols="12">
        <SelectActivities
          all
          :defaultSelect="defaultFilter.activityTypes"
          @change="changeActivityTypes"
        ></SelectActivities>
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
      <v-col cols="12" v-if="filters.pipeline.id">
        <SelectStages
          all
          :pipelineSelected="filters.pipeline.id"
          @change="changeStages"
        ></SelectStages>
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
import SelectPipeline from '@/components/charts/filters/SelectPipeline.vue';
import SelectActivities from '@/components/charts/filters/SelectActivities.vue';
import SelectStages from '@/components/charts/filters/SelectStages.vue';
import { tablesFilterMixin } from '@/mixins/charts/tablesMixin';

export default {
  name: 'TableRebookedActivitiesFilter',
  components: {
    SelectUsers,
    SelectPipeline,
    SelectActivities,
    SelectStages,
  },
  mixins: [tablesFilterMixin],
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          activityTypes: [],
          stages: [],
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
      filters: {
        activityTypes: [],
        stages: [],
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
    changeStages(stages) {
      this.filters.stages = stages;
    },
    saveFilter() {
      this.changeChart({
        id: 'table-rebookedActivities',
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
