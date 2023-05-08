<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <BarSalesCycleByStageFilter
        :defaultFilter="filters.filtersConfig"
      ></BarSalesCycleByStageFilter>
    </template>
    <template #chart>
      <BarSalesCycleByStageData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></BarSalesCycleByStageData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import BarSalesCycleByStageFilter from '@/components/charts/bars/BarSalesCycleByStageFilter.vue';
import BarSalesCycleByStageData from '@/components/charts/bars/BarSalesCycleByStageData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';

export default {
  name: 'BarSalesCycleByStageModal',
  components: {
    BarSalesCycleByStageFilter,
    BarSalesCycleByStageData,
    TableDeals,
  },
  mixins: [barsModalMixin],
  props: {
    filters: {
      type: Object,
      default: () => {
        return {
          filtersConfig: {
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
