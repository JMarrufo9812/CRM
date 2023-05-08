<template>
  <div>
    <ListFilters v-if="!isPreview" :settings="settings"></ListFilters>
    <BaseCardNumber
      :information="{
        numberMain: `${
          settings.filterBy === 'count'
            ? generalConvertionRateFormat
            : formatPrice(generalConvertionRateFormat)
        }`,
        textMain: textMain,
        valueMain: valueMain,
        textMainType: textChart,
        isCompare:
          !isPreview && settings.periodRangeToCompare.period.length > 0,
        numberCompare: `${
          settings.filterBy === 'count'
            ? generalConvertionRateCompare
            : formatPrice(generalConvertionRateCompare)
        }`,
        textCompare: textCompare,
        valueCompare: valueCompare,
        numberDifferenceCompare: comparePercentage,
      }"
    ></BaseCardNumber>
    <CardTotalOpenDealsInformation
      v-if="!isPreview"
      :information="totalOpenDealsCard.informationBar"
      :filterBy="settings.filterBy"
    ></CardTotalOpenDealsInformation>
  </div>
</template>
<script>
import CardTotalOpenDealsInformation from '@/components/charts/cards/CardTotalOpenDealsInformation.vue';
import { GET_TOTAL_OPEN_DEALS_CARD } from '@/graphql/querys/chartsQuery';
import { cardsDataMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardConvertionRateData',
  mixins: [cardsDataMixin],
  components: {
    CardTotalOpenDealsInformation,
  },
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          filterBy: 'count',
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
      totalOpenDealsCard: {},
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
        periodRangeToCompare: {
          period: '',
          start: '',
          end: '',
        },
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
        periodRangeToCompare: {
          period: '',
          start: '',
          end: '',
        },
      },
    };
  },
  computed: {
    comparePercentage() {
      if (this.generalConvertionRateCompare === '0') {
        return '100';
      }
      return (
        (100 * this.generalConvertionRateFormat) /
          this.generalConvertionRateCompare -
        100
      ).toFixed(2);
    },
    generalConvertionRateFormat() {
      if (
        this.totalOpenDealsCard &&
        this.totalOpenDealsCard?.mainOpenDeals?.count !== undefined &&
        this.totalOpenDealsCard?.mainOpenDeals?.sum !== undefined
      ) {
        return (
          this.totalOpenDealsCard?.mainOpenDeals[this.settings.filterBy] || '0'
        );
      }
      return '0';
    },
    generalConvertionRateCompare() {
      if (
        this.totalOpenDealsCard &&
        this.totalOpenDealsCard?.secondOpenDeals?.count !== undefined &&
        this.totalOpenDealsCard?.secondOpenDeals?.sum !== undefined
      ) {
        const convertionRateComparation = this.totalOpenDealsCard
          ?.secondOpenDeals[this.settings.filterBy];
        return convertionRateComparation
          ? convertionRateComparation.toFixed(2)
          : '0';
      }
      return '0';
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
        return this.settings.periodPredefined[2];
      }
      return '';
    },
    valueMain() {
      if (!this.isPreview) {
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
      this.$apollo.queries.totalOpenDealsCard.refetch();
    },
  },
  apollo: {
    totalOpenDealsCard: {
      query: GET_TOTAL_OPEN_DEALS_CARD,
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
