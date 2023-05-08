import gql from 'graphql-tag';

export const UPDATE_HEADERS = gql`
  mutation updateOrderHeaders($input: orderHeaderInput!) {
    updateOrderHeaders(input: $input)
  }
`;
