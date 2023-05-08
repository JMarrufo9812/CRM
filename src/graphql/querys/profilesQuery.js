import gql from 'graphql-tag';

export const GET_PROFILE_PHOTO = gql`
  query getProfilePhoto {
    getProfilePhoto: profile {
      link
    }
  }
`;
