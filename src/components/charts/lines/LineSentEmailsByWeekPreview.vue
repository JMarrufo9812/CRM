<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <LineSentEmailsByWeekFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></LineSentEmailsByWeekFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <LineSentEmailsByWeekData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></LineSentEmailsByWeekData>
    </div>
    <LineSentEmailsByWeekModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></LineSentEmailsByWeekModal>
  </BaseCardChart>
</template>

<script>
import LineSentEmailsByWeekFilter from '@/components/charts/lines/LineSentEmailsByWeekFilter.vue';
import LineSentEmailsByWeekData from '@/components/charts/lines/LineSentEmailsByWeekData.vue';
import LineSentEmailsByWeekModal from '@/components/charts/lines/LineSentEmailsByWeekModal.vue';
import { linesPreviewMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineSentEmailsByWeekPreview',
  components: {
    LineSentEmailsByWeekFilter,
    LineSentEmailsByWeekData,
    LineSentEmailsByWeekModal,
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
      chartId: 'bar-activitiesBySalesman',
      title: 'Correos',
      titleRegular: 'enviados',
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
          this.usersGlobal || this.users || this.filtersChartsDefault.users,
        pipelines: this.pipelines || this.filtersChartsDefault.pipelines,
        periodRange: this.periodRangeGlobal ||
          this.chart.filtersFull?.periodRange || { start, end },
        emailStatus: 'ALL',
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
