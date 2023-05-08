import gql from 'graphql-tag';

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotifications($notificationId: String!) {
    deleteNotifications(notificationId: $notificationId)
  }
`;
