<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardEffectiveActivitiesFilter
        :defaultFilter="filters.filtersConfig"
      ></CardEffectiveActivitiesFilter>
    </template>
    <template #chart>
      <CardEffectiveActivitiesData
        :defaultFilter="filters.filtersConfig"
      ></CardEffectiveActivitiesData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import CardEffectiveActivitiesData from '@/components/charts/cards/CardEffectiveActivitiesData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';
import CardEffectiveActivitiesFilter from '@/components/charts/cards/CardEffectiveActivitiesFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardEffectiveActivitiesModal',
  components: {
    CardEffectiveActivitiesData,
    CardEffectiveActivitiesFilter,
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
