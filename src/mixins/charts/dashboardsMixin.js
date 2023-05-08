import { periods } from '@/constants/periods';
import { GET_FILTERS_CHARTS_GLOBAL } from '@/graphql/local-state/queries';
import { GET_USERS_ENTERPRISE } from '@/graphql/querys/usersQuery';
import { GET_PIPELINES } from '@/graphql/querys/pipelinesQuery';
import { GET_ACTIVITIES_TYPES } from '@/graphql/querys/activitiesQuery';

export const dashboardsMixin = {
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
      return this.filtersChartsGlobal.users.length
        ? this.filtersChartsGlobal.users
        : this.userEnterprises;
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
    defaultPeriodPredefined() {
      return this.filtersChartsGlobal.periodPredefined.length
        ? [this.filtersChartsGlobal.periodPredefined[0]]
        : ['THIS_MONTH'];
    },
    defaultPeriodRange() {
      const [start = '', end = ''] = this.defaultPeriodPredefined.length
        ? this.getPeriod(this.defaultPeriodPredefined[0]).get()
        : this.getPeriod('THIS_MONTH').get();
      return {
        start,
        end,
      };
    },
  },
  methods: {
    getPeriod(id) {
      return this.listPeriods.find((period) => {
        return period.id === id;
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
    filtersChartsGlobal: {
      query: GET_FILTERS_CHARTS_GLOBAL,
    },
  },
};
