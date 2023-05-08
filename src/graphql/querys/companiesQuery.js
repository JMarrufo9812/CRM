import gql from 'graphql-tag';

export const GET_COMPANIES = gql`
  query getCompanies($filters: FilterCompanies, $importId: ID) {
    companies(filters: $filters, importId: $importId) {
      count
      informationBar {
        totalCount
        companiesWithOpenDeals
        companiesWithWonDeals
      }
      list {
        id
        name
        address
        website
        phones
        socialMedias
        createdAt
        updatedAt
        customForms
        createdBy {
          id
          user {
            id
            name
            lastName
          }
        }
        companyCounts {
          openDeals
          closedDeals
          lostDeals
          wonDeals
          emailMessages
          totalActivities
          doneActivities
          undoneActivities
          files
          notes
        }
        owner {
          id
          user {
            id
            name
            lastName
          }
        }
        tags {
          id
          name
          color
          order
        }
        contacts {
          id
          name
        }
      }
    }
  }
`;

export const GET_SEARCH_COMPANIES = gql`
  query getCompanies($filters: FilterCompanies) {
    searchCompanies: companies(filters: $filters) {
      count
      list {
        id
        name
        owner {
          id
        }
      }
    }
  }
`;

export const GET_COMPANY = gql`
  query getCompany($companyId: ID!) {
    company(companyId: $companyId) {
      id
      name
      address
      website
      phones
      customForms
      socialMedias
      files
      isDelete
      tags {
        id
        name
        color
        order
      }
      owner {
        id
        user {
          id
          name
          lastName
        }
      }
      contacts {
        id
        name
        owner {
          id
        }
      }
      deals {
        id
        title
        value
        status
        contact {
          id
          name
        }
        company {
          id
          name
        }
        stage {
          id
        }
        pipeline {
          id
          stages {
            id
          }
        }
        owner {
          id
        }
      }
    }
  }
`;

export const GET_COMPANY_HISTORY = gql`
  query getCompanyHistory($companyId: ID!) {
    companyHistory: company(companyId: $companyId) {
      id
      name
      files
      import {
        id
      }
      activityStream {
        id
        flow
        users {
          id
          user {
            id
            name
            lastName
          }
        }
        contacts {
          id
          name
        }
        deals {
          id
          title
        }
        customs {
          id
          label
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
        comments {
          id
          comment
          createdBy {
            id
            user {
              id
              name
              lastName
            }
          }
          createdAt
          userTags {
            id
            user {
              id
              name
              lastName
            }
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

export const GET_COMPANIES_TO_ACTIVITY = gql`
  query getCompaniesToActivity($filters: FilterCompanies) {
    companies(filters: $filters) {
      count
      list {
        id
        name
      }
    }
  }
`;

export const GET_DUPLICATE_COMPANIES = gql`
  query DuplicateCompanies {
    duplicateCompanies {
      list {
        id
        name
        address
        contacts {
          id
          name
        }
        companyCounts {
          openDeals
          totalActivities
        }
        owner {
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
      }
    }
  }
`;
