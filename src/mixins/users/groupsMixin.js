import { CREATE_GROUP, UPDATE_GROUP } from '@/graphql/mutations/groupMutations';
import { GET_GROUP_PERMISSIONS } from '@/graphql/querys/permissionsQuery';

export const groupsMixin = {
  components: {
    ModalGroup: () => import('@/components/users/ModalGroup.vue'),
    ListGroupPermissions: () =>
      import('@/components/users/ListGroupPermissions.vue'),
  },
  data() {
    return {
      groupsLength: 0,
      isLoadingGroupPermissions: false,
      listGroupPermissions: [],
      isGroupsError: false,
      infoGroupsError: {
        icon: '',
        title: '',
        message: '',
      },
      // manejador de modal
      modalGroup: {
        isOpen: false,
        isLoading: false,
      },
    };
  },
  watch: {
    // evita que los permisos que se seleccionaron se queden guardados
    // manda los valores por defecto
    modalGroup({ isOpen }) {
      if (isOpen) this.getDefaultPermissionsGroup();
      else this.listGroupPermissions = [];
    },
  },
  methods: {
    // manejador de modal
    modalHandlerGroup({ isOpen, isLoading }) {
      this.modalGroup = { isOpen, isLoading };
    },
    createGroup({ name, permissions }) {
      // abre el modal
      this.modalGroup.isLoading = true;
      this.$apollo
        .mutate({
          mutation: CREATE_GROUP,
          variables: {
            input: {
              name,
              permissions,
            },
          },
        })
        .then(() => {
          this.$apollo.queries.getMyGroups.refetch();
          this.modalHandlerGroup({ isOpen: false, isLoading: false });
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Grupo creado',
          });
        })
        .catch(() => {
          const error =
            'No se pudo crear el grupo, intente de nuevo o contacte a soporte';
          // abre modal de error
          this.modalHandlerError({ isOpen: true, error });
          this.modalHandlerGroup({ isOpen: true, isLoading: false });
        });
    },
    updateGroup({ id, name, permissions }) {
      if (permissions) this.isLoadingUpdatePermissions = true;
      this.$apollo
        .mutate({
          mutation: UPDATE_GROUP,
          variables: {
            input: {
              id,
              name,
              permissions,
            },
          },
        })
        .then(() => {
          this.$apollo.queries.getMyGroups.refetch();
          if (permissions) this.isLoadingUpdatePermissions = false;
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Grupo actualizado correctamente',
          });
        })
        .catch(() => {
          const error =
            'No se pudo actualizar el grupo, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    getDefaultPermissionsGroup() {
      this.isLoadingGroupPermissions = true;
      this.$apollo
        .query({
          fetchPolicy: 'no-cache',
          query: GET_GROUP_PERMISSIONS,
        })
        .then(({ data: { groupPermissions } }) => {
          this.listGroupPermissions = groupPermissions;
          this.isLoadingGroupPermissions = false;
        });
    },
  },
};
