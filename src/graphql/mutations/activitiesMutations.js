import gql from 'graphql-tag';

export const SET_TOKEN_CALENDAR = gql`
  mutation syncronizeGoogleCalendar($codeToken: String!) {
    syncronizeGoogleCalendar(codeToken: $codeToken) {
      success
      email
    }
  }
`;

export const SET_CALENDAR = gql`
  mutation setCalendar($calendarId: String!) {
    setPrimaryCalendar(calendarId: $calendarId) {
      success
      calendarSummary
    }
  }
`;

export const REMOVE_TOKEN_CALENDAR = gql`
  mutation desynchronizeGoogleCalendar {
    desynchronizeGoogleCalendar
  }
`;

export const CREATE_ACTIVITY_TYPE = gql`
  mutation createActivityType($activityTypeInput: activityTypeCreateInput!) {
    createActivityType(activityTypeInput: $activityTypeInput) {
      id
      name
      color
      order
    }
  }
`;

export const UPDATE_ACTIVITY_TYPE = gql`
  mutation updateActivityType($activityTypeInput: activityTypeUpdateInput!) {
    updateActivityType(activityTypeInput: $activityTypeInput) {
      id
      name
      color
      order
    }
  }
`;

export const DELETE_ACTIVITY_TYPE = gql`
  mutation deleteActivityType($activityTypeId: ID!) {
    deleteActivityType(activityTypeId: $activityTypeId) {
      id
      name
      color
      order
    }
  }
`;

export const CREATE_ACTIVITY = gql`
  mutation createActivity($activityInput: activityCreateInput!) {
    createActivity(activityInput: $activityInput) {
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
`;

export const UPDATE_ACTIVITY = gql`
  mutation updateActivity($activityInput: activityUpdateInput!) {
    updateActivity(activityInput: $activityInput) {
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
`;

export const DELETE_ACTIVITIES = gql`
  mutation deleteActivities($activities: [deleteActivityInput!]!) {
    deleteActivities(activities: $activities) {
      id
    }
  }
`;
