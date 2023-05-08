import gql from 'graphql-tag';

export const GET_FORM = gql`
  query GetForm($type: typeForm!) {
    getForm: dynamicForms(forForm: $type) {
      forForm
      defaultForm {
        inputs {
          id
          type
          icon
          label
          items
          order
          keyInput
          isRequired
          isMultiple
        }
      }
      customForm {
        inputs {
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
      headers
    }
  }
`;

export const GET_FORM_EMAIL = gql`
  query getForm {
    formContact: dynamicForms(forForm: CONTACT) {
      defaultForm {
        inputs {
          id
          label
          keyInput
        }
      }
      customForm {
        inputs {
          id
          label
        }
      }
    }
    formCompany: dynamicForms(forForm: COMPANY) {
      defaultForm {
        inputs {
          id
          label
          keyInput
        }
      }
      customForm {
        inputs {
          id
          label
        }
      }
    }
    formDeal: dynamicForms(forForm: DEAL) {
      defaultForm {
        inputs {
          id
          label
          keyInput
        }
      }
      customForm {
        inputs {
          id
          label
        }
      }
    }
  }
`;
