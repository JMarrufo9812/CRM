import gql from 'graphql-tag';

export const CREATE_NOTE = gql`
  mutation createNote($noteInput: noteCreateInput!) {
    createNote(noteInput: $noteInput) {
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

export const UPDATE_NOTE = gql`
  mutation updateNote($noteInput: noteUpdateInput!) {
    updateNote(noteInput: $noteInput) {
      id
      content
      type
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

export const DELETE_NOTE = gql`
  mutation deleteNote($noteInput: noteId!) {
    deleteNote(noteInput: $noteInput) {
      id
    }
  }
`;

export const CREATE_COMMENT_NOTE = gql`
  mutation createNoteComment($noteCommentInput: noteCommentCreateInput) {
    createNoteComment(noteCommentInput: $noteCommentInput) {
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

export const UPDATE_COMMENT_NOTE = gql`
  mutation updateNoteComment($noteCommentInput: noteCommentUpdateInput) {
    updateNoteComment(noteCommentInput: $noteCommentInput) {
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

export const DELETE_COMMENT_NOTE = gql`
  mutation deleteNoteComment($noteCommentId: ID!) {
    deleteNoteComment(noteCommentId: $noteCommentId) {
      id
    }
  }
`;

export const UPLOAD_IMAGE_NOTE = gql`
  mutation UploadNoteFile($input: TypeFileNoteInput!) {
    uploadNoteFile(upFile: $input) {
      link
      key
    }
  }
`;
