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
import { GET_TOTAL_INCOME_GOAL } from '@/graphql/querys/chartsQuery';
import { colorsSalesman } from '@/constants/colorsChart';
import { linesDataMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineTotalIncomeGoalData',
  mixins: [linesDataMixin],
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          filterBy: 'count',
          filterTime: 'WEEKS',
          users: [],
          pipeline: {},
          periodRange: {
            start: '',
            end: '',
          },
          periodPredefined: ['THIS_MONTH'],
        };
      },
    },
  },
  data() {
    return {
      totalIncomeGoalLinearGraph: {
        mainDateList: [],
        secondDateList: [],
        mainAverageDateTotalIncomeGoal: [],
        secondAverageDateTotalIncomeGoal: [],
      },
      // Settings temporal
      modalSettings: {
        filterBy: 'count',
        filterTime: 'WEEKS',
        users: [],
        pipeline: {},
        periodRange: {
          start: '',
          end: '',
        },
        periodPredefined: [],
      },
      // Settings to filter in the query
      settings: {
        filterBy: 'count',
        filterTime: 'WEEKS',
        users: [],
        pipeline: {},
        periodRange: {
          start: '',
          end: '',
        },
        periodPredefined: [],
      },
    };
  },
  computed: {
    options() {
      return {
        chart: {
          height: !this.isPreview ? '350' : '250',
          width: !this.isWithScroll ? '100%' : '1200',
          type: 'line',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: 'top',
          horizontalAlign: !this.isWithScroll ? 'center' : 'left',
          showForSingleSeries: true,
        },
        stroke: {
          curve: 'smooth',
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
        xaxis: {
          categories: this.totalIncomeGoalLinearGraph.mainDateList.map(
            (list) => {
              return list.dateString;
            },
          ),
          title: {
            text: this.showTitleXaxis,
          },
          labels: {
            rotate: this.rotate,
          },
        },
        yaxis: {
          title: {
            text: this.showTitleYaxis,
          },
          tickAmount: 1,
          labels: {
            formatter: (val) => {
              return this.isCount
                ? val.toFixed(0)
                : `${this.formatPrice(val)} `;
            },
          },
        },
      };
    },
    rotate() {
      if (this.isLargeWidth) {
        if (this.isWeeks) {
          return '-90';
        }
        if (this.isMonths) {
          return '0';
        }
      }
      return 0;
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
          return 'Cantidad';
        }
        return 'Valor';
      }
      return undefined;
    },
    series() {
      const mainSeries =
        this.totalIncomeGoalLinearGraph?.mainTotalIncomeGoal?.totalIncomeGoals?.map(
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
        this.totalIncomeGoalLinearGraph?.secondTotalIncomeGoal?.totalIncomeGoals
          .length > 0
          ? this.totalIncomeGoalLinearGraph?.secondTotalIncomeGoal?.totalIncomeGoals?.map(
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
                this.totalIncomeGoalLinearGraph.mainAverageDateTotalIncomeGoal.map(
                  (item) => item.avgCount,
                ),
              )
            : this.convertTwoDigits(
                this.totalIncomeGoalLinearGraph.mainAverageDateTotalIncomeGoal.map(
                  (item) => item.avgSum,
                ),
              ),
        },
      ];

      const secondAverage =
        this.totalIncomeGoalLinearGraph?.secondAverageDateTotalIncomeGoal
          ?.length > 0
          ? [
              {
                name: 'Promedio anterior',
                data: this.isCount
                  ? this.convertTwoDigits(
                      this.totalIncomeGoalLinearGraph.secondAverageDateTotalIncomeGoal.map(
                        (item) => item.avgCount,
                      ),
                    )
                  : this.convertTwoDigits(
                      this.totalIncomeGoalLinearGraph.secondAverageDateTotalIncomeGoal.map(
                        (item) => item.avgSum,
                      ),
                    ),
              },
            ]
          : [];
      return [...mainAverage, ...mainSeries, ...secondAverage, ...secondSeries];
    },
    filters() {
      const filters = {
        dateRange: {
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
        },
        owners:
          this.ownersToCompare.length > 0
            ? this.ownersToCompare
            : this.ownersFilter,
        pipeline: this.pipelineFilter,
        typePeriodDisplay: this.settings.filterTime,
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
    update() {
      this.$apollo.queries.totalIncomeGoalLinearGraph.refetch();
    },
  },
  apollo: {
    totalIncomeGoalLinearGraph: {
      query: GET_TOTAL_INCOME_GOAL,
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
}

::v-deep .apexcharts-legend-marker {
  border-radius: 0 !important;
  width: 24px !important;
}
</style>
