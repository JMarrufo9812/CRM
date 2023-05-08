import gql from 'graphql-tag';

export const CREATE_COMPANY = gql`
  mutation createCompany($input: companyCreateInput!) {
    createCompany(companyInput: $input) {
      id
      name
      address
      website
      phones
      socialMedias
      owner {
        id
        user {
          id
          name
        }
      }
      tags {
        id
        name
        color
        order
      }
      contacts {
        id
        name
      }
    }
  }
`;

export const DELETE_COMPANIES = gql`
  mutation deletedCompanies($input: [DeleteCompanyInput!]!) {
    deletedCompanies(companies: $input) {
      id
      name
    }
  }
`;

export const TRASH_COMPANIES = gql`
  mutation trashCompanies($input: [DeleteCompanyInput!]!) {
    trashCompanies(companies: $input) {
      id
    }
  }
`;

export const RESTORE_COMPANIES = gql`
  mutation restoreCompanies($input: [DeleteCompanyInput!]!) {
    restoreCompanies(companies: $input) {
      id
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation updateCompany($companyInput: companyUpdateInput!) {
    updateCompany(companyInput: $companyInput) {
      id
      name
      address
      website
      phones
      customForms
      socialMedias
      tags {
        id
        name
        color
        order
      }
      owner {
        id
        user {
          id
          name
        }
      }
      contacts {
        id
        name
        owner {
          id
        }
      }
      deals {
        id
        title
        value
        status
        contact {
          id
          name
        }
        company {
          id
          name
        }
        stage {
          id
        }
        pipeline {
          id
          stages {
            id
          }
        }
        owner {
          id
        }
      }
    }
  }
`;

export const FUSE_COMPANIES = gql`
  mutation FuseCompanies($input: CompaniesToFuse!) {
    fuseCompanies(fuse: $input) {
      id
      name
    }
  }
`;

export const UPDATE_OWNER_COMPANIES = gql`
  mutation assignCompanies($companyListAssign: CompanyListAssign!) {
    assignCompanies(companyListAssign: $companyListAssign)
  }
`;
