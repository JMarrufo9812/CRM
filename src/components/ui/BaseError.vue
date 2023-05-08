<template>
  <v-row justify="center" class="mt-12">
    <v-col cols="5">
      <v-card outlined tile>
        <v-icon x-large class="col-12 text-center">{{ info.icon }}</v-icon>
        <v-card-title class="justify-center">
          {{ info.tittle }}
        </v-card-title>
        <v-card-text class="text-center">
          <p>
            {{ info.message }}
          </p>
          <v-btn to="/" outlined>
            Volver a la página principal
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'BaseError',
  props: {
    info: {
      required: true,
      type: Object,
    },
  },
};
</script>
