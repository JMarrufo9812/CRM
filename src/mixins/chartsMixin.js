import moment from 'moment';
import ListFilters from '@/components/charts/filters/ListFilters.vue';
import { FILTERS } from '@/constants/filtersChart';

export const chartsMixin = {
  components: {
    ListFilters,
  },
  data() {
    return {
      isLoading: false,
      isOpenMenu: false,
      isOpenModal: false,
      listFilters: FILTERS,
    };
  },
  created() {
    this.settings = this.noReactive(this.defaultFilter);
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
    isWeeks() {
      return this.settings.filterTime === 'WEEKS';
    },
    isMonths() {
      return this.settings.filterTime === 'MONTHS';
    },
    isCount() {
      return this.settings.filterBy === 'count';
    },
    pipelineFilter() {
      return { id: this.settings.pipeline?.id };
    },
    pipelinesFilter() {
      return this.settings.pipelines.length
        ? this.settings.pipelines.map((pipeline) => {
            return { id: pipeline.id };
          })
        : [];
    },
    ownerFilter() {
      return { id: this.settings.user?.id };
    },
    ownersFilter() {
      if (this.settings.users && this.settings.users.length) {
        const owners = this.settings.users.map((user) => user.id);
        return [...new Set(owners)].map((id) => {
          return { id };
        });
      }
      return [];
    },
    ownerToCompare() {
      if (this.settings.ownerToCompare && this.settings.ownerToCompare.id) {
        return { id: this.settings.ownerToCompare.id };
      }
      return null;
    },
    ownersToCompare() {
      if (this.settings.ownersToCompare.length) {
        const owners = this.settings.ownersToCompare.map((user) => user.id);
        return [...new Set(owners)].map((id) => {
          return { id };
        });
      }
      return [];
    },
    dateStart() {
      return this.settings.periodRange.start;
    },
    dateEnd() {
      return this.settings.periodRange.end;
    },
    dateRangeToCompare() {
      if (
        this.settings.periodRangeToCompare?.start &&
        this.settings.periodRangeToCompare?.end
      ) {
        return {
          dateStart: moment(this.settings.periodRangeToCompare.start).format(),
          dateEnd: moment(this.settings.periodRangeToCompare.end).format(),
        };
      }

      return null;
    },
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
    convertTwoDigits(list) {
      if (list && list.length) {
        return list.map((item) => Number(item.toFixed(2)));
      }
      return [];
    },
    formatPrice(price) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
      }).format(price);
    },
    calculatePercentage(list) {
      return list.map((item, index, elements) => {
        const nextElement = elements[index + 1];
        return nextElement ? (nextElement * 100) / item : 0;
      });
    },
    changeStages(stages) {
      this.modalSettings.stages = stages;
    },
    changeActivityTypes(activities) {
      this.modalSettings.activityTypes = activities;
    },
    changeStatusActivity(status) {
      this.modalSettings.statusActivity = status;
    },
    changeTime(timeSelected) {
      this.modalSettings.filterTime = timeSelected;
    },
    changeFilterBy(filterBy) {
      this.modalSettings.filterBy = filterBy;
    },
    changeUser(user) {
      this.modalSettings.user = user;
    },
    changeUsers(users) {
      this.modalSettings.users = users;
    },
    changePipeline(pipeline) {
      this.modalSettings.pipeline = pipeline;
    },
    changePeriodRange(periodRange) {
      this.modalSettings.periodRange = periodRange;
    },
    changePeriodPredefined(periodPredefined) {
      this.modalSettings.periodPredefined = periodPredefined;
      [
        ,
        [
          this.modalSettings.periodRange.start,
          this.modalSettings.periodRange.end,
        ],
      ] = periodPredefined;
    },
    saveSettings() {
      this.settings = this.noReactive(this.modalSettings);
    },
  },
};
