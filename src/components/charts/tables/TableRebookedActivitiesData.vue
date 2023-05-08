<template>
  <div>
    <ListFilters v-if="!isPreview" :settings="settings"></ListFilters>
    <div
      class="text-center bgWhite"
      :class="[{ 'py-5 px-3': !isPreview }, { showScroll: isWithScroll }]"
    >
      <v-data-table
        dense
        item-key="dealId"
        :headers="headers"
        :items="
          rebookedActivitiesTableGraph.mainRebookedActivities.rebookedActivities
        "
        :items-per-page="10"
        :server-items-length="
          rebookedActivitiesTableGraph.mainRebookedActivities.count || 0
        "
        :page="page"
        class="elevation-1"
        @update:page="updatePage"
      ></v-data-table>
      <h4 v-if="!isPreview && settings.typeCompare === 'date'">
        Comparación de fecha
      </h4>
      <h4 v-if="!isPreview && settings.typeCompare === 'user'">
        Comparación con otro usuario
      </h4>
      <v-data-table
        v-if="!isPreview && settings.typeCompare !== 'none'"
        dense
        item-key="dealId"
        :headers="headers"
        :items="listCompare"
        :items-per-page="10"
        :server-items-length="countCompare"
        :page="page"
        class="elevation-1"
        @update:page="updatePage"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
import { GET_REBOOKED_ACTIVITIES } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { tablesDataMixin } from '@/mixins/charts/tablesMixin';

export default {
  name: 'TableRebookedActivitiesData',
  mixins: [tablesDataMixin],
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          activityTypes: [],
          stages: [],
          users: [],
          pipeline: {},
          periodRange: {
            start: '',
            end: '',
          },
          periodPredefined: ['THIS_MONTH'],
          typeCompare: 'none',
        };
      },
    },
  },
  data() {
    return {
      page: 1,
      headers: [
        {
          text: 'Tratos',
          align: 'start',
          sortable: false,
          value: 'dealTitle',
        },
        {
          text: 'Total',
          sortable: false,
          value: 'total',
        },
      ],
      listFilterBy: FILTER_TYPE_VALUE,
      rebookedActivitiesTableGraph: {
        mainRebookedActivities: {},
        secondRebookedActivities: {},
      },
      // Settings temporal
      modalSettings: {
        activityTypes: [],
        stages: [],
        users: [],
        pipeline: {},
        periodRange: {
          start: '',
          end: '',
        },
        periodPredefined: ['THIS_MONTH'],
        typeCompare: 'none',
      },
      // Settings to filter in the query
      settings: {
        activityTypes: [],
        stages: [],
        users: [],
        pipeline: {},
        periodRange: {
          start: '',
          end: '',
        },
        periodPredefined: ['THIS_MONTH'],
        typeCompare: 'none',
      },
    };
  },
  computed: {
    listCompare() {
      return (
        this.rebookedActivitiesTableGraph.seconrebookedActivities
          ?.rebookedActivities || []
      );
    },
    countCompare() {
      return (
        this.rebookedActivitiesTableGraph.secondRebookedActivities?.count || 0
      );
    },
    isWithScroll() {
      return this.isLargeWidth && this.isPreview;
    },
    filters() {
      const filters = {
        dateRange: {
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
        },
        owners: this.ownersFilter,
        pipeline: this.pipelineFilter,
        activityTypes: this.settings.activityTypes.map((item) => {
          return { id: item.id };
        }),
        stages: this.settings.stages.map((item) => {
          return { id: item.id };
        }),
      };
      if (this.ownerToCompare) {
        filters.ownerToCompare = this.ownerToCompare;
      }
      if (
        this.dateRangeToCompare &&
        this.dateRangeToCompare.dateStart !== '' &&
        this.dateRangeToCompare.dateEnd !== ''
      ) {
        filters.dateRangeToCompare = this.dateRangeToCompare;
      }
      return filters;
    },
  },
  methods: {
    updatePage(page) {
      this.page = page;
    },
    update() {
      this.$apollo.queries.rebookedActivitiesTableGraph.refetch();
    },
  },
  apollo: {
    rebookedActivitiesTableGraph: {
      query: GET_REBOOKED_ACTIVITIES,
      fetchPolicy: 'no-cache',
      client: 'charts',
      variables() {
        return {
          filters: this.filters,
        };
      },
      skip() {
        return (
          this.dateStart === '' ||
          this.dateEnd === '' ||
          !this.pipelineFilter.id ||
          this.ownersFilter.length === 0 ||
          this.settings.activityTypes.length === 0 ||
          this.settings.stages.length === 0
        );
      },
      watchLoading(isLoading) {
        this.isLoading = isLoading;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.bgWhite {
  background-color: white;
}

.showScroll {
  overflow-x: scroll;
  overflow-y: hidden;
}

::v-deep .apexcharts-legend-marker {
  border-radius: 0 !important;
  width: 24px !important;
}

::v-deep .v-data-footer__select {
  margin-right: 0 !important;
}

::v-deep .v-data-footer__pagination {
  margin: 0 !important;
}
</style>
