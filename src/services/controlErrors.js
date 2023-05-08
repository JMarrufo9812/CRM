import { createProvider } from '../vue-apollo';
// eslint-disable-next-line
import { UPDATE_LOGIN_CONTROL } from '../graphql/local-state/mutations';
import { TOKEN } from '../constants/settings';

const {
  clients: { defaultClient },
} = createProvider();

export const controlErrors = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors.length > 0) {
    graphQLErrors.forEach(({ /* message, locations, path, */ statusCode }) => {
      // console.log(
      //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Status Code: ${statusCode}`,
      // );
      // Status code 400 - Don't have a token or the information is incomplete or bad format
      if (statusCode === 400) {
        defaultClient
          .mutate({
            mutation: UPDATE_LOGIN_CONTROL,
            variables: { isLogged: false },
          })
          .then(() => {
            localStorage.removeItem(TOKEN);
            defaultClient.resetStore().then(() => {
              if (window.location.pathname !== '/login')
                window.location = '/login';
            });
          })
          .catch(() => {});
      }
      // Status code 401 - Have a token but don't have permissions to the path or actions.
      if (statusCode === 401) {
        defaultClient
          .mutate({
            mutation: UPDATE_LOGIN_CONTROL,
            variables: { isLogged: false },
          })
          .then(() => {
            localStorage.removeItem(TOKEN);
            defaultClient.resetStore().then(() => {
              if (window.location.pathname !== '/login')
                window.location = '/login';
            });
          })
          .catch(() => {});
      }
      if (statusCode === 404) {
        console.log(
          'Acción no existe en tu cuenta desde Control - StatusCode: 400',
        );
      }
    });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
};
