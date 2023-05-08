import gql from 'graphql-tag';

export const GET_CONTACTS = gql`
  query getContacts($filters: FilterContacts, $importId: ID) {
    contacts(filters: $filters, importId: $importId) {
      count
      informationBar {
        totalCount
        contactsWithOpenDeals
        contactsWithWonDeals
      }
      list {
        id
        name
        email
        phones
        isClient
        socialMedias
        birthday
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
        contactCounts {
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
        companies {
          id
          name
        }
      }
    }
  }
`;

export const GET_SEARCH_CONTACTS = gql`
  query getContacts($filters: FilterContacts, $importId: ID) {
    searchContacts: contacts(filters: $filters, importId: $importId) {
      list {
        id
        name
        companies {
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

export const GET_CONTACT = gql`
  query GetContact($contactId: ID!) {
    contact(contactId: $contactId) {
      id
      name
      email
      phones
      isClient
      socialMedias
      birthday
      customForms
      owner {
        id
        user {
          id
          name
          lastName
        }
      }
      enterprise {
        id
        name
      }
      tags {
        id
        name
        color
        order
      }
      companies {
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
      createdAt
      isDelete
    }
  }
`;

export const GET_CONTACT_HISTORY = gql`
  query GetContactHistory($contactId: ID!) {
    contactHistory: contact(contactId: $contactId) {
      id
      name
      email
      files
      import {
        id
      }
      activityEmailStream {
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
        companies {
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
        createdAt
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
        comments {
          id
          comment
          createdAt
          createdBy {
            id
            user {
              id
              name
              lastName
            }
          }
          userTags {
            id
            user {
              id
              name
              lastName
            }
          }
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

export const GET_CONTACTS_TO_EMAIL = gql`
  query getContactsToEmail($filters: FilterContacts) {
    contacts(filters: $filters) {
      list {
        id
        name
        email
        birthday
        companies {
          id
          name
        }
      }
    }
  }
`;

export const GET_CONTACTS_TO_INVITES = gql`
  query getContactsToInvites($filters: FilterContacts) {
    contacts(filters: $filters) {
      list {
        id
        name
        email
      }
    }
  }
`;

export const GET_DUPLICATE_CONTACTS = gql`
  query DuplicateContacts {
    duplicateContacts {
      list {
        id
        name
        email
        phones
        companies {
          id
          name
        }
        contactCounts {
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
