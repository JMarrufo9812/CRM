<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <BarActivitiesBySalesmanFilter
        :defaultFilter="filters.filtersConfig"
      ></BarActivitiesBySalesmanFilter>
    </template>
    <template #chart>
      <BarActivitiesBySalesmanData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></BarActivitiesBySalesmanData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import BarActivitiesBySalesmanFilter from '@/components/charts/bars/BarActivitiesBySalesmanFilter.vue';
import BarActivitiesBySalesmanData from '@/components/charts/bars/BarActivitiesBySalesmanData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';

export default {
  name: 'BarActivitiesBySalesmanModal',
  components: {
    BarActivitiesBySalesmanFilter,
    BarActivitiesBySalesmanData,
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
