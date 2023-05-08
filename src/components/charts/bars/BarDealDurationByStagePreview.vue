<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <BarDealDurationByStageFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></BarDealDurationByStageFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <BarDealDurationByStageData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></BarDealDurationByStageData>
    </div>
    <BarDealDurationByStageModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></BarDealDurationByStageModal>
  </BaseCardChart>
</template>

<script>
import BarDealDurationByStageData from '@/components/charts/bars/BarDealDurationByStageData.vue';
import BarDealDurationByStageModal from '@/components/charts/bars/BarDealDurationByStageModal.vue';
import BarDealDurationByStageFilter from '@/components/charts/bars/BarDealDurationByStageFilter.vue';
import { barsPreviewMixin } from '@/mixins/charts/barsMixin';

export default {
  name: 'BarDealDurationByStagePreview',
  components: {
    BarDealDurationByStageData,
    BarDealDurationByStageModal,
    BarDealDurationByStageFilter,
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
      chartId: 'bar-dealDurationByStage',
      title: 'Días',
      titleRegular: 'promedio por etapa',
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
        dealStatus: 'ALL',
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
