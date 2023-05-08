import gql from 'graphql-tag';

export const GET_TOKEN_GMAIL = gql`
  mutation getTokensG($codeToken: String!) {
    syncronizeGoogleGmail(codeToken: $codeToken) {
      success
      email
    }
  }
`;

export const SENT_TO_TRASH_EMAIL = gql`
  mutation sentToTrash($id: String!, $isTrash: Boolean!) {
    trashEmailGoogleGmail(id: $id, isTrash: $isTrash)
  }
`;

export const MARK_READ_EMAIL = gql`
  mutation markReadEmail($id: String!, $isRead: Boolean!) {
    markEmailGoogleGmail(id: $id, isRead: $isRead)
  }
`;

export const DELETE_EMAIL = gql`
  mutation deleteEmail($id: String!) {
    deleteEmailGoogleGmail(id: $id)
  }
`;

export const SEND_EMAIL = gql`
  mutation sendEmail($gmailInput: GmailEmailInput!) {
    sendMailGoogleMail(gmailInput: $gmailInput)
  }
`;

export const CREATE_SIGNATURE = gql`
  mutation createSignature(
    $userEnterpriseInput: UserEnterpriseCreateSignatureInput!
  ) {
    createOrUpdateSignature(userEnterpriseInput: $userEnterpriseInput) {
      id
      signature
    }
  }
`;

export const DESYNCHRONIZE_GOOGLE_GMAIL = gql`
  mutation desynchronizeGoogleGmail {
    desynchronizeGoogleGmail
  }
`;
