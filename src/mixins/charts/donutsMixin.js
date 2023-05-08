import BaseCardChart from '@/components/charts/layout/BaseCardChart.vue';
import { chartFiltersApolloMixin } from '@/mixins/chartFiltersMixin';
import { periods } from '@/constants/periods';

export const donutsPreviewMixin = {
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
      isRefetch: false,
      periods,
      isOpenModal: false,
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
    periodRange() {
      const [start, end] = this.getPeriod(
        this.defaultPeriod || this.initFilter.periodPredefined[0],
      ).get();
      return { start, end };
    },
    users() {
      if (this.chart.filtersFull?.users?.length > 0) {
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
