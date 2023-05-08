import gql from 'graphql-tag';

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotifications($notificationId: String!) {
    deleteNotifications(notificationId: $notificationId)
  }
`;

export const UPDATE_NOTIFICATIONS = gql`
  mutation updateNotifications($input: [JSON!]!) {
    updateNotifications(notifications: $input)
  }
`;
