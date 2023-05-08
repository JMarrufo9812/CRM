<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <BarExpiredActivitiesByStageFilter
        :defaultFilter="filters.filtersConfig"
      ></BarExpiredActivitiesByStageFilter>
    </template>
    <template #chart>
      <BarExpiredActivitiesByStageData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></BarExpiredActivitiesByStageData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import BarExpiredActivitiesByStageFilter from '@/components/charts/bars/BarExpiredActivitiesByStageFilter.vue';
import BarExpiredActivitiesByStageData from '@/components/charts/bars/BarExpiredActivitiesByStageData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';

export default {
  name: 'BarExpiredActivitiesByStageModal',
  components: {
    BarExpiredActivitiesByStageFilter,
    BarExpiredActivitiesByStageData,
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
            ownerToCompare: {},
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
