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
              <th class="text-left">
                Etapa
              </th>
              <th class="text-left">
                Cantidad
              </th>
              <th class="text-left">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rows" :key="`${index}tb-1`">
              <td class="text-left">{{ item.stage }}</td>
              <td class="text-left">{{ item.count }}</td>
              <td class="text-left">{{ item.sum | formatPrice }}</td>
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
              <th class="text-left">
                Etapa
              </th>
              <th class="text-left">
                Cantidad
              </th>
              <th class="text-left">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rowsCompare" :key="`${index}tb-2`">
              <td class="text-left">{{ item.stage }}</td>
              <td class="text-left">{{ item.count }}</td>
              <td class="text-left">{{ item.sum | formatPrice }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import { GET_LOST_OPPORTUNITIES_BY_STAGE } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { tablesDataMixin } from '@/mixins/charts/tablesMixin';

export default {
  name: 'TableLostOpportunitiesByStageData',
  mixins: [tablesDataMixin],
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
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
      lostDealsByStageTableGraph: {
        mainLostDealsByStage: [],
        secondLostDealsByStage: [],
      },
      // Settings temporal
      modalSettings: {
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
    rows() {
      if (this.lostDealsByStageTableGraph.mainLostDealsByStage) {
        return this.lostDealsByStageTableGraph.mainLostDealsByStage?.lostDealsByStage?.map(
          (item) => {
            return {
              stage: item.stageName,
              count: item.count,
              sum: item.sum,
            };
          },
        );
      }
      return [];
    },
    rowsCompare() {
      if (this.lostDealsByStageTableGraph.secondLostDealsByStage) {
        return this.lostDealsByStageTableGraph.secondLostDealsByStage?.lostDealsByStage?.map(
          (item) => {
            return {
              stage: item.stageName,
              count: item.count,
              sum: item.sum,
            };
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
      this.$apollo.queries.lostDealsByStageTableGraph.refetch();
    },
  },
  apollo: {
    lostDealsByStageTableGraph: {
      query: GET_LOST_OPPORTUNITIES_BY_STAGE,
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
