import { CREATE_CUSTOM_FIELD } from '@/graphql/mutations/customFieldsMutations';
// import { GET_FORM } from '@/graphql/querys/formsQuery';

export const customFieldsMixin = {
  data() {
    return {
      isUpdateInputs: false,
      modalCustomField: {
        isOpen: false,
        isLoading: false,
        isEdit: false,
      },
    };
  },
  components: {
    Fields: () => import('@/components/fields/Fields.vue'),
    ModalCustomField: () =>
      import('@/components/customFields/ModalCustomField.vue'),
  },
  methods: {
    modalHandlerCustomFields({ isOpen, isLoading, isEdit }) {
      this.modalCustomField = { isOpen, isLoading, isEdit };
    },
    createCustomField(forForm, { type, label, items, isRequired }) {
      this.modalHandlerCustomFields({
        isOpen: true,
        isLoading: true,
        isEdit: false,
      });
      this.$apollo
        .mutate({
          mutation: CREATE_CUSTOM_FIELD,
          variables: {
            forForm,
            input: {
              type,
              label,
              items,
              isRequired,
              isMultiple: false,
            },
          },
          update: (store, { data: { createCustomField } }) => {
            // const data = store.readQuery({
            //   query: GET_FORM,
            //   variables: {
            //     type: forForm,
            //   },
            // });
            // if (!data.getForm.customForm.inputs)
            //   data.getForm.customForm.inputs = [];
            // data.getForm.customForm.inputs.push(createCustomField);
            // store.writeQuery({
            //   query: GET_FORM,
            //   variables: {
            //     type: forForm,
            //   },
            //   data,
            // });
            // update array inputs modals
            if (this.inputs && !this.isImportModal) {
              this.inputs.push(createCustomField);
            }
            if (this.inputs && this.isImportModal) {
              const {
                id,
                type: typeInput,
                label: labelInput,
              } = createCustomField;

              const newCustomInput = {
                label: labelInput,
                key: id,
                isSelect: false,
                isDefault: false,
                type: typeInput,
              };

              this.inputs.push(newCustomInput);
            }
          },
        })
        .then(() => {
          this.modalHandlerCustomFields({
            isOpen: false,
            isLoading: false,
            isEdit: false,
          });
          this.isUpdateInputs = true;
        })
        .catch(() => {
          const error =
            'No se pudo actualizar los campos, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
