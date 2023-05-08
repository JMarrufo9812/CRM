import gql from 'graphql-tag';

export const GET_IMPORTS = gql`
  query GetListImports($type: TypeImport!) {
    getListImports(type: $type) {
      id
      name
      status
      total
      created
      createdAt
      filterId
      createdBy {
        id
        user {
          id
          name
          lastName
        }
      }
    }
  }
`;
