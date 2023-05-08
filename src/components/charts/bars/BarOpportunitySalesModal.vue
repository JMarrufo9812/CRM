<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <BarOpportunitySalesFilter
        :defaultFilter="filters.filtersConfig"
      ></BarOpportunitySalesFilter>
    </template>
    <template #chart>
      <BarOpportunitySalesData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></BarOpportunitySalesData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import BarOpportunitySalesFilter from '@/components/charts/bars/BarOpportunitySalesFilter.vue';
import BarOpportunitySalesData from '@/components/charts/bars/BarOpportunitySalesData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';

export default {
  name: 'BarOpportunitySalesModal',
  components: {
    BarOpportunitySalesFilter,
    BarOpportunitySalesData,
    TableDeals,
  },
  mixins: [barsModalMixin],
  props: {
    filters: {
      type: Object,
      default: () => {
        return {
          filtersConfig: {
            filterBy: 'count',
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
