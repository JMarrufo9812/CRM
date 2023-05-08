<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    @updateRefetch="isRefetch = true"
    :settings="filtersConfig"
  >
    <template #modal>
      <CardOpenEmailsFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></CardOpenEmailsFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <CardOpenEmailsData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></CardOpenEmailsData>
    </div>
    <CardOpenEmailsModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></CardOpenEmailsModal>
  </BaseCardChart>
</template>

<script>
import CardOpenEmailsModal from '@/components/charts/cards/CardOpenEmailsModal.vue';
import CardOpenEmailsData from '@/components/charts/cards/CardOpenEmailsData.vue';
import CardOpenEmailsFilter from '@/components/charts/cards/CardOpenEmailsFilter.vue';
import { cardsPreviewMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardOpenEmailsPreview',
  components: {
    CardOpenEmailsData,
    CardOpenEmailsModal,
    CardOpenEmailsFilter,
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
      title: 'Correos',
      titleRegular: 'abiertos',
      isOpenModal: false,
      chartId: 'card-openEmails',
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
