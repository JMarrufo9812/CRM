import {
  CHANGE_CHART,
  UPDATE_FILTERS_CHARTS_DEFAULT,
} from '@/graphql/local-state/mutations';
import {
  GET_CHART,
  GET_FILTERS_CHARTS_GLOBAL,
  GET_FILTERS_CHARTS_DEFAULT,
} from '@/graphql/local-state/queries';

import { GET_USERS_ENTERPRISE } from '@/graphql/querys/usersQuery';
import { GET_PIPELINES } from '@/graphql/querys/pipelinesQuery';
import { GET_ACTIVITIES_TYPES } from '@/graphql/querys/activitiesQuery';
import { periods } from '@/constants/periods';
import { modalMethodsMixin } from '@/mixins/modalsMixin';

export const chartFiltersMethodsMixin = {
  mixins: [modalMethodsMixin],
  methods: {
    changeChart(chart) {
      this.$apollo
        .mutate({
          mutation: CHANGE_CHART,
          variables: { chart },
        })
        .then(() => {
          this.changeModal({
            id: 'modalFiltersChart',
            status: false,
          });
        })
        .catch((error) => console.log(error));
    },
  },
};

export const chartFiltersApolloMixin = {
  data() {
    return {
      chartId: '',
      chart: {
        filtersFull: {},
      },
    };
  },
  apollo: {
    chart: {
      query: GET_CHART,
      variables() {
        return { id: this.chartId };
      },
    },
    filtersChartsDefault: {
      query: GET_FILTERS_CHARTS_DEFAULT,
    },
    filtersChartsGlobal: {
      query: GET_FILTERS_CHARTS_GLOBAL,
    },
  },
};

export const chartFiltersApolloDataMixin = {
  data() {
    return {
      listPeriods: periods,
      userEnterprises: [],
      pipelines: [],
      filtersChartsGlobal: {},
      activityTypes: [],
    };
  },
  computed: {
    defaultTypesActivities() {
      return this.activityTypes;
    },
    defaultUsers() {
      return this.userEnterprises.map((user) => {
        return {
          __typename: 'User',
          id: user.id,
          name: `${user.user.name} ${user.user.lastName}`,
        };
      });
    },
    defaultPipelines() {
      return this.pipelines || [];
    },
    defaultPipeline() {
      return this.pipelines[0] || {};
    },
    defaultStages() {
      if (this.defaultPipeline?.stages?.length > 0) {
        return this.defaultPipeline.stages;
      }
      return [];
    },
  },
  watch: {
    defaultTypesActivities: {
      handler(newValue) {
        this.updateFilters(newValue, 'activityTypes');
      },
      immediate: true,
    },
    defaultUsers: {
      handler(newValue) {
        this.updateFilters(newValue, 'users');
      },
      immediate: true,
    },
    defaultPipelines: {
      handler(newValue) {
        this.updateFilters(newValue, 'pipelines');
      },
      immediate: true,
    },
    defaultStages: {
      handler(newValue) {
        this.updateFilters(newValue, 'stages');
      },
      immediate: true,
    },
  },
  methods: {
    getPeriod(id) {
      return this.listPeriods.find((period) => {
        return period.id === id;
      });
    },
    updateFilters(filters, field) {
      const filtersDefault = { [field]: filters };

      this.$apollo.mutate({
        mutation: UPDATE_FILTERS_CHARTS_DEFAULT,
        variables: {
          updateFilters: filtersDefault,
        },
      });
    },
  },
  apollo: {
    userEnterprises: {
      query: GET_USERS_ENTERPRISE,
      fetchPolicy: 'no-cache',
      variables: {
        filters: {
          status: 'ACTIVE',
        },
      },
    },
    pipelines: {
      query: GET_PIPELINES,
      fetchPolicy: 'no-cache',
    },
    activityTypes: {
      query: GET_ACTIVITIES_TYPES,
      fetchPolicy: 'no-cache',
    },
  },
};
