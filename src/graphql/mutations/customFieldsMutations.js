import gql from 'graphql-tag';

export const CREATE_CUSTOM_FIELD = gql`
  mutation CreateCustomFields($forForm: typeForm!, $input: CreateCustomInput!) {
    createCustomField(forForm: $forForm, input: $input) {
      id
      order
      label
      icon
      type
      items
      isRequired
      isMultiple
    }
  }
`;

export const UPDATE_ORDER_INPUTS = gql`
  mutation UpdateOrderInputs($forForm: typeForm!, $inputs: [UpdateOrder!]!) {
    updateOrderInputs(forForm: $forForm, inputs: $inputs) {
      forForm
      defaultForm {
        id
        inputs {
          id
          label
          order
        }
      }
      customForm {
        id
        inputs {
          id
          label
          order
        }
      }
    }
  }
`;

export const UPDATE_INPUT = gql`
  mutation UpdateCustomField($input: UpdateCustomInput!) {
    updateCustomField(input: $input) {
      id
      type
      icon
      label
      items
      order
      isRequired
      isMultiple
    }
  }
`;

export const DELETE_INPUT = gql`
  mutation DeleteInput($input: ID!) {
    deleteCustomField(input: $input) {
      forForm
      defaultForm {
        id
        inputs {
          id
          order
        }
      }
      customForm {
        id
        inputs {
          id
          order
          label
          icon
          type
          items
          isRequired
          isMultiple
        }
      }
    }
  }
`;
