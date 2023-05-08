import gql from 'graphql-tag';

export const CREATE_TEMPLATE_EMAIL = gql`
  mutation createEmailTemplate($emailTemplateInput: emailTemplateCreateInput!) {
    saveTemplateEmail(emailTemplateInput: $emailTemplateInput) {
      id
      name
      shared
      myTemplate
    }
  }
`;

export const UPDATE_TEMPLATE_EMAIL = gql`
  mutation updateEmailTemplate($emailTemplateInput: emailTemplateUpdateInput!) {
    updateEmailTemplate(emailTemplateInput: $emailTemplateInput) {
      id
      name
      shared
      myTemplate
    }
  }
`;

export const DELETE_TEMPLATE_EMAIL = gql`
  mutation deleteEmailTemplate($emailTemplateId: ID!) {
    deleteEmailTemplate(emailTemplateId: $emailTemplateId) {
      id
    }
  }
`;
