<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="3">
          <span>
            <b>Promedio de días en el embudo:</b>
            {{
              information.averageDaysInSalesCycle &&
                information.averageDaysInSalesCycle.toFixed(2)
            }}
          </span>
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades ganadas:</b>
          {{
            information.averageDaysInSalesCycleWonDeals &&
              information.averageDaysInSalesCycleWonDeals.toFixed(2)
          }}
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades perdidas:</b>
          {{
            information.averageDaysInSalesCycleLostDeals &&
              information.averageDaysInSalesCycleLostDeals.toFixed(2)
          }}
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades abiertas:</b>
          {{
            information.averageDaysInSalesCycleOpenDeals &&
              information.averageDaysInSalesCycleOpenDeals.toFixed(2)
          }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'BarSalesCycleByStageInformation',
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
