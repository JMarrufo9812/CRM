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
    <BarExpiredActivitiesByStageInformation
      v-if="!isPreview"
      :information="
        expiredActivitiesByStageHorizontalBarsAndTable.informationBar
      "
      :filterBy="settings.filterBy"
    ></BarExpiredActivitiesByStageInformation>
  </div>
</template>

<script>
import { GET_EXPIRED_ACTIVITIES_BY_STAGE_BARS } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { barsDataMixin } from '@/mixins/charts/barsMixin';
import { colorsActivities } from '@/constants/colorsChart';
import BarExpiredActivitiesByStageInformation from '@/components/charts/bars/BarExpiredActivitiesByStageInformation.vue';

export default {
  name: 'BarExpiredActivitiesByStageData',
  mixins: [barsDataMixin],
  components: { BarExpiredActivitiesByStageInformation },
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
      expiredActivitiesByStageHorizontalBarsAndTable: {
        mainExpiredActivitiesByStage: [],
        secondExpiredActivitiesByStage: [],
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
    options() {
      return this.formatOptions(
        this.expiredActivitiesByStageHorizontalBarsAndTable.stages,
      );
    },
    optionsCompare() {
      return this.formatOptions(
        this.expiredActivitiesByStageHorizontalBarsAndTable.stages,
      );
    },
    series() {
      return this.formatSeries(
        this.expiredActivitiesByStageHorizontalBarsAndTable
          .mainExpiredActivitiesByStage,
      );
    },
    seriesCompare() {
      return this.formatSeries(
        this.expiredActivitiesByStageHorizontalBarsAndTable
          .secondExpiredActivitiesByStage,
      );
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
            borderRadius: 4,
            horizontal: true,
          },
        },
        colors: colorsActivities,
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
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: list || [],
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
              return val;
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
      if (list && list.length) {
        return list.map(({ typeName, countList }) => {
          return { name: typeName, data: countList.map((item) => item.count) };
        });
      }
      return [];
    },
    update() {
      this.$apollo.queries.expiredActivitiesByStageHorizontalBarsAndTable.refetch();
    },
  },
  apollo: {
    expiredActivitiesByStageHorizontalBarsAndTable: {
      query: GET_EXPIRED_ACTIVITIES_BY_STAGE_BARS,
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
