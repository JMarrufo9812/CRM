import gql from 'graphql-tag';

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: contactCreateInput!) {
    createContact(contactInput: $input) {
      id
      name
      email
      phones
      isClient
      socialMedias
      birthday
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
      isClient
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation updateContact($contactInput: contactUpdateInput) {
    updateContact(contactInput: $contactInput) {
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
    }
  }
`;

export const DELETE_CONTACTS = gql`
  mutation deletedContacts($input: [DeleteContactInput!]!) {
    deletedContacts(contacts: $input) {
      id
      name
    }
  }
`;

export const TRASH_CONTACTS = gql`
  mutation trashContacts($input: [DeleteContactInput!]!) {
    trashContacts(contacts: $input) {
      id
      name
    }
  }
`;

export const RESTORE_CONTACTS = gql`
  mutation restoreContacts($input: [DeleteContactInput!]!) {
    restoreContacts(contacts: $input) {
      id
      name
    }
  }
`;

export const FUSE_CONTACTS = gql`
  mutation FuseContacts($input: ContactsToFuse!) {
    fuseContacts(fuse: $input) {
      id
      name
    }
  }
`;

export const UPDATE_OWNER_CONTACTS = gql`
  mutation assignContacts($contactListAssign: ContactListAssign!) {
    assignContacts(contactListAssign: $contactListAssign)
  }
`;
