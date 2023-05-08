import gql from 'graphql-tag';

export const GET_TEMPLATES_EMAIL = gql`
  query readEmailTemplates {
    emailTemplates {
      id
      name
      shared
      myTemplate
    }
  }
`;

export const GET_TEMPLATE_EMAIL = gql`
  query readEmailTemplate($emailTemplateId: ID!) {
    emailTemplate(emailTemplateId: $emailTemplateId) {
      id
      name
      content {
        subject
        message
      }
      shared
    }
  }
`;
