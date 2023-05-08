import gql from 'graphql-tag';

export const GET_MY_ROLES = gql`
  query GetRoles {
    getMyRoles: roles(filters: { orderBy: asc }) {
      id
      name
      type
      users {
        id
        isActive
        user {
          id
          name
          lastName
          email
          phones
          config {
            profileUrl
          }
        }
        role {
          id
          name
          type
        }
        group {
          id
          name
        }
      }
      permissions {
        id
        name
        typePermission
        methods
      }
    }
  }
`;

export const GET_LIST_ROLES = gql`
  query GetRoles {
    listRoles: roles(filters: { orderBy: asc }) {
      id
      name
    }
  }
`;
