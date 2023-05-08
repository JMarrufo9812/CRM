<template>
  <v-container style="height:100%" fluid class="pb-0">
    <v-row>
      <v-col cols="12" class="px-0 py-0">
        <Header
          :item="contact"
          :typeItem="typeItem"
          :isLoading="this.$apollo.queries.contact.loading"
          @updateItem="updateContact"
          @updateHistory="updateHistory"
          @openModalDeal="getForm"
        />
      </v-col>
      <v-col cols="3" class="pt-0 pl-0">
        <Details
          :item="contact"
          :typeItem="typeItem"
          :isLoading="this.$apollo.queries.contact.loading"
          @updateItem="updateContact"
          @updateHistory="updateHistory"
        />
        <ListCompanies
          :item="contact"
          :itemId="contact.id"
          :ownerId="contact.owner ? contact.owner.id : ''"
          :typeItem="typeItem"
          :companiesSelected="contact.companies"
          :isLoading="this.$apollo.queries.contact.loading"
          @updateItem="updateContact"
          @updateContactCompany="updateContactCompany"
          @updateHistory="updateHistory"
        />
        <ListDeals
          :item="contact"
          :itemId="contact.id"
          :ownerId="contact.owner ? contact.owner.id : ''"
          :typeItem="typeItem"
          :deals="contact.deals || []"
          :isLoading="this.$apollo.queries.contact.loading"
          @updateHistory="updateHistory"
          @updateItem="updateContact"
          @openModalDeal="getForm"
        />
      </v-col>
      <v-col cols="9" class="pt-1">
        <History
          :item="contact"
          :itemId="contact.id"
          :ownerId="contact.owner ? contact.owner.id : ''"
          :typeItem="typeItem"
          :itemProfile="contactHistory"
          @updateHistory="updateHistory"
        />
      </v-col>
      <ModalDeal
        :inputs="inputsForm"
        :modalHandler="modalDeal"
        @close="modalHandlerDeal"
        @outData="createDeal"
      />
    </v-row>
  </v-container>
</template>

<script>
// Querys
import {
  GET_CONTACT,
  GET_CONTACT_HISTORY,
} from '@/graphql/querys/contactsQuery';
import { profilesMixin } from '@/mixins/profilesMixin';
import { dealsMixin } from '@/mixins/dealsMixin';

export default {
  name: 'Contact',
  mixins: [profilesMixin, dealsMixin],
  data() {
    return {
      // Init contact
      typeItem: 'CONTACT',
      contact: {},
    };
  },
  methods: {
    updateContact(contactUpdated) {
      this.contact = contactUpdated;
    },
    updateContactCompany(contactUpdates, index) {
      this.contact.companies[index].name = contactUpdates.name;
    },
    addDeal(deal) {
      this.contact.deals.push(deal);
    },
    updateHistory() {
      this.$apollo.queries.contactHistory.refetch();
    },
  },
  apollo: {
    contact: {
      query: GET_CONTACT,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          // Get id from url params
          contactId: this.$route.params.id,
        };
      },
    },
    contactHistory: {
      query: GET_CONTACT_HISTORY,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          // Get id from url params
          contactId: this.$route.params.id,
        };
      },
    },
  },
};
</script>
