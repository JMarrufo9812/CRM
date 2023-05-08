import gql from 'graphql-tag';

export const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription notification {
    notification {
      newNotification
    }
  }
`;
