<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <LineSalesGrowthMonthlyFilter
        :defaultFilter="filters.filtersConfig"
      ></LineSalesGrowthMonthlyFilter>
    </template>
    <template #chart>
      <LineSalesGrowthMonthlyData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></LineSalesGrowthMonthlyData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import LineSalesGrowthMonthlyFilter from '@/components/charts/lines/LineSalesGrowthMonthlyFilter.vue';
import LineSalesGrowthMonthlyData from '@/components/charts/lines/LineSalesGrowthMonthlyData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';

export default {
  name: 'LineSalesGrowthMonthlyModal',
  components: {
    LineSalesGrowthMonthlyFilter,
    LineSalesGrowthMonthlyData,
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
            filterTimep: 'MONTHS',
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
