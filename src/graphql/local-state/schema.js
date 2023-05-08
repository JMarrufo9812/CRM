import gql from 'graphql-tag';

export const typeDefs = gql`
  type formContact {
    socialMedias: [JSON]!
    phones: [JSON]!
  }

  type appControl {
    isLogged: Boolean!
    isLoading: Boolean!
  }

  type Integration {
    id: String
    name: String
    keyItem: String
  }

  type userCurrent {
    id: String
    user: [JSON]
    enterprise: [JSON]
    integrations: [Integration]
    emailTemplatesOrder: [JSON]
    defaultEnterprise: String
    profileUrl: String
    typeUser: String
    enterprises: [JSON]
    membersGroup: [JSON]
    permissionsRol: [JSON]
    permissionsGroup: [JSON]
  }

  type modal {
    id: String
    status: Boolean
    isEdit: Boolean
    item: [JSON]!
  }

  type error {
    id: String
    code: Int
    message: String
    isOpen: Boolean
  }

  type success {
    id: String
    message: String
    isOpen: Boolean
  }

  type User {
    id: String
    name: String
    lastName: String
  }

  type filtersChartsGlobal {
    users: [User]
    periodPredefined: [JSON]!
  }

  type Filters {
    activityTypes: [JSON]!
    statusActivity: Sring
    statusDeal: String
    filterBy: String
    filterTime: String
    users: [JSON]!
    pipelines: [JSON]!
    stages: [JSON]!
    periodRange: PeriodRange
    periodPredefined: [JSON]!
    periodRangeToCompare: PeriodRangeToCompare
  }

  type chart {
    id: String
    filtersFull: String
  }

  type PeriodRange {
    start: String
    end: String
  }

  type PeriodRangeToCompare {
    period: String
    start: String
    end: String
  }

  type filtersChartsDefault {
    activityTypes: [JSON]!
    users: [JSON]!
    pipelines: [JSON]!
    stages: [JSON]!
  }

  extend type Query {
    formContact: [JSON!]
    modal(id: ID!): modal
    filtersChartsGlobal: [JSON!]
    chart(id: ID!): chart
  }

  extend type Mutation {
    updateFormContact(socialMedias: [JSON]!): formContact
    updateFormPhones(phones: [JSON]!): formContact
    updateLoginControl(isLogged: Boolean!): appControl
    updateUserCurrent(userCurrent: [JSON]!): userCurrent
    changeModal(modal: [JSON]!): modal
    updateFiltersChartsGlobal(updateFilters: [JSON]!): filtersChartsGlobal
    changeError(error: [JSON]!): error
    addError(error: [JSON]!): error
    changeSuccess(success: [JSON]!): success
    addSuccess(success: [JSON]!): success
  }
`;
