<template>
  <v-card-text>
    <v-card-title class="d-block text-center">Cervus CRM</v-card-title>
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="text-center invoice-pdf">
          <div v-if="invoice.status === 'Procesado'">
            <v-icon color="green" large>mdi-check-circle</v-icon>
            <span class="green--text ml-2 font-weight-bold">PAGADO</span>
            <p class="price">
              {{ invoice.total }} pagado el {{ invoice.dateDue }}
            </p>
            <v-btn color="success" @click="downloadPDF">
              Descargar PDF
              <v-icon class="ml-1">mdi-download</v-icon>
            </v-btn>
          </div>
          <div v-else>
            <div class="mb-3">
              <v-icon color="red" large>mdi-information</v-icon>
              <span class="red--text ml-2 font-weight-bold">PENDIENTE</span>
            </div>
            <p class="price">
              Todavía no ha procesado el pago
            </p>
            <v-btn color="success" disabled>
              Descargar PDF
              <v-icon class="ml-1">mdi-download</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12">
          <p class="text-center my-3 font-weight-bold">
            Gracias por confiar en nosotros
          </p>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Descripción</th>
                  <th class="text-right">Cantidad</th>
                  <th class="text-right">Precio</th>
                  <th class="text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in invoice.products" :key="item.id">
                  <td>{{ item.description }}</td>
                  <td class="text-right">{{ item.quantity }}</td>
                  <td class="text-right">{{ item.priceUnit }}</td>
                  <td class="text-right">{{ item.amount }}</td>
                </tr>
                <tr class="text-right">
                  <td colspan="4">
                    Subtotal
                    <span class="font-weight-bold">
                      {{ invoice.subTotal }}
                    </span>
                  </td>
                </tr>
                <tr class="text-right">
                  <td colspan="4">
                    Total
                    <span class="font-weight-bold">{{ invoice.total }}</span>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
export default {
  name: 'InvoicePreview',
  props: {
    invoice: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Send action to download to father component
    downloadPDF() {
      this.$emit('downloadPDF');
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  .invoice-pdf {
    background: #f5f5f5;
    box-shadow: inset 0 -1px #e3e8ee;
    padding: 1.5rem 0;
    .price {
      font-size: 1.3rem;
      margin: 2rem 0;
    }
  }
  .v-card__text {
    padding: 0;
  }
}

.v-data-table {
  th {
    color: black !important;
    font-size: 0.8rem;
    text-transform: uppercase;
  }
}
</style>
