import gql from 'graphql-tag';

export const CHANGE_USER_STATUS = gql`
  mutation changeUserStatus($input: userEnterpriseUpdateInput!) {
    pauseAccount(userEnterpriseInput: $input) {
      id
      isActive
      user {
        id
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: userCreateInput!) {
    createUser(userInput: $input) {
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
  }
`;

export const DELETE_USER_ENTERPRISE = gql`
  mutation deleteUserEnterprise($input: userEnterpriseDeleteInput!) {
    deleteUserEnterprise(userEnterpriseInput: $input) {
      id
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
  }
`;

export const UPDATE_USER_ENTERPRISE = gql`
  mutation updateUserEnterprise($input: userEnterpriseUpdateInput!) {
    updateUserEnterprise(userEnterpriseInput: $input) {
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
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($input: userUpdatePasswordInput!) {
    updateUserPassword(userInput: $input) {
      status
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userInput: userUpdateInput!) {
    updateUser(userInput: $userInput) {
      id
      email
      name
      lastName
    }
  }
`;
