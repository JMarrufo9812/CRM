import gql from 'graphql-tag';

export const CREATE_TAG = gql`
  mutation createTag($customTagInput: customTagCreateInput!) {
    createCustomTag(customTagInput: $customTagInput) {
      id
      name
      color
      order
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation updateTag($customTagInput: customTagUpdateInput!) {
    updateCustomTag(customTagInput: $customTagInput) {
      id
      name
      color
      order
    }
  }
`;

export const DELETE_TAG = gql`
  mutation deleteTag($customTagId: ID!) {
    deleteCustomTag(customTagId: $customTagId) {
      id
    }
  }
`;
