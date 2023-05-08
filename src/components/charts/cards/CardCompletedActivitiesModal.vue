<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardCompletedActivitiesFilter
        :defaultFilter="filters.filtersConfig"
      ></CardCompletedActivitiesFilter>
    </template>
    <template #chart>
      <CardCompletedActivitiesData
        :defaultFilter="filters.filtersConfig"
      ></CardCompletedActivitiesData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import CardCompletedActivitiesData from '@/components/charts/cards/CardCompletedActivitiesData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';
import CardCompletedActivitiesFilter from '@/components/charts/cards/CardCompletedActivitiesFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardCompletedActivitiesModal',
  components: {
    CardCompletedActivitiesData,
    CardCompletedActivitiesFilter,
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
