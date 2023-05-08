import gql from 'graphql-tag';

export const GET_FORM_CONTACT = gql`
  query getFormContact {
    formContact @client {
      socialMedias
      phones
    }
  }
`;

export const GET_APP_CONTROL = gql`
  query getAppControl {
    appControl @client {
      isLogged
      isLoading
    }
  }
`;

export const GET_USER_LOGGED = gql`
  query getUserLogged {
    userCurrent @client {
      id
      user {
        id
        email
        name
        lastName
      }
      enterprise {
        id
        name
      }
      integrations {
        id
        name
        email
        keyItem
      }
      emailTemplatesOrder
      defaultEnterprise
      profileUrl
      typeUser
      enterprises
      membersGroup
      permissionsRol
      permissionsGroup
    }
  }
`;

export const GET_MODALS = gql`
  query getModals {
    modals @client {
      id
      status
      isEdit
      item
    }
  }
`;

export const GET_MODAL = gql`
  query getModal($id: ID!) {
    modal(id: $id) @client {
      id
      status
      isEdit
      item
    }
  }
`;

export const GET_FILTERS_CHARTS_GLOBAL = gql`
  query getFiltersChartsGlobal {
    filtersChartsGlobal @client {
      users {
        id
        name
        lastName
      }
      periodPredefined
    }
  }
`;

export const GET_ERRORS = gql`
  query getErrors {
    errors @client {
      id
      code
      message
      isOpen
    }
  }
`;

export const GET_SUCCESSES = gql`
  query getSuccesses {
    successes @client {
      id
      message
      isOpen
    }
  }
`;

export const GET_CHARTS = gql`
  query getCharts {
    charts @client {
      id
      filtersFull
    }
  }
`;

export const GET_CHART = gql`
  query getChart($id: ID!) {
    chart(id: $id) @client {
      id
      filtersFull
    }
  }
`;

export const GET_FILTERS_CHARTS_DEFAULT = gql`
  query getFiltersChartsDefault {
    filtersChartsDefault @client {
      activityTypes {
        id
        name
      }
      users {
        id
        name
      }
      pipelines {
        id
        name
      }
      stages {
        id
        name
      }
    }
  }
`;
