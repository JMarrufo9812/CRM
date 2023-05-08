<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <LineTotalIncomeGoalFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></LineTotalIncomeGoalFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <LineTotalIncomeGoalData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></LineTotalIncomeGoalData>
    </div>
    <LineTotalIncomeGoalModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></LineTotalIncomeGoalModal>
  </BaseCardChart>
</template>

<script>
import LineTotalIncomeGoalModal from '@/components/charts/lines/LineTotalIncomeGoalModal.vue';
import LineTotalIncomeGoalData from '@/components/charts/lines/LineTotalIncomeGoalData.vue';
import LineTotalIncomeGoalFilter from '@/components/charts/lines/LineTotalIncomeGoalFilter.vue';
import { linesPreviewMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineTotalIncomeGoalPreview',
  components: {
    LineTotalIncomeGoalData,
    LineTotalIncomeGoalModal,
    LineTotalIncomeGoalFilter,
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
      title: 'Ingreso',
      titleRegular: 'total por vendedor',
      chartId: 'line-totalIncomeGoal',
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
        dealStatus: 'WON',
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
