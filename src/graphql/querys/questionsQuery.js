import gql from 'graphql-tag';

export const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      question
      options
    }
  }
`;
