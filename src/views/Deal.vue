<template>
  <v-container fluid style="height:100%" class="pb-0">
    <v-row>
      <v-col cols="12" class="px-0 py-0">
        <Header
          :item="deal"
          :typeItem="typeItem"
          :isLoading="this.$apollo.queries.deal.loading"
          @updateItem="updateDeal"
          @updateHistory="updateHistory"
        />
        <SubHeader
          :deal="deal"
          :isLoading="this.$apollo.queries.deal.loading"
          @updateItem="updateDeal"
          @updateHistory="updateHistory"
        />
      </v-col>
      <v-col cols="3" class="pt-0 pl-0">
        <Details
          :item="deal"
          :typeItem="typeItem"
          :inputsDefault="inputsDefault"
          :isLoading="this.$apollo.queries.deal.loading"
          @updateItem="updateDeal"
          @updateHistory="updateHistory"
        />
        <DealCompany
          :item="deal"
          :itemId="deal.id"
          :typeItem="typeItem"
          :ownerId="deal.owner ? deal.owner.id : ''"
          :companySelected="deal.company"
          :isLoading="this.$apollo.queries.deal.loading"
          @updateItem="updateDeal"
          @updateHistory="updateHistory"
          @updateDealCompany="updateDealCompany"
        />
        <DealContact
          :item="deal"
          :itemId="deal.id"
          :typeItem="typeItem"
          :ownerId="deal.owner ? deal.owner.id : ''"
          :contactSelected="deal.contact"
          :isLoading="this.$apollo.queries.deal.loading"
          @updateItem="updateDeal"
          @updateDeal="updateDeal"
          @updateHistory="updateHistory"
          @updateDealContact="updateDealContact"
        />
      </v-col>
      <v-col cols="9" class="pt-0">
        <History
          :item="deal"
          :itemId="deal.id"
          :typeItem="typeItem"
          :ownerId="deal.owner ? deal.owner.id : ''"
          :itemProfile="dealHistory"
          @updateHistory="updateHistory"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GET_DEAL, GET_DEAL_HISTORY } from '@/graphql/querys/dealsQuery';
import { profilesMixin } from '@/mixins/profilesMixin';

export default {
  name: 'Deal',
  mixins: [profilesMixin],
  data() {
    return {
      typeItem: 'DEAL',
      deal: {},
      inputsDefault: ['title'],
    };
  },
  methods: {
    updateDeal(dealUpdated) {
      this.deal = dealUpdated;
    },
    updateDealContact(contact) {
      this.deal.contact.name = contact.name;
    },
    updateDealCompany(company) {
      this.deal.company.name = company.name;
    },
    updateHistory() {
      this.$apollo.queries.dealHistory.refetch();
    },
  },
  apollo: {
    deal: {
      query: GET_DEAL,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          // Get id from url params
          dealId: this.$route.params.id,
        };
      },
      error() {
        this.$router.push({ name: 'pipeline' }, () => {});
      },
    },
    dealHistory: {
      query: GET_DEAL_HISTORY,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          // Get id from url params
          dealId: this.$route.params.id,
        };
      },
    },
  },
};
</script>
