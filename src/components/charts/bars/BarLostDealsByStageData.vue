<template>
  <div>
    <ListFilters v-if="!isPreview" :settings="settings"></ListFilters>
    <div
      class="text-center bgWhite"
      :class="[{ 'py-5 px-3': !isPreview }, { showScroll: isWithScroll }]"
    >
      <div v-if="!isPreview && settings.typeCompare === 'date'">
        <h4>
          {{ textMain }}
        </h4>
        <span>{{ valuePeriodRange }}</span>
      </div>
      <div v-if="!isPreview && settings.typeCompare === 'user'">
        <h4>
          {{ textMain }}
        </h4>
        <span>{{ userMain }}</span>
      </div>
      <apexchart
        :height="!isPreview ? 350 : 250"
        type="bar"
        :options="options"
        :series="series"
      ></apexchart>
      <div v-if="!isPreview && settings.typeCompare === 'date'">
        <h4>
          {{ textCompare }}
        </h4>
        <span>{{ valuePeriodRangeToCompare }}</span>
      </div>
      <div v-if="!isPreview && settings.typeCompare === 'user'">
        <span>{{ valueOwnerToCompare }}</span>
      </div>
      <apexchart
        v-if="!isPreview && settings.typeCompare !== 'none'"
        :height="!isPreview ? 350 : 250"
        type="bar"
        :options="optionsCompare"
        :series="seriesCompare"
      ></apexchart>
    </div>
    <BarLostDealsByStageInformation
      v-if="!isPreview"
      :information="lostDealsByStageVerticalBarsGraph.informationBar"
      :filterBy="settings.filterBy"
    ></BarLostDealsByStageInformation>
  </div>
</template>

<script>
import { GET_LOST_DEALS_BY_STATE_BARS } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { barsDataMixin } from '@/mixins/charts/barsMixin';
import BarLostDealsByStageInformation from '@/components/charts/bars/BarLostDealsByStageInformation.vue';

export default {
  name: 'BarLostDealsByStageData',
  mixins: [barsDataMixin],
  components: {
    BarLostDealsByStageInformation,
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
  },
  data() {
    return {
      listFilterBy: FILTER_TYPE_VALUE,
      lostDealsByStageVerticalBarsGraph: {
        mainLostDealsByStage: [],
        secondLostDealsByStage: [],
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
    textMain() {
      if (!this.isPreview) {
        return this.settings.periodPredefined[2];
      }
      return '';
    },
    userMain() {
      return `${this.settings.user.user.name} ${this.settings.user.user.lastName}`;
    },
    textCompare() {
      if (this.settings.periodRangeToCompare.period === 'PREVIOUS_PERIOD') {
        return this.settings.periodPredefined[3];
      }
      if (this.settings.periodRangeToCompare.period === 'PREVIOUS_YEAR') {
        return 'Año anterior';
      }
      if (this.settings.periodRangeToCompare.period === 'CUSTOM') {
        return 'Personalizado';
      }
      return '';
    },
    valuePeriodRange() {
      if (!this.isPreview) {
        return `${this.formatDate(
          this.settings.periodRange.start,
        )} - ${this.formatDate(this.settings.periodRange.end)}`;
      }
      return '';
    },
    valuePeriodRangeToCompare() {
      if (!this.isPreview) {
        return `${this.formatDate(
          this.settings.periodRangeToCompare.start,
        )} - ${this.formatDate(this.settings.periodRangeToCompare.end)}`;
      }
      return '';
    },
    valueOwnerToCompare() {
      return `${this.settings.ownerToCompare.user.name} ${this.settings.ownerToCompare.user.lastName}`;
    },
    listDataChart() {
      return this.formatData(
        this.lostDealsByStageVerticalBarsGraph.mainLostDealsByStage,
      );
    },
    listDataChartCompare() {
      return this.formatData(
        this.lostDealsByStageVerticalBarsGraph.secondLostDealsByStage,
      );
    },
    options() {
      return this.formatOptions(this.listDataChart);
    },
    optionsCompare() {
      return this.formatOptions(this.listDataChartCompare);
    },
    series() {
      return this.formatSeries(this.listDataChart);
    },
    seriesCompare() {
      return this.formatSeries(this.listDataChartCompare);
    },

    showTitleXaxis() {
      if (!this.isPreview) {
        return 'Etapas';
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
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    update() {
      this.$apollo.queries.lostDealsByStageVerticalBarsGraph.refetch();
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    formatData(data) {
      if (data?.count && data?.sum) {
        const { count, sum } = JSON.parse(JSON.stringify(data));

        const stages = this.isCount
          ? count.map((item) => {
              return item.stageName;
            })
          : sum.map((item) => {
              return item.stageName;
            });

        const colors = count.map(() => {
          return '#881414';
        });

        return {
          count: count.map((item) => item.count),
          sum: sum.map((item) => item.sum),
          stages,
          colors,
        };
      }

      return {
        count: [],
        sum: [],
        stages: [],
        colors: [],
      };
    },
    formatOptions(list) {
      const { stages = [], points = [], colors = [] } = list;

      return {
        chart: {
          height: !this.isPreview ? '350' : '250',
          width: !this.isWithScroll ? '100%' : '1200',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        colors,
        plotOptions: {
          bar: {
            distributed: true,
            columnWidth: '45%',
            borderRadius: 10,
            dataLabels: {
              position: 'top',
              orientation: 'horizontal',
            },
          },
        },
        legend: {
          show: false,
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
            return `${this.isCount ? val : this.formatPrice(val)}`;
          },
        },
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2'],
          },
        },
        annotations: {
          points,
        },
        xaxis: {
          tickPlacement: 'on',
          type: 'category',
          categories: [...stages],
          labels: {
            show: true,
          },
          title: {
            text: this.showTitleXaxis,
          },
        },
        yaxis: {
          labels: {
            formatter: (val) => {
              if (val === Infinity) {
                return `${this.isCount ? 0 : this.formatPrice(0)}`;
              }
              return `${this.isCount ? val : this.formatPrice(val)}`;
            },
          },
          title: {
            text: this.showTitleYaxis,
          },
        },
      };
    },
    formatSeries(list) {
      const { count = [], sum = [] } = list;
      if (count.length && sum.length) {
        return [
          {
            name: this.isCount ? 'Cantidad' : 'Valor',
            data: this.isCount ? [...count] : [...sum],
          },
        ];
      }

      return [];
    },
  },
  apollo: {
    lostDealsByStageVerticalBarsGraph: {
      query: GET_LOST_DEALS_BY_STATE_BARS,
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
