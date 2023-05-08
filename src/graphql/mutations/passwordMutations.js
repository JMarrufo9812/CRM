import gql from 'graphql-tag';

export const RECOVER_PASSWORD = gql`
  mutation RecoverPassword($input: userEmailInput!) {
    recoverPasswordUser(userInput: $input) {
      success
    }
  }
`;

export const CONFIRM_RECOVER_PASSWORD = gql`
  mutation ConfirmRecoverPassword($input: userConfirmInput!) {
    confirmRecoverPasswordUser(userInput: $input) {
      id
    }
  }
`;

export const SET_NEW_PASSWORD = gql`
  mutation SetNewPassword($input: newPasswordInput!) {
    setNewPasswordUser(userInput: $input) {
      status
      message
    }
  }
`;
