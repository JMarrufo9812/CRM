<template>
  <v-combobox
    v-model="company"
    @change="changeOnTextField"
    :readonly="readOnly"
    :items="searchCompanies.list"
    :menu-props="menuProps"
    :search-input.sync="search"
    item-value="id"
    item-text="name"
    label="Empresa"
    hide-details="auto"
    prepend-icon="mdi-domain"
    :class="[inputProps ? inputProps.class : '']"
    :dense="inputProps ? inputProps.isDense : false"
    style="width: 50%"
    outlined
    clearable
    full-width
    hide-selected
    persistent-hint
    maxlength="50"
    :loading="isLoading"
    :hide-no-data="isLoading"
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
      <span class="text-truncate" v-bind="attrs" :input-value="selected">
        {{ item.name ? item.name : item }}
      </span>
    </template>
    <template v-slot:append>
      <v-chip v-show="isNewCompany" x-small color="success">
        Nuevo
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { GET_SEARCH_COMPANIES } from '@/graphql/querys/companiesQuery';

export default {
  name: 'FieldSelectCompanySimple',
  mixins: [rulesMixin],
  data() {
    return {
      search: '',
      company: '',
      searchCompanies: {},
      isNewCompany: false,
      isLoading: false,
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
    search(value) {
      if (value && value.length > 2) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    },
    company(value) {
      if (value) {
        this.isNewCompany = value.id === undefined;
        this.$emit(
          'outData',
          this.index,
          value.id ? { id: value.id } : { name: value },
        );
      } else if (!value) {
        this.isNewCompany = false;
        this.$emit('deleteData', this.index);
      }
    },
    resetHandler(value) {
      if (value) {
        this.company = '';
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
    clearValue() {
      this.company = '';
      this.isNewCompany = true;
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
      result() {
        this.isLoading = false;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .no-icon .full-width } from ../../../../scss/components/fields';
</style>
