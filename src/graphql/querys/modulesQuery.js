import gql from 'graphql-tag';

export const GET_MODULES = gql`
  query getModules {
    modules {
      id
      name
      price
      groupModule {
        id
        name
      }
    }
  }
`;

export const GET_GROUP_MODULES = gql`
  query getGroups {
    groupModules {
      id
      name
      modules {
        id
        name
      }
    }
  }
`;
