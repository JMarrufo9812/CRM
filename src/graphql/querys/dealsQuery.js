import gql from 'graphql-tag';

export const GET_DEALS = gql`
  query GetDeals($filters: FilterDeals, $importId: ID) {
    deals(filters: $filters, importId: $importId) {
      count
      informationBar {
        openDeals
        wonDealsSum
        predictionSales
        predictionIncome
      }
      list {
        id
        title
        value
        status
        expectedCloseDate
        dateStatus
        activity
        files
        customForms
        rottenTime
        changeTime
        createdAt
        updatedAt
        wonTime
        lostTime
        customForms
        createdBy {
          id
          user {
            id
            name
            lastName
          }
        }
        dealCounts {
          files
          notes
          emailMessages
          activities {
            total
            done
            undone
          }
        }
        lostDeal {
          id
          lostReason {
            id
            reason
          }
        }
        exchangeCurrency {
          id
          name
          code
          icon
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        owner {
          id
          user {
            name
            lastName
          }
        }
        stage {
          id
          name
          order
        }
        pipeline {
          id
          name
          stages {
            id
            name
            order
          }
        }
        tags {
          id
          name
          color
          order
        }
      }
    }
  }
`;

export const GET_SEARCH_DEALS = gql`
  query GetDeals($filters: FilterDeals) {
    deals(filters: $filters) {
      count
      list {
        id
        title
        stage {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        pipeline {
          id
          name
        }
        owner {
          id
        }
      }
    }
  }
`;

export const GET_DEAL = gql`
  query getDeal($dealId: ID!) {
    deal(dealId: $dealId) {
      id
      title
      value
      status
      expectedCloseDate
      dateStatus
      activity
      files
      customForms
      rottenTime
      lostDeal {
        id
        lostReason {
          id
          reason
        }
      }
      exchangeCurrency {
        id
        name
        code
        icon
      }
      company {
        id
        name
        isDelete
        owner {
          id
        }
      }
      contact {
        id
        name
        email
        isDelete
        owner {
          id
        }
      }
      owner {
        id
        user {
          id
          name
          lastName
          config {
            profileUrl
          }
        }
      }
      stage {
        id
        name
        order
      }
      pipeline {
        id
        name
        stages {
          id
          name
          order
          daysInStage
        }
      }
      tags {
        id
        name
        color
        order
      }
      isDelete
    }
  }
`;

export const GET_DEAL_HISTORY = gql`
  query getDealHistory($dealId: ID!) {
    dealHistory: deal(dealId: $dealId) {
      id
      title
      files
      import {
        id
      }
      activityStream {
        id
        flow
        customs {
          id
          label
        }
        users {
          id
          user {
            id
            name
            lastName
          }
        }
        companies {
          id
          name
        }
        contacts {
          id
          name
        }
        stages {
          id
          name
        }
        pipelines {
          id
          name
        }
      }
      notes {
        id
        content
        type
        userTags {
          id
          user {
            id
            name
            lastName
          }
        }
        createdBy {
          id
          user {
            id
            name
            lastName
          }
        }
        createdAt
        comments {
          id
          comment
          userTags {
            id
          }
          createdBy {
            id
            user {
              id
              name
              lastName
            }
          }
          createdAt
        }
      }
      activities {
        id
        title
        status
        start
        end
        location
        description
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
        notes {
          id
          content
          type
          userTags {
            id
            user {
              id
              name
              lastName
            }
          }
          createdBy {
            id
            user {
              id
              name
              lastName
            }
          }
          createdAt
          comments {
            id
            comment
            userTags {
              id
            }
            createdBy {
              id
              user {
                id
                name
                lastName
              }
            }
            createdAt
          }
        }
        completedDate
        createdAt
        isAllDay
        guests
      }
    }
  }
`;

export const GET_LOST_REASONS = gql`
  query readLostReasons($filters: Filter) {
    lostReasons(filters: $filters) {
      id
      reason
    }
  }
`;

export const GET_DEALS_TO_ACTIVITY = gql`
  query getDealsToActivity($filters: FilterDeals) {
    deals(filters: $filters) {
      count
      list {
        id
        title
        pipeline {
          id
          name
        }
        stage {
          id
          name
        }
      }
    }
  }
`;
