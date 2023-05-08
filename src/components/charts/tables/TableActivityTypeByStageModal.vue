<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <TableActivityTypeByStageFilter
        :defaultFilter="filters.filtersConfig"
      ></TableActivityTypeByStageFilter>
    </template>
    <template #chart>
      <TableActivityTypeByStageData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></TableActivityTypeByStageData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import TableActivityTypeByStageFilter from '@/components/charts/tables/TableActivityTypeByStageFilter.vue';
import TableActivityTypeByStageData from '@/components/charts/tables/TableActivityTypeByStageData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';
import { tablesModalMixin } from '@/mixins/charts/tablesMixin';

export default {
  name: 'TableActivityTypeByStageModal',
  components: {
    TableActivityTypeByStageFilter,
    TableActivityTypeByStageData,
    TableActivities,
  },
  mixins: [tablesModalMixin],
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
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
