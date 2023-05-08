import gql from 'graphql-tag';

export const CREATE_GROUP = gql`
  mutation createGroup($input: groupCreateInput!) {
    createGroup(groupInput: $input) {
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

export const DELETE_GROUP = gql`
  mutation deleteGroup($groupId: ID!) {
    deleteGroup(groupId: $groupId) {
      id
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroup($input: groupUpdateInput!) {
    updateGroup(groupInput: $input) {
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
