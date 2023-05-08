import gql from 'graphql-tag';

export const GET_CALENDAR_URI = gql`
  query getCalendarUri {
    getCalendarUri
  }
`;

export const GET_LIST_CALENDAR = gql`
  query listCalendar {
    listCalendar {
      id
      kind
      etag
      summary
      description
      timeZone
      colorId
      backgroundColor
      foregroundColor
      accessRole
      selected
      primary
    }
  }
`;

export const GET_ACTIVITIES_TYPES = gql`
  query readActivityTypes {
    activityTypes {
      id
      name
      color
      order
      activitiesCount
    }
  }
`;

export const GET_ACTIVITY = gql`
  query GetActivity($activityId: ID!) {
    activity(activityId: $activityId) {
      id
      title
      start
      end
      status
      location
      description
      guests
      createdAt
      isAllDay
      companies {
        id
        name
      }
      contacts {
        id
        name
      }
      deal {
        id
        title
      }
      owner {
        id
        user {
          id
          name
          lastName
        }
      }
      type {
        id
        color
        name
        order
      }
    }
  }
`;

export const GET_ACTIVITY_TYPE = gql`
  query readActivityType($activityTypeId: ID!) {
    activityType(activityTypeId: activityTypeId) {
      id
      name
      color
      order
    }
  }
`;

export const GET_ACTIVITIES = gql`
  query readActivities($filters: FilterActivities) {
    activities(filters: $filters) {
      count
      list {
        id
        title
        status
        start
        end
        location
        description
        createdAt
        isAllDay
        deal {
          id
          title
        }
        contacts {
          id
          name
        }
        companies {
          id
          name
        }
        type {
          id
          name
          color
        }
        owner {
          id
          user {
            id
            name
            lastName
          }
        }
        guests
      }
    }
  }
`;

export const FREE_BUSY = gql`
  query readFreeBusy($activityInput: activityFreeBusyInput!) {
    activitiesFreeBusy(activityInput: $activityInput)
  }
`;
