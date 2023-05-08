<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <BarLostDealsByStageFilter
        :defaultFilter="filters.filtersConfig"
      ></BarLostDealsByStageFilter>
    </template>
    <template #chart>
      <BarLostDealsByStageData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></BarLostDealsByStageData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import BarLostDealsByStageFilter from '@/components/charts/bars/BarLostDealsByStageFilter.vue';
import BarLostDealsByStageData from '@/components/charts/bars/BarLostDealsByStageData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';

export default {
  name: 'BarLostDealsByStageModal',
  components: {
    BarLostDealsByStageFilter,
    BarLostDealsByStageData,
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
