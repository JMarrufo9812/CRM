import moment from 'moment';
import {
  FILTER_TYPE_PERIOD,
  FILTER_TYPE_VALUE,
  FILTERS,
} from '@/constants/filtersChart';

import ListFilters from '@/components/charts/filters/ListFilters.vue';

export const chartsCardMixin = {
  components: {
    ListFilters,
  },
  data() {
    return {
      isLoading: 0,
      listTime: FILTER_TYPE_PERIOD,
      listFilterBy: FILTER_TYPE_VALUE,
      isOpenMenu: false,
      isOpenModal: false,
      listFilters: FILTERS,
    };
  },
  watch: {
    defaultFilter: {
      handler() {
        this.settings = this.noReactive(this.defaultFilter);
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    listFiltersMap() {
      return this.getNewSettings(this.settings);
    },
    isCount() {
      return this.settings.filterBy === 'count';
    },
    textChart() {
      return this.settings.filterBy === 'count' ? 'por total' : 'por valor';
    },
    pipelineFilter() {
      return { id: this.settings.pipeline?.id };
    },
    pipelinesFilter() {
      return this.settings?.pipelines?.length
        ? this.settings.pipelines.map((pipelineId) => {
            return { id: pipelineId.id };
          })
        : [];
    },
    ownersFilter() {
      return this.settings?.users?.length
        ? this.settings.users.map((userId) => {
            return { id: userId.id };
          })
        : [];
    },
    dateStart() {
      return this.settings.periodRange.start
        ? moment(this.settings.periodRange.start).format()
        : '';
    },
    dateEnd() {
      return this.settings.periodRange.end
        ? moment(this.settings.periodRange.end).format()
        : '';
    },
    dateRangeToCompare() {
      if (
        this.settings.periodRangeToCompare.start &&
        this.settings.periodRangeToCompare.end
      ) {
        return {
          dateStart: moment(this.settings.periodRangeToCompare.start).format(),
          dateEnd: moment(this.settings.periodRangeToCompare.end).format(),
        };
      }

      return null;
    },
    ownerToCompare() {
      if (this.settings.ownerToCompare.id !== '') {
        return {
          id: this.settings.ownerToCompare.id,
        };
      }
      return '';
    },
  },
  created() {
    this.settings = this.noReactive(this.defaultFilter);
  },
  methods: {
    getNewSettings(settings) {
      const newSettings = {
        period: {
          id: settings.periodPredefined[0],
          range: {
            start: settings.periodRange.start,
            end: settings.periodRange.end,
          },
        },
      };
      if (settings.filterBy) {
        newSettings.filterBy = settings.filterBy;
      }
      if (settings.users) {
        newSettings.users = settings.users;
      }
      if (settings.user) {
        newSettings.user = settings.user;
      }
      if (settings.pipelines) {
        newSettings.pipelines = settings.pipelines;
      }
      if (settings.pipeline) {
        newSettings.pipeline = settings.pipeline;
      }

      const result = Object.entries(newSettings);

      return result.map((item) => {
        const findItem = this.listFilters.find(
          (filter) => filter.id === item[0],
        );
        return {
          ...findItem,
          optionSelected: this.getValuesFilter(item[0], item[1]),
        };
      });
    },
    getValuesFilter(filterKey, optionsFilter) {
      switch (filterKey) {
        case 'filterBy':
          return optionsFilter === 'count' ? 'Cantidad' : 'Valor';
        case 'pipelines':
          return optionsFilter.map((option) => option.name).join(', ');
        case 'pipeline':
          return optionsFilter.name;
        case 'users':
          return optionsFilter
            .map((option) => `${option.user.name} ${option.user.lastName}`)
            .join(', ');
        case 'user':
          return `${optionsFilter.user.name} ${optionsFilter.user.lastName}`;
        default:
          return optionsFilter;
      }
    },
    change(newValue, keyLabel) {
      if (this.modalSettings && this.modalSettings[keyLabel]) {
        this.modalSettings[keyLabel] = newValue;
      }
    },
    changePeriodPredefined(periodPredefined) {
      console.log(
        'changePeriodPredefined Cambiando de periodo',
        periodPredefined,
      );
      this.modalSettings.periodPredefined = periodPredefined;
      [
        ,
        [
          this.modalSettings.periodRange.start,
          this.modalSettings.periodRange.end,
        ],
      ] = periodPredefined;
    },
    changeComparePeriod({ isCompare, periodCompare }) {
      if (isCompare) {
        this.modalSettings.periodRangeToCompare.period =
          periodCompare.periodSelected;
        if (periodCompare.periodRange.length > 0) {
          [
            this.modalSettings.periodRangeToCompare.start,
            this.modalSettings.periodRangeToCompare.end,
          ] = periodCompare.periodRange;
        }
      } else {
        this.modalSettings.periodRangeToCompare.period = '';
        this.modalSettings.periodRangeToCompare.start = '';
        this.modalSettings.periodRangeToCompare.end = '';
      }
    },
    saveSettings() {
      this.settings = this.noReactive(this.modalSettings);
    },
    // Utils
    convertTwoDigits(list) {
      if (list && list.length) {
        return list.map((item) => item.toFixed(2));
      }
      return [];
    },
    formatPrice(price) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
      }).format(price);
    },
  },
};
