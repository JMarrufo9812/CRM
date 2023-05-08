import gql from 'graphql-tag';

export const GET_NOTIFICATIONS = gql`
  query notifications($filters: FilterNotification!) {
    notifications(filters: $filters) {
      id
      flow
      totalFlow
      totalUnread
      activities {
        id
        title
      }
      users {
        id
        user {
          id
          name
          lastName
        }
      }
      imports {
        id
        table
        filterId
      }
      contacts {
        id
        name
      }
      companies {
        id
        name
      }
      deals {
        id
        title
      }
    }
  }
`;
