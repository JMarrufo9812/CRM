<template>
  <v-row justify="center" class="mt-12">
    <v-col cols="12" md="6">
      <v-card outlined tile>
        <v-card-title class="d-block">
          <p class="mb-0 text-center">
            <v-icon x-large class="mr-2">mdi-account-check-outline</v-icon>
            ¡Bienvenido ahora formas parte del equipo
            {{ userEnterprise.enterprise.name }}!
          </p>
        </v-card-title>
        <v-card-text class="text-center">
          <p>¡Inicia sesión para empezar a trabajar con tu equipo!</p>
          <v-btn to="/login" color="primary">
            Iniciar sesión
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'WelcomeEnterprise',
  props: {
    // informacion de userEnterprise
    userEnterprise: {
      type: Object,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '{ .v-card__text  } from ../../../../scss/components/welcome.enterprise';
</style>
