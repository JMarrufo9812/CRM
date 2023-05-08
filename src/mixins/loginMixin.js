import { LOGIN } from '@/graphql/mutations/authMutations';
import { TOKEN } from '@/constants/settings';
import {
  UPDATE_LOGIN_CONTROL,
  UPDATE_LOADING_CONTROL,
  UPDATE_USER_CURRENT,
} from '@/graphql/local-state/mutations';

export const loginMixin = {
  data() {
    return {
      isError: false,
      isLoading: false,
    };
  },
  methods: {
    login(email, password) {
      this.isLoading = true;
      this.$apollo
        .mutate({
          mutation: LOGIN,
          variables: {
            input: {
              email,
              password,
            },
          },
        })
        .then(
          async ({
            data: {
              loginUser: {
                token,
                userEnterprise: {
                  id: userEnterpriseId,
                  role: { type },
                  enterprise,
                  user,
                  integrations,
                  emailTemplatesOrder,
                  role,
                  group,
                },
              },
            },
          }) => {
            localStorage.setItem(TOKEN, token);

            this.isError = false;
            this.$apollo.mutate({
              mutation: UPDATE_LOADING_CONTROL,
              variables: { isLoading: true },
            });
            const isLogged = () =>
              this.$apollo.mutate({
                mutation: UPDATE_LOGIN_CONTROL,
                variables: { isLogged: true },
              });
            const isUpdatedUserCurrent = () =>
              this.$apollo.mutate({
                mutation: UPDATE_USER_CURRENT,
                variables: {
                  userCurrent: {
                    id: userEnterpriseId,
                    user,
                    enterprise,
                    integrations: integrations.map((integration) => {
                      const {
                        id,
                        name,
                        email: emailIntegration,
                        tokens,
                      } = integration;
                      return {
                        __typename: 'Integration',
                        id,
                        name,
                        email: emailIntegration,
                        keyItem: tokens.calendarId || '',
                      };
                    }),
                    emailTemplatesOrder,
                    defaultEnterprise: user.config.enterpriseDefault,
                    profileUrl: user.config.profileUrl,
                    typeUser: role.type,
                    enterprises: [],
                    membersGroup: group.members,
                    permissionsRol: role.permissions,
                    permissionsGroup: group.permissions,
                  },
                },
              });

            Promise.all([isLogged(), isUpdatedUserCurrent()])
              .then(() => {
                if (type === 'ADMIN') {
                  this.$router.push('dashboards');
                } else {
                  this.$router.push('pipeline');
                }
              })
              .catch();
          },
        )
        .catch(() => {
          this.isLoading = false;
          this.isError = true;
        });
    },
  },
};
