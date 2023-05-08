<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <BarActivitiesByWeekFilter
        :defaultFilter="filters.filtersConfig"
      ></BarActivitiesByWeekFilter>
    </template>
    <template #chart>
      <BarActivitiesByWeekData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></BarActivitiesByWeekData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import BarActivitiesByWeekFilter from '@/components/charts/bars/BarActivitiesByWeekFilter.vue';
import BarActivitiesByWeekData from '@/components/charts/bars/BarActivitiesByWeekData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';

export default {
  name: 'BarActivitiesByWeekModal',
  components: {
    BarActivitiesByWeekFilter,
    BarActivitiesByWeekData,
    TableActivities,
  },
  mixins: [barsModalMixin],
  props: {
    filters: {
      type: Object,
      default: () => {
        return {
          filtersConfig: {
            activityTypes: [],
            activityFilter: 'ALL',
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
            fromReportStatus: 'ACTIVITIESBYWEEK',
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
