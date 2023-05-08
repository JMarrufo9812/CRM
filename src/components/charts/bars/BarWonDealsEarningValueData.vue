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
        :options="options"
        :series="seriesCompare"
      ></apexchart>
    </div>
    <BarWonDealsEarningValueInformation
      v-if="!isPreview"
      :information="dealsStatusByStageHorizontalBarsGraph.informationBar"
      :filterBy="settings.filterBy"
    ></BarWonDealsEarningValueInformation>
  </div>
</template>

<script>
import { GET_WON_DEALS_EARNING_VALUE } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { barsDataMixin } from '@/mixins/charts/barsMixin';
import { colorsStatus } from '@/constants/colorsChart';
import BarWonDealsEarningValueInformation from '@/components/charts/bars/BarWonDealsEarningValueInformation.vue';

export default {
  name: 'BarWonDealsEarningValueData',
  mixins: [barsDataMixin],
  components: { BarWonDealsEarningValueInformation },
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
      dealsStatusByStageHorizontalBarsGraph: {
        mainDealsByStage: [],
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
        periodPredefined: [],
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
        periodPredefined: [],
        typeCompare: 'none',
      },
    };
  },
  computed: {
    options() {
      return {
        chart: {
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
            borderRadius: 4,
            horizontal: true,
          },
        },
        colors: colorsStatus,
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#000'],
          },
          background: {
            enabled: true,
            foreColor: '#fff',
          },
          formatter: (val) => {
            return `${this.isCount ? val : this.formatPrice(val)}`;
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: !this.isWithScroll ? 'center' : 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories:
            this.dealsStatusByStageHorizontalBarsGraph?.mainDealsByStage
              .stages || [],
          title: {
            text: this.showTitleXaxis,
          },
          tickAmount: 1,
          labels: {
            formatter: (val) => {
              return val.toFixed(0);
            },
          },
        },
        yaxis: {
          title: {
            text: this.showTitleYaxis,
          },
        },
        tooltip: {
          y: {
            formatter: (val) => {
              return `${this.isCount ? val : this.formatPrice(val)}`;
            },
          },
        },
      };
    },
    series() {
      const {
        wonDealsCount = [],
        lostDealsCount = [],
        openDealsCount = [],
        wonDealsSum = [],
        lostDealsSum = [],
        openDealsSum = [],
      } = this.dealsStatusByStageHorizontalBarsGraph.mainDealsByStage;

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
    seriesCompare() {
      if (this.dealsStatusByStageHorizontalBarsGraph.secondDealsByStage) {
        const {
          wonDealsCount = [],
          lostDealsCount = [],
          openDealsCount = [],
          wonDealsSum = [],
          lostDealsSum = [],
          openDealsSum = [],
        } = this.dealsStatusByStageHorizontalBarsGraph.secondDealsByStage;

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
      }
      return [];
    },
    showTitleXaxis() {
      if (!this.isPreview) {
        if (this.count) {
          return 'Cantidad de tratos';
        }
        return 'Valor de tratos';
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
    update() {
      this.$apollo.queries.dealsStatusByStageHorizontalBarsGraph.refetch();
    },
  },
  apollo: {
    dealsStatusByStageHorizontalBarsGraph: {
      query: GET_WON_DEALS_EARNING_VALUE,
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
