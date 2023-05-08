<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <BarUncompletedActivitiesByStageFilter
        :defaultFilter="filters.filtersConfig"
      ></BarUncompletedActivitiesByStageFilter>
    </template>
    <template #chart>
      <BarUncompletedActivitiesByStageData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></BarUncompletedActivitiesByStageData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import BarUncompletedActivitiesByStageFilter from '@/components/charts/bars/BarUncompletedActivitiesByStageFilter.vue';
import BarUncompletedActivitiesByStageData from '@/components/charts/bars/BarUncompletedActivitiesByStageData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';

export default {
  name: 'BarUncompletedActivitiesByStageModal',
  components: {
    BarUncompletedActivitiesByStageFilter,
    BarUncompletedActivitiesByStageData,
    TableActivities,
  },
  mixins: [barsModalMixin],
  props: {
    filters: {
      type: Object,
      default: () => {
        return {
          filtersConfig: {
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
            typeCompare: 'none',
          },
          filtersTable: {
            users: [],
            pipelines: [],
            periodRange: {
              start: '',
              end: '',
            },
            dealStatus: '',
            stages: [],
            activityTypes: [],
            fromReportStatus: 'ACTIVITIESBYSTAGE',
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
