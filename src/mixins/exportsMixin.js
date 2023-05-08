export const exportsMixin = {
  components: {
    ModalExportData: () => import('@/components/export/ModalExportData.vue'),
  },
  data() {
    return {
      modalExport: {
        isOpen: false,
      },
    };
  },
  methods: {
    modalHandlerExport({ isOpen }) {
      this.modalExport = { isOpen };
    },
  },
};
