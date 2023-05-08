import gql from 'graphql-tag';

export const GET_GROUP_PERMISSIONS = gql`
  query readDefaultPermissionsGroup {
    groupPermissions: defaultPermissions(filters: { typePermission: GROUP }) {
      id
      name
      typePermission
      methods
    }
  }
`;
