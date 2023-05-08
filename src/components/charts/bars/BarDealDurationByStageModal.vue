<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <BarDealDurationByStageFilter
        :defaultFilter="filters.filtersConfig"
      ></BarDealDurationByStageFilter>
    </template>
    <template #chart>
      <BarDealDurationByStageData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></BarDealDurationByStageData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import BarDealDurationByStageFilter from '@/components/charts/bars/BarDealDurationByStageFilter.vue';
import BarDealDurationByStageData from '@/components/charts/bars/BarDealDurationByStageData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';

export default {
  name: 'BarDealDurationByStageModal',
  components: {
    BarDealDurationByStageFilter,
    BarDealDurationByStageData,
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
