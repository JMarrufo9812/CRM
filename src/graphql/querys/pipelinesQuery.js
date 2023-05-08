import gql from 'graphql-tag';

export const GET_PIPELINES = gql`
  query getPipelines {
    pipelines {
      id
      name
      stages {
        id
        name
        order
        pipeline {
          id
          name
        }
      }
    }
  }
`;

export const GET_FIRST_PIPELINE = gql`
  query getFirstPipeline {
    pipelines {
      id
    }
  }
`;

export const GET_PIPELINE = gql`
  query getPipeline($pipelineId: ID!) {
    pipeline(pipelineId: $pipelineId) {
      id
      name
      informationBar {
        openDeals
        wonDealsSum
        predictionSales
        predictionIncome
      }
      stages {
        id
        name
        probability
        maxDays
        order
        pipeline {
          id
          name
        }
        deals {
          id
          title
          value
          status
          rottenTime
          dateEntryIntoStage
          owner {
            id
            user {
              id
              name
              lastName
              config {
                profileUrl
              }
            }
          }
          stage {
            id
            name
            maxDays
          }
        }
      }
    }
  }
`;

export const GET_PIPELINES_DEFAULT = gql`
  query getDefaultPipelines {
    defaultPipelines {
      id
      name
      stages {
        id
        name
        probability
        maxDays
        order
      }
    }
  }
`;

export const GET_PIPELINE_EDIT = gql`
  query getPipeline($pipelineId: ID!) {
    pipeline(pipelineId: $pipelineId) {
      id
      name
      stages {
        id
        name
        probability
        maxDays
        order
        deals {
          id
          title
        }
      }
    }
  }
`;
