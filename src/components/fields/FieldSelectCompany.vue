<template>
  <v-combobox
    v-model="company"
    @change="changeOnTextField"
    :readonly="readOnly"
    :items="searchCompanies.list"
    :menu-props="menuProps"
    :search-input.sync="search"
    :disabled="field.defaultValue ? true : false"
    :rules="field.isRequired ? rules.isRequired : []"
    :hint="field.isRequired ? '* Este campo es obligatorio' : ''"
    maxlength="50"
    item-value="id"
    item-text="name"
    label="Empresa"
    hide-details="auto"
    prepend-icon="mdi-domain"
    outlined
    clearable
    full-width
    hide-selected
    persistent-hint
    :hide-no-data="$apollo.queries.searchCompanies.loading"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            presiona el botón
            <kbd>enter</kbd>
            para crear a
            <strong>{{ search }}</strong>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
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
    <template v-if="isNewCompany" v-slot:append>
      <v-chip x-small color="success">
        Nuevo
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { GET_SEARCH_COMPANIES } from '@/graphql/querys/companiesQuery';

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
    isScrolled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      company: '',
      searchCompanies: {},
      isNewCompany: false,
    };
  },
  created() {
    if (this.field.defaultValue) {
      this.addDefaultValue();
    }
  },
  watch: {
    resetHandler(value) {
      if (!value) this.resetValues();
      else if (this.field.defaultValue) {
        this.addDefaultValue();
      }
    },
    company(value) {
      if (value) {
        this.isNewCompany = value.id === undefined;
        this.field.value = value.id ? value : { name: value };
      } else if (!value) this.isNewCompany = false;
    },
  },
  computed: {
    hasSearch() {
      if (
        this.search !== null &&
        this.search !== undefined &&
        this.search !== ''
      ) {
        return this.search.length > 2;
      }
      return false;
    },
    // Hide the submenu when search is empty
    menuProps() {
      return this.isScrolled || !this.search ? { value: false } : {};
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
    changeOnTextField() {
      this.$emit('scrolled', false);
    },
    addDefaultValue() {
      this.company = { ...this.field.defaultValue };
    },
    clearValue() {
      this.company = '';
      this.isNewCompany = true;
    },
    resetValues() {
      delete this.field.defaultValue;
      delete this.field.value;
      this.isNewCompany = false;
      this.company = '';
    },
  },
  apollo: {
    searchCompanies: {
      query: GET_SEARCH_COMPANIES,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          filters: {
            search: this.search,
            skip: 0,
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
