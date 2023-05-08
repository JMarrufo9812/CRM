import { UPDATE_HEADERS } from '@/graphql/mutations/headersMutations';
import { GET_HEADERS } from '@/graphql/querys/headersQuery';

export const headersMixin = {
  data() {
    return {
      getForm: {
        customForm: { inputs: [] },
        defaultForm: { inputs: [] },
        headers: [],
      },
      headers: [],
    };
  },
  computed: {
    formatHeaders() {
      const { customForm, defaultForm, headers } = this.getForm;
      const inputs = customForm?.inputs
        ? defaultForm?.inputs.concat(customForm?.inputs).concat(headers)
        : defaultForm.inputs.concat(headers);

      if (this.headers.length === 0) {
        const listHeaders = inputs.map((input) => {
          return {
            text: input.label,
            value: input.keyInput ? input.keyInput : input.id,
            align: 'center',
            type: input.keyInput ? 'default' : 'custom',
          };
        });
        return listHeaders;
      }
      const listHeaders = this.headers.map((header) => {
        return {
          text: header.label,
          value: header.key,
          align: 'center',
          type: header.type,
        };
      });

      return listHeaders;
    },
  },
  methods: {
    updateHeaders(listHeaders) {
      let type = '';
      if (this.viewInfo.type === 'CONTACT') type = 'CONTACTS';
      if (this.viewInfo.type === 'COMPANY') type = 'COMPANIES';
      if (this.viewInfo.type === 'DEAL') type = 'DEALS';
      this.$apollo
        .mutate({
          mutation: UPDATE_HEADERS,
          variables: {
            input: {
              type,
              list: listHeaders,
            },
          },
          update: (store, { data: { updateOrderHeaders } }) => {
            const data = store.readQuery({
              query: GET_HEADERS,
              variables: {
                type,
              },
            });
            data.headers = updateOrderHeaders;
            store.writeQuery({
              query: GET_HEADERS,
              variables: {
                type,
              },
              data,
            });
          },
        })
        .catch(() => {
          const error =
            'No se pudo actualizar las cabeceras, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
