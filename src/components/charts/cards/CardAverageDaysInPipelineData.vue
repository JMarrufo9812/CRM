<template>
  <div>
    <ListFilters v-if="!isPreview" :settings="settings"></ListFilters>
    <BaseCardNumber
      :information="{
        numberMain: `${numberMain}`,
        textMain: textMain,
        valueMain: valueMain,
        textMainType: 'Promedio',
        isCompare:
          !isPreview &&
          (settings.periodRangeToCompare.period.length > 0 || isCompareUser),
        numberCompare: `${numberCompare}`,
        textCompare: textCompare,
        valueCompare: valueCompare,
        numberDifferenceCompare: comparePercentage,
      }"
    ></BaseCardNumber>
    <CardAverageDaysInPipelineInformation
      v-if="!isPreview"
      :information="averageDaysInPipelineCard.informationBar"
      :filterBy="settings.filterBy"
    ></CardAverageDaysInPipelineInformation>
  </div>
</template>
<script>
import { GET_AVERAGE_DAYS_IN_PIPELINE } from '@/graphql/querys/chartsQuery';
import { cardsDataMixin } from '@/mixins/charts/cardsMixin';
import CardAverageDaysInPipelineInformation from '@/components/charts/cards/CardAverageDaysInPipelineInformation.vue';

export default {
  name: 'CardAverageDaysInPipelineData',
  mixins: [cardsDataMixin],
  components: {
    CardAverageDaysInPipelineInformation,
  },
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          users: [],
          pipeline: {},
          periodPredefined: ['THIS_MONTH'],
          periodRange: {
            start: '',
            end: '',
          },
          periodRangeToCompare: {
            period: '',
            start: '',
            end: '',
          },
          ownerToCompare: {
            id: '',
          },
        };
      },
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      averageDaysInPipelineCard: {},
      // Settings temporal
      modalSettings: {
        users: [],
        pipeline: {},
        periodRange: {
          start: '',
          end: '',
        },
        periodPredefined: [],
        periodRangeToCompare: {
          period: '',
          start: '',
          end: '',
        },
        ownerToCompare: {
          id: '',
        },
      },
      // Settings to filter in the query
      settings: {
        users: [],
        pipeline: {},
        periodRange: {
          start: '',
          end: '',
        },
        periodPredefined: [],
        periodRangeToCompare: {
          period: '',
          start: '',
          end: '',
        },
        ownerToCompare: {
          id: '',
        },
      },
    };
  },

  computed: {
    isCompareUser() {
      return (
        this.averageDaysInPipelineCard?.mainPipelineAvg?.id !==
          this.averageDaysInPipelineCard?.secondPipelineAvg?.id &&
        this.settings?.ownerToCompare?.id !== ''
      );
    },
    comparePercentage() {
      if (this.numberCompare === '0.00') {
        return '0.00';
      }
      return ((100 * this.numberMain) / this.numberCompare - 100).toFixed(2);
    },
    numberMain() {
      if (
        this.averageDaysInPipelineCard &&
        this.averageDaysInPipelineCard?.mainPipelineAvg?.avg !== undefined
      ) {
        return (
          `${this.averageDaysInPipelineCard?.mainPipelineAvg.avg.toFixed(2)}` ||
          '0.00'
        );
      }
      return '0.00';
    },
    numberCompare() {
      if (
        this.averageDaysInPipelineCard &&
        this.averageDaysInPipelineCard?.secondPipelineAvg?.avg !== undefined
      ) {
        return (
          `${this.averageDaysInPipelineCard?.secondPipelineAvg.avg.toFixed(
            2,
          )}` || '0.00'
        );
      }
      return '0.00';
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
    valueCompare() {
      if (!this.isPreview) {
        if (this.isCompareUser) {
          return this.averageDaysInPipelineCard?.secondPipelineAvg?.name;
        }
        if (this.settings.periodRangeToCompare.period === 'CUSTOM') {
          return `${this.formatDate(
            this.filters.dateRangeToCompare.dateStart,
          )} - ${this.formatDate(this.filters.dateRangeToCompare.dateEnd)}`;
        }
      }
      return '';
    },
    textMain() {
      if (!this.isPreview) {
        if (this.isCompareUser) {
          return this.settings.periodPredefined[2];
        }
        return this.settings.periodPredefined[2];
      }
      return '';
    },
    valueMain() {
      if (!this.isPreview) {
        if (this.isCompareUser) {
          return this.averageDaysInPipelineCard?.mainPipelineAvg?.name;
        }
        if (
          this.settings.periodPredefined.length > 0 &&
          this.settings.periodPredefined[0] === 'CUSTOM'
        ) {
          return `${this.formatDate(
            this.filters.dateRange.dateStart,
          )} - ${this.formatDate(this.filters.dateRange.dateEnd)}`;
        }
      }
      return '';
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

      if (this.ownerToCompare && this.ownerToCompare.id !== '') {
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
    update() {
      this.$apollo.queries.averageDaysInPipelineCard.refetch();
    },
  },
  apollo: {
    averageDaysInPipelineCard: {
      query: GET_AVERAGE_DAYS_IN_PIPELINE,
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
      loadingKey: 'isLoading',
    },
  },
};
</script>
<style lang="scss" scoped></style>
