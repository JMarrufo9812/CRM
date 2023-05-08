<template>
  <v-combobox
    v-model="contact"
    :readonly="readOnly"
    :items="contacts.list"
    :menu-props="menuProps"
    :search-input.sync="search"
    :rules="field.isRequired ? rules.isRequired : []"
    :hint="field.isRequired ? '* Este campo es obligatorio' : ''"
    item-value="id"
    item-text="name"
    label="Contacto"
    hide-details="auto"
    dense
    outlined
    clearable
    full-width
    hide-selected
    persistent-hint
    :hide-no-data="$apollo.queries.contacts.loading"
    :loading="$apollo.queries.contacts.loading"
    maxlength="50"
    counter
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
import { GET_CONTACTS } from '@/graphql/querys/contactsQuery';

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
  },
  data() {
    return {
      search: '',
      contact: '',
      contacts: {},
    };
  },
  watch: {
    resetHandler(value) {
      if (!value) this.resetValues();
    },
    contact(value) {
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
    clearValue() {
      this.contact = '';
    },
    resetValues() {
      delete this.field.value;
      this.contact = '';
    },
  },
  apollo: {
    contacts: {
      query: GET_CONTACTS,
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
