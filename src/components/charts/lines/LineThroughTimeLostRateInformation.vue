<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="3">
          <template v-for="(user, index) in information.userClosedDeals">
            <span :key="index" class="d-block">
              <b>{{ user.name }}</b>
              : {{ filterBy === 'sum' ? '$' : '' }}
              {{ user[filterBy].toFixed(2) }}
              {{ filterBy === 'count' ? '%' : '' }}
            </span>
          </template>
        </v-col>
        <v-col cols="8">
          <template v-for="(item, index) in information.periodsClosedDeals">
            <v-row dense :key="index">
              <v-col>
                <span class="d-block">
                  <b>{{ rowOne[index] }}</b>
                  : {{ item.count }}
                </span>
              </v-col>
              <v-col>
                <span class="d-block">
                  <b>{{ rowTwo[index] }}</b>
                  : {{ item.sum }}
                </span>
              </v-col>
              <v-col>
                <span class="d-block">
                  <b>{{ rowThree[index] }}</b>
                  : {{ item.totalSum }}
                </span>
              </v-col>
            </v-row>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'LineThroughTimeLostRateInformation',
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
  data() {
    return {
      rowOne: [
        'Este período',
        'Período pasado',
        'Mismo período el mes anterior',
      ],
      rowTwo: [
        'Ingresos este período',
        'Ingresos período pasado',
        'Ingresos mismo período el mes anterior',
      ],
      rowThree: [
        'Ingresos totales este período',
        'Ingresos totales período pasado',
        'Ingresos totales mismo período el mes anterior',
      ],
    };
  },
};
</script>

<style></style>
