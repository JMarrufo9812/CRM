import gql from 'graphql-tag';

export const CREATE_ROLE = gql`
  mutation createRole($input: roleCreateInput!) {
    createRole(roleInput: $input) {
      id
      name
      type
      enterprise {
        id
      }
      permissions {
        id
        name
        typePermission
        methods
      }
      users {
        id
        isActive
        user {
          id
          name
          lastName
          email
        }
      }
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation deleteRole($input: roleDeleteInput!) {
    deleteRole(roleInput: $input) {
      id
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($input: roleUpdateInput!) {
    updateRole(roleInput: $input) {
      id
      name
      type
      enterprise {
        id
      }
      permissions {
        id
        name
        typePermission
        methods
      }
      users {
        id
        isActive
        user {
          id
          name
          lastName
          email
          phones
        }
        role {
          id
          name
        }
        group {
          id
          name
        }
      }
    }
  }
`;
