<template>
  <div>
    <ListFilters v-if="!isPreview" :settings="settings"></ListFilters>
    <div
      class="text-center bgWhite"
      :class="[{ 'py-5 px-3': !isPreview }, { showScroll: isWithScroll }]"
    >
      <apexchart
        :height="!isPreview ? 350 : 250"
        type="line"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import { GET_SALES_GROWTH_MONTH_BY_MONTH } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { barsDataMixin } from '@/mixins/charts/barsMixin';
import { colorsSalesman } from '@/constants/colorsChart';

export default {
  name: 'LineSalesGrowthMonthlyData',
  mixins: [barsDataMixin],
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          filterBy: 'count',
          filterTimep: 'MONTHS',
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
      salesGrowthMonthByMonthLinearGraph: {
        mainDateList: [],
        secondDateList: [],
        mainGrowthMonthByMonth: [],
        secondGrowthMonthByMonth: [],
        mainAverageGrowthMonthByMonth: [],
        secondAverageGrowthMonthByMonth: [],
      },
      // Settings temporal
      modalSettings: {
        filterBy: 'count',
        filterTimep: 'MONTHS',
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
        filterTimep: 'MONTHS',
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
        this.salesGrowthMonthByMonthLinearGraph.mainDateList.map(
          (main) => main.dateString,
        ),
      );
    },
    series() {
      const mainSeries =
        this.salesGrowthMonthByMonthLinearGraph?.mainGrowthMonthByMonth?.growthMonthByMonth?.map(
          ({ name, countList, sumList }) => {
            return {
              name,
              data: this.isCount
                ? this.convertTwoDigits(countList)
                : this.convertTwoDigits(sumList),
            };
          },
        ) || [];
      const secondSeries =
        this.dateRangeToCompare &&
        this.salesGrowthMonthByMonthLinearGraph?.secondGrowthMonthByMonth
          ?.growthMonthByMonth?.length > 0
          ? this.salesGrowthMonthByMonthLinearGraph?.secondGrowthMonthByMonth?.growthMonthByMonth?.map(
              ({ name, countList, sumList }) => {
                return {
                  name: `${name} período anterior`,
                  data: this.isCount
                    ? this.convertTwoDigits(countList)
                    : this.convertTwoDigits(sumList),
                };
              },
            )
          : [];

      const mainAverage = [
        {
          name: 'Promedio',
          data: this.isCount
            ? this.convertTwoDigits(
                this.salesGrowthMonthByMonthLinearGraph.mainAverageGrowthMonthByMonth.map(
                  (item) => item.avgCount,
                ),
              )
            : this.convertTwoDigits(
                this.salesGrowthMonthByMonthLinearGraph.mainAverageGrowthMonthByMonth.map(
                  (item) => item.avgSum,
                ),
              ),
        },
      ];

      const secondAverage =
        this.salesGrowthMonthByMonthLinearGraph?.secondAverageGrowthMonthByMonth
          ?.length > 0
          ? [
              {
                name: 'Promedio anterior',
                data: this.isCount
                  ? this.convertTwoDigits(
                      this.salesGrowthMonthByMonthLinearGraph.secondAverageGrowthMonthByMonth.map(
                        (item) => item.avgCount,
                      ),
                    )
                  : this.convertTwoDigits(
                      this.salesGrowthMonthByMonthLinearGraph.secondAverageGrowthMonthByMonth.map(
                        (item) => item.avgSum,
                      ),
                    ),
              },
            ]
          : [];
      return [...mainAverage, ...mainSeries, ...secondAverage, ...secondSeries];
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
        dateString = list;
      }

      return {
        chart: {
          type: 'line',
          height: !this.isPreview ? '350' : '250',
          width: !this.isWithScroll ? '100%' : '600',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        markers: {
          size: 5,
          colors: undefined,
          strokeColors: '#fff',
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: 'circle',
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3,
          },
        },
        colors: colorsSalesman,
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5],
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: 'top',
          horizontalAlign: !this.isWithScroll ? 'center' : 'left',
          showForSingleSeries: true,
        },
        xaxis: {
          categories: dateString,
          title: {
            text: this.showTitleXaxis,
          },
        },
        yaxis: {
          labels: {
            formatter: (val) => {
              return `${val.toFixed(2)}%`;
            },
          },
          title: {
            text: this.showTitleYaxis,
          },
        },
      };
    },
    formatSeries(list) {
      if (list && list.length) {
        return list.map((item, index) => {
          return {
            name:
              this.settings.typeCompare === 'date' && index === 1
                ? `${item.name} anterior`
                : item.name,
            data: this.isCount ? [...item.countList] : [...item.sumList],
          };
        });
      }
      return [];
    },
    update() {
      this.$apollo.queries.salesGrowthMonthByMonthLinearGraph.refetch();
    },
  },
  apollo: {
    salesGrowthMonthByMonthLinearGraph: {
      query: GET_SALES_GROWTH_MONTH_BY_MONTH,
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
