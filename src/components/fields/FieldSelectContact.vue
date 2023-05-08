<template>
  <v-combobox
    v-model="contact"
    @change="changeOnTextField"
    :readonly="readOnly"
    :items="searchContacts.list"
    :menu-props="menuProps"
    :search-input.sync="search"
    :disabled="field.defaultValue ? true : false"
    :rules="field.isRequired ? rules.isRequired : []"
    :hint="field.isRequired ? '* Este campo es obligatorio' : ''"
    item-value="id"
    item-text="name"
    maxlength="50"
    label="Contacto"
    hide-details="auto"
    prepend-icon="mdi-account-tie"
    outlined
    clearable
    full-width
    hide-selected
    persistent-hint
    :hide-no-data="$apollo.queries.searchContacts.loading"
  >
    <template v-slot:no-data>
      <v-list-item class="mt-2">
        <v-list-item-content>
          <v-list-item-title>
            presiona el botón
            <kbd>entrar</kbd>
            para crear a
            <strong>{{ search }}</strong>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template v-slot:item="{ index, item }">
      <span :key="index">
        {{ item.name }}
        <span v-if="item.companies.length > 0">
          (
          <v-icon x-small class="mr-1">
            mdi-domain
          </v-icon>
          {{ item.companies[0].name }}
          <v-menu allow-overflow>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip top color="white">
                <template v-slot:activator="{ on: tooltip }">
                  <v-chip
                    outlined
                    class="ml-1 pa-1"
                    v-show="item.companies.length > 1"
                    v-bind="attrs"
                    v-on="{ ...tooltip, ...menu }"
                    x-small
                  >
                    + {{ item.companies.length }}
                  </v-chip>
                </template>
                <span class="black--text">
                  Este contacto cuenta con más de una empresa has click para ver
                </span>
              </v-tooltip>
            </template>
            <v-list>
              <v-list-item
                v-for="(company, index) in item.companies"
                :key="index"
                dense
              >
                <v-icon class="mr-2" small>mdi-domain</v-icon>
                <v-list-item-title>{{ company.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          )
        </span>
      </span>
    </template>
    <template v-slot:selection="{ attrs, item, selected }">
      <span v-bind="attrs" :input-value="selected">
        {{ item.name ? item.name : item }}
      </span>
    </template>
    <template v-if="isNewContact" v-slot:append>
      <v-chip x-small color="success">
        Nuevo
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { GET_SEARCH_CONTACTS } from '@/graphql/querys/contactsQuery';

export default {
  name: 'FieldSelectContact',
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
      contact: '',
      searchContacts: {},
      isNewContact: false,
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
    contact(value) {
      if (value) {
        this.isNewContact = value.id === undefined;
        this.field.value = value.id ? value : { name: value };
      } else if (!value) this.isNewContact = false;
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
        this.contact === null ||
        this.contact === undefined ||
        this.contact === ''
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
      this.contact = { ...this.field.defaultValue };
    },
    clearValue() {
      this.contact = '';
      this.isNewContact = true;
    },
    resetValues() {
      delete this.field.defaultValue;
      delete this.field.value;
      this.isNewContact = false;
      this.contact = '';
    },
  },
  apollo: {
    searchContacts: {
      query: GET_SEARCH_CONTACTS,
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
