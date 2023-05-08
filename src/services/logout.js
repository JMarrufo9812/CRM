import {
  UPDATE_LOGIN_CONTROL,
  UPDATE_LOADING_CONTROL,
} from '../graphql/local-state/mutations';
import { TOKEN } from '../constants/settings';

export const logout = (defaultClient) => {
  defaultClient.mutate({
    mutation: UPDATE_LOGIN_CONTROL,
    variables: { isLogged: false },
  });
  defaultClient.mutate({
    mutation: UPDATE_LOADING_CONTROL,
    variables: { isLoading: false },
  });
  localStorage.removeItem(TOKEN);
};
