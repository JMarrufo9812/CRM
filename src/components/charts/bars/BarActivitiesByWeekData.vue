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
    <BarActivitiesByWeekInformation
      v-if="!isPreview"
      :information="activitiesByWeekVerticalBarsGraph.informationBar"
      :filterBy="settings.filterBy"
    ></BarActivitiesByWeekInformation>
  </div>
</template>

<script>
import { GET_ACTIVITIES_BY_WEEK } from '@/graphql/querys/chartsQuery';
import { FILTER_TYPE_VALUE } from '@/constants/filtersChart';
import { barsDataMixin } from '@/mixins/charts/barsMixin';
import { colorsActivities } from '@/constants/colorsChart';
import BarActivitiesByWeekInformation from '@/components/charts/bars/BarActivitiesByWeekInformation.vue';

export default {
  name: 'BarActivitiesByWeekData',
  mixins: [barsDataMixin],
  components: { BarActivitiesByWeekInformation },
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          activityTypes: [],
          activityFilter: 'ALL',
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
      activitiesByWeekVerticalBarsGraph: {
        mainActivitiesByWeek: [],
        secondActivitiesByWeek: [],
      },
      // Settings temporal
      modalSettings: {
        activityTypes: [],
        activityFilter: 'ALL',
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
        activityTypes: [],
        activityFilter: 'ALL',
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
        this.activitiesByWeekVerticalBarsGraph.mainActivitiesByWeek
          .datesStringList,
      );
    },
    optionsCompare() {
      if (
        this.activitiesByWeekVerticalBarsGraph?.secondActivitiesByWeek
          ?.datesStringList
      ) {
        return this.formatOptions(
          this.activitiesByWeekVerticalBarsGraph.secondActivitiesByWeek
            .datesStringList,
        );
      }
      return {};
    },
    series() {
      return this.formatSeries(
        this.activitiesByWeekVerticalBarsGraph.mainActivitiesByWeek
          .activitiesByWeek,
      );
    },
    seriesCompare() {
      if (
        this.activitiesByWeekVerticalBarsGraph?.secondActivitiesByWeek
          ?.activitiesByWeek
      ) {
        return this.formatSeries(
          this.activitiesByWeekVerticalBarsGraph.secondActivitiesByWeek
            .activitiesByWeek,
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
        activityTypes: this.settings.activityTypes.map((item) => {
          return { id: item.id };
        }),
        activityFilter: this.settings.activityFilter,
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
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        colors: colorsActivities,
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: list || [],
        },
        yaxis: {
          tickAmount: 1,
          labels: {
            formatter: (val) => {
              return val.toFixed(0);
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
    formatSeries(list, isCompareDate) {
      if (list) {
        return list.map((item) => {
          return {
            name: isCompareDate ? `${item.typeName} anterior` : item.typeName,
            data: item.countList.map(({ count }) => count),
          };
        });
      }
      return [];
    },
    update() {
      this.$apollo.queries.activitiesByWeekVerticalBarsGraph.refetch();
    },
  },
  apollo: {
    activitiesByWeekVerticalBarsGraph: {
      query: GET_ACTIVITIES_BY_WEEK,
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
          this.ownersFilter.length === 0 ||
          this.filters.activityTypes.length === 0
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
