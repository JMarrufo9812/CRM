<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-y
    ransition="scale-transition"
    left
    :nudge-left="25"
    :nudge-top="5"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        class="mr-4 mt-1"
        icon
        color="secondary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <div class="d-flex justify-end pt-2 pr-4">
        <v-btn @click="menu = false" small icon color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <p class="text-center font-weight-black">
        Código de color
      </p>

      <v-stepper v-model="step" flat>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              outlined
              height="110"
              width="250"
              class="line-open-deal"
            ></v-card>

            <p class="text-center my-4">
              Abierto
            </p>
            <div class="d-flex justify-center">
              <v-btn
                large
                icon
                class="secondary"
                color="white"
                @click="step = 2"
              >
                <v-icon x-large>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              outlined
              height="110"
              width="250"
              class="line-won-deal"
            ></v-card>

            <p class="text-center my-4">
              Ganado
            </p>

            <div class="d-flex justify-center">
              <v-btn
                large
                icon
                class="secondary"
                color="white"
                @click="step = 3"
              >
                <v-icon x-large>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              outlined
              height="110"
              width="250"
              class="line-lost-deal"
            ></v-card>

            <p class="text-center my-4">
              Perdido
            </p>

            <div class="d-flex justify-center">
              <v-btn
                large
                icon
                class="secondary"
                color="white"
                @click="step = 1"
              >
                <v-icon x-large>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'MenuDealsColor',
  data() {
    return {
      step: 1,
      menu: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '{ .line-open-deal,.line-won-deal, .line-lost-deal } from ../../../../scss/components/deal.card';
</style>
