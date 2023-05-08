<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row class="justify-center">
        <template v-for="(item, index) in information.periodLostDeals">
          <v-col cols="3" :key="index">
            <span class="d-block">
              <b>{{ item.reason }}</b>
              : {{ item[filterBy] }}
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
};
</script>

<style></style>
