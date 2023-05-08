import { GET_FORM } from '@/graphql/querys/formsQuery';
import { UTIL_ORDER } from '@/helpers/utils';

export const profilesMixin = {
  components: {
    // contact and company
    History: () => import('@/components/profile/History.vue'),
    Header: () => import('@/components/profile/Header.vue'),
    Details: () => import('@/components/profile/Details.vue'),
    ListCompanies: () => import('@/components/profile/ListCompanies.vue'),
    ListContacts: () => import('@/components/profile/ListContacts.vue'),
    ListDeals: () => import('@/components/profile/ListDeals.vue'),
    ModalDeal: () => import('@/components/deals/ModalDeals.vue'),
    // deal
    SubHeader: () => import('@/components/deals/SubHeader.vue'),
    DealCompany: () => import('@/components/profile/DealCompany.vue'),
    DealContact: () => import('@/components/profile/DealContact.vue'),
  },
  watch: {
    modalDeal(value) {
      if (value.isOpen) {
        this.inputsForm = this.inputsForm.map((input) => {
          if (this.typeItem === 'CONTACT') {
            if (input.keyInput === 'contact') {
              input.defaultValue = JSON.parse(JSON.stringify(this.contact)); // eslint-disable-line
            }
          } else if (this.typeItem === 'COMPANY') {
            if (input.keyInput === 'company') {
              input.defaultValue = JSON.parse(JSON.stringify(this.company)); // eslint-disable-line
            }
          }
          return input;
        });
      }
    },
  },
  methods: {
    getForm() {
      this.$apollo
        .query({
          query: GET_FORM,
          variables: {
            type: 'DEAL',
          },
        })
        .then(
          ({
            data: {
              getForm: { customForm, defaultForm },
            },
          }) => {
            const inputs = customForm.inputs
              ? defaultForm.inputs.concat(customForm.inputs)
              : defaultForm.inputs;
            const orderInputs = UTIL_ORDER({
              listItems: inputs,
              orderBy: 'ASC',
              nextElement: 'order',
            });
            this.inputsForm = orderInputs;
            this.modalHandlerDeal({ isOpen: true, isLoading: false });
          },
        )
        .catch(() => {
          const error =
            'No se pudo obtener el formulario, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
