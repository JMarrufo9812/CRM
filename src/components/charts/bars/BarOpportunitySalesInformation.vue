<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="3">
          <span>
            <b>Tasa de oportunidades:</b>
            {{ information.totalDeals && information.totalDeals[filterBy] }}
          </span>
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades ganadas:</b>
          {{ information.wonDeals && information.wonDeals[filterBy] }}
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades perdidas:</b>
          {{ information.lostDeals && information.lostDeals[filterBy] }}
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades abiertas:</b>
          {{ information.openDeals && information.openDeals[filterBy] }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'BarOpportunitySalesInformation',
  props: {
    information: {
      type: Object,
      default: () => {
        return {};
      },
    },
    filterBy: {
      type: String,
      default: 'count',
    },
  },
};
</script>

<style></style>
