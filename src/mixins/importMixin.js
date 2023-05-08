export const importMixin = {
  components: {
    ModalImportData: () => import('@/components/import/ModalImportData.vue'),
  },
  data() {
    return {
      modalImport: {
        isOpen: false,
      },
    };
  },

  methods: {
    modalHandlerImport({ isOpen }) {
      this.modalImport = { isOpen };
    },
  },
};
