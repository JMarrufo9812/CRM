import BaseCardChart from '@/components/charts/layout/BaseCardChart.vue';
import {
  chartFiltersApolloMixin,
  chartFiltersMethodsMixin,
} from '@/mixins/chartFiltersMixin';
import { periods, periodsToCompare } from '@/constants/periods';
import BaseModalChart from '@/components/charts/layout/BaseModalChart.vue';
import BaseModalFilters from '@/components/charts/layout/BaseModalFilters.vue';
import PeriodPredefined from '@/components/charts/filters/PeriodPredefined.vue';
import ComparePeriodBars from '@/components/charts/filters/ComparePeriodBars.vue';
import { chartsMixin } from '@/mixins/chartsMixin';

export const barsPreviewMixin = {
  components: {
    BaseCardChart,
  },
  mixins: [chartFiltersApolloMixin],
  props: {
    filtersGlobal: {
      type: Object,
      default: () => {
        return {
          users: [],
          periodPredefined: [],
        };
      },
    },
  },
  data() {
    return {
      periods,
      isOpenModal: false,
      isRefetch: false,
    };
  },
  computed: {
    usersGlobal() {
      if (this.filtersGlobal.users.length > 0) {
        return this.filtersGlobal.users;
      }
      return null;
    },
    periodPredefinedGlobal() {
      if (
        this.filtersGlobal.periodPredefined &&
        this.filtersGlobal.periodPredefined.length > 0
      ) {
        return [this.filtersGlobal.periodPredefined[0]];
      }
      return null;
    },
    periodRangeGlobal() {
      if (
        this.filtersGlobal.periodPredefined &&
        this.filtersGlobal.periodPredefined.length > 1
      ) {
        const range = this.filtersGlobal.periodPredefined[1];
        return { start: range[0], end: range[1] };
      }
      return null;
    },
    initUsers() {
      return this.filtersChartsDefault.users &&
        this.filtersChartsDefault.users.length > 0
        ? this.filtersChartsDefault.users
        : null;
    },
    initPipeline() {
      return this.filtersChartsDefault.pipelines &&
        this.filtersChartsDefault.pipelines.length > 0
        ? this.filtersChartsDefault.pipelines[0]
        : null;
    },
    initPipelines() {
      return this.filtersChartsDefault.pipelines &&
        this.filtersChartsDefault.pipelines.length > 0
        ? [this.filtersChartsDefault.pipelines[0]]
        : null;
    },
    periodRange() {
      const [start, end] = this.getPeriod(
        this.defaultPeriod || this.initFilter.periodPredefined[0],
      ).get();
      return { start, end };
    },
    users() {
      if (this.chart.filtersFull?.users) {
        return this.chart.filtersFull?.users;
      }
      return null;
    },
    pipelines() {
      if (this.chart.filtersFull?.pipeline) {
        return [this.chart.filtersFull?.pipeline];
      }
      return null;
    },
  },
  methods: {
    getPeriod(id) {
      return this.periods.find((period) => {
        return period.id === id;
      });
    },
    openModal() {
      this.isOpenModal = true;
    },
    closeModal() {
      this.isOpenModal = false;
    },
  },
};

export const barsModalMixin = {
  components: {
    BaseModalChart,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Sin título',
    },
    titleRegular: {
      type: String,
      default: '',
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};

export const barsFilterMixin = {
  components: {
    BaseModalFilters,
    ComparePeriodBars,
    PeriodPredefined,
  },
  mixins: [chartFiltersMethodsMixin],
  props: {
    isIcon: {
      type: Boolean,
      default: false,
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listCompare: periodsToCompare,
      isOpenModalFilter: false,
    };
  },
  methods: {
    findPeriod(idPeriod) {
      return this.listCompare.find((period) => period.id === idPeriod);
    },
    updatePeriodSelected(idPeriod) {
      if (idPeriod !== 'CUSTOM') {
        const resultPeriod = this.findPeriod(idPeriod);
        const periodRange = resultPeriod
          ? resultPeriod.get(this.filters.periodPredefined[0])
          : [];

        if (periodRange) {
          [
            this.filters.periodRangeToCompare.start,
            this.filters.periodRangeToCompare.end,
          ] = periodRange;
        }
      }
    },
    changeActivityTypes(status) {
      this.filters.activityTypes = status;
    },
    changeStatusActivity(status) {
      this.filters.activitiesFilter = status;
    },
    changeStatusDeal(status) {
      this.filters.dealsFilter = status;
    },
    statusModal(status) {
      this.isOpenModalFilter = status;
    },
    changeTime(timeSelected) {
      this.filters.filterTime = timeSelected;
    },
    changeFilterBy(filterBy) {
      this.filters.filterBy = filterBy;
    },
    changeUser(user) {
      this.filters.user = user;
    },
    changeUsers(users) {
      this.filters.users = users;
    },
    changePipeline(pipeline) {
      this.filters.pipeline = pipeline;
    },
    changePeriodPredefined(periodPredefined) {
      this.filters.periodPredefined = periodPredefined;
      [
        ,
        [this.filters.periodRange.start, this.filters.periodRange.end],
      ] = periodPredefined;
      if (this.typeCompare === 'date') {
        this.updatePeriodSelected(this.filters.periodRangeToCompare.period);
      }
    },
    changeComparePeriod({ isCompare, typeCompare, periodCompare }) {
      if (isCompare) {
        if (typeCompare === 'date') {
          if (periodCompare) {
            this.filters.typeCompare = typeCompare;
            this.filters.periodRangeToCompare.period =
              periodCompare.periodSelected;
            if (periodCompare.periodRange.length > 0) {
              [
                this.filters.periodRangeToCompare.start,
                this.filters.periodRangeToCompare.end,
              ] = periodCompare.periodRange;
            }
          }
        }
      } else {
        this.filters.typeCompare = typeCompare;
        this.filters.periodRangeToCompare.period = '';
        this.filters.periodRangeToCompare.start = '';
        this.filters.periodRangeToCompare.end = '';
      }
    },
  },
};

export const barsDataMixin = {
  mixins: [chartsMixin],
  props: {
    isPreview: {
      type: Boolean,
      default: false,
    },
    isRefetch: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isRefetch(newValue) {
      if (newValue) {
        this.update();
        this.$emit('updateRefetch');
      }
    },
  },
  computed: {
    isLargeWidth() {
      return (
        this.settings.periodPredefined[0] === 'THIS_YEAR' ||
        this.settings.periodPredefined[0] === 'LAST_YEAR'
      );
    },
  },
};
