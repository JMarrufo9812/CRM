<template>
  <v-combobox
    v-model="selectedCompanies"
    :items="companies"
    :filter="filterObject"
    :menu-props="menuProps"
    :search-input.sync="search"
    class="mb-2"
    label="Empresas"
    item-text="name"
    hide-details="auto"
    dense
    multiple
    outlined
    hide-selected
    append-icon=""
    prepend-icon="mdi-office-building"
    @input="updateSelectedCompanies"
    :hide-no-data="$apollo.queries.companies.loading"
    :loading="$apollo.queries.companies.loading"
    :disabled="disabled"
  >
    <template v-slot:selection="data">
      <v-chip
        :key="JSON.stringify(data.item)"
        v-bind="data.attrs"
        :input-value="data.selected"
        :disabled="data.disabled"
        class="my-1"
        label
      >
        <strong>
          {{ data.item.name ? data.item.name : data.item }}
        </strong>
        <v-chip v-if="data.item !== Object(data.item)" color="success" small>
          Nuevo
        </v-chip>
        <v-icon color="error" small @click="data.parent.selectItem(data.item)">
          mdi-close
        </v-icon>
      </v-chip>
    </template>
    <template v-slot:item="{ on, attrs, item }">
      <v-list-item dense v-on="on" :attrs="attrs">
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            No se encontró "
            <strong>{{ search }}</strong>
            ". Presiona
            <kbd>entrar</kbd>
            para crearlo.
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-combobox>
</template>

<script>
import { GET_COMPANIES_TO_ACTIVITY } from '@/graphql/querys/companiesQuery';
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'ActivityCompanies',
  mixins: [rulesMixin],
  props: {
    defaultCompanies: {
      type: Array,
      default: () => [],
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
      selectedCompanies: [],
      companies: [],
      isNewCompanie: false,
    };
  },
  watch: {
    reset(isReset) {
      if (isReset) this.resetCompanies();
    },
    isEdit: {
      handler(isEdit) {
        if (isEdit && this.defaultCompanies.length)
          this.selectedCompanies = this.defaultCompanies;
      },
      immediate: true,
    },
    search(newSearch) {
      if (newSearch === '') this.search = null;
    },
    selectedCompanies: {
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
        this.selectedCompanies === null ||
        this.selectedCompanies === undefined ||
        this.selectedCompanies.length === 0
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    resetCompanies() {
      this.selectedCompanies = [];
    },
    filterObject(item, queryText) {
      return (
        item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
        -1
      );
    },
    clearValue() {
      this.selectedCompanies = [];
      this.isNewCompany = true;
    },
    updateSelectedCompanies(input) {
      this.$emit('listCompanies', input);
    },
  },
  apollo: {
    companies: {
      query: GET_COMPANIES_TO_ACTIVITY,
      update: (data) => data.companies.list,
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
