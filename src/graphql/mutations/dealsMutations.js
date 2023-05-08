import gql from 'graphql-tag';

export const CREATE_DEAL = gql`
  mutation CreateDeal($input: CreateDeal!) {
    createDeal(dealInput: $input) {
      id
      title
      value
      status
      expectedCloseDate
      dateStatus
      activity
      rottenTime
      owner {
        user {
          id
          name
          lastName
          config {
            profileUrl
          }
        }
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      stage {
        id
        name
      }
      pipeline {
        id
        name
        stages {
          id
          name
          order
        }
      }
      tags {
        id
        name
        color
        order
      }
    }
  }
`;

export const UPDATE_DEAL = gql`
  mutation UpdateDeal($input: UpdateDeal!) {
    updateDeal(dealInput: $input) {
      id
      title
      value
      status
      expectedCloseDate
      dateStatus
      activity
      files
      customForms
      rottenTime
      lostDeal {
        id
        lostReason {
          id
          reason
        }
      }
      exchangeCurrency {
        id
        name
        code
        icon
      }
      company {
        id
        name
        owner {
          id
        }
      }
      contact {
        id
        name
        owner {
          id
        }
      }
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
        order
      }
      pipeline {
        id
        name
        stages {
          id
          name
          order
          daysInStage
        }
      }
      tags {
        id
        name
        color
        order
      }
    }
  }
`;

export const DELETE_DEAL = gql`
  mutation deletedDeals($input: [DeleteDealInput!]!) {
    deletedDeals(deals: $input) {
      id
    }
  }
`;

export const TRASH_DEALS = gql`
  mutation trashDeals($input: [DeleteDealInput!]!) {
    trashDeals(deals: $input) {
      id
    }
  }
`;

export const RESTORE_DEALS = gql`
  mutation restoreDeals($input: [DeleteDealInput!]!) {
    restoreDeals(deals: $input) {
      id
    }
  }
`;

// se pide todo lo necesario para poder actualizar el deal entero y no se pierda ningun dato
export const CHANGE_DEAL_STAGE = gql`
  mutation ChangeDealStage($input: ChangeStage!) {
    changeDealStage(input: $input) {
      id
      title
      value
      status
      expectedCloseDate
      dateStatus
      activity
      files
      customForms
      rottenTime
      dateEntryIntoStage
      lostDeal {
        id
        lostReason {
          id
          reason
        }
      }
      exchangeCurrency {
        id
        name
        code
        icon
      }
      company {
        id
        name
        isDelete
      }
      contact {
        id
        name
        isDelete
      }
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
        order
        maxDays
      }
      pipeline {
        id
        name
        stages {
          id
          name
          order
          daysInStage
        }
      }
      tags {
        id
        name
        color
        order
      }
      isDelete
    }
  }
`;

export const CHANGE_DEAL_PIPELINE = gql`
  mutation changeDealPipeline($input: changePipelineInput!) {
    changeDealPipeline(input: $input) {
      id
      title
      value
      status
      expectedCloseDate
      dateStatus
      activity
      files
      customForms
      rottenTime
      lostDeal {
        id
        lostReason {
          id
          reason
        }
      }
      exchangeCurrency {
        id
        name
        code
        icon
      }
      company {
        id
        name
        isDelete
      }
      contact {
        id
        name
        isDelete
      }
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
        order
      }
      pipeline {
        id
        name
        stages {
          id
          name
          order
        }
      }
      tags {
        id
        name
        color
        order
      }
      isDelete
    }
  }
`;

export const CREATE_LOST_REASON = gql`
  mutation CreateLostReason($input: lostReasonCreateInput!) {
    createLostReason(lostReasonInput: $input) {
      id
      reason
    }
  }
`;

export const DELETE_LOST_REASON = gql`
  mutation DeleteLostReason($lostReasonId: ID!) {
    deleteLostReason(lostReasonId: $lostReasonId) {
      id
      reason
    }
  }
`;

export const UPDATE_LOST_REASON = gql`
  mutation UpdateLostReason($input: lostReasonUpdateInput!) {
    updateLostReason(lostReasonInput: $input) {
      id
      reason
    }
  }
`;

export const UPDATE_OWNER_DEALS = gql`
  mutation assignDeals($dealListAssign: DealListAssign!) {
    assignDeals(dealListAssign: $dealListAssign)
  }
`;
