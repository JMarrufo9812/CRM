import { GET_DUPLICATE_CONTACTS } from '@/graphql/querys/contactsQuery';
import { GET_DUPLICATE_COMPANIES } from '@/graphql/querys/companiesQuery';

export const mergeDuplicatesMixin = {
  data() {
    return {
      modalMergeDuplicates: {
        isOpen: false,
        isLoading: false,
      },
      duplicateList: [],
    };
  },
  watch: {
    modalMergeDuplicates({ isOpen }) {
      if (!isOpen) this.duplicateList = [];
    },
  },
  methods: {
    modalHandlerMergeDuplicates({ isOpen, isLoading }) {
      this.modalMergeDuplicates = { isOpen, isLoading };
    },
    correctDuplicate(type, data) {
      this.updateData = true;
      this.snackbarHandler({
        isOpen: true,
        color: 'success',
        text: `${type === 'CONTACT' ? 'El contacto' : 'La empresa'} 
        ${data.name} se ha fusionado correctamente`,
      });
      if (type === 'CONTACT') {
        this.getDuplicateContacts();
      } else {
        this.getDuplicateCompanies();
      }
    },
    getDuplicateContacts() {
      this.modalHandlerMergeDuplicates({
        isOpen: true,
        isLoading: true,
      });
      this.$apollo
        .mutate({
          mutation: GET_DUPLICATE_CONTACTS,
        })
        .then(({ data: { duplicateContacts } }) => {
          this.duplicateList = duplicateContacts;
          this.modalHandlerMergeDuplicates({
            isOpen: true,
            isLoading: false,
          });
        })
        .catch(() => {
          const error =
            'No se ha podido obtener los contactos duplicados, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    getDuplicateCompanies() {
      this.modalHandlerMergeDuplicates({
        isOpen: true,
        isLoading: true,
      });
      this.$apollo
        .mutate({
          mutation: GET_DUPLICATE_COMPANIES,
        })
        .then(({ data: { duplicateCompanies } }) => {
          this.duplicateList = duplicateCompanies;
          this.modalHandlerMergeDuplicates({
            isOpen: true,
            isLoading: false,
          });
        })
        .catch(() => {
          const error =
            'No se ha podido obtener las empresas duplicadas, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
