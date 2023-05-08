<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <TableRebookedActivitiesFilter
        :defaultFilter="filters.filtersConfig"
      ></TableRebookedActivitiesFilter>
    </template>
    <template #chart>
      <TableRebookedActivitiesData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></TableRebookedActivitiesData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import TableRebookedActivitiesFilter from '@/components/charts/tables/TableRebookedActivitiesFilter.vue';
import TableRebookedActivitiesData from '@/components/charts/tables/TableRebookedActivitiesData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';
import { tablesModalMixin } from '@/mixins/charts/tablesMixin';

export default {
  name: 'TableRebookedActivitiesModal',
  components: {
    TableRebookedActivitiesFilter,
    TableRebookedActivitiesData,
    TableActivities,
  },
  mixins: [tablesModalMixin],
  props: {
    filters: {
      type: Object,
      default: () => {
        return {
          filtersConfig: {
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
          filtersTable: {
            users: [],
            pipelines: [],
            periodRange: {
              start: '',
              end: '',
            },
            dealStatus: '',
            typeCompare: 'none',
            fromReportStatus: 'REBOOKEDACTIVITIES',
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
