import { CHANGE_MODAL } from '@/graphql/local-state/mutations';
import { GET_MODAL } from '@/graphql/local-state/queries';

export const modalMethodsMixin = {
  methods: {
    changeModal(modal) {
      this.$apollo.mutate({
        mutation: CHANGE_MODAL,
        variables: { modal },
      });
    },
  },
};

export const modalApolloMixin = {
  data() {
    return {
      modalId: '',
    };
  },
  apollo: {
    modal: {
      query: GET_MODAL,
      variables() {
        return { id: this.modalId };
      },
    },
  },
};
