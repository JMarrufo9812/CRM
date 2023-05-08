<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <BarActivitiesByWeekFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></BarActivitiesByWeekFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <BarActivitiesByWeekData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></BarActivitiesByWeekData>
    </div>
    <BarActivitiesByWeekModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></BarActivitiesByWeekModal>
  </BaseCardChart>
</template>

<script>
import BarActivitiesByWeekFilter from '@/components/charts/bars/BarActivitiesByWeekFilter.vue';
import BarActivitiesByWeekData from '@/components/charts/bars/BarActivitiesByWeekData.vue';
import BarActivitiesByWeekModal from '@/components/charts/bars/BarActivitiesByWeekModal.vue';
import { barsPreviewMixin } from '@/mixins/charts/barsMixin';

export default {
  name: 'BarActivitiesByWeekPreview',
  components: {
    BarActivitiesByWeekData,
    BarActivitiesByWeekModal,
    BarActivitiesByWeekFilter,
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
      chartId: 'bar-activitiesByWeek',
      title: 'Actividades',
      titleRegular: 'por semana',
      filtersChartsDefault: {},
      initFilter: {
        dealsFilter: 'ALL',
        activitiesFilter: 'ALL',
        activityTypes: [],
        activityFilter: 'ALL',
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
        dealStatus: 'ALL',
        typeCompare: 'none',
        stages: [],
        fromReportStatus: 'ACTIVITIESBYWEEK',
      },
    };
  },
  computed: {
    filtersConfig() {
      return {
        activityTypes:
          this.chart.filtersFull?.activityTypes ||
          this.filtersChartsDefault.activityTypes.map((activity) => {
            return { id: activity.id };
          }),
        activityFilter:
          this.chart.filtersFull?.activityFilter ||
          this.initFilter.activityFilter,
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
        dealStatus: this.initFilter.dealStatus,
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
