import gql from 'graphql-tag';

export const CREATE_PIPELINE = gql`
  mutation CreatePipeline($input: pipelineCreateInput!) {
    createPipeline(pipelineInput: $input) {
      id
    }
  }
`;

export const DELETE_PIPELINE = gql`
  mutation DeletePipeline($input: pipelineDeleteInput!) {
    deletePipeline(pipelineInput: $input) {
      id
      name
    }
  }
`;

export const DELETE_STAGE = gql`
  mutation DeleteStage($input: stageDeleteInput!) {
    deleteStage(stageInput: $input) {
      id
      name
    }
  }
`;

export const UPDATE_PIPELINE = gql`
  mutation UpdatePipeline($input: pipelineUpdateInput!) {
    updatePipeline(pipelineInput: $input) {
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
          value
          status
        }
      }
    }
  }
`;

export const DUPLICATE_PIPELINE = gql`
  mutation DuplicatePipeline($pipelineId: ID!) {
    duplicatePipeline(pipelineId: $pipelineId) {
      id
      name
    }
  }
`;
