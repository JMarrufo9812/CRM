import { CREATE_ROLE, UPDATE_ROLE } from '@/graphql/mutations/rolesMutations';

export const rolesMixin = {
  components: {
    ModalRol: () => import('@/components/users/ModalRol.vue'),
  },
  data() {
    return {
      rolesLength: 0,
      isErrorRoles: false,
      infoRolesError: {
        icon: '',
        title: '',
        message: '',
      },
      // variables del modal
      modalRol: {
        isOpen: false,
        isLoading: false,
      },
    };
  },
  methods: {
    // manejador de mddal
    modalHandlerRol({ isOpen, isEdit, isLoading }) {
      this.modalRol = { isOpen, isEdit, isLoading };
    },
    createRole({ name }) {
      this.modalHandlerRol({ isOpen: true, isLoading: true });
      this.$apollo
        .mutate({
          mutation: CREATE_ROLE,
          variables: {
            input: {
              name,
            },
          },
        })
        .then(() => {
          this.$apollo.queries.getMyRoles.refetch();
          this.$apollo.queries.listRoles.refetch();
          this.modalHandlerRol({ isOpen: false, isLoading: false });
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Rol creado',
          });
        })
        .catch(() => {
          const error =
            'No se pudo crear el rol, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
          this.modalHandlerRol({ isOpen: true, isLoading: false });
        });
    },
    updateRole({ id, name, permissions }) {
      if (permissions) this.isLoadingUpdatePermissions = true;
      this.$apollo
        .mutate({
          mutation: UPDATE_ROLE,
          variables: {
            input: {
              id,
              name,
              permissions,
            },
          },
        })
        .then(() => {
          this.$apollo.queries.getMyRoles.refetch();
          if (permissions) this.isLoadingUpdatePermissions = false;
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Se actualizó el rol correctamente',
          });
        })
        .catch(() => {
          const error =
            'No se pudo actualizar el rol, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
