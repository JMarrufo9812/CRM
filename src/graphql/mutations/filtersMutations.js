import gql from 'graphql-tag';

export const CREATE_FILTER = gql`
  mutation CreateCustomFilter($input: createCustomFilterInput!) {
    createCustomFilter(customFilterInput: $input) {
      id
      name
      type
      isDefault
      isSelected
      isVisible
    }
  }
`;

export const UPDATE_FILTER = gql`
  mutation UpdateCustomFilter($input: updateCustomFilterInput!) {
    updateCustomFilter(customFilterInput: $input) {
      id
      name
      type
      isDefault
      isSelected
      isVisible
    }
  }
`;

export const DELETE_FILTER = gql`
  mutation DeleteCustomFilter($customFilterId: ID!) {
    deleteCustomFilter(customFilterId: $customFilterId) {
      id
    }
  }
`;
