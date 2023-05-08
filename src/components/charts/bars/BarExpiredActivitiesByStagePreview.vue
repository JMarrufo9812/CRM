<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <BarExpiredActivitiesByStageFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></BarExpiredActivitiesByStageFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <BarExpiredActivitiesByStageData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></BarExpiredActivitiesByStageData>
    </div>
    <BarExpiredActivitiesByStageModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></BarExpiredActivitiesByStageModal>
  </BaseCardChart>
</template>

<script>
import BarExpiredActivitiesByStageModal from '@/components/charts/bars/BarExpiredActivitiesByStageModal.vue';
import BarExpiredActivitiesByStageData from '@/components/charts/bars/BarExpiredActivitiesByStageData.vue';
import BarExpiredActivitiesByStageFilter from '@/components/charts/bars/BarExpiredActivitiesByStageFilter.vue';
import { barsPreviewMixin } from '@/mixins/charts/barsMixin';

export default {
  name: 'BarExpiredActivitiesByStagePreview',
  components: {
    BarExpiredActivitiesByStageData,
    BarExpiredActivitiesByStageModal,
    BarExpiredActivitiesByStageFilter,
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
      chartId: 'bar-expiredActivitiesByStage',
      title: 'Actividades',
      titleRegular: 'vencidas',
      filtersChartsDefault: {},
      initFilter: {
        dealsFilter: 'ALL',
        activitiesFilter: 'EXPIRED',
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
        activitiesFilter:
          this.chart.filtersFull?.activitiesFilter ||
          this.initFilter.activitiesFilter,
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
