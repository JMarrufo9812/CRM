<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardRebookedActivitiesFilter
        :defaultFilter="filters.filtersConfig"
      ></CardRebookedActivitiesFilter>
    </template>
    <template #chart>
      <CardRebookedActivitiesData
        :defaultFilter="filters.filtersConfig"
      ></CardRebookedActivitiesData>
    </template>
    <template #table>
      <TableActivities :defaultFilter="filters.filtersTable"></TableActivities>
    </template>
  </BaseModalChart>
</template>

<script>
import CardRebookedActivitiesData from '@/components/charts/cards/CardRebookedActivitiesData.vue';
import TableActivities from '@/components/charts/tables/TableActivities.vue';
import CardRebookedActivitiesFilter from '@/components/charts/cards/CardRebookedActivitiesFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardRebookedActivitiesModal',
  components: {
    CardRebookedActivitiesData,
    CardRebookedActivitiesFilter,
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
