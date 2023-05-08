<template>
  <v-combobox
    v-model="selectedContacts"
    :items="contacts"
    :filter="filterObject"
    :menu-props="menuProps"
    :search-input.sync="search"
    class="mb-2"
    label="Contactos"
    item-text="name"
    hide-details="auto"
    dense
    multiple
    outlined
    hide-selected
    append-icon=""
    prepend-icon="mdi-account"
    @input="updateselectedContacts"
    :hide-no-data="$apollo.queries.contacts.loading"
    :loading="$apollo.queries.contacts.loading"
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
import { GET_CONTACTS_TO_INVITES } from '@/graphql/querys/contactsQuery';
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'ActivityContacts',
  mixins: [rulesMixin],
  props: {
    defaultContacts: {
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
      selectedContacts: [],
      contacts: [],
      isNewContact: false,
    };
  },
  watch: {
    reset(isReset) {
      if (isReset) this.resetContacts();
    },
    isEdit: {
      handler(isEdit) {
        if (isEdit && this.defaultContacts.length)
          this.selectedContacts = this.defaultContacts;
      },
      immediate: true,
    },
    search(newSearch) {
      if (newSearch === '') this.search = null;
    },
    selectedContacts: {
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
        this.selectedContacts === null ||
        this.selectedContacts === undefined ||
        this.selectedContacts.length === 0
      ) {
        return false;
      }
      return true;
    },
  },
  // created() {
  //   console.log('Se esta creando activity contacts');
  // },
  methods: {
    resetContacts() {
      this.selectedContacts = [];
    },
    filterObject(item, queryText) {
      return (
        item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
        -1
      );
    },
    updateselectedContacts(input) {
      this.$emit('listContacts', input);
    },
  },
  apollo: {
    contacts: {
      query: GET_CONTACTS_TO_INVITES,
      update: (data) => data.contacts.list,
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
