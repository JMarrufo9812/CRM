<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    @updateRefetch="isRefetch = true"
    :settings="filtersConfig"
  >
    <template #modal>
      <CardOpportunitySaleFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></CardOpportunitySaleFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <CardOpportunitySaleData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></CardOpportunitySaleData>
    </div>
    <CardOpportunitySaleModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></CardOpportunitySaleModal>
  </BaseCardChart>
</template>

<script>
import CardOpportunitySaleModal from '@/components/charts/cards/CardOpportunitySaleModal.vue';
import CardOpportunitySaleData from '@/components/charts/cards/CardOpportunitySaleData.vue';
import CardOpportunitySaleFilter from '@/components/charts/cards/CardOpportunitySaleFilter.vue';
import { cardsPreviewMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardOpportunitySalePreview',
  components: {
    CardOpportunitySaleData,
    CardOpportunitySaleModal,
    CardOpportunitySaleFilter,
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
      chartId: 'card-opportunitySales',
      isOpenModal: false,
      filtersChartsDefault: {},
      title: 'Oportunidades',
      titleRegular: 'de ventas',
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
        dealStatus: 'ALL',
      },
    };
  },
  computed: {
    filtersConfig() {
      return {
        filterBy: this.chart?.filtersFull?.filterBy || this.initFilter.filterBy,
        users:
          this.usersGlobal || this.chart.filtersFull?.users || this.initUsers,
        pipeline: this.chart?.filtersFull?.pipeline || this.initPipeline,
        periodRange:
          this.periodRangeGlobal ||
          this.chart?.filtersFull?.periodRange ||
          this.periodRange,
        periodPredefined:
          this.periodPredefinedGlobal ||
          this.chart?.filtersFull?.periodPredefined || [this.defaultPeriod] ||
          this.initFilter.periodPredefined,
        periodRangeToCompare:
          this.chart?.filtersFull?.periodRangeToCompare ||
          this.initFilter.periodRangeToCompare,
        ownerToCompare:
          this.chart?.filtersFull?.ownerToCompare ||
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
          this.chart?.filtersFull?.periodRange || { start, end },
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
