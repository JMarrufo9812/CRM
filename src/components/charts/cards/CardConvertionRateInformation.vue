<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="4">
          <template v-for="(user, index) in information.usersConvertionRates">
            <span :key="index" class="d-block">
              <b>{{ user.name }}</b>
              : {{ user[filterBy].toFixed(2) }}%
            </span>
          </template>
        </v-col>
        <v-col cols="4">
          <template
            v-for="(period, index) in information.periodsConvertionRates"
          >
            <span :key="index" class="d-block">
              <b>{{ periods[index] }}</b>
              : {{ period[filterBy].toFixed(2) }}%
            </span>
          </template>
        </v-col>
        <v-col cols="4">
          <template
            v-for="(pastPeriod,
            index) in information.pastPeriodsConvertionRates"
          >
            <span :key="index" class="d-block">
              <b>{{ pastPeriods[index] }}</b>
              : {{ pastPeriod[filterBy].toFixed(2) }}%
            </span>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'CardConvertionRateInformation',
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
      periods: ['Promedio anual', 'Promedio trimestral', 'Promedio mensual'],
      pastPeriods: [
        'Este período',
        'Período pasado',
        'Mismo período el mes anterior',
      ],
    };
  },
};
</script>

<style></style>
