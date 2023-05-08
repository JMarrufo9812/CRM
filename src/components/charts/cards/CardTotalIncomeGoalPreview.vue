<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    @updateRefetch="isRefetch = true"
    :settings="filtersConfig"
  >
    <template #modal>
      <CardTotalIncomeGoalFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></CardTotalIncomeGoalFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <CardTotalIncomeGoalData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></CardTotalIncomeGoalData>
      <CardTotalIncomeGoalModal
        :isOpen="isOpenModal"
        :filters="{ filtersConfig, filtersTable }"
        :title="title"
        :titleRegular="titleRegular"
        @close="closeModal"
      ></CardTotalIncomeGoalModal>
    </div>
  </BaseCardChart>
</template>

<script>
import CardTotalIncomeGoalModal from '@/components/charts/cards/CardTotalIncomeGoalModal.vue';
import CardTotalIncomeGoalData from '@/components/charts/cards/CardTotalIncomeGoalData.vue';
import CardTotalIncomeGoalFilter from '@/components/charts/cards/CardTotalIncomeGoalFilter.vue';
import { cardsPreviewMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardTotalIncomeGoalPreview',
  components: {
    CardTotalIncomeGoalData,
    CardTotalIncomeGoalModal,
    CardTotalIncomeGoalFilter,
  },
  mixins: [cardsPreviewMixin],
  props: {
    defaultPeriod: {
      type: String,
      default: 'THIS_MONTH',
    },
  },
  data() {
    return {
      chartId: 'card-totalIncomeGoal',
      title: 'Ingreso',
      titleRegular: 'total',
      isOpenModal: false,
      filtersChartsDefault: {},
      initFilter: {
        filterBy: 'count',
        users: [],
        pipeline: {},
        periodPredefined: ['THIS_MONTH'],
        periodRange: {
          start: '',
          end: '',
        },
        periodRangeToCompare: {
          period: '',
          start: '',
          end: '',
        },
        ownerToCompare: {
          id: '',
        },
        dealStatus: 'WON',
      },
    };
  },
  computed: {
    filtersConfig() {
      return {
        filterBy: this.chart.filtersFull?.filterBy || this.initFilter.filterBy,
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
      };
    },
    filtersTable() {
      const [start, end] = this.getPeriod(
        this.initFilter.periodPredefined[0],
      ).get();
      return {
        users: this.usersGlobal || this.users || this.initUsers,
        pipelines: this.pipelines || this.filtersChartsDefault.pipelines,
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
