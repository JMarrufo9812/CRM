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
          !isPreview && settings.periodRangeToCompare.period.length > 0,
        numberCompare: `${generalConvertionRateCompare}`,
        textCompare: textCompare,
        valueCompare: valueCompare,
        numberDifferenceCompare: comparePercentage,
      }"
    ></BaseCardNumber>
    <CardOpenEmailsInformation
      v-if="!isPreview"
      :information="openEmailsCard.informationBar"
      :filterBy="settings.filterBy"
    ></CardOpenEmailsInformation>
  </div>
</template>
<script>
import CardOpenEmailsInformation from '@/components/charts/cards/CardOpenEmailsInformation.vue';
import { GET_OPEN_EMAILS_CARD } from '@/graphql/querys/chartsQuery';
import { cardsDataMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardOpenEmailsData',
  mixins: [cardsDataMixin],
  components: { CardOpenEmailsInformation },
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
      openEmailsCard: {},
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
        this.openEmailsCard &&
        this.openEmailsCard?.mainOpenedEmails?.count !== undefined
      ) {
        return (
          this.openEmailsCard?.mainOpenedEmails[this.settings.filterBy] || '0'
        );
      }
      return '0';
    },
    generalConvertionRateCompare() {
      if (
        this.openEmailsCard &&
        this.openEmailsCard?.secondOpenedEmails?.count !== undefined
      ) {
        const convertionRateComparation = this.openEmailsCard
          ?.secondOpenedEmails[this.settings.filterBy];
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
      this.$apollo.queries.openEmailsCard.refetch();
    },
  },
  apollo: {
    openEmailsCard: {
      query: GET_OPEN_EMAILS_CARD,
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
