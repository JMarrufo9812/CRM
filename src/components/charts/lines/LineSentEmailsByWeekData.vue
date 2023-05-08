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
import { GET_SENT_EMAILS_BY_WEEK } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { linesDataMixin } from '@/mixins/charts/linesMixin';
import { colorsSalesman } from '@/constants/colorsChart';

export default {
  name: 'LineSentEmailsByWeekData',
  mixins: [linesDataMixin],
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
      sentEmailsByWeekLinearGraph: {
        mainDateList: [],
        secondDateList: [],
        mainSentEmailsByWeek: {},
        secondSentEmailsByWeek: {},
        mainAverageSentEmailsByWeek: [],
        secondAverageSentEmailsByWeek: [],
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
      return this.formatOptions(this.sentEmailsByWeekLinearGraph.mainDateList);
    },
    series() {
      const mainSeries =
        this.sentEmailsByWeekLinearGraph?.mainSentEmailsByWeek?.sentEmailsByWeek?.map(
          ({ name, countList }) => {
            return {
              name,
              data: countList,
            };
          },
        ) || [];
      const secondSeries =
        this.dateRangeToCompare &&
        this.sentEmailsByWeekLinearGraph?.secondSentEmailsByWeek
          ?.sentEmailsByWeek?.length > 0
          ? this.sentEmailsByWeekLinearGraph?.secondSentEmailsByWeek?.sentEmailsByWeek?.map(
              ({ name, countList }) => {
                return {
                  name: `${name} período anterior`,
                  data: countList,
                };
              },
            )
          : [];

      const mainAverage = [
        {
          name: 'Promedio',
          data: this.convertTwoDigits(
            this.sentEmailsByWeekLinearGraph.mainAverageSentEmailsByWeek.map(
              (item) => item.avgCount,
            ),
          ),
        },
      ];

      const secondAverage =
        this.sentEmailsByWeekLinearGraph?.secondAverageSentEmailsByWeek
          ?.length > 0
          ? [
              {
                name: 'Promedio anterior',
                data: this.convertTwoDigits(
                  this.sentEmailsByWeekLinearGraph.secondAverageSentEmailsByWeek.map(
                    (item) => item.avgCount,
                  ),
                ),
              },
            ]
          : [];
      return [...mainAverage, ...mainSeries, ...secondAverage, ...secondSeries];
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
    formatOptions(list) {
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
        colors: colorsSalesman,
        legend: {
          position: 'top',
          horizontalAlign: !this.isWithScroll ? 'center' : 'left',
          showForSingleSeries: true,
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5],
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
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          tickPlacement: 'on',
          type: 'category',
          categories: list.map((item) => item.dateString) || [],
          labels: {
            show: true,
            style: {
              fontSize: '12px',
            },
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            height: 6,
            offsetX: 0,
            offsetY: 0,
          },
          crosshairs: {
            show: true,
            width: 1,
            position: 'back',
            opacity: 0.9,
            stroke: {
              color: '#b6b6b6',
              width: 0,
              dashArray: 0,
            },
            fill: {
              type: 'solid',
              color: '#B1B9C4',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 1,
              opacity: 0.4,
            },
          },
        },
        yaxis: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          tickAmount: 1,
          labels: {
            formatter: (val) => {
              return val.toFixed(0);
            },
          },
        },
      };
    },
    formatSeries(list, isCompareDate) {
      if (list) {
        return list.map((item) => {
          return {
            name: isCompareDate ? `${item.name} anterior` : item.name,
            data: item.countList ? item.countList : [],
          };
        });
      }
      return [];
    },
    update() {
      this.$apollo.queries.sentEmailsByWeekLinearGraph.refetch();
    },
  },
  apollo: {
    sentEmailsByWeekLinearGraph: {
      query: GET_SENT_EMAILS_BY_WEEK,
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
