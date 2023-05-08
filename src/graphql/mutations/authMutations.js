import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation Login($input: userLoginInput!) {
    loginUser(userInput: $input) {
      token
      userEnterprise {
        id
        user {
          id
          name
          lastName
          email
          usersEnterprises {
            id
            isActive
            enterprise {
              id
              name
            }
          }
          config {
            enterpriseDefault
            profileUrl
          }
        }
        enterprise {
          id
          name
        }
        group {
          id
          name
          permissions {
            id
            keyId
            methods
          }
          members {
            id
          }
        }
        role {
          id
          type
          permissions {
            methods
          }
        }
        integrations {
          id
          name
          email
          tokens
        }
        emailTemplatesOrder
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation LogOut {
    logOut
  }
`;

export const SIGN_UP = gql`
  mutation signUp($input: userSignUpCreateInput!) {
    signupUser(userInput: $input) {
      id
      user {
        id
        email
      }
    }
  }
`;

export const CONFIRM_USER = gql`
  mutation ConfirmUser($input: userConfirmInput!) {
    confirmUser(userInput: $input) {
      id
      user {
        id
        name
      }
      enterprise {
        name
      }
    }
  }
`;

export const CONFIRM_ENTERPRISE = gql`
  mutation ConfirmEnterprise($enterpriseId: ID!) {
    confirmEnterprise(enterpriseId: $enterpriseId)
  }
`;

export const UPDATE_NEW_USER = gql`
  mutation UpdateNewUser($input: newUserUpdateInput!) {
    updateNewUser(userInput: $input) {
      id
      name
      lastName
    }
  }
`;

export const LOGIN_CHANGE_USER_ENTERPRISE = gql`
  mutation loginChangeUserEnterprise($id: ID!) {
    loginChangeUserEnterprise(id: $id) {
      token
      userEnterprise {
        id
        user {
          id
          name
          lastName
          email
        }
        enterprise {
          id
          name
        }
        group {
          id
          name
          permissions {
            id
            keyId
            methods
          }
        }
        role {
          id
          type
          permissions {
            methods
          }
        }
      }
    }
  }
`;
