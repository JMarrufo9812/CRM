<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <BarUncompletedActivitiesByStageFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></BarUncompletedActivitiesByStageFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <BarUncompletedActivitiesByStageData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></BarUncompletedActivitiesByStageData>
    </div>
    <BarUncompletedActivitiesByStageModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></BarUncompletedActivitiesByStageModal>
  </BaseCardChart>
</template>

<script>
import BarUncompletedActivitiesByStageModal from '@/components/charts/bars/BarUncompletedActivitiesByStageModal.vue';
import BarUncompletedActivitiesByStageData from '@/components/charts/bars/BarUncompletedActivitiesByStageData.vue';
import BarUncompletedActivitiesByStageFilter from '@/components/charts/bars/BarUncompletedActivitiesByStageFilter.vue';
import { barsPreviewMixin } from '@/mixins/charts/barsMixin';

export default {
  name: 'BarUncompletedActivitiesByStagePreview',
  components: {
    BarUncompletedActivitiesByStageData,
    BarUncompletedActivitiesByStageModal,
    BarUncompletedActivitiesByStageFilter,
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
      chartId: 'bar-uncompletedActivitiesByStage',
      title: 'Actividades',
      titleRegular: 'Incompletas',
      filtersChartsDefault: {},
      initFilter: {
        dealsFilter: 'ALL',
        activitiesFilter: 'PENDING',
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
        typeCompare: 'none',
        stages: [],
        activityTypes: [],
        fromReportStatus: 'ACTIVITIESBYSTAGE',
      },
    };
  },
  computed: {
    filtersConfig() {
      return {
        dealsFilter:
          this.chart.filtersFull?.dealsFilter || this.initFilter.dealsFilter,
        users:
          this.usersGlobal || this.chart.filtersFull?.users || this.initUsers,
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
        users: this.usersGlobal || this.users || this.initUsers,
        pipelines: this.pipelines || [this.initPipeline],
        periodRange: this.periodRangeGlobal ||
          this.chart.filtersFull?.periodRange || { start, end },
        dealStatus: this.initFilter.dealsFilter,
        activitiesStatus: this.initFilter.activitiesFilter,
        activityTypes:
          this.filtersChartsDefault.activityTypes ||
          this.initFilter.activityTypes,
        fromReportStatus: this.initFilter.fromReportStatus,
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
