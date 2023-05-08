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
    <CardConvertionRatioInformation
      v-if="!isPreview"
      :information="convertionRatioCard.informationBar"
      :filterBy="settings.filterBy"
    ></CardConvertionRatioInformation>
  </div>
</template>
<script>
import CardConvertionRatioInformation from '@/components/charts/cards/CardConvertionRatioInformation.vue';
import { GET_CONVERTION_RATIO } from '@/graphql/querys/chartsQuery';
import { cardsDataMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardConvertionRatioData',
  mixins: [cardsDataMixin],
  components: { CardConvertionRatioInformation },
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
      convertionRatioCard: {},
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
        this.convertionRatioCard?.mainConvetionRatio?.id !==
          this.convertionRatioCard?.secondConvetionRatio?.id &&
        this.settings?.ownerToCompare?.id !== ''
      );
    },
    comparePercentage() {
      const past = this.generalConvertionRateCompare.split(':');
      const now = this.generalConvertionRateFormat.split(':');

      if (past[0] === '0' && past[1] === '0') {
        return 0;
      }

      const newPast =
        past[0] !== '0' && past[1] > 0 ? (past[0] / past[1]) * 100 : 0;
      const newNow = now[0] !== '0' && now[1] > 0 ? (now[0] / now[1]) * 100 : 0;

      return (newNow - newPast).toFixed(2);
    },
    generalConvertionRateFormat() {
      if (
        this.convertionRatioCard &&
        this.convertionRatioCard?.mainConvetionRatio?.count !== undefined &&
        this.convertionRatioCard?.mainConvetionRatio?.sum !== undefined
      ) {
        if (this.settings.filterBy === 'count') {
          return this.convertionRatioCard?.mainConvetionRatio.count || '0:0';
        }
        if (this.settings.filterBy === 'sum') {
          const listSum = this.convertionRatioCard?.mainConvetionRatio.sum.split(
            ':',
          );
          return `${listSum[0]}:${listSum[1]}` || '0:0';
        }
      }
      return '0:0';
    },
    generalConvertionRateCompare() {
      if (
        this.convertionRatioCard &&
        this.convertionRatioCard?.secondConvetionRatio?.count !== undefined &&
        this.convertionRatioCard?.secondConvetionRatio?.sum !== undefined
      ) {
        const convertionRateComparation = this.convertionRatioCard
          ?.secondConvetionRatio[this.settings.filterBy];
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
          return this.convertionRatioCard?.secondConvetionRatio?.name;
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
          return this.convertionRatioCard?.mainConvetionRatio?.name;
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
      this.$apollo.queries.convertionRatioCard.refetch();
    },
  },
  apollo: {
    convertionRatioCard: {
      query: GET_CONVERTION_RATIO,
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
