import BaseCardChart from '@/components/charts/layout/BaseCardChart.vue';
import BaseModalChart from '@/components/charts/layout/BaseModalChart.vue';
import {
  chartFiltersApolloMixin,
  chartFiltersMethodsMixin,
} from '@/mixins/chartFiltersMixin';
import { periods } from '@/constants/periods';
import ComparePeriod from '@/components/charts/filters/ComparePeriod.vue';
import BaseModalFilters from '@/components/charts/layout/BaseModalFilters.vue';
import PeriodPredefined from '@/components/charts/filters/PeriodPredefined.vue';
import BaseCardNumber from '@/components/charts/layout/BaseCardNumber.vue';
import { chartsCardMixin } from '@/mixins/chartsCardMixin';

export const cardsPreviewMixin = {
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
      isRefetch: false,
    };
  },
  computed: {
    usersGlobal() {
      return this.filtersGlobal.users.length > 0
        ? this.filtersGlobal.users
        : null;
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
      return this.filtersChartsDefault?.users?.length > 0
        ? this.filtersChartsDefault.users
        : null;
    },
    initPipeline() {
      return this.filtersChartsDefault.pipelines &&
        this.filtersChartsDefault.pipelines.length > 0
        ? this.filtersChartsDefault.pipelines[0]
        : null;
    },
    periodRange() {
      const [start, end] = this.getPeriod(
        this.defaultPeriod || this.initFilter.periodPredefined[0],
      ).get();
      return { start, end };
    },
    users() {
      const users =
        this.chart.filtersFull?.users?.length > 0
          ? this.chart.filtersFull.users
          : null;
      return users;
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

export const cardsModalMixin = {
  components: {
    BaseModalChart,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};

export const cardsFilterMixin = {
  components: {
    ComparePeriod,
    BaseModalFilters,
    PeriodPredefined,
  },
  mixins: [chartFiltersMethodsMixin],
  data() {
    return {
      isOpenModalFilter: false,
    };
  },
  methods: {
    statusModal(status) {
      this.isOpenModalFilter = status;
    },
    changeTime(timeSelected) {
      this.filters.filterTime = timeSelected;
    },
    changeFilterBy(filterBy) {
      this.filters.filterBy = filterBy;
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
    },
  },
};

export const cardsDataMixin = {
  props: {
    isRefetch: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseCardNumber,
  },
  mixins: [chartsCardMixin],
  watch: {
    isRefetch(newValue) {
      if (newValue) {
        this.update();
        this.$emit('updateRefetch');
      }
    },
  },
};
