import gql from 'graphql-tag';

export const GET_FILTER_PARAMS = gql`
  query filters($typeTable: TypeTable!) {
    filters(typeTable: $typeTable) {
      table
      typeTable
      columns {
        label
        typeLabel
        typeField {
          type
          operators {
            name
            symbol
          }
        }
      }
    }
  }
`;

export const GET_CUSTOM_FILTERS = gql`
  query CustomFilters($typeTable: TypeTable!) {
    customFilters(typeTable: $typeTable) {
      id
      name
      type
      isDefault
      isSelected
      isVisible
      conditions
      list {
        id
      }
    }
  }
`;
