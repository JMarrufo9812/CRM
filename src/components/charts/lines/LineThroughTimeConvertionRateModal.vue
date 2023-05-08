<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <LineThroughTimeConvertionRateFilter
        :defaultFilter="filters.filtersConfig"
      ></LineThroughTimeConvertionRateFilter>
    </template>
    <template #chart>
      <LineThroughTimeConvertionRateData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></LineThroughTimeConvertionRateData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import LineThroughTimeConvertionRateFilter from '@/components/charts/lines/LineThroughTimeConvertionRateFilter.vue';
import LineThroughTimeConvertionRateData from '@/components/charts/lines/LineThroughTimeConvertionRateData.vue';
import { linesModalMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineThroughTimeConvertionRateModal',
  components: {
    LineThroughTimeConvertionRateFilter,
    LineThroughTimeConvertionRateData,
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
