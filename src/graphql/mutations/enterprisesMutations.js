import gql from 'graphql-tag';

export const CREATE_ENTERPRISE = gql`
  mutation createEnterprise($enterpriseInput: enterpriseOtherCreateInput!) {
    createEnterprise(enterpriseInput: $enterpriseInput) {
      id
      enterprise {
        id
        name
      }
    }
  }
`;

export const UPDATE_ENTERPRISE = gql`
  mutation UpdateEnterprise($input: enterpriseUpdateInput!) {
    updateEnterprise(enterpriseInput: $input) {
      id
      name
    }
  }
`;

export const UPDATE_ENTERPRISE_DEFAULT = gql`
  mutation updateEnterpriseDefault($enterpriseId: ID!) {
    updateEnterpriseDefault(enterpriseId: $enterpriseId)
  }
`;
