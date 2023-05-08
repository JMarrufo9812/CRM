<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="3">
          <template v-for="(user, index) in information.usersAvgDaysInPipeline">
            <span :key="index" class="d-block">
              <b>{{ user.name }}</b>
              : {{ user.avg.toFixed(2) }}
            </span>
          </template>
        </v-col>
        <template v-for="(item, index) in information.periodsAvgDaysInPipeline">
          <v-col cols="3" :key="index">
            <span class="d-block">
              <b>{{ rowOne[index] }}</b>
              : {{ item.avg.toFixed(2) }}
            </span>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'CardAverageDaysInPipelineInformation',
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
    };
  },
};
</script>

<style></style>
