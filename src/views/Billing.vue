<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" :editable="step > 1" step="1">
        Datos de facturación
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2">Revisar</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <BillingDetails @nextStep="nextStep"></BillingDetails>
      </v-stepper-content>
      <v-stepper-content step="2">
        <BillingReview @pay="pay"></BillingReview>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import BillingDetails from '@/components/billing/BillingDetails.vue';
import BillingReview from '@/components/billing/BillingReview.vue';

export default {
  name: 'Billing',
  components: {
    BillingDetails,
    BillingReview,
  },
  data() {
    return {
      // Steps
      step: 1,
      // Billings
      dataBilling: [],
      usersBilling: [],
    };
  },
  methods: {
    nextStep(information) {
      // Assign Data billing
      this.dataBilling = information;
      // Change step
      this.step = 2;
    },
    pay(users) {
      // Assign Users with plans
      this.usersBilling = users;
      // console.log(this.usersBilling);
      // Reedirection to Main page
      this.$router.push('subscription', () => {});
    },
  },
};
</script>
