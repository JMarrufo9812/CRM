import gql from 'graphql-tag';

export const UPLOAD_FILE = gql`
  mutation UploadFile($input: TypeFileInput!) {
    uploadFile(upFile: $input) {
      id
      name
      fileExtension
      url {
        link
        key
      }
      description
      createdBy {
        id
        user {
          id
          name
          lastName
        }
      }
      createdAt
      size
    }
  }
`;

export const UPLOAD_PROFILE_PHOTO = gql`
  mutation uploadProfilePhoto($input: FileInput!) {
    uploadProfilePhoto(upFile: $input) {
      link
    }
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($input: DeleteFile!) {
    deleteFile(deleteFile: $input)
  }
`;

export const UPDATE_DESCRIPTION_FILE = gql`
  mutation UpdateDescriptionFile($input: descriptionInput!) {
    updateDescriptionFile(descriptionInput: $input) {
      id
      name
      url {
        key
        link
      }
      description
      size
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
