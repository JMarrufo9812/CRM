import gql from 'graphql-tag';

export const IMPORT_CONTACTS = gql`
  mutation importContacts($input: [ContactImport!]!) {
    importContacts(contacts: $input)
  }
`;

export const IMPORT_COMPANIES = gql`
  mutation importCompanies($input: [CompanyImport!]!) {
    importCompanies(companies: $input)
  }
`;

export const IMPORT_DEALS = gql`
  mutation importDeals($input: DealListImport!) {
    importDeals(dealListImport: $input)
  }
`;
