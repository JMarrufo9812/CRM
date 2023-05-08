<template>
  <v-container fluid style="height:100%" class="pb-0">
    <v-row>
      <v-col cols="12" class="px-0 py-0">
        <Header
          :item="company"
          :typeItem="typeItem"
          :isLoading="this.$apollo.queries.company.loading"
          @updateItem="updateCompany"
          @updateHistory="updateHistory"
          @openModalDeal="getForm"
        />
      </v-col>
      <v-col cols="3" class="pt-0 pl-0">
        <Details
          :item="company"
          :typeItem="typeItem"
          :isLoading="this.$apollo.queries.company.loading"
          @updateItem="updateCompany"
          @updateHistory="updateHistory"
        />
        <ListContacts
          :item="company"
          :itemId="company.id"
          :ownerId="company.owner ? company.owner.id : ''"
          :typeItem="typeItem"
          :contactsSelected="company.contacts"
          :isLoading="this.$apollo.queries.company.loading"
          @updateCompanyContact="updateCompanyContact"
          @updateItem="updateCompany"
          @updateHistory="updateHistory"
        />
        <ListDeals
          :item="company"
          :itemId="company.id"
          :ownerId="company.owner ? company.owner.id : ''"
          :typeItem="typeItem"
          :deals="company.deals || []"
          :isLoading="this.$apollo.queries.company.loading"
          @updateHistory="updateHistory"
          @updateItem="updateCompany"
          @openModalDeal="getForm"
        />
      </v-col>
      <v-col cols="9" class="pt-1">
        <History
          :item="company"
          :itemId="company.id"
          :typeItem="typeItem"
          :ownerId="company.owner ? company.owner.id : ''"
          :itemProfile="companyHistory"
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
import {
  GET_COMPANY,
  GET_COMPANY_HISTORY,
} from '@/graphql/querys/companiesQuery';
import { profilesMixin } from '@/mixins/profilesMixin';
import { dealsMixin } from '@/mixins/dealsMixin';

export default {
  name: 'Company',
  mixins: [profilesMixin, dealsMixin],
  data() {
    return {
      typeItem: 'COMPANY',
      company: {},
    };
  },
  methods: {
    updateCompany(companyUpdated) {
      this.company = companyUpdated;
    },
    updateHistory() {
      this.$apollo.queries.companyHistory.refetch();
    },
    updateCompanyContact(contactUpdated, index) {
      this.company.contacts[index].name = contactUpdated.name;
    },
    addDeal(deal) {
      this.company.deals.push(deal);
    },
  },
  apollo: {
    company: {
      query: GET_COMPANY,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          // Get id from url params
          companyId: this.$route.params.id,
        };
      },
    },
    companyHistory: {
      query: GET_COMPANY_HISTORY,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          // Get id from url params
          companyId: this.$route.params.id,
        };
      },
    },
  },
};
</script>
