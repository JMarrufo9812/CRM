<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <LineSalesCycleByMonthFilter
        :defaultFilter="filters.filtersConfig"
      ></LineSalesCycleByMonthFilter>
    </template>
    <template #chart>
      <LineSalesCycleByMonthData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></LineSalesCycleByMonthData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import LineSalesCycleByMonthFilter from '@/components/charts/lines/LineSalesCycleByMonthFilter.vue';
import LineSalesCycleByMonthData from '@/components/charts/lines/LineSalesCycleByMonthData.vue';
import { linesModalMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineSalesCycleByMonthModal',
  components: {
    LineSalesCycleByMonthFilter,
    LineSalesCycleByMonthData,
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
