<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row>
        <v-col cols="3">
          <template v-for="(user, index) in information.usersAdvancedDeals">
            <span :key="index" class="d-block">
              <b>{{ user.name }}</b>
              :
              {{
                filterBy === 'count'
                  ? user[filterBy]
                  : formatPrice(user[filterBy])
              }}
            </span>
          </template>
        </v-col>
        <template v-for="(period, index) in information.periodsAdvancedDeals">
          <v-col cols="3" :key="index">
            <span class="d-block">
              <b>{{ periods[index] }}</b>
              :
              {{
                filterBy === 'count'
                  ? period[filterBy]
                  : formatPrice(period[filterBy])
              }}
            </span>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'CardAdvancedDealsInformation',
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
