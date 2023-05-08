import gql from 'graphql-tag';

export const GET_INDUSTRIES = gql`
  query GetIndustry {
    industries {
      id
      name
    }
  }
`;
