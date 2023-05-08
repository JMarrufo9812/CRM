<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardIneffectiveActivitiesFilter
        :defaultFilter="filters.filtersConfig"
      ></CardIneffectiveActivitiesFilter>
    </template>
    <template #chart>
      <CardIneffectiveActivitiesData
        :defaultFilter="filters.filtersConfig"
      ></CardIneffectiveActivitiesData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import CardIneffectiveActivitiesData from '@/components/charts/cards/CardIneffectiveActivitiesData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';
import CardIneffectiveActivitiesFilter from '@/components/charts/cards/CardIneffectiveActivitiesFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardIneffectiveActivitiesModal',
  components: {
    CardIneffectiveActivitiesData,
    CardIneffectiveActivitiesFilter,
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
