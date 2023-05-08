<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <LineSalesCycleByMonthFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></LineSalesCycleByMonthFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <LineSalesCycleByMonthData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></LineSalesCycleByMonthData>
    </div>
    <LineSalesCycleByMonthModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></LineSalesCycleByMonthModal>
  </BaseCardChart>
</template>

<script>
import LineSalesCycleByMonthModal from '@/components/charts/lines/LineSalesCycleByMonthModal.vue';
import LineSalesCycleByMonthData from '@/components/charts/lines/LineSalesCycleByMonthData.vue';
import LineSalesCycleByMonthFilter from '@/components/charts/lines/LineSalesCycleByMonthFilter.vue';
import { linesPreviewMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineSalesCycleByMonthPreview',
  components: {
    LineSalesCycleByMonthData,
    LineSalesCycleByMonthModal,
    LineSalesCycleByMonthFilter,
  },
  mixins: [linesPreviewMixin],
  props: {
    defaultPeriod: {
      type: String,
      default: 'THIS_MONTH',
    },
  },
  data() {
    return {
      title: 'Ciclo',
      titleRegular: 'por mes',
      chartId: 'line-salesCycleByMonth',
      filtersChartsDefault: {},
      initFilter: {
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
        dealStatus: 'WON',
      },
    };
  },
  computed: {
    filtersConfig() {
      return {
        users:
          this.usersGlobal ||
          this.chart.filtersFull?.users ||
          this.filtersChartsDefault.users,
        pipeline: this.chart.filtersFull?.pipeline || this.initPipeline,
        periodRange:
          this.periodRangeGlobal ||
          this.chart.filtersFull?.periodRange ||
          this.periodRange,
        periodPredefined:
          this.periodPredefinedGlobal ||
          this.chart.filtersFull?.periodPredefined || [this.defaultPeriod] ||
          this.initFilter.periodPredefined,
        periodRangeToCompare:
          this.chart.filtersFull?.periodRangeToCompare ||
          this.initFilter.periodRangeToCompare,
        ownersToCompare:
          this.chart.filtersFull?.ownersToCompare ||
          this.initFilter.ownersToCompare,
      };
    },
    filtersTable() {
      const [start, end] = this.getPeriod(
        this.initFilter.periodPredefined[0],
      ).get();
      return {
        users:
          this.usersGlobal || this.users || this.filtersChartsDefault.users,
        pipelines: this.pipelines || this.initPipelines,
        periodRange: this.periodRangeGlobal ||
          this.chart.filtersFull?.periodRange || { start, end },
        dealStatus: this.initFilter.dealStatus,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.hoverClick {
  cursor: pointer;
}
</style>
