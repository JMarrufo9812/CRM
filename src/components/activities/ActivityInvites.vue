<template>
  <v-combobox
    ref="combo"
    v-model="selectedContacts"
    :items="listContactsWithEmail"
    :filter="filterObject"
    :menu-props="menuProps"
    :search-input.sync="search"
    class="mb-2"
    label="Invitados"
    item-text="email"
    hide-details="auto"
    dense
    multiple
    outlined
    placeholder="Escribe el nombre del contacto o el correo"
    hide-selected
    append-icon=""
    prepend-icon="mdi-account-multiple-outline"
    :rules="[...rules.emailsCombobox]"
    @input="updateSelectedContacts"
    :hide-no-data="$apollo.queries.contacts.loading"
    :loading="$apollo.queries.contacts.loading"
  >
    <template v-slot:selection="data">
      <v-chip
        :key="JSON.stringify(data.item)"
        v-bind="data.attrs"
        :input-value="data.selected"
        :disabled="data.disabled"
        :color="
          validEmail(data.item.email ? data.item.email : data.item)
            ? 'success'
            : 'error'
        "
        class="my-1"
      >
        <v-avatar
          v-if="data.item === Object(data.item)"
          color="secondary"
          left
          v-text="data.item.name.slice(0, 1).toUpperCase()"
        ></v-avatar>
        <v-avatar
          v-else
          color="secondary"
          left
          v-text="data.item.slice(0, 1).toUpperCase()"
        ></v-avatar>
        {{ data.item.name ? data.item.name : data.item }}
        <v-icon small @click="data.parent.selectItem(data.item)">
          mdi-close
        </v-icon>
      </v-chip>
    </template>
    <template v-slot:item="{ on, attrs, item }">
      <v-list-item dense v-on="on" :attrs="attrs">
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ item.email }}
          </v-list-item-subtitle>
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
            para invitarlo.
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
  name: 'ActivityInvites',
  mixins: [rulesMixin],
  props: {
    defaultInvites: {
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
      if (isReset) this.resetInvites();
    },
    isEdit: {
      handler(isEdit) {
        if (isEdit && this.defaultInvites.length) {
          this.selectedContacts = this.defaultInvites;
        }
      },
      immediate: true,
    },
    search(newSearch) {
      if (newSearch === '' || newSearch === null) {
        this.search = null;
      } else {
        // No allow spaces white
        this.search = newSearch.split(' ').join('');
      }
    },
    selectedContacts: {
      handler() {
        this.search = null;
      },
    },
  },
  computed: {
    listContactsWithEmail() {
      return this.contacts.filter((contact) => contact.email?.length > 0);
    },
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
  //   console.log('Se esta creando activity invites');
  // },
  methods: {
    resetInvites() {
      this.selectedContacts = [];
      this.isNewContact = true;
    },
    validEmail(email) {
      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return regexEmail.test(email);
    },
    filterObject(item, queryText) {
      return (
        item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 ||
        item.email?.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1
      );
    },
    updateSelectedContacts(input) {
      this.$emit('listInvites', input);
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
