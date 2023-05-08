<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <LineSalesGrowthMonthlyFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></LineSalesGrowthMonthlyFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <LineSalesGrowthMonthlyData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></LineSalesGrowthMonthlyData>
    </div>
    <LineSalesGrowthMonthlyModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></LineSalesGrowthMonthlyModal>
  </BaseCardChart>
</template>

<script>
import LineSalesGrowthMonthlyModal from '@/components/charts/lines/LineSalesGrowthMonthlyModal.vue';
import LineSalesGrowthMonthlyData from '@/components/charts/lines/LineSalesGrowthMonthlyData.vue';
import LineSalesGrowthMonthlyFilter from '@/components/charts/lines/LineSalesGrowthMonthlyFilter.vue';
import { linesPreviewMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineSalesGrowthMonthlyPreview',
  components: {
    LineSalesGrowthMonthlyData,
    LineSalesGrowthMonthlyModal,
    LineSalesGrowthMonthlyFilter,
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
      chartId: 'line-salesGrowthMonthly',
      title: 'Crecimiento',
      titleRegular: 'mensual',
      filtersChartsDefault: {},
      initFilter: {
        filterBy: 'count',
        filterTime: 'MONTHS',
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
        dealStatus: 'WON',
        typeCompare: 'none',
      },
    };
  },
  computed: {
    filtersConfig() {
      return {
        filterBy: this.chart.filtersFull?.filterBy || this.initFilter.filterBy,
        filterTime:
          this.chart.filtersFull?.filterTime || this.initFilter.filterTime,
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
        ownerToCompare:
          this.chart.filtersFull?.ownerToCompare ||
          this.initFilter.ownerToCompare,
        typeCompare:
          this.chart.filtersFull?.typeCompare || this.initFilter.typeCompare,
      };
    },
    filtersTable() {
      const [start, end] = this.getPeriod(
        this.initFilter.periodPredefined[0],
      ).get();
      return {
        users:
          this.usersGlobal || this.users || this.filtersChartsDefault.users,
        pipelines: this.pipelines || [this.initPipeline],
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
