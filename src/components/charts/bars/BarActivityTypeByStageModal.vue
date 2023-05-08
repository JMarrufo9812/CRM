<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <BarActivityTypeByStageFilter
        :defaultFilter="filters.filtersConfig"
      ></BarActivityTypeByStageFilter>
    </template>
    <template #chart>
      <BarActivityTypeByStageData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></BarActivityTypeByStageData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import BarActivityTypeByStageFilter from '@/components/charts/bars/BarActivityTypeByStageFilter.vue';
import BarActivityTypeByStageData from '@/components/charts/bars/BarActivityTypeByStageData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';

export default {
  name: 'BarActivityTypeByStageModal',
  components: {
    BarActivityTypeByStageFilter,
    BarActivityTypeByStageData,
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
