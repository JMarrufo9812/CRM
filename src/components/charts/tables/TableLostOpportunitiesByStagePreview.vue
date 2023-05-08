<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    :settings="filtersConfig"
    isChart
    @updateRefetch="isRefetch = true"
  >
    <template #modal>
      <TableLostOpportunitiesByStageFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></TableLostOpportunitiesByStageFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <TableLostOpportunitiesByStageData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></TableLostOpportunitiesByStageData>
    </div>
    <TableLostOpportunitiesByStageModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></TableLostOpportunitiesByStageModal>
  </BaseCardChart>
</template>

<script>
import TableLostOpportunitiesByStageModal from '@/components/charts/tables/TableLostOpportunitiesByStageModal.vue';
import TableLostOpportunitiesByStageData from '@/components/charts/tables/TableLostOpportunitiesByStageData.vue';
import TableLostOpportunitiesByStageFilter from '@/components/charts/tables/TableLostOpportunitiesByStageFilter.vue';
import { tablesPreviewMixin } from '@/mixins/charts/tablesMixin';

export default {
  name: 'TableLostOpportunitiesByStagePreview',
  components: {
    TableLostOpportunitiesByStageData,
    TableLostOpportunitiesByStageModal,
    TableLostOpportunitiesByStageFilter,
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
      chartId: 'table-lostOpportunities',
      title: 'Oportunidades',
      titleRegular: 'pérdidas',
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
        ownerToCompare: {},
        dealStatus: 'LOST',
        typeCompare: 'none',
      },
    };
  },
  computed: {
    filtersConfig() {
      return {
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
