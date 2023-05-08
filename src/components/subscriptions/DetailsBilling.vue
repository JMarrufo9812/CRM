<template>
  <v-card outlined>
    <v-card-title class="justify-center">
      Detalles de facturación
      <v-spacer></v-spacer>
      <v-btn icon to="/settings/billing">
        <v-icon color="primary">mdi-file-document-edit</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-progress-circular
        v-if="$apollo.queries.customerStripe.loading"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <div v-else>
        <p v-if="!customerStripe.sources.length">No hay datos todavía</p>
        <v-row no-gutters v-else>
          <v-col cols="6" class=""><b>Nombre</b></v-col>
          <v-col cols="6">{{ customerStripe.name }}</v-col>
          <v-col cols="6"><b class="mr-3">Método de pago</b></v-col>
          <v-col cols="6">
            **** **** **** {{ customerStripe.sources[0].last4 }}
          </v-col>
          <v-col cols="6"><b>País</b></v-col>
          <v-col cols="6">{{ customerStripe.address.country }}</v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { GET_CUSTOMER } from '@/graphql/querys/customersQuery';

export default {
  name: 'DetailsBilling',
  data() {
    return {
      customerStripe: {},
      brandsCards: [
        {
          id: 1,
          brand: 'Visa',
          icon: '',
        },
      ],
    };
  },
  apollo: {
    customerStripe: {
      query: GET_CUSTOMER,
    },
  },
};
</script>

<style lang="scss" scoped></style>
