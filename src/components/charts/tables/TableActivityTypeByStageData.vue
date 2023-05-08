<template>
  <div>
    <ListFilters v-if="!isPreview" :settings="settings"></ListFilters>
    <div
      class="text-center bgWhite"
      :class="[{ 'py-5 px-3': !isPreview }, { showScroll: isWithScroll }]"
    >
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th
                class="text-left"
                v-for="(col, index) in header"
                :key="`${col}${index}tr`"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows" :key="`${index}tr`">
              <td
                class="text-left"
                v-for="item in row"
                :key="`${index}-${item.name}`"
              >
                {{ item.value }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <h4 v-if="!isPreview && settings.typeCompare === 'date'">
        Comparación de fecha
      </h4>
      <h4 v-if="!isPreview && settings.typeCompare === 'user'">
        Comparación con otro usuario
      </h4>
      <v-simple-table
        dense
        v-if="!isPreview && settings.typeCompare !== 'none'"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th
                class="text-left"
                v-for="(col, index) in header"
                :key="`${col}${index}tr`"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rowsCompare" :key="`${index}trCompare`">
              <td class="text-left" v-for="item in row" :key="item.name">
                {{ item.value }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import { GET_ACTIVITY_BY_STAGE } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { tablesDataMixin } from '@/mixins/charts/tablesMixin';

export default {
  name: 'TableActivityTypeByStageData',
  mixins: [tablesDataMixin],
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          dealsFilter: 'ALL',
          activitiesFilter: 'ALL',
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
      listFilterBy: FILTER_TYPE_VALUE,
      activitiesByStageHorizontalBarsAndTable: {
        mainActivitiesByStage: [],
        secondActivitiesByStage: [],
      },
      // Settings temporal
      modalSettings: {
        dealsFilter: 'ALL',
        activitiesFilter: 'ALL',
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
        dealsFilter: 'ALL',
        activitiesFilter: 'ALL',
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
    header() {
      if (this.activitiesByStageHorizontalBarsAndTable.stages) {
        return this.activitiesByStageHorizontalBarsAndTable.stages;
      }
      return [];
    },
    rows() {
      if (this.activitiesByStageHorizontalBarsAndTable.mainActivitiesByStage) {
        return this.activitiesByStageHorizontalBarsAndTable.mainActivitiesByStage.map(
          (activityItem) => {
            const stages = activityItem.countList.map((value) => {
              return {
                name: value.stageName,
                value: value.count,
              };
            });
            stages.unshift({ name: 'activity', value: activityItem.typeName });
            return stages;
          },
        );
      }
      return [];
    },
    rowsCompare() {
      if (
        this.activitiesByStageHorizontalBarsAndTable.secondActivitiesByStage
      ) {
        return this.activitiesByStageHorizontalBarsAndTable.secondActivitiesByStage.map(
          (activityItem, index) => {
            const stages = this.activitiesByStageHorizontalBarsAndTable.secondActivitiesByStage.map(
              (activity) => {
                return {
                  name: activity.typeName,
                  value: activity.countList[index]?.count,
                };
              },
            );
            stages.unshift({ name: 'activity', value: activityItem.typeName });
            return stages;
          },
        );
      }
      return [];
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
        dealsFilter: this.settings.dealsFilter,
        activitiesFilter: this.settings.activitiesFilter,
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
    update() {
      this.$apollo.queries.activitiesByStageHorizontalBarsAndTable.refetch();
    },
  },
  apollo: {
    activitiesByStageHorizontalBarsAndTable: {
      query: GET_ACTIVITY_BY_STAGE,
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
          this.ownersFilter.length === 0
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
</style>
