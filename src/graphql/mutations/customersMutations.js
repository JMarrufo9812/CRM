import gql from 'graphql-tag';

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($customerInput: customerInput!) {
    createCustomer(customer: $customerInput) {
      id
      message
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($customerInput: customerInput!) {
    updateCustomer(customer: $customerInput) {
      id
      message
    }
  }
`;
