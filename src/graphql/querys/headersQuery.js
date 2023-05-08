import gql from 'graphql-tag';

export const GET_HEADERS = gql`
  query OrderHeaders($type: TypeOrder!) {
    headers: orderHeaders(typeOrder: $type)
  }
`;
