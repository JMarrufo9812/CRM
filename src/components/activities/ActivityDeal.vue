<template>
  <v-autocomplete
    v-model="selectedDeal"
    :items="deals"
    :filter="filterObject"
    :menu-props="menuProps"
    :search-input.sync="search"
    class="mb-2"
    label="Trato"
    item-text="title"
    hide-details="auto"
    dense
    outlined
    hide-selected
    return-object
    append-icon=""
    prepend-icon="mdi-currency-usd-circle-outline"
    clearable
    @input="updateSelectedDeals"
    :hide-no-data="$apollo.queries.deals.loading"
    :loading="$apollo.queries.deals.loading"
    :disabled="disabled"
  >
    <template v-slot:item="{ on, attrs, item }">
      <v-list-item dense v-on="on" :attrs="attrs">
        <v-list-item-content two-line>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>
            <b>Embudo:</b>
            {{ item.pipeline.name }}
            <v-icon>mdi-minus</v-icon>
            <b>Etapa:</b>
            {{ item.stage.name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>
import { GET_DEALS_TO_ACTIVITY } from '@/graphql/querys/dealsQuery';
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'ActivityDeal',
  mixins: [rulesMixin],
  props: {
    defaultDeal: {
      type: Object,
      default: () => {},
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    reset: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      selectedDeal: '',
      deals: [],
    };
  },
  watch: {
    reset(isReset) {
      if (isReset) this.resetDeal();
    },
    isEdit: {
      handler(isEdit) {
        if (isEdit && this.defaultDeal && this.defaultDeal.id) {
          this.selectedDeal = this.noReactive(this.defaultDeal);
          this.deals = [this.defaultDeal];
        }
      },
      immediate: true,
    },
    search(newSearch) {
      if (newSearch === '') this.search = null;
    },
    selectedDeal: {
      handler() {
        this.search = null;
      },
    },
  },
  computed: {
    hasSearch() {
      if (
        this.search !== null &&
        this.search !== undefined &&
        this.search !== ''
      ) {
        return this.search.length > 0;
      }
      return false;
    },
    // Hide the submenu when search is empty
    menuProps() {
      return !this.search ? { value: false } : {};
    },
    readOnly() {
      if (
        this.selectedDeal === null ||
        this.selectedDeal === undefined ||
        this.selectedDeal.length === 0
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    resetDeal() {
      this.selectedDeal = '';
    },
    filterObject(item, queryText) {
      return (
        item.title.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
        -1
      );
    },
    clearValue() {
      this.selectedDeal = '';
    },
    updateSelectedDeals(input) {
      this.$emit('listDeal', input);
    },
  },
  apollo: {
    deals: {
      query: GET_DEALS_TO_ACTIVITY,
      update: (data) => data.deals.list,
      variables() {
        return {
          filters: {
            orderBy: 'desc',
            search: this.search,
            take: 10,
          },
        };
      },
      skip() {
        return !this.hasSearch;
      },
    },
  },
};
</script>
