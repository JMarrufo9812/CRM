<template>
  <div>
    <ListFilters v-if="!isPreview" :settings="settings"></ListFilters>
    <div
      class="text-center bgWhite"
      :class="[{ 'py-5 px-3': !isPreview }, { showScroll: isWithScroll }]"
    >
      <apexchart
        :height="!isPreview ? 350 : 250"
        type="donut"
        :options="options"
        :series="series"
      ></apexchart>
      <h4 v-if="!isPreview && settings.typeCompare === 'date'">
        Comparación de fecha
      </h4>
      <h4 v-if="!isPreview && settings.typeCompare === 'user'">
        Comparación con otro usuario
      </h4>
      <apexchart
        v-if="!isPreview && settings.typeCompare !== 'none'"
        :height="!isPreview ? 350 : 250"
        type="donut"
        :options="optionsCompare"
        :series="seriesCompare"
      ></apexchart>
    </div>
    <DonutLostReasonInformation
      v-if="!isPreview"
      :information="lostDealsByLostReasonDonutGraph.informationBar"
      :filterBy="settings.filterBy"
    ></DonutLostReasonInformation>
  </div>
</template>

<script>
import { GET_LOST_OPPORTUNITIES_BY_CANCELLATION_REASON } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { chartsMixin } from '@/mixins/chartsMixin';
import { colorsSalesman } from '@/constants/colorsChart';
import DonutLostReasonInformation from '@/components/charts/donuts/DonutLostReasonInformation.vue';

export default {
  name: 'DonutLostReasonData',
  mixins: [chartsMixin],
  components: {
    DonutLostReasonInformation,
  },
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          filterBy: 'count',
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
    isPreview: {
      type: Boolean,
      default: false,
    },
    isRefetch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listFilterBy: FILTER_TYPE_VALUE,
      lostDealsByLostReasonDonutGraph: {
        mainLostDeals: {},
        secondLostDeals: {},
        informationBar: {},
      },
      // Settings temporal
      modalSettings: {
        filterBy: 'count',
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
        filterBy: 'count',
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
  watch: {
    isRefetch(newValue) {
      if (newValue) {
        this.update();
        this.$emit('updateRefetch');
      }
    },
  },
  computed: {
    options() {
      return this.formatOptions(
        this.lostDealsByLostReasonDonutGraph.mainLostDeals.reasonsList,
      );
    },
    optionsCompare() {
      if (this.lostDealsByLostReasonDonutGraph?.mainLostDeals.reasonsList) {
        return this.formatOptions(
          this.lostDealsByLostReasonDonutGraph.mainLostDeals.reasonsList,
        );
      }
      return {};
    },
    series() {
      return this.formatSeries(
        this.lostDealsByLostReasonDonutGraph.mainLostDeals,
      );
    },
    seriesCompare() {
      if (this.lostDealsByLostReasonDonutGraph?.secondLostDeals) {
        return this.formatSeries(
          this.lostDealsByLostReasonDonutGraph.secondLostDeals,
          this.settings.typeCompare === 'date',
        );
      }
      return [];
    },
    showTitleXaxis() {
      if (!this.isPreview) {
        return 'Total';
      }
      return undefined;
    },
    showTitleYaxis() {
      if (!this.isPreview) {
        return 'Etapas';
      }
      return undefined;
    },
    isLargeWidth() {
      return (
        this.settings.periodPredefined[0] === 'THIS_YEAR' ||
        this.settings.periodPredefined[0] === 'LAST_YEAR'
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
    formatOptions(list) {
      return {
        chart: {
          type: 'donut',
          height: !this.isPreview ? '350' : '250',
          width: !this.isWithScroll ? '100%' : '600',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        colors: colorsSalesman,
        labels: list || [],
        yaxis: {
          labels: {
            formatter: (val) => {
              return this.isCount ? val : `$${val}`;
            },
          },
        },
        noData: {
          text: 'No hay datos',
        },
        plotOptions: {
          pie: {
            donut: {
              background: '#808080',
            },
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: this.isPreview ? 'left' : 'center',
          showForSingleSeries: true,
        },
      };
    },
    formatSeries(list) {
      if (this.isCount) {
        if (list && list.countList) {
          return list.countList;
        }
      }
      if (list && list.sumList) {
        return list.sumList;
      }

      return [];
    },
    update() {
      this.$apollo.queries.lostDealsByLostReasonDonutGraph.refetch();
    },
  },
  apollo: {
    lostDealsByLostReasonDonutGraph: {
      query: GET_LOST_OPPORTUNITIES_BY_CANCELLATION_REASON,
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
