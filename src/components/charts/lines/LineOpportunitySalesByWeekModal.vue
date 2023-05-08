<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <LineOpportunitySalesByWeekFilter
        :defaultFilter="filters.filtersConfig"
      ></LineOpportunitySalesByWeekFilter>
    </template>
    <template #chart>
      <LineOpportunitySalesByWeekData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></LineOpportunitySalesByWeekData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import LineOpportunitySalesByWeekFilter from '@/components/charts/lines/LineOpportunitySalesByWeekFilter.vue';
import LineOpportunitySalesByWeekData from '@/components/charts/lines/LineOpportunitySalesByWeekData.vue';
import { linesModalMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineOpportunitySalesByWeekModal',
  components: {
    LineOpportunitySalesByWeekFilter,
    LineOpportunitySalesByWeekData,
  },
  mixins: [linesModalMixin],
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
            filterTime: 'WEEKS',
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
            ownersToCompare: [],
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
