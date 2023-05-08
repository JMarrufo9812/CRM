import { createProvider } from '../vue-apollo';
import { UPDATE_LOGIN_CONTROL } from '../graphql/local-state/mutations';

const {
  clients: { defaultClient },
} = createProvider();

export const updateIsLogged = async (status) => {
  return defaultClient.mutate({
    mutation: UPDATE_LOGIN_CONTROL,
    variables: { isLogged: status },
  });
};
