import gql from 'graphql-tag';

export const UPDATE_FORM_CONTACT = gql`
  mutation updateFormContact($socialMedias: JSON!) {
    updateFormContact(socialMedias: $socialMedias) @client
  }
`;

export const UPDATE_FORM_PHONES = gql`
  mutation updateFormPhones($phones: JSON!) {
    updateFormPhones(phones: $phones) @client
  }
`;

export const UPDATE_LOGIN_CONTROL = gql`
  mutation updateLoginControl($isLogged: Boolean!) {
    updateLoginControl(isLogged: $isLogged) @client
  }
`;

export const UPDATE_LOADING_CONTROL = gql`
  mutation updateLoadingControl($isLoading: Boolean!) {
    updateLoadingControl(isLoading: $isLoading) @client
  }
`;

export const UPDATE_USER_CURRENT = gql`
  mutation updateUserCurrent($userCurrent: JSON!) {
    updateUserCurrent(userCurrent: $userCurrent) @client
  }
`;

export const CHANGE_MODAL = gql`
  mutation($modal: JSON!) {
    changeModal(modal: $modal) @client
  }
`;

export const UPDATE_FILTERS_CHARTS_GLOBAL = gql`
  mutation updateFiltersChartsGlobal($updateFilters: JSON!) {
    updateFiltersChartsGlobal(updateFilters: $updateFilters) @client
  }
`;

export const ADD_ERROR = gql`
  mutation($error: JSON!) {
    addError(error: $error) @client
  }
`;

export const CHANGE_ERROR = gql`
  mutation($error: JSON!) {
    changeError(error: $error) @client
  }
`;

export const ADD_SUCCESS = gql`
  mutation($success: JSON!) {
    addSuccess(success: $success) @client
  }
`;

export const CHANGE_SUCCESS = gql`
  mutation($success: JSON!) {
    changeSuccess(success: $success) @client
  }
`;

export const CHANGE_CHART = gql`
  mutation changeChart($chart: JSON!) {
    changeChart(chart: $chart) @client
  }
`;

export const UPDATE_FILTERS_CHARTS_DEFAULT = gql`
  mutation updateFiltersChartsDefault($updateFilters: JSON!) {
    updateFiltersChartsDefault(updateFilters: $updateFilters) @client
  }
`;
