import gql from 'graphql-tag';

export const GET_TAGS = gql`
  query getTags($filters: FilterCustomTags) {
    customTags(filters: $filters) {
      id
      name
      color
      order
    }
  }
`;
