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
    <BarActivitiesBySalesmanInformation
      v-if="!isPreview"
      :information="activitiesBySalesmenHorizontalBarsGraph.informationBar"
      :filterBy="settings.filterBy"
    ></BarActivitiesBySalesmanInformation>
  </div>
</template>

<script>
import { GET_ACTIVITIES_BY_SALESMAN } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { barsDataMixin } from '@/mixins/charts/barsMixin';
import { colorsSalesman } from '@/constants/colorsChart';
import BarActivitiesBySalesmanInformation from '@/components/charts/bars/BarActivitiesBySalesmanInformation.vue';

export default {
  name: 'BarActivitiesBySalesmanData',
  mixins: [barsDataMixin],
  components: { BarActivitiesBySalesmanInformation },
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
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
      activitiesBySalesmenHorizontalBarsGraph: {
        mainActivitiesBySalesmen: [],
        secondActivitiesBySalesmen: [],
        activityTypes: [],
      },
      // Settings temporal
      modalSettings: {
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
        this.activitiesBySalesmenHorizontalBarsGraph.activityTypes,
      );
    },
    optionsCompare() {
      return this.formatOptions(
        this.activitiesBySalesmenHorizontalBarsGraph.activityTypes,
      );
    },
    getSeries() {
      if (this.settings.typeCompare !== 'none') {
        return [...this.series, ...this.seriesCompare];
      }
      return this.series;
    },
    series() {
      return this.formatSeries(
        this.activitiesBySalesmenHorizontalBarsGraph.mainActivitiesBySalesmen
          .usersActivities,
      );
    },
    seriesCompare() {
      return this.formatSeries(
        this.activitiesBySalesmenHorizontalBarsGraph.secondActivitiesBySalesmen
          .usersActivities,
        this.settings.typeCompare === 'date',
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
        activitiesFilter: this.settings.activitiesFilter,
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
            dataLabels: {
              orientation: 'horizontal',
            },
          },
        },
        colors: colorsSalesman,
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#000'],
          },
          offsetX: 0,
          background: {
            enabled: true,
            foreColor: '#fff',
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.45,
            },
          },
          formatter: (val) => {
            return val;
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
        legend: {
          position: 'top',
          horizontalAlign: this.isPreview ? 'left' : 'center',
          showForSingleSeries: true,
        },
      };
    },
    formatSeries(list, isCompareDate) {
      if (list) {
        return list.map((item) => {
          return {
            name: isCompareDate ? `${item.name} anterior` : item.name,
            data: item.countList.map(({ count }) => count),
          };
        });
      }
      return [];
    },
    update() {
      this.$apollo.queries.activitiesBySalesmenHorizontalBarsGraph.refetch();
    },
  },
  apollo: {
    activitiesBySalesmenHorizontalBarsGraph: {
      query: GET_ACTIVITIES_BY_SALESMAN,
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
