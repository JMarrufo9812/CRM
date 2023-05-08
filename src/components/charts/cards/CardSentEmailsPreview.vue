<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    @updateRefetch="isRefetch = true"
    :settings="filtersConfig"
  >
    <template #modal>
      <CardSentEmailsFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></CardSentEmailsFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <CardSentEmailsData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></CardSentEmailsData>
    </div>
    <CardSentEmailsModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></CardSentEmailsModal>
  </BaseCardChart>
</template>

<script>
import CardSentEmailsModal from '@/components/charts/cards/CardSentEmailsModal.vue';
import CardSentEmailsData from '@/components/charts/cards/CardSentEmailsData.vue';
import CardSentEmailsFilter from '@/components/charts/cards/CardSentEmailsFilter.vue';
import { cardsPreviewMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardSentEmailsPreview',
  components: {
    CardSentEmailsData,
    CardSentEmailsModal,
    CardSentEmailsFilter,
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
      titleRegular: 'enviados',
      isOpenModal: false,
      chartId: 'card-sentEmails',
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
