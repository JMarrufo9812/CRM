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
        :series="getSeries"
      ></apexchart>
    </div>
    <BarSalesCycleByStageInformation
      v-if="!isPreview"
      :information="salesCycleByStageVerticalBarsGraph.informationBar"
      :filterBy="settings.filterBy"
    ></BarSalesCycleByStageInformation>
  </div>
</template>

<script>
import { GET_SALES_CYCLE_BY_STAGE_BARS } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { barsDataMixin } from '@/mixins/charts/barsMixin';
import { colorsSalesman } from '@/constants/colorsChart';
import BarSalesCycleByStageInformation from '@/components/charts/bars/BarSalesCycleByStageInformation.vue';

export default {
  name: 'BarSalesCycleByStageData',
  mixins: [barsDataMixin],
  components: { BarSalesCycleByStageInformation },
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
      salesCycleByStageVerticalBarsGraph: {
        stages: [],
        ownersAvgDays: [{ mainAvgList: [], secondAvgList: [] }],
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
    options() {
      return this.formatOptions();
    },
    optionsCompare() {
      return this.formatOptions();
    },
    getSeries() {
      if (this.settings.typeCompare === 'date') {
        return [...this.series, ...this.seriesCompare];
      }

      return this.series;
    },
    series() {
      if (this.salesCycleByStageVerticalBarsGraph.mainSalesCycleAverageDays) {
        return this.salesCycleByStageVerticalBarsGraph.mainSalesCycleAverageDays.salesCycleAverageDays.map(
          ({ name, averageList }) => {
            return {
              name,
              data: averageList.map(({ avg }) => {
                return avg.toFixed(2);
              }),
            };
          },
        );
      }
      return [];
    },
    seriesCompare() {
      if (
        this.salesCycleByStageVerticalBarsGraph.secondSalesCycleAverageDays &&
        this.typeCompare !== 'none'
      ) {
        return this.salesCycleByStageVerticalBarsGraph.secondSalesCycleAverageDays.salesCycleAverageDays.map(
          ({ name, averageList }) => {
            return {
              name: `${name} anterior`,
              data: averageList ? averageList.map(({ avg }) => avg) : [],
            };
          },
        );
      }
      return [];
    },
    categories() {
      if (this.salesCycleByStageVerticalBarsGraph.stages) {
        return this.salesCycleByStageVerticalBarsGraph.stages.map(
          ({ stageName }) => stageName,
        );
      }
      return [];
    },
    showTitleXaxis() {
      if (!this.isPreview) {
        return 'Etapas';
      }
      return undefined;
    },
    showTitleYaxis() {
      if (!this.isPreview) {
        return 'Promedio en días';
      }
      return undefined;
    },
    isWithScroll() {
      return this.isPreview;
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
    formatOptions() {
      return {
        chart: {
          type: 'bar',
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
        legend: {
          position: 'top',
          horizontalAlign: this.isPreview ? 'left' : 'center',
          showForSingleSeries: true,
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
          },
          offsetY: -20,
          background: {
            enabled: true,
            foreColor: '#000',
            borderRadius: 0,
          },
          formatter: (val) => {
            return `${val} días`;
          },
        },
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2'],
          },
        },
        xaxis: {
          categories: this.getCategoriesSplit(this.categories),
          title: {
            text: this.showTitleXaxis,
          },
        },
        yaxis: {
          labels: {
            formatter: (val) => {
              return val.toFixed(2);
            },
          },
          tickAmount: 1,
          title: {
            text: this.showTitleYaxis,
          },
        },
        noData: {
          text: 'No hay datos',
        },
      };
    },
    update() {
      this.$apollo.queries.salesCycleByStageVerticalBarsGraph.refetch();
    },
    getCategoriesSplit(categories) {
      return categories && categories.length > 0
        ? categories.map((stage) => {
            return stage.split(' ');
          })
        : [];
    },
  },
  apollo: {
    salesCycleByStageVerticalBarsGraph: {
      query: GET_SALES_CYCLE_BY_STAGE_BARS,
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
