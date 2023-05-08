<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <TableActivityTypeByStageFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></TableActivityTypeByStageFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <TableActivityTypeByStageData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></TableActivityTypeByStageData>
    </div>
    <TableActivityTypeByStageModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></TableActivityTypeByStageModal>
  </BaseCardChart>
</template>

<script>
import TableActivityTypeByStageModal from '@/components/charts/tables/TableActivityTypeByStageModal.vue';
import TableActivityTypeByStageData from '@/components/charts/tables/TableActivityTypeByStageData.vue';
import TableActivityTypeByStageFilter from '@/components/charts/tables/TableActivityTypeByStageFilter.vue';
import { tablesPreviewMixin } from '@/mixins/charts/tablesMixin';

export default {
  name: 'TableActivityTypeByStagePreview',
  components: {
    TableActivityTypeByStageData,
    TableActivityTypeByStageModal,
    TableActivityTypeByStageFilter,
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
      chartId: 'table-activityTypeByStage',
      title: 'Actividades',
      titleRegular: 'por etapa',
      filtersChartsDefault: {},
      initFilter: {
        dealsFilter: 'ALL',
        activitiesFilter: 'ALL',
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
