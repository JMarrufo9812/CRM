import gql from 'graphql-tag';

export const GET_PLANS_TO_CHOSE = gql`
  query getPlansToChose {
    plansToChoose {
      id
      name
      description
      priceYear
      priceMonth
      order
      isRecommended
      modulesGroup {
        id
        name
        modules {
          id
          name
        }
      }
    }
  }
`;

export const GET_PLANS_TO_CHOOSE = gql`
  query getPlans {
    plansToChoose {
      id
      name
      description
      priceYear
      priceMonth
      order
      isRecommended
    }
  }
`;
