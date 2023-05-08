<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <BarWonDealsEarningValueFilter
        :defaultFilter="filters.filtersConfig"
      ></BarWonDealsEarningValueFilter>
    </template>
    <template #chart>
      <BarWonDealsEarningValueData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></BarWonDealsEarningValueData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import BarWonDealsEarningValueFilter from '@/components/charts/bars/BarWonDealsEarningValueFilter.vue';
import BarWonDealsEarningValueData from '@/components/charts/bars/BarWonDealsEarningValueData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';

export default {
  name: 'BarWonDealsEarningValueModal',
  components: {
    BarWonDealsEarningValueFilter,
    BarWonDealsEarningValueData,
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
