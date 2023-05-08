<template>
  <BaseCardChart
    :title="title"
    :titleRegular="titleRegular"
    @updateRefetch="isRefetch = true"
    :settings="filtersConfig"
  >
    <template #modal>
      <CardBookedActivitiesInDayFilter
        :defaultFilter="filtersConfig"
        isIcon
        isPreview
      ></CardBookedActivitiesInDayFilter>
    </template>
    <div @click="openModal" class="hoverClick">
      <CardBookedActivitiesInDayData
        :defaultFilter="filtersConfig"
        isPreview
        :isRefetch="isRefetch"
        @updateRefetch="isRefetch = false"
      ></CardBookedActivitiesInDayData>
    </div>
    <CardBookedActivitiesInDayModal
      :isOpen="isOpenModal"
      :filters="{ filtersConfig, filtersTable }"
      :title="title"
      :titleRegular="titleRegular"
      @close="closeModal"
    ></CardBookedActivitiesInDayModal>
  </BaseCardChart>
</template>

<script>
import CardBookedActivitiesInDayModal from '@/components/charts/cards/CardBookedActivitiesInDayModal.vue';
import CardBookedActivitiesInDayData from '@/components/charts/cards/CardBookedActivitiesInDayData.vue';
import CardBookedActivitiesInDayFilter from '@/components/charts/cards/CardBookedActivitiesInDayFilter.vue';
import { cardsPreviewMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardBookedActivitiesInDayPreview',
  components: {
    CardBookedActivitiesInDayData,
    CardBookedActivitiesInDayModal,
    CardBookedActivitiesInDayFilter,
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
      title: 'Actividades',
      titleRegular: 'agendadas',
      isOpenModal: false,
      chartId: 'card-bookedActivities',
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
        activitiesFilter: 'ALL',
        activityTypes: [],
        fromReportStatus: 'ACTIVITIES_CARD',
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
        pipelines: this.pipelines || [this.initPipeline],
        periodRange: this.periodRangeGlobal ||
          this.chart.filtersFull?.periodRange || { start, end },
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
