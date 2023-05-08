<template>
  <div>
    <ListFilters v-if="!isPreview" :settings="settings"></ListFilters>
    <div
      class="text-center bgWhite"
      :class="[{ 'py-5 px-3': !isPreview }, { showScroll: isWithScroll }]"
    >
      <apexchart
        :height="!isPreview ? 350 : 250"
        type="bar"
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
        type="bar"
        :options="optionsCompare"
        :series="seriesCompare"
      ></apexchart>
    </div>
    <BarOpportunitySalesInformation
      v-if="!isPreview"
      :information="opportunitiesSalesVerticalBarsGraph.informationBar"
      :filterBy="settings.filterBy"
    ></BarOpportunitySalesInformation>
  </div>
</template>

<script>
import { GET_OPPORTUNITY_SALE } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { barsDataMixin } from '@/mixins/charts/barsMixin';
import { colorsStatus } from '@/constants/colorsChart';
import BarOpportunitySalesInformation from '@/components/charts/bars/BarOpportunitySalesInformation.vue';

export default {
  name: 'BarOpportunitySalesData',
  mixins: [barsDataMixin],
  components: { BarOpportunitySalesInformation },
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
  },
  data() {
    return {
      listFilterBy: FILTER_TYPE_VALUE,
      opportunitiesSalesVerticalBarsGraph: {
        mainOpportunitySales: {},
        secondOpportunitySales: {},
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
  computed: {
    options() {
      return this.formatOptions(
        this.opportunitiesSalesVerticalBarsGraph.mainOpportunitiesSales,
      );
    },
    optionsCompare() {
      return this.formatOptions(
        this.opportunitiesSalesVerticalBarsGraph.secondOpportunitiesSales,
      );
    },
    series() {
      return this.formatSeries(
        this.opportunitiesSalesVerticalBarsGraph.mainOpportunitiesSales,
      );
    },
    seriesCompare() {
      return this.formatSeries(
        this.opportunitiesSalesVerticalBarsGraph.secondOpportunitiesSales,
      );
    },
    showTitleXaxis() {
      if (!this.isPreview) {
        if (this.isWeeks) {
          return 'Semanas';
        }
        return 'Meses';
      }
      return undefined;
    },
    showTitleYaxis() {
      if (!this.isPreview) {
        if (this.isCount) {
          return 'Cantidad de tratos';
        }
        return 'Valor de tratos';
      }
      return undefined;
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
        typePeriod: this.settings.periodPredefined[0],
        typePeriodDisplay: this.settings.filterTime,
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
      let dateString;
      if (list) {
        ({ dateString = [] } = list);
      }

      return {
        chart: {
          type: 'bar',
          height: !this.isPreview ? '350' : '250',
          width: !this.isWithScroll ? '100%' : '600',
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 8,
            horizontal: false,
          },
        },
        dataLabels: {
          formatter: (val) => {
            return this.isCount ? val : this.formatPrice(val);
          },
        },
        xaxis: {
          categories: dateString || [],
          title: {
            text: this.showTitleXaxis,
          },
        },
        yaxis: {
          labels: {
            formatter: (val) => {
              return this.isCount ? val : this.formatPrice(val);
            },
          },
          title: {
            text: this.showTitleYaxis,
          },
        },
        colors: colorsStatus,
        legend: {
          position: 'top',
          horizontalAlign: this.isPreview ? 'left' : 'center',
        },
        fill: {
          opacity: 1,
        },
      };
    },
    formatSeries(list) {
      let wonDealsCount = [];
      let lostDealsCount = [];
      let openDealsCount = [];
      let wonDealsSum = [];
      let lostDealsSum = [];
      let openDealsSum = [];
      if (list) {
        ({
          wonDealsCount = [],
          lostDealsCount = [],
          openDealsCount = [],
          wonDealsSum = [],
          lostDealsSum = [],
          openDealsSum = [],
        } = list);
      }

      return [
        {
          name: 'Ganados',
          data: this.isCount
            ? wonDealsCount.map(({ count }) => count)
            : wonDealsSum.map(({ sum }) => sum),
        },
        {
          name: 'Perdidos',
          data: this.isCount
            ? lostDealsCount.map(({ count }) => count)
            : lostDealsSum.map(({ sum }) => sum),
        },
        {
          name: 'Abiertos',
          data: this.isCount
            ? openDealsCount.map(({ count }) => count)
            : openDealsSum.map(({ sum }) => sum),
        },
      ];
    },
    update() {
      this.$apollo.queries.opportunitiesSalesVerticalBarsGraph.refetch();
    },
  },
  apollo: {
    opportunitiesSalesVerticalBarsGraph: {
      query: GET_OPPORTUNITY_SALE,
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
