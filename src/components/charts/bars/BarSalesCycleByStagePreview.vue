<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <BarSalesCycleByStageFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></BarSalesCycleByStageFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <BarSalesCycleByStageData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></BarSalesCycleByStageData>
    </div>
    <BarSalesCycleByStageModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></BarSalesCycleByStageModal>
  </BaseCardChart>
</template>

<script>
import BarSalesCycleByStageData from '@/components/charts/bars/BarSalesCycleByStageData.vue';
import BarSalesCycleByStageModal from '@/components/charts/bars/BarSalesCycleByStageModal.vue';
import BarSalesCycleByStageFilter from '@/components/charts/bars/BarSalesCycleByStageFilter.vue';
import { barsPreviewMixin } from '@/mixins/charts/barsMixin';

export default {
  name: 'BarSalesCycleByStagePreview',
  components: {
    BarSalesCycleByStageData,
    BarSalesCycleByStageModal,
    BarSalesCycleByStageFilter,
  },
  mixins: [barsPreviewMixin],
  props: {
    defaultPeriod: {
      type: String,
      default: 'THIS_MONTH',
    },
  },
  data() {
    return {
      chartId: 'bar-salesCycleByStage',
      title: 'Ciclo',
      titleRegular: 'por etapa',
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
        dealStatus: 'WON',
        typeCompare: 'none',
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
          this.usersGlobal ||
          this.chart.filtersFull?.users ||
          this.filtersChartsDefault.users,
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
