<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row>
        <v-col cols="3">
          <template v-for="(user, index) in information.usersOpenedRateEmails">
            <span :key="index" class="d-block">
              <b>{{ user.name }}</b>
              : {{ user[filterBy] }}%
            </span>
          </template>
        </v-col>
        <v-col cols="3">
          <template
            v-for="(item, index) in information.periodsOpenedRateEmails"
          >
            <span class="d-block" :key="index">
              <b>{{ rowOne[index] }}</b>
              : {{ item.count }}%
            </span>
          </template>
        </v-col>
        <v-col cols="3">
          <template
            v-for="(item, index) in information.pastPeriodsOpenedRateEmails"
          >
            <span class="d-block" :key="index">
              <b>{{ rowTwo[index] }}</b>
              : {{ item.count }}%
            </span>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'CardOpenRateEmailsInformation',
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
      rowOne: ['Promedio anual', 'Promedio trimestral', 'Promedio mensual'],
      rowTwo: [
        'Este período',
        'Período pasado',
        'Mismo período el mes anterior',
      ],
    };
  },
};
</script>

<style></style>
