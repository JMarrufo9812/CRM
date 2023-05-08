<template>
  <v-row justify="center">
    <v-col sm="8" md="6" lg="4" class="pt-12 mt-6">
      <v-card outlined tile class="pa-2">
        <v-icon color="success" class="col-12 text-center pa-0" x-large>
          mdi-lock-check-outline
        </v-icon>
        <v-card-title class="justify-center">
          La contraseña se actualizó con éxito.
        </v-card-title>
        <v-card-subtitle class="text-center pt-4">
          Inicia sesión para completar el proceso
        </v-card-subtitle>
        <v-card-actions class="justify-center">
          <v-btn @click="$router.push('/login')" outlined>
            Iniciar sesión
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'BaseResultAction',
};
</script>
