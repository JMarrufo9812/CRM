import { v4 as uuidv4 } from 'uuid';

import {
  GET_FORM_CONTACT,
  GET_APP_CONTROL,
  GET_USER_LOGGED,
  GET_MODALS,
  GET_FILTERS_CHARTS_GLOBAL,
  GET_FILTERS_CHARTS_DEFAULT,
  GET_ERRORS,
  GET_SUCCESSES,
  GET_CHARTS,
} from './queries';

export const resolvers = {
  Query: {
    modal(parent, { id }, { cache }) {
      const data = cache.readQuery({ query: GET_MODALS });
      const currentItem = data.modals.find((item) => item.id === id);
      return currentItem;
    },
    chart(parent, { id }, { cache }) {
      const data = cache.readQuery({ query: GET_CHARTS });
      const currentItem = data.charts.find((item) => item.id === id);
      return currentItem;
    },
  },
  Mutation: {
    updateFormContact: (_, { socialMedias }, { cache }) => {
      const data = cache.readQuery({ query: GET_FORM_CONTACT });
      data.formContact.socialMedias = socialMedias;
      cache.writeQuery({ query: GET_FORM_CONTACT, data });
      return data;
    },
    updateFormPhones: (_, { phones }, { cache }) => {
      const data = cache.readQuery({ query: GET_FORM_CONTACT });
      data.formContact.phones = phones;
      cache.writeQuery({ query: GET_FORM_CONTACT, data });
      return data;
    },
    updateLoginControl: (_, { isLogged }, { cache }) => {
      const data = cache.readQuery({ query: GET_APP_CONTROL });
      data.appControl.isLogged = isLogged;
      cache.writeQuery({ query: GET_APP_CONTROL, data });
      return data;
    },
    updateLoadingControl: (_, { isLoading }, { cache }) => {
      const data = cache.readQuery({ query: GET_APP_CONTROL });
      data.appControl.isLoading = isLoading;
      cache.writeQuery({ query: GET_APP_CONTROL, data });
      return data;
    },
    updateUserCurrent: (_, { userCurrent }, { cache }) => {
      const data = cache.readQuery({ query: GET_USER_LOGGED });
      const {
        id,
        user,
        enterprise,
        integrations,
        emailTemplatesOrder,
        defaultEnterprise,
        profileUrl,
        typeUser,
        enterprises,
        membersGroup,
        permissionsRol,
        permissionsGroup,
      } = userCurrent;
      data.userCurrent.id = id || data.userCurrent.id;
      data.userCurrent.user = user || data.userCurrent.user;
      data.userCurrent.enterprise = enterprise || data.userCurrent.enterprise;
      data.userCurrent.integrations =
        integrations || data.userCurrent.integrations;
      data.userCurrent.emailTemplatesOrder =
        emailTemplatesOrder || data.userCurrent.emailTemplatesOrder;
      data.userCurrent.defaultEnterprise =
        defaultEnterprise || data.userCurrent.defaultEnterprise;
      data.userCurrent.profileUrl = profileUrl || data.userCurrent.profileUrl;
      data.userCurrent.typeUser = typeUser || data.userCurrent.typeUser;
      data.userCurrent.enterprises =
        enterprises || data.userCurrent.enterprises;
      data.userCurrent.membersGroup =
        membersGroup || data.userCurrent.membersGroup;
      data.userCurrent.permissionsRol =
        permissionsRol || data.userCurrent.permissionsRol;
      data.userCurrent.permissionsGroup =
        permissionsGroup || data.userCurrent.permissionsGroup;
      // eslint-disable-next-line
      data.userCurrent['__typename'] = 'userCurrent';

      cache.writeQuery({ query: GET_USER_LOGGED, data });
      return data;
    },
    changeModal: (_, { modal: { id, status, isEdit, item } }, { cache }) => {
      const data = cache.readQuery({ query: GET_MODALS });
      const currentItem = data.modals.find((modal) => modal.id === id);
      currentItem.status = status;
      currentItem.isEdit = isEdit || false;
      currentItem.item = item || null;
      cache.writeQuery({ query: GET_MODALS, data });
      return currentItem;
    },

    updateFiltersChartsGlobal: (_, { updateFilters }, { cache }) => {
      const data = cache.readQuery({ query: GET_FILTERS_CHARTS_GLOBAL });
      data.filtersChartsGlobal = updateFilters;
      cache.writeQuery({ query: GET_FILTERS_CHARTS_GLOBAL, data });
      return data;
    },

    addError: (_, { error: { code, message } }, { cache }) => {
      const data = cache.readQuery({ query: GET_ERRORS });
      const id = uuidv4();
      const isOpen = true;
      data.errors.push({
        __typename: 'error',
        id,
        code,
        message,
        isOpen,
      });
      cache.writeQuery({ query: GET_ERRORS, data });
      return { id, code, message, isOpen };
    },

    changeError: (_, { error: { id } }, { cache }) => {
      const data = cache.readQuery({ query: GET_ERRORS });
      const index = data.errors.findIndex((error) => error.id === id);
      data.errors.splice(index, 1);
      cache.writeQuery({ query: GET_ERRORS, data });
      return id;
    },

    addSuccess: (_, { success: { message } }, { cache }) => {
      const data = cache.readQuery({ query: GET_SUCCESSES });
      const id = uuidv4();
      const isOpen = true;
      data.successes.push({
        __typename: 'success',
        id,
        message,
        isOpen,
      });
      cache.writeQuery({ query: GET_SUCCESSES, data });
      return { id, message, isOpen };
    },

    changeSuccess: (_, { success: { id } }, { cache }) => {
      const data = cache.readQuery({ query: GET_SUCCESSES });
      const index = data.successes.find((success) => success.id === id);
      data.successes.splice(index, 1);
      cache.writeQuery({ query: GET_SUCCESSES, data });
      return id;
    },

    changeChart: (_, { chart: { id, filtersFull = null } }, { cache }) => {
      const data = cache.readQuery({ query: GET_CHARTS });
      const currentItem = data.charts.find((chart) => chart.id === id);
      if (filtersFull)
        currentItem.filtersFull = { __typename: 'filtersFull', ...filtersFull };
      cache.writeQuery({ query: GET_CHARTS, data });
      return currentItem;
    },

    updateFiltersChartsDefault: (_, { updateFilters }, { cache }) => {
      const data = cache.readQuery({ query: GET_FILTERS_CHARTS_DEFAULT });
      data.filtersChartsDefault = {
        __typename: 'filtersChartsGlobal',
        ...data.filtersChartsDefault,
        ...updateFilters,
      };
      cache.writeQuery({ query: GET_FILTERS_CHARTS_DEFAULT, data });
      return data;
    },
  },
};
