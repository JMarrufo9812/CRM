import gql from 'graphql-tag';

export const GET_NOTES = gql`
  query getNotes($filters: FilterNotes) {
    notes(filters: $filters) {
      id
      content
      type
      comments {
        id
        comment
      }
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
`;

export const GET_COMMENTS_NOTE = gql`
  query noteComments($filters: noteId!) {
    noteComments(filters: $filters) {
      id
      comment
      userTags {
        id
      }
      note {
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
`;
