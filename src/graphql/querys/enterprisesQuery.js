import gql from 'graphql-tag';

export const CHECK_ENTERPRISE_EXIST = gql`
  query checkEnterpriseName($userInput: enterpriseNameInput) {
    checkEnterpriseName(userInput: $userInput)
  }
`;
