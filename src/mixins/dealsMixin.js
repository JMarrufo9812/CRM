import {
  CREATE_DEAL,
  DELETE_DEAL,
  UPDATE_DEAL,
  TRASH_DEALS,
  RESTORE_DEALS,
} from '@/graphql/mutations/dealsMutations';
import { GET_DEALS, GET_SEARCH_DEALS } from '@/graphql/querys/dealsQuery';
import { PERMISSIONS_DEALS } from '@/constants/permissions';

export const dealsMixin = {
  data() {
    return {
      PERMISSIONS_DEALS,
      inputsForm: [],
      isLoadingDeals: false,
      loadingSearch: false,
      isLoadingUpdateDeal: false,
      modalDeal: {
        isOpen: false,
        isLoading: false,
      },
      infoError: {
        icon: 'mdi-account-search-outline',
        title: '',
        message: 'No se encontraron tratos',
      },
      filters: {
        search: '',
        orderBy: 'desc',
        skip: 0,
        take: 0,
        sortBy: [],
        sortDesc: [],
        isDelete: false,
      },
      listDeals: [],
      informationBarDeals: {},
      resultSearchDeals: [],
      totalDeals: 0,
      searchDeal: '',
      searchFilters: {
        search: '',
        take: 5,
      },
      dealsSelected: [],
    };
  },
  watch: {
    searchDeal(value) {
      if (value) {
        if (Object.keys(value).length >= 2) {
          this.searchFilters.search = value;
          this.searchFilters.take = 5;
          this.getSearchDeals();
        }
        if (Object.keys(value).length === 0) {
          // console.log('longitud de busqueda cero');
          this.searchFilters.search = '';
          this.searchFilters.take = 0;
          this.getSearchDeals();
        }
      }
    },
    isLoadingDeals(value) {
      this.$emit('isLoadingDeals', value);
    },
  },
  computed: {
    menuProps() {
      return !this.searchDeal ? { value: false } : {};
    },
  },
  methods: {
    modalHandlerDeal({ isOpen, isLoading }) {
      this.modalDeal = { isOpen, isLoading };
    },
    createDeal({
      title,
      contact,
      company,
      value,
      tags,
      customForms,
      expectedCloseDate,
      pipeline: { pipelineId, stageId },
      owner,
    }) {
      this.modalHandlerDeal({
        isOpen: true,
        isLoading: true,
      });
      this.$apollo
        .mutate({
          mutation: CREATE_DEAL,
          variables: {
            input: {
              title,
              tags,
              customForms,
              expectedCloseDate,
              contact: contact?.id ? { id: contact.id } : contact,
              company: company?.id ? { id: company.id } : company,
              value,
              pipelineId,
              stageId,
              ownerId: owner.id,
            },
          },
        })
        .then(({ data: { createDeal } }) => {
          this.updateData = true;
          this.modalHandlerDeal({
            isOpen: false,
            isLoading: false,
          });
          if (this.$route.name === 'pipeline-id') {
            this.updateViewPipeline(this.$route.params.id);
          }
          this.updateData = true;

          setTimeout(() => {
            this.updateData = false;
          }, 10);

          this.$emit('updateHistory');

          if (this.typeItem === 'CONTACT' || this.typeItem === 'COMPANY') {
            this.updateHistory();
            this.addDeal(createDeal);
          }
        })
        .catch(() => {
          const error =
            'No se pudo crear el trato intente de nuevo o contacte al soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    updateDeal({
      id,
      value,
      expectedCloseDate,
      company,
      contact,
      tags,
      status,
      comments,
      lostReason,
      owner,
      title,
      customForm,
    }) {
      this.isLoadingUpdateDeal = true;
      const input = {};
      input.id = id;
      if (value || value === 0) {
        input.value = value;
      }
      if (expectedCloseDate || expectedCloseDate !== undefined) {
        input.expectedCloseDate = expectedCloseDate;
      }
      if (company) {
        input.company = company;
      }
      if (contact) {
        input.contact = contact;
      }
      if (tags) {
        input.tags = tags;
      }
      if (owner) {
        input.ownerId = owner.id;
      }
      if (title) {
        input.title = title;
      }
      if (customForm) {
        input.customForm = customForm;
      }
      if (status) {
        input.status = status;
        if (status === 'LOST') {
          input.comments = comments;
          input.lostReason = lostReason;
        }
      }

      this.$apollo
        .mutate({
          // Query
          mutation: UPDATE_DEAL,
          // Parameters
          variables: {
            input,
          },
        })
        .then(({ data: { updateDeal } }) => {
          if (input.status === 'LOST') {
            this.modalHandlerLostDeal({ isOpen: false, isLoading: false });
          }
          this.$emit('updateItem', updateDeal);
          this.$emit('updateHistory');
          // Close edit field
          this.isLoadingUpdateDeal = false;

          if (this.typeItem === 'CONTACT' || this.typeItem === 'COMPANY') {
            this.updateHistory();
            this.addDeal(updateDeal);
          }
        })
        .catch(() => {
          this.isLoadingUpdateDeal = false;
          // Error
          const error =
            'No se pudo actualizar el trato, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    getSearchDeals() {
      this.loadingSearch = true;
      this.$apollo
        .query({
          query: GET_SEARCH_DEALS,
          fetchPolicy: 'no-cache',
          variables: {
            filters: this.searchFilters,
          },
        })
        .then(({ data: { deals } }) => {
          this.resultSearchDeals = deals.list;
          this.loadingSearch = false;
        })
        .catch(() => {
          this.loadingSearch = false;
        });
    },
    getDeals() {
      this.isLoadingDeals = true;
      this.$apollo
        .query({
          query: GET_DEALS,
          fetchPolicy: 'no-cache',
          variables: {
            filters: this.filters,
            importId: this.$route.query.filterId,
          },
        })
        .then(({ data: { deals } }) => {
          this.isLoadingDeals = false;
          this.$emit('deals', deals.list);
          this.$emit('informationBar', deals.informationBar);
          this.listDeals = deals.list.map((deal) => {
            if (deal.customForms) {
              deal.customForms.forEach(({ id, value }) => {
                // eslint-disable-next-line
                deal[id] = value;
              });
            }
            return deal;
          });
          this.totalDeals = deals.count;

          this.isErrorDeals = false;
          this.$emit('endUpdateData');
        })
        .catch(() => {
          this.isErrorDeals = true;
          this.isLoadingDeals = false;
          this.listDeals = [];
          this.totalDeals = 0;
          this.$emit('endUpdateData');
          this.infoError = {
            icon: 'mdi-alert-outline',
            title: 'Error',
            message:
              'No se ha podido cargar ningún trato, intente de nuevo o contacte a soporte',
          };
        });
    },
    restoreDealsConfirmation() {
      this.modalHandlerRestore({
        isOpen: true,
        isLoading: false,
        message: {
          title: '¿Seguro que deseas restaurar?',
          nameItem: 'Los tratos seleccionados',
          text: 'serán restaurados',
        },
        infoRestore: {},
      });
    },
    restoreDeals({ isOpen, isLoading, message, infoRestore }) {
      this.modalHandlerRestore({
        isOpen,
        isLoading,
        message,
        infoRestore,
      });
      this.$apollo
        .mutate({
          mutation: RESTORE_DEALS,
          variables: {
            input: this.dealsSelected,
          },
          update: () => {
            // indicamos que se deve de actualizar la vista de contactos
            this.updateData = true;
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'Los tratos fueron restaurados correctamente',
            });
          },
        })
        .finally(() => {
          this.modalHandlerRestore({
            isOpen: false,
            isLoading,
            message,
            infoRestore,
          });
          this.updateData = false;
        })
        .catch(() => {
          const error =
            'No se pudo restaurar el trato intente de nuevo o contacte al soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    deleteDealConfirmation(type, deals) {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          title: '¿Seguro que deseas mover a la papelera?',
          nameItem: 'Los tratos seleccionados',
          text: 'serán movidos a la papelera',
        },
        infoDelete: {
          type,
          deals,
        },
      });
    },
    deleteDeal({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      this.$apollo
        .mutate({
          mutation: DELETE_DEAL,
          variables: {
            input: infoDelete.deals,
          },
          update: () => {
            // indicamos que se deve de actualizar la vista de contactos
            this.updateData = true;
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'Los tratos fueron eliminados correctamente',
            });
          },
        })
        .finally(() => {
          this.updateData = false;
          this.modalHandlerDelete({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
        })
        .catch(() => {
          const error =
            'No se pudo eliminar el trato intente de nuevo o contacte al soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    trashDealsConfirmation(type, deals) {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          nameItem: 'Los tratos seleccionados',
          text: 'serán eliminados permanentemente',
        },
        infoDelete: {
          type,
          deals,
        },
      });
    },
    trashDeals({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      this.$apollo
        .mutate({
          mutation: TRASH_DEALS,
          variables: {
            input: infoDelete.deals,
          },
          update: () => {
            // indicamos que se deve de actualizar la vista de contactos
            this.updateData = true;
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'Los tratos fueron eliminados correctamente',
            });
          },
        })
        .finally(() => {
          this.updateData = false;
          this.modalHandlerDelete({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
        })
        .catch(() => {
          const error =
            'No se pudo eliminar el trato intente de nuevo o contacte al soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    goToProfile(id) {
      this.$router.push(`/deal/${id}`);
    },
  },
};
