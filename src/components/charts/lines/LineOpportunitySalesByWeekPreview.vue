<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <LineOpportunitySalesByWeekFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></LineOpportunitySalesByWeekFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <LineOpportunitySalesByWeekData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></LineOpportunitySalesByWeekData>
    </div>
    <LineOpportunitySalesByWeekModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></LineOpportunitySalesByWeekModal>
  </BaseCardChart>
</template>

<script>
import LineOpportunitySalesByWeekModal from '@/components/charts/lines/LineOpportunitySalesByWeekModal.vue';
import LineOpportunitySalesByWeekData from '@/components/charts/lines/LineOpportunitySalesByWeekData.vue';
import LineOpportunitySalesByWeekFilter from '@/components/charts/lines/LineOpportunitySalesByWeekFilter.vue';
import { linesPreviewMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineOpportunitySalesByWeekPreview',
  components: {
    LineOpportunitySalesByWeekData,
    LineOpportunitySalesByWeekModal,
    LineOpportunitySalesByWeekFilter,
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
      title: 'Oportunidades',
      titleRegular: 'por semana',
      chartId: 'line-opportunitySalesByWeek',
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
        ownersToCompare: [],
        dealStatus: 'ALL',
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
