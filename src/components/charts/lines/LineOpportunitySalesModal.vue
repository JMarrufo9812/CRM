<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <LineOpportunitySalesFilter
        :defaultFilter="filters.filtersConfig"
      ></LineOpportunitySalesFilter>
    </template>
    <template #chart>
      <LineOpportunitySalesData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></LineOpportunitySalesData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import LineOpportunitySalesFilter from '@/components/charts/lines/LineOpportunitySalesFilter.vue';
import LineOpportunitySalesData from '@/components/charts/lines/LineOpportunitySalesData.vue';
import { linesModalMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineOpportunitySalesModal',
  components: {
    LineOpportunitySalesFilter,
    LineOpportunitySalesData,
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
