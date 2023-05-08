import gql from 'graphql-tag';

export const GET_GMAIL_URI = gql`
  query getGMailURL {
    getGmailUri
  }
`;

export const GET_EMAILS = gql`
  query getList($filter: GmailInbox) {
    inboxListGmail(filter: $filter) {
      messages {
        id
        to
        from
        date
        subject
        attachments
        labelIds
        trackId
      }
      nextPageToken
      messagesTotal
      resultSizeEstimate
    }
  }
`;

export const GET_EMAIL = gql`
  query getMessage($id: String!) {
    getMailGmail(id: $id) {
      messageId
      to
      from
      cc
      bcc
      date
      subject
      attachments
      data
    }
  }
`;

export const GET_SIGNATURE = gql`
  query readSignature {
    userEnterpriseSignature {
      signature
    }
  }
`;

export const CHECK_ENTERPRISE_EXIST = gql`
  query checkEmailUser($input: userEmailInput!) {
    checkEmailUser(userInput: $input)
  }
`;

export const GET_TRACKING = gql`
  query getTrakingList($id: String!) {
    getTrakingList(id: $id) {
      count
      views {
        viewedAt
      }
    }
  }
`;
