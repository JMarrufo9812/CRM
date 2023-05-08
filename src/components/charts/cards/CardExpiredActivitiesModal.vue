<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardExpiredActivitiesFilter
        :defaultFilter="filters.filtersConfig"
      ></CardExpiredActivitiesFilter>
    </template>
    <template #chart>
      <CardExpiredActivitiesData
        :defaultFilter="filters.filtersConfig"
      ></CardExpiredActivitiesData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import CardExpiredActivitiesData from '@/components/charts/cards/CardExpiredActivitiesData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';
import CardExpiredActivitiesFilter from '@/components/charts/cards/CardExpiredActivitiesFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardCompletedActivitiesModal',
  components: {
    CardExpiredActivitiesData,
    CardExpiredActivitiesFilter,
    TableActivities,
  },
  mixins: [cardsModalMixin],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Sin título',
    },
    titleRegular: {
      type: String,
      default: '',
    },
    filters: {
      type: Object,
      default: () => {
        return {
          filtersConfig: {
            filterBy: 'count',
            users: [],
            pipeline: {},
            periodPredefined: ['THIS_MONTH'],
            periodRange: {
              start: '',
              end: '',
            },
            periodRangeToCompare: {
              period: '',
              start: '',
              end: '',
            },
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
