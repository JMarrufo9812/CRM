import { ADD_ERROR } from '@/graphql/local-state/mutations';

export const errorsMixin = {
  methods: {
    addError(error) {
      this.$apollo.mutate({
        mutation: ADD_ERROR,
        variables: {
          error,
        },
      });
    },
  },
};
