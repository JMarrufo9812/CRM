<template>
  <div>
    <ListFilters v-if="!isPreview" :settings="settings"></ListFilters>
    <BaseCardNumber
      :information="{
        numberMain: `${generalConvertionRateFormat}`,
        textMain: textMain,
        valueMain: valueMain,
        textMainType: textChart,
        isCompare:
          !isPreview &&
          (settings.periodRangeToCompare.period.length > 0 || isCompareUser),
        numberCompare: `${generalConvertionRateCompare}`,
        textCompare: textCompare,
        valueCompare: valueCompare,
        numberDifferenceCompare: comparePercentage,
      }"
    ></BaseCardNumber>
    <CardWonDealsEarningValueInformation
      v-if="!isPreview"
      :information="wonDealsEarningValueCard.informationBar"
      :filterBy="settings.filterBy"
    ></CardWonDealsEarningValueInformation>
  </div>
</template>
<script>
import CardWonDealsEarningValueInformation from '@/components/charts/cards/CardWonDealsEarningValueInformation.vue';
import { GET_WON_DEALS_EARNING_VALUE_CARD } from '@/graphql/querys/chartsQuery';
import { cardsDataMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardWonDealsEarningValueData',
  mixins: [cardsDataMixin],
  components: {
    CardWonDealsEarningValueInformation,
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
      wonDealsEarningValueCard: {},
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
        ownerToCompare: {
          id: '',
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
        ownerToCompare: {
          id: '',
        },
      },
    };
  },
  computed: {
    isCompareUser() {
      return (
        this.wonDealsEarningValueCard?.mainDealsEarning?.id !==
          this.wonDealsEarningValueCard?.secondDealsEarning?.id &&
        this.settings?.ownerToCompare?.id !== ''
      );
    },
    comparePercentage() {
      if (this.generalConvertionRateCompare === '0') {
        return '0.00';
      }
      return (
        (100 * this.generalConvertionRateFormat) /
          this.generalConvertionRateCompare -
        100
      ).toFixed(2);
    },
    generalConvertionRateFormat() {
      if (
        this.wonDealsEarningValueCard &&
        this.wonDealsEarningValueCard?.mainDealsEarning?.count !== undefined &&
        this.wonDealsEarningValueCard?.mainDealsEarning?.sum !== undefined
      ) {
        if (this.settings.filterBy === 'count') {
          return this.wonDealsEarningValueCard?.mainDealsEarning.count || '0';
        }
        if (this.settings.filterBy === 'sum') {
          return (
            `$${this.wonDealsEarningValueCard?.mainDealsEarning.sum}` || '0'
          );
        }
      }
      return '0';
    },
    generalConvertionRateCompare() {
      if (
        this.wonDealsEarningValueCard &&
        this.wonDealsEarningValueCard?.secondDealsEarning?.count !==
          undefined &&
        this.wonDealsEarningValueCard?.secondDealsEarning?.sum !== undefined
      ) {
        const convertionRateComparation = this.wonDealsEarningValueCard
          ?.secondDealsEarning[this.settings.filterBy];
        return convertionRateComparation || '0';
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
        if (this.isCompareUser) {
          return this.wonDealsEarningValueCard?.secondDealsEarning?.name;
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
          return this.wonDealsEarningValueCard?.mainDealsEarning?.name;
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
      this.$apollo.queries.wonDealsEarningValueCard.refetch();
    },
  },
  apollo: {
    wonDealsEarningValueCard: {
      query: GET_WON_DEALS_EARNING_VALUE_CARD,
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
