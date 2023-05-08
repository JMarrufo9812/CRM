<template>
  <v-combobox
    v-model="company"
    :readonly="readOnly"
    :items="companies.list"
    :menu-props="menuProps"
    :search-input.sync="search"
    :rules="field.isRequired ? rules.isRequired : []"
    :hint="field.isRequired ? '* Este campo es obligatorio' : ''"
    maxlength="50"
    counter
    item-value="id"
    item-text="name"
    label="Empresa"
    hide-details="auto"
    dense
    outlined
    clearable
    full-width
    hide-selected
    persistent-hint
    :hide-no-data="$apollo.queries.companies.loading"
    :loading="$apollo.queries.companies.loading"
  >
    <template v-slot:item="{ index, item }">
      <span :key="index">
        {{ item.name }}
      </span>
    </template>
    <template v-slot:selection="{ attrs, item, selected }">
      <span v-bind="attrs" :input-value="selected">
        {{ item.name ? item.name : item }}
      </span>
    </template>
  </v-combobox>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { GET_COMPANIES } from '@/graphql/querys/companiesQuery';

export default {
  name: 'FieldSelectCompany',
  mixins: [rulesMixin],
  props: {
    field: {
      type: Object,
      required: true,
    },
    resetHandler: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      company: '',
      companies: {},
    };
  },
  watch: {
    resetHandler(value) {
      if (!value) this.resetValues();
    },
    company(value) {
      if (value) {
        this.field.value = value.id;
      }
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
        this.company === null ||
        this.company === undefined ||
        this.company === ''
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    clearValue() {
      this.company = '';
    },
    resetValues() {
      delete this.field.value;
      this.company = '';
    },
  },
  apollo: {
    companies: {
      query: GET_COMPANIES,
      variables() {
        return {
          filters: {
            orderBy: 'desc',
            search: this.search,
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
