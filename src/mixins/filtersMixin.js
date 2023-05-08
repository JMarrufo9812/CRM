import {
  CREATE_FILTER,
  UPDATE_FILTER,
  DELETE_FILTER,
} from '@/graphql/mutations/filtersMutations';
import { GET_CUSTOM_FILTERS } from '@/graphql/querys/filtersQuery';

export const filtersMixin = {
  data() {
    return {
      filterSelected: {
        isFilterSelected: false,
        name: '',
      },
      modalFilter: {
        isOpen: false,
        isLoading: false,
        isEdit: false,
        info: {},
      },
    };
  },
  watch: {
    customFilters(filters) {
      if (filters) {
        const isFilterSelected = filters.some(({ isSelected }) => isSelected);
        this.filterSelected = {
          isFilterSelected,
          name: isFilterSelected
            ? filters.find(({ isSelected }) => isSelected).name
            : '',
        };
      }
    },
  },
  methods: {
    modalHandlerFilter({ isOpen, isLoading, isEdit, info }) {
      this.modalFilter = { isOpen, isLoading, isEdit, info };
    },
    actionsHandler(action, data) {
      if (action === 'SELECT') {
        this.selectFilter(data);
      }
      if (action === 'EDIT') {
        this.modalHandlerFilter({
          isOpen: true,
          isLoading: false,
          isEdit: true,
          info: data,
        });
      }
      if (action === 'CREATE') {
        this.modalHandlerFilter({
          isOpen: true,
          isLoading: false,
          isEdit: false,
          info: {},
        });
      }
    },
    outDataFilterHandler(action, data) {
      if (action === 'CREATE') {
        this.createFilter(data);
      }
      if (action === 'DELETE') {
        this.deleteFilter(data.id);
      }
      if (action === 'UPDATE') {
        const { id, name, isSelected, isVisible, conditions } = data;
        const cleanData = { id, name, isSelected, isVisible, conditions };
        this.updateFilter(cleanData);
      }
    },
    createFilter(filter) {
      this.modalHandlerFilter({
        isOpen: true,
        isLoading: true,
        isEdit: false,
        info: {},
      });
      this.$apollo
        .mutate({
          mutation: CREATE_FILTER,
          variables: {
            input: filter,
          },
        })
        .then(({ data: { createCustomFilter } }) => {
          this.$apollo.queries.customFilters.refetch();
          this.modalHandlerFilter({
            isOpen: false,
            isLoading: false,
            isEdit: false,
            info: {},
          });
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Filtro creado correctamente',
          });
          this.selectFilter({ id: createCustomFilter.id, isSelected: false });
        })
        .catch(() => {
          this.modalHandlerFilter({
            isOpen: true,
            isLoading: false,
            isEdit: false,
            info: {},
          });
          this.modalHandlerError({
            isOpen: true,
            error:
              'Error, no se pudo crear el filtro, verifique que esté completo e intente de nuevo o contacte a soporte',
          });
        });
    },
    selectFilter({ id, isSelected }) {
      const filterSelected = { id, isSelected: !isSelected };
      this.$apollo
        .mutate({
          mutation: UPDATE_FILTER,
          variables: {
            input: filterSelected,
          },
        })
        .then(() => {
          this.$apollo.queries.customFilters.refetch();
          if (this.$route.name === 'pipeline-id') {
            this.getPipeline();
          } else {
            this.updateData = true;
          }
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: `Se ${
              isSelected ? 'quitó' : 'cargó'
            } el filtro correctamente`,
          });
        })
        .catch(() => {
          this.modalHandlerError({
            isOpen: true,
            error:
              'Error, no se pudo cargar el filtro seleccionado, intente de nuevo o contacte a soporte',
          });
        });
    },
    updateFilter(filter) {
      this.$apollo
        .mutate({
          mutation: UPDATE_FILTER,
          variables: {
            input: filter,
          },
        })
        .then(({ data: { updateCustomFilter } }) => {
          this.$apollo.queries.customFilters.refetch();
          this.modalHandlerFilter({
            isOpen: false,
            isLoading: false,
            isEdit: false,
            info: {},
          });
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Se actualizó el filtro correctamente',
          });
          this.selectFilter({ id: updateCustomFilter.id, isSelected: false });
        })
        .catch(() => {
          this.modalHandlerFilter({
            isOpen: true,
            isLoading: false,
            isEdit: this.modalFilter.isEdit,
            info: {},
          });
          this.modalHandlerError({
            isOpen: true,
            error:
              'Error, no se pudo actualizar el filtro, intente de nuevo o contacte a soporte',
          });
        });
    },
    deleteFilter(customFilterId) {
      this.$apollo
        .mutate({
          mutation: DELETE_FILTER,
          variables: {
            customFilterId,
          },
        })
        .then(() => {
          this.$apollo.queries.customFilters.refetch();
          this.modalHandlerDelete({
            isOpen: false,
            isLoading: false,
            message: {},
            infoDelete: {},
          });
          this.modalHandlerFilter({
            isOpen: false,
            isLoading: false,
            isEdit: false,
            info: {},
          });
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Se eliminó el filtro correctamente',
          });
        })
        .catch(() => {
          this.closeModalDelete();
          this.modalHandlerFilter({
            isOpen: false,
            isLoading: false,
            isEdit: false,
            info: {},
          });
          this.modalHandlerError({
            isOpen: true,
            error:
              'Error, no se pudo eliminar el filtro, intente de nuevo o contacte a soporte',
          });
        });
    },
  },
  apollo: {
    customFilters: {
      query: GET_CUSTOM_FILTERS,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          typeTable: this.viewInfo.type,
        };
      },
    },
  },
};
