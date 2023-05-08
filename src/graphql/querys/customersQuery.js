import gql from 'graphql-tag';

export const GET_CUSTOMER = gql`
  query customerStripe {
    customerStripe {
      id
      name
      email
      phone
      address {
        line1
        line2
        city
        country
        postal_code
      }
      sources {
        id
        type
        addZip
        brand
        country
        expMonth
        expYear
        funding
        last4
      }
    }
  }
`;
