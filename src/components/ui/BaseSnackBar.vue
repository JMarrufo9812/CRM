<template>
  <v-snackbar v-model="snackbar.isOpen" :color="snackbar.color" timeout="5000">
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="snackbar.isOpen = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'BaseSnackBar',
  props: {
    snackbar: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
