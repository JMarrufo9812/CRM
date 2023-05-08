import gql from 'graphql-tag';

export const VALID_TOKEN = gql`
  query validToken($path: String!) {
    validToken(path: $path)
  }
`;

export const GET_USERS_ENTERPRISE = gql`
  query getUsersByEnterprise($filters: FilterUserEnterprises) {
    userEnterprises(filters: $filters) {
      id
      user {
        id
        name
        lastName
      }
    }
  }
`;

export const GET_USERS_ENTERPRISE_INFO = gql`
  query getUsersEnterpriseInfo($filters: FilterUserEnterprises) {
    userEnterprises(filters: $filters) {
      id
      user {
        id
        name
        lastName
        email
      }
    }
  }
`;

export const GET_MY_USERS = gql`
  query GetMyUsers {
    getMyUsers: userEnterprises(filters: { orderBy: desc }) {
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

export const GET_USER_CURRENT = gql`
  query getUserCurrent {
    userEnterprise {
      id
      user {
        id
        email
        name
        lastName
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
        customerId
        users {
          id
        }
        permissions {
          id
          name
          typePermission
          methods
          role {
            id
            name
          }
        }
      }
      integrations {
        id
        name
        email
        tokens
      }
      emailTemplatesOrder
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
        name
        type
        permissions {
          id
          name
          keyId
          typePermission
          methods
        }
      }
    }
  }
`;

export const GET_USER_CURRENT_ENTERPRISES = gql`
  query getUsersByEnterprise($filters: FilterUserEnterprises) {
    userEnterprises(filters: $filters) {
      id
      enterprise {
        id
        name
      }
      user {
        id
        name
        lastName
      }
    }
  }
`;

export const USERS_LIST = gql`
  query users {
    ownersList {
      id
      user {
        id
        name
        lastName
      }
    }
  }
`;

export const USER_COUNT_DATA = gql`
  query UserEnterpriseTotal($userEnterpriseId: ID!) {
    userEnterpriseTotal(userEnterpriseId: $userEnterpriseId) {
      contacts
      companies
      deals
      activities
    }
  }
`;

export const CHECK_EXIST_USER_EMAIL = gql`
  query checkExistentEmailUser($input: userEmailInput!) {
    checkExistentEmailUser(userInput: $input)
  }
`;
