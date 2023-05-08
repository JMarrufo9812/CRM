import gql from 'graphql-tag';

export const PIPELINE_SUBSCRIPTION = gql`
  subscription refreshPipeline($input: ID!) {
    refreshPipeline(pipelineId: $input) {
      action
    }
  }
`;
