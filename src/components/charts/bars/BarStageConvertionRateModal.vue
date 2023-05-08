<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <BarStageConvertionRateFilter
        :defaultFilter="filters.filtersConfig"
      ></BarStageConvertionRateFilter>
    </template>
    <template #chart>
      <BarStageConvertionRateData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></BarStageConvertionRateData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import { barsModalMixin } from '@/mixins/charts/barsMixin';
import BarStageConvertionRateFilter from '@/components/charts/bars/BarStageConvertionRateFilter.vue';
import BarStageConvertionRateData from '@/components/charts/bars/BarStageConvertionRateData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';

export default {
  name: 'BarStageConvertionRateModal',
  components: {
    BarStageConvertionRateFilter,
    BarStageConvertionRateData,
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
