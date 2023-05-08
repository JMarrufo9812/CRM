<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardBookedActivitiesInDayFilter
        :defaultFilter="filters.filtersConfig"
      ></CardBookedActivitiesInDayFilter>
    </template>
    <template #chart>
      <CardBookedActivitiesInDayData
        :defaultFilter="filters.filtersConfig"
      ></CardBookedActivitiesInDayData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import CardBookedActivitiesInDayData from '@/components/charts/cards/CardBookedActivitiesInDayData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';
import CardBookedActivitiesInDayFilter from '@/components/charts/cards/CardBookedActivitiesInDayFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardBookedActivitiesInDayModal',
  components: {
    CardBookedActivitiesInDayData,
    CardBookedActivitiesInDayFilter,
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
