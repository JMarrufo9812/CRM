import { ADD_SUCCESS } from '@/graphql/local-state/mutations';

export const successesMixin = {
  methods: {
    addSuccess(message) {
      this.$apollo.mutate({
        mutation: ADD_SUCCESS,
        variables: {
          success: {
            message,
          },
        },
      });
    },
  },
};
