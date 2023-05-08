<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <LineThroughTimeLostRateFilter
        :defaultFilter="filters.filtersConfig"
      ></LineThroughTimeLostRateFilter>
    </template>
    <template #chart>
      <LineThroughTimeLostRateData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></LineThroughTimeLostRateData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import LineThroughTimeLostRateFilter from '@/components/charts/lines/LineThroughTimeLostRateFilter.vue';
import LineThroughTimeLostRateData from '@/components/charts/lines/LineThroughTimeLostRateData.vue';
import { linesModalMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineThroughTimeLostRateModal',
  components: {
    LineThroughTimeLostRateFilter,
    LineThroughTimeLostRateData,
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
