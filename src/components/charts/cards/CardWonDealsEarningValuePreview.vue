<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    @updateRefetch="isRefetch = true"
    :settings="filtersConfig"
  >
    <template #modal>
      <CardWonDealsEarningValueFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></CardWonDealsEarningValueFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <CardWonDealsEarningValueData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></CardWonDealsEarningValueData>
    </div>
    <CardWonDealsEarningValueModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></CardWonDealsEarningValueModal>
  </BaseCardChart>
</template>

<script>
import CardWonDealsEarningValueModal from '@/components/charts/cards/CardWonDealsEarningValueModal.vue';
import CardWonDealsEarningValueData from '@/components/charts/cards/CardWonDealsEarningValueData.vue';
import CardWonDealsEarningValueFilter from '@/components/charts/cards/CardWonDealsEarningValueFilter.vue';
import { cardsPreviewMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardWonDealsEarningValuePreview',
  components: {
    CardWonDealsEarningValueData,
    CardWonDealsEarningValueModal,
    CardWonDealsEarningValueFilter,
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
      chartId: 'card-wonDealsEarningValue',
      title: 'Tratos',
      titleRegular: 'ganados',
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
