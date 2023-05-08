import {
  CREATE_USER,
  UPDATE_USER_ENTERPRISE,
  DELETE_USER_ENTERPRISE,
  CHANGE_USER_STATUS,
} from '@/graphql/mutations/usersMutations';
import { USER_COUNT_DATA } from '@/graphql/querys/usersQuery';

export const usersMixin = {
  components: {
    UsersDataTable: () => import('@/components/users/UsersDataTable.vue'),
    ModalUser: () => import('@/components/users/ModalUser.vue'),
    ProfileUser: () => import('@/components/users/ProfileUser.vue'),
  },
  data() {
    return {
      modalDeleteUserEnterprise: {
        isOpen: false,
        isLoading: false,
        info: {},
      },
      // headers de la tabla cuando se selecciona todos los usuarios
      allUsersHeaders: [
        {
          value: 'icon',
          sortable: false,
          width: 50,
          align: 'right',
        },
        {
          text: 'Nombre',
          value: 'userName',
          sortable: false,
          align: 'left',
          width: 150,
        },
        {
          text: 'Rol',
          value: 'role.name',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Grupo',
          value: 'group',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Estatus',
          value: 'userStatus',
          sortable: false,
          align: 'center',
        },
        {
          value: 'actions',
          sortable: false,
          align: 'center',
        },
      ],
      // variables de mdal
      modalUser: {
        isOpen: false,
        isLoading: false,
      },
      // variables de perfil
      profile: {
        isOpen: false,
        isLoading: false,
        info: {},
      },
    };
  },
  methods: {
    // agrega un usuario
    createUser({ jobTitle, user, role }) {
      this.modalHandlerUser({ isOpen: true, isLoading: true });
      this.$apollo
        .mutate({
          mutation: CREATE_USER,
          variables: {
            input: {
              jobTitle,
              user,
              role,
            },
          },
        })
        .then(() => {
          this.$apollo.queries.getMyUsers.refetch();
          this.modalHandlerUser({ isOpen: false, isLoading: false });
        })
        .catch(() => {
          const error =
            'No se pudo agregar el usuario, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
          this.modalHandlerUser({ isOpen: true, isLoading: false });
        });
    },
    // actualiza la vista
    selectAllUsers() {
      // quita el modo de seccion seleccionada
      this.isSectionSelected = false;
      // actualiza la pocicion de la lista
      this.listItemSelected.group = 0;
      // actualiza la vista de la tabla
      this.sectionSelected = {
        type: 'ALL_USERS',
        users: this.getMyUsers,
        permissions: [],
      };
    },
    // actualiza un usuario
    updateUser({ id, role, group }) {
      if (this.modalSelectUser.isOpen) {
        this.modalHandlerSelectUser({
          isOpen: true,
          isLoading: true,
          info: this.modalSelectUser.info,
        });
      }
      if (this.modalChangeUserOfGroup.isOpen) {
        this.modalHandlerChangeUserOfGroup({
          isOpen: true,
          isLoading: true,
          info: {},
        });
      }
      if (this.modalChangeUserOfRole.isOpen) {
        this.modalHandlerChangeUserOfRole({
          isOpen: true,
          isLoading: true,
          info: {},
        });
      }
      const input = { id };
      // validamos si se actualizo un rol o un grupo
      // se hace para evitar enviar campos vacios a graphql y nos marque error
      if (group.id) input.groupId = group.id;
      if (role.id) input.roleId = role.id;
      this.$apollo
        .mutate({
          mutation: UPDATE_USER_ENTERPRISE,
          variables: {
            input,
          },
        })
        .then(({ data: { updateUserEnterprise } }) => {
          this.$apollo.queries.getMyUsers.refetch();
          // actualiza el profile del usuario
          // pasamos el usuario actualizado
          if (this.profile.isOpen) {
            this.showProfile(updateUserEnterprise);
          }
          if (group.id) {
            this.$apollo.queries.getMyGroups.refetch();
            if (this.modalChangeUserOfGroup.isOpen || this.profile.isOpen) {
              this.modalHandlerChangeUserOfGroup({
                isOpen: false,
                isLoading: false,
                info: {},
              });
            }
          }
          if (role.id) {
            this.$apollo.queries.getMyRoles.refetch();
            if (this.modalChangeUserOfRole.isOpen || this.profile.isOpen) {
              this.modalHandlerChangeUserOfRole({
                isOpen: false,
                isLoading: false,
                info: {},
              });
            }
          }
          if (this.modalSelectUser.isOpen) {
            this.modalHandlerSelectUser({
              isOpen: false,
              isLoading: false,
              info: {},
            });
          }
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Rol actualizado correctamente',
          });
        })
        .catch(() => {
          const error =
            'No se pudo actualizar el usuario, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    // manejador de acciones de usuario
    userActions(type, userEnterprise) {
      const { id, isActive } = userEnterprise;
      // se mandan los parametros que se enececitan a cadas funcion correspondiente
      switch (type) {
        case 'deleteUserWhitEnterprise':
          this.$apollo
            .query({
              query: USER_COUNT_DATA,
              fetchPolicy: 'no-cache',
              variables: {
                userEnterpriseId: id,
              },
            })
            .then(({ data: { userEnterpriseTotal } }) => {
              const values = Object.values(userEnterpriseTotal);
              const existData = values.some((value) => value >= 1);
              const info = { fromUser: id, existData };
              if (existData) {
                // eslint-disable-next-line
                delete userEnterpriseTotal['__typename'];
                info.countList = JSON.parse(
                  JSON.stringify(userEnterpriseTotal),
                );
              }
              this.modalHandlerDeleteUserEnterprise({
                isOpen: true,
                isLoading: false,
                info,
              });
            })
            .catch(() => {
              const error =
                'No se pudo eliminar el usuario, intente de nuevo o contacte a soporte';
              this.modalHandlerError({ isOpen: true, error });
            });
          break;
        case 'showProfile':
          this.showProfile(userEnterprise);
          break;
        case 'changeStatus':
          this.modalHandlerAlert({
            isOpen: true,
            isLoading: false,
            message: {
              title: `¿Estas seguro de ${
                isActive === 'ACTIVE' ? 'Desactivar' : 'Activar'
              } este usuario?`,
              text:
                isActive === 'ACTIVE'
                  ? 'Al desactivar este usuario no podrá iniciar sesión en su cuenta, ser modificado ó realizar ninguna acción dentro de la plataforma'
                  : 'Al activarlo obtendrá acceso a su cuenta y a toda su información',
            },
            info: { type, userEnterprise },
          });
          break;
        case 'changeUserOfGroup':
          this.modalHandlerChangeUserOfGroup({
            isOpen: true,
            isLoading: false,
            info: userEnterprise,
          });
          break;
        case 'changeUserOfRole':
          this.modalHandlerChangeUserOfRole({
            isOpen: true,
            isLoading: false,
            info: userEnterprise,
          });
          break;
        default:
          this.modalHandlerError({
            isOpen: true,
            error: 'No se ha encontrado la acción a realizar',
          });
      }
    },
    deleteUserEnterprise({ isOpen, isLoading, info }) {
      this.modalHandlerDeleteUserEnterprise({ isOpen, isLoading, info });
      const input = { fromUser: info.fromUser };
      if (info.existData) {
        input.toUser = info.toUser;
      }
      this.$apollo
        .mutate({
          mutation: DELETE_USER_ENTERPRISE,
          variables: {
            input,
          },
        })
        .then(() => {
          this.$apollo.queries.getMyUsers.refetch();
          this.modalHandlerDeleteUserEnterprise({
            isOpen: false,
            isLoading: false,
            info: {},
          });
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Se eliminó el usuario correctamente',
          });
        })
        .catch(() => {
          const error =
            'No se pudo eliminar el usuario, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
          this.modalHandlerDeleteUserEnterprise({
            isOpen: true,
            isLoading: false,
            info: {},
          });
        });
    },
    // manejadior de modal
    modalHandlerUser({ isOpen, isLoading }) {
      this.modalUser = { isOpen, isLoading };
    },
    modalHandlerDeleteUserEnterprise({ isOpen, isLoading, info }) {
      this.modalDeleteUserEnterprise = { isOpen, isLoading, info };
    },
    // manejador de perfil de usuairo
    profileHandler({ isOpen, isLoading, info }) {
      this.profile = {
        isOpen,
        isLoading,
        info,
      };
    },
    // habre el perfil de usuario
    showProfile({ id, isActive, plan, role, group, user }) {
      this.profileHandler({
        isOpen: true,
        isLoading: false,
        // se pasa toda la informacion que se mostrara en el perfil
        info: { id, isActive, plan, role, group, user },
      });
    },
    // cambia el estado de un usuario
    changeUserStatus({ id, isActive }) {
      this.$apollo
        .mutate({
          mutation: CHANGE_USER_STATUS,
          variables: {
            input: {
              id,
            },
          },
        })
        .then(() => {
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: `Usuario ${
              isActive === 'ACTIVE' ? 'Desactivado' : 'Activado'
            }`,
          });
          this.modalHandlerAlert({
            isOpen: false,
            isLoading: false,
            message: { title: '', text: '' },
            info: {},
          });
        })
        .catch(() => {
          const error =
            'No se pudo cambiar el estado del usuario, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
