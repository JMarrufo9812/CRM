<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="3">
          <span>
            <b>Total de oportunidades:</b>
            {{
              information.periodsActivities &&
                information.periodsActivities.totalDeals[filterBy]
            }}
          </span>
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades ganadas:</b>
          {{
            information.periodsActivities &&
              information.periodsActivities.wonDeals[filterBy]
          }}
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades perdidas:</b>
          {{
            information.periodsActivities &&
              information.periodsActivities.lostDeals[filterBy]
          }}
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades abiertas:</b>
          {{
            information.periodsActivities &&
              information.periodsActivities.openDeals[filterBy]
          }}
        </v-col>
        <v-col cols="3">
          <span>
            <b>Total de oportunidades anterior:</b>
            {{
              information.pastPeriodsActivities &&
                information.pastPeriodsActivities.totalDeals[filterBy]
            }}
          </span>
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades ganadas anterior:</b>
          {{
            information.pastPeriodsActivities &&
              information.pastPeriodsActivities.wonDeals[filterBy]
          }}
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades perdidas anterior:</b>
          {{
            information.pastPeriodsActivities &&
              information.pastPeriodsActivities.lostDeals[filterBy]
          }}
        </v-col>
        <v-col cols="3">
          <b>Tasa de oportunidades abiertas anterior:</b>
          {{
            information.pastPeriodsActivities &&
              information.pastPeriodsActivities.openDeals[filterBy]
          }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'BarWonDealsEarningValueInformation',
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
