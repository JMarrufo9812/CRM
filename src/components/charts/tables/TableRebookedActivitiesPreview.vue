<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <TableRebookedActivitiesFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></TableRebookedActivitiesFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <TableRebookedActivitiesData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></TableRebookedActivitiesData>
    </div>
    <TableRebookedActivitiesModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></TableRebookedActivitiesModal>
  </BaseCardChart>
</template>

<script>
import TableRebookedActivitiesModal from '@/components/charts/tables/TableRebookedActivitiesModal.vue';
import TableRebookedActivitiesData from '@/components/charts/tables/TableRebookedActivitiesData.vue';
import TableRebookedActivitiesFilter from '@/components/charts/tables/TableRebookedActivitiesFilter.vue';
import { tablesPreviewMixin } from '@/mixins/charts/tablesMixin';

export default {
  name: 'TableRebookedActivitiesPreview',
  components: {
    TableRebookedActivitiesData,
    TableRebookedActivitiesModal,
    TableRebookedActivitiesFilter,
  },
  mixins: [tablesPreviewMixin],
  props: {
    defaultPeriod: {
      type: String,
      default: 'THIS_MONTH',
    },
  },
  data() {
    return {
      chartId: 'table-rebookedActivities',
      title: 'Actividades',
      titleRegular: 'reagendadas',
      filtersChartsDefault: {},
      initFilter: {
        dealsFilter: 'ALL',
        activitiesFilter: 'ALL',
        activityTypes: [],
        stages: [],
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
        dealStatus: 'LOST',
        typeCompare: 'none',
        fromReportStatus: 'REBOOKEDACTIVITIES',
      },
    };
  },
  computed: {
    filtersConfig() {
      return {
        activityTypes:
          this.chart.filtersFull?.activityTypes ||
          this.filtersChartsDefault.activityTypes,
        stages:
          this.chart.filtersFull?.stages || this.filtersChartsDefault.stages,
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
