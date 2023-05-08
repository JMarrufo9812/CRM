import { createProvider } from '../vue-apollo';
import { GET_USER_CURRENT } from '../graphql/querys/usersQuery';
import { UPDATE_USER_CURRENT } from '../graphql/local-state/mutations';

const {
  clients: { defaultClient },
} = createProvider();

function getPermissionGroup(permissions) {
  if (permissions.length > 0) {
    return permissions.map(({ methods, keyId: subject }) => {
      if (methods?.length > 0) {
        const methodGroup = methods.filter((method) => method.isEnabled);
        return {
          action: methodGroup[0].keyId,
          subject,
        };
      }
      return [];
    });
  }
  return [];
}

function formatIntegrations(integrations) {
  if (integrations.length > 0) {
    return integrations.map(
      ({ id, name, email, tokens: { calendarId: keyItem = '' } }) => {
        return {
          __typename: 'Integration',
          id,
          name,
          email,
          keyItem,
        };
      },
    );
  }
  return [];
}

function formatUsersEnterprises(usersEnterprises) {
  if (usersEnterprises.length > 0) {
    return usersEnterprises.map(
      ({ id: userEnterpriseId, enterprise, isActive }) => {
        return {
          ...enterprise,
          userEnterpriseId,
          isActive,
        };
      },
    );
  }
  return [];
}

function formatMembersGroup(members) {
  if (members.length > 0) {
    return members.map(({ id }) => id);
  }
  return [];
}

const getUserCurrent = async () => {
  return defaultClient
    .query({
      query: GET_USER_CURRENT,
      fetchPolicy: 'no-cache',
    })
    .then(({ data: { userEnterprise } }) => userEnterprise)
    .catch();
};

const setUserCurrent = async ({
  id,
  user,
  enterprise,
  integrations,
  emailTemplatesOrder,
  group: { members, permissions },
  role: { type: typeUser, permissions: permissionsRol },
}) => {
  const {
    config: { enterpriseDefault: defaultEnterprise, profileUrl },
    usersEnterprises,
  } = user;
  return defaultClient.mutate({
    mutation: UPDATE_USER_CURRENT,
    variables: {
      userCurrent: {
        __typename: 'userCurrent',
        id,
        user,
        typeUser,
        profileUrl,
        enterprise,
        permissionsRol,
        defaultEnterprise,
        emailTemplatesOrder,
        membersGroup: formatMembersGroup(members),
        integrations: formatIntegrations(integrations),
        permissionsGroup: getPermissionGroup(permissions),
        enterprises: formatUsersEnterprises(usersEnterprises),
      },
    },
  });
};

export { getUserCurrent, setUserCurrent };
