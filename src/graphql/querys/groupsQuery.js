import gql from 'graphql-tag';

export const GET_MY_GROUPS = gql`
  query GetGroups {
    getMyGroups: groups(filters: { orderBy: desc }) {
      id
      name
      isDefault
      members {
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
