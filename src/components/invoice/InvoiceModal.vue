<template>
  <BaseModalData :dialog.sync="dialog" @close="close">
    <InvoicePreview
      :invoice="invoice"
      @downloadPDF="downloadPDF"
    ></InvoicePreview>
  </BaseModalData>
</template>

<script>
import BaseModalData from '@/components/ui/BaseModalData.vue';
import InvoicePreview from '@/components/invoice/InvoicePreview.vue';

export default {
  name: 'InvoiceModal',
  components: {
    BaseModalData,
    InvoicePreview,
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    invoice: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Close modal with sync
    close() {
      this.$emit('update:dialog', false);
    },
    // Send invoice to download
    downloadPDF() {
      this.$emit('downloadPDF', this.invoice);
    },
  },
};
</script>
