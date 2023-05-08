import { createProvider } from '../vue-apollo';
import { VALID_TOKEN } from '../graphql/querys/usersQuery';
import { controlErrors } from './controlErrors';

const {
  clients: { defaultClient },
} = createProvider();

export const checkValidToken = async (path) => {
  if (!path) return false;

  return defaultClient
    .query({
      query: VALID_TOKEN,
      variables: { path },
      fetchPolicy: 'no-cache',
    })
    .then(({ data: { validToken } }) => validToken)
    .catch((errors) => {
      controlErrors(errors);
      return false;
    });
};
