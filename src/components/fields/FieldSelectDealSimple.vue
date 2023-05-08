<template>
  <!-- @click:clear="clearValue" -->
  <v-combobox
    v-model="deal"
    @change="changeOnTextField"
    :search-input.sync="searchDeal"
    :menu-props="menuProps"
    clearable
    outlined
    full-width
    hide-selected
    label="Buscar"
    :items="resultSearchDeals"
    item-value="id"
    item-text="title"
    :hide-no-data="loadingSearch"
    hide-details="auto"
    :loading="loadingSearch"
    :class="[inputProps ? inputProps.class : '']"
    :dense="inputProps ? inputProps.isDense : false"
  >
    <template v-slot:no-data>
      <p class="ma-4">No se encontro resultados</p>
    </template>
  </v-combobox>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { GET_SEARCH_DEALS } from '@/graphql/querys/dealsQuery';

export default {
  name: 'FieldSelectDealSimple',
  mixins: [rulesMixin],
  data() {
    return {
      searchDeal: '',
      deal: '',
      deals: [],
      resultSearchDeals: [],
      loadingSearch: false,
      searchFilters: {
        search: '',
        take: 5,
      },
    };
  },
  props: {
    index: {
      type: Number,
    },
    isScrolled: {
      type: Boolean,
      default: false,
    },
    resetHandler: {
      type: Boolean,
      default: false,
    },
    inputProps: {
      type: Object,
      required: false,
    },
  },
  watch: {
    deal(deal) {
      if (deal) {
        this.$emit('outData', deal);
      }
      if (!deal) {
        this.$emit('deleteDeal', deal);
      }
    },
    searchDeal(value) {
      if (value) {
        if (Object.keys(value).length >= 2) {
          this.searchFilters.search = value;
          this.searchFilters.take = 5;
          this.getSearchDeals();
        }
        if (Object.keys(value).length === 0) {
          this.searchFilters.search = '';
          this.searchFilters.take = 0;
          this.getSearchDeals();
        }
      }
    },
    resetHandler(value) {
      if (value) {
        this.deal = '';
      }
    },
  },
  computed: {
    menuProps() {
      return !this.searchDeal ? { value: false } : {};
    },
  },
  methods: {
    changeOnTextField() {
      this.$emit('scrolled', false);
    },
    getSearchDeals() {
      this.loadingSearch = true;
      this.$apollo
        .query({
          query: GET_SEARCH_DEALS,
          fetchPolicy: 'no-cache',
          variables: {
            filters: this.searchFilters,
          },
        })
        .then(({ data: { deals } }) => {
          this.resultSearchDeals = deals.list;
          this.loadingSearch = false;
        })
        .catch(() => {
          this.loadingSearch = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .no-icon } from ../../../../scss/components/fields';
</style>
