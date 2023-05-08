import BaseModalAlert from '@/components/ui/BaseModalAlert.vue';
import BaseModalDelete from '@/components/ui/BaseModalDelete.vue';
import BaseModalError from '@/components/ui/BaseModalError.vue';
import BaseModalRestore from '@/components/ui/BaseModalRestore.vue';

export const modalsAlertsMixin = {
  components: {
    BaseModalAlert,
    BaseModalDelete,
    BaseModalError,
    BaseModalRestore,
  },
  data() {
    return {
      modalError: {
        isOpen: false,
        error: '',
      },
      modalDelete: {
        isOpen: false,
        isLoading: false,
        message: { title: '', text: '', nameItem: '' },
        infoDelete: {},
      },
      modalRestore: {
        isOpen: false,
        isLoading: false,
        message: { title: '', text: '', nameItem: '' },
        infoRestore: {},
      },
      modalAlert: {
        isOpen: false,
        isLoading: false,
        message: { title: '', text: '' },
        info: {},
      },
    };
  },
  methods: {
    // manejador del modal de alerta
    modalHandlerAlert({ isOpen, isLoading, message, info }) {
      this.modalAlert = { isOpen, isLoading, message, info };
    },
    modalHandlerError({ isOpen, error }) {
      this.modalError = { isOpen, error };
    },
    modalHandlerDelete({ isOpen, isLoading, message, infoDelete }) {
      this.modalDelete = { isOpen, isLoading, message, infoDelete };
    },
    modalHandlerRestore({ isOpen, isLoading, message, infoDelete }) {
      this.modalRestore = { isOpen, isLoading, message, infoDelete };
    },
  },
};
