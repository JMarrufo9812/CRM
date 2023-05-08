<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="title">Comprobantes de pago</h1>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="invoices"
          :items-per-page="10"
          class="elevation-1"
          :footer-props="footerProps"
        >
          <template v-slot:item.action="{ item }">
            <v-btn
              icon
              color="primary"
              @click.stop="openModal(item)"
              class="mr-2"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn icon color="primary" @click="downloadPDF(item)">
              <v-icon>mdi-cloud-download</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <InvoiceModal
      :dialog.sync="dialog"
      :invoice="invoice"
      @downloadPDF="downloadPDFModal(invoice)"
    ></InvoiceModal>
  </v-container>
</template>

<script>
import InvoiceModal from '@/components/invoice/InvoiceModal.vue';
import { InvoiceTemplate } from '@/components/invoice/InvoiceTemplate';

export default {
  name: 'Invoices',
  components: {
    InvoiceModal,
  },
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Fecha de creación',
          align: 'start',
          value: 'dateDue',
        },
        { text: 'Tipo', align: 'start', value: 'type' },
        { text: 'Estado', align: 'start', value: 'status' },
        { text: 'Acciones', align: 'end', value: 'action', sortable: false },
      ],
      footerProps: {
        itemsPerPageOptions: [5, 10, 25, { text: 'Todos', value: -1 }],
        itemsPerPageText: 'Filas por página',
      },
      invoices: [
        {
          id: 1,
          name: 'pago-mes-1.pdf',
          type: 'Pago',
          status: 'Procesado',
          invoiceNumber: 'INV-5555-0001',
          dateDue: '9 Julio, 2020',
          subTotal: '8000',
          total: '15000',
          customer: {
            name: 'Eduardo Pech',
            email: 'eduardopech.web@gmail.com',
            phone: '(999) 453 43 52',
            city: 'Mérida, México',
          },
          products: [
            {
              id: 1,
              description: 'Plan Básico',
              quantity: 13,
              priceUnit: '598',
              amount: '4592',
            },
            {
              id: 2,
              description: 'Plan Avanzado',
              quantity: 5,
              priceUnit: '598',
              amount: '4592',
            },
            {
              id: 3,
              description: 'Plan Experto',
              quantity: 2,
              priceUnit: '598',
              amount: '4592',
            },
            {
              id: 4,
              description: 'Plan Personalizado',
              quantity: 2,
              priceUnit: '598',
              amount: '4592',
            },
          ],
        },
        {
          id: 2,
          name: 'pago-mes-2.pdf',
          type: 'Pago',
          status: 'Procesado',
          invoiceNumber: 'INV-5555-0001',
          dateDue: '10 Agosto, 2020',
          subTotal: '21000',
          total: '23000',
          customer: {
            name: 'Robert Pech',
            email: 'robertpech.web@gmail.com',
            phone: '(999) 453 43 52',
            city: 'Mérida, México',
          },
          products: [
            {
              id: 1,
              description: 'Plan Básico',
              quantity: 13,
              priceUnit: '598',
              amount: '4592',
            },
            {
              id: 2,
              description: 'Plan Avanzado',
              quantity: 5,
              priceUnit: '598',
              amount: '4592',
            },
            {
              id: 3,
              description: 'Plan Experto',
              quantity: 2,
              priceUnit: '598',
              amount: '4592',
            },
            {
              id: 4,
              description: 'Plan Personalizado',
              quantity: 2,
              priceUnit: '598',
              amount: '4592',
            },
          ],
        },
      ],
      columnsTable: [
        { header: 'Descripción', dataKey: 'description' },
        { header: 'Cantidad', dataKey: 'quantity' },
        { header: 'Precio x usuario', dataKey: 'priceUnit' },
        { header: 'Monto', dataKey: 'amount' },
      ],
      invoice: {},
    };
  },
  methods: {
    openModal(invoice) {
      this.formatInvoiceSelected(invoice);
      this.dialog = true;
    },
    downloadPDF(invoice) {
      this.formatInvoiceSelected(invoice);
      InvoiceTemplate(this.invoice, this.columnsTable);
    },
    downloadPDFModal(invoice) {
      InvoiceTemplate(invoice, this.columnsTable);
    },
    formatInvoiceSelected(invoice) {
      const products = this.formatProductsPrice(invoice.products);
      this.invoice = {
        ...invoice,
        products,
        subTotal: this.$options.filters.formatPrice(invoice.subTotal),
        total: this.$options.filters.formatPrice(invoice.total),
      };
    },
    formatProductsPrice(listProducts) {
      return listProducts.map((product) => {
        return {
          ...product,
          priceUnit: this.$options.filters.formatPrice(product.priceUnit),
          amount: this.$options.filters.formatPrice(product.amount),
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-data-table {
  .v-data-table-header {
    background-color: #f5f8fa;
    span {
      color: black;
      text-transform: uppercase;
    }
  }

  td {
    height: 55px;
    border-bottom: 2px solid #dfe3eb !important;
  }

  .v-data-footer {
    background-color: #f5f8fa;
  }
}
</style>
