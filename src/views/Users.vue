<template>
  <v-container fluid style="height:100%">
    <!-- HEADER -->
    <v-row>
      <v-col cols="12" class="primary">
        <p class="ml-6 my-4 white--text">
          Gestión de usuarios
        </p>
      </v-col>
      <!-- Tabs -->
      <v-col cols="12" class="pa-0 mb-1 d-flex align-center white">
        <v-tabs
          mobile-break-point="400"
          color="primary"
          fixed-tabs
          icons-and-text
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab @click="isUserManagement = true">
            Gestión de usuarios y grupos
            <v-icon :right="!this.$vuetify.breakpoint.xs">
              mdi-account-multiple-plus
            </v-icon>
          </v-tab>
          <v-tab @click="isUserManagement = false">
            Roles
            <v-icon :right="!this.$vuetify.breakpoint.xs">
              mdi-account-key
            </v-icon>
          </v-tab>
        </v-tabs>

        <v-menu bottom ransition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn
              style="margin-right: 6rem;"
              class="mt-1"
              small
              color="secondary"
              fab
              depressed
              v-on="on"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="modalHandlerUser({ isOpen: true, isLoading: false })"
            >
              <v-icon left>mdi-account-plus</v-icon>
              Nuevo usuario
            </v-list-item>
            <v-list-item
              @click="
                modalHandlerGroup({
                  isOpen: true,
                  isLoading: false,
                  isEdit: false,
                })
              "
            >
              <v-icon left>mdi-account-group</v-icon>
              Nuevo grupo
            </v-list-item>
            <v-list-item
              @click="modalHandlerRol({ isOpen: true, isLoading: false })"
            >
              <v-icon left>mdi-account-tie</v-icon>
              Nuevo Rol
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <!-- BODY -->
      <!-- Navigation menu -->
      <v-col cols="2" class="pr-1">
        <Menu>
          <template #title>
            <p class="ma-0">
              {{ isUserManagement ? 'Usuarios y Grupos' : 'Roles' }}
            </p>
          </template>
          <template #content>
            <v-skeleton-loader
              v-if="isLoadingViewNavigation"
              type="list-item@3"
            ></v-skeleton-loader>
            <v-list v-else dense nav tile>
              <!-- grupos -->
              <v-list-item-group
                v-model="listItemSelected.group"
                v-show="isUserManagement"
                color="secondary"
                mandatory
              >
                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title align="left" @click="selectAllUsers">
                      <v-icon class="mr-4 mb-2">
                        mdi-account
                      </v-icon>
                      Todos lo usuarios
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-group :value="false" prepend-icon="mdi-account-group">
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>Grupos</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item
                    v-for="group in getMyGroups"
                    :key="group.id"
                    link
                    @click="selectSection(group)"
                    color="secondary"
                  >
                    <v-list-item-title align="left">
                      <v-icon class="mr-4 mb-2">mdi-account-group</v-icon>
                      {{ group.name }}
                    </v-list-item-title>
                    <v-edit-dialog
                      cancel-text="cancelar"
                      save-text="Guardar"
                      @save="updateGroup({ id: group.id, name: group.name })"
                      large
                      :return-value.sync="group.name"
                    >
                      <v-btn
                        v-if="group.isDefault ? false : true"
                        small
                        icon
                        right
                      >
                        <v-icon color="secondary">
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                      <template v-slot:input>
                        <v-text-field
                          v-model="group.name"
                          label="Editar"
                          single-line
                          counter
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                    <v-btn
                      v-if="group.isDefault ? false : true"
                      small
                      icon
                      right
                      @click.stop="deleteItemConfirmation('Group', group)"
                    >
                      <v-icon color="secondary">
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-list-item>
                </v-list-group>
                <BaseErrorComponent
                  v-show="isGroupsError"
                  :info="infoGroupsError"
                />
              </v-list-item-group>
              <!-- roles -->
              <v-list-item-group
                v-model="listItemSelected.role"
                v-show="!isUserManagement"
                mandatory
                color="secondary"
              >
                <v-list-item
                  link
                  @click="selectSection(role)"
                  v-for="role in getMyRoles"
                  :key="role.id"
                >
                  <v-icon class="mb-1 mr-2">mdi-account-tie</v-icon>
                  <v-list-item-title>
                    {{ role.name }}
                  </v-list-item-title>
                  <v-edit-dialog
                    cancel-text="cancelar"
                    save-text="Guardar"
                    @save="updateRole({ id: role.id, name: role.name })"
                    large
                    :return-value.sync="role.name"
                  >
                    <v-btn small icon right>
                      <v-icon color="secondary">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <template v-slot:input>
                      <v-text-field
                        v-model="role.name"
                        label="Editar"
                        single-line
                        counter
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                  <v-btn
                    v-if="getMyRoles.length > 1"
                    small
                    icon
                    right
                    @click.stop="deleteItemConfirmation('Role', role)"
                  >
                    <v-icon color="secondary">
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-list-item>
                <BaseErrorComponent
                  v-show="isErrorRoles"
                  :info="infoRolesError"
                />
              </v-list-item-group>
            </v-list>
          </template>
        </Menu>
      </v-col>
      <!-- Data table -->
      <v-col :cols="isSectionSelected ? '7' : '10'" class="pr-1">
        <v-skeleton-loader
          v-if="isLoadingViewTable"
          type="table"
        ></v-skeleton-loader>
        <UsersDataTable
          v-else
          @openProfile="showProfile"
          @userActions="userActions"
          @add="
            modalHandlerSelectUser({
              isOpen: true,
              isLoading: false,
              info: sectionSelected,
            })
          "
          :groupsLength="groupsLength"
          :rolesLength="rolesLength"
          :headers="isSectionSelected ? sectionHeaders : allUsersHeaders"
          :data="sectionSelected"
          :error="infoUsersError"
          :navigation="isUserManagement ? getMyGroups : getMyRoles"
        />
      </v-col>
      <!-- Permissions menu -->
      <v-col cols="3" v-show="isSectionSelected ? true : false">
        <Menu :isPermissionsMenu="true">
          <template #title>
            <p class="ma-0">Permisos de {{ sectionSelected.name }}</p>
            <v-progress-linear
              v-if="isLoadingUpdatePermissions"
              :indeterminate="isLoadingUpdatePermissions"
            ></v-progress-linear>
          </template>
          <template #content>
            <ListPermissions
              v-show="!isUserManagement"
              :permissions="sectionSelected.permissions"
              :loading="isLoadingUpdatePermissions"
              @emitPermissions="updatePermissions"
            />
            <ListGroupPermissions
              v-show="isUserManagement"
              :permissions="sectionSelected.permissions"
              :loading="isLoadingUpdatePermissions"
              @emitPermissions="updatePermissions"
            />
          </template>
        </Menu>
      </v-col>
    </v-row>
    <ProfileUser
      :roles="listRoles"
      :groups="getMyGroups"
      :profile="profile"
      @updateUser="updateUser"
      @close="profileHandler"
    />
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="deleteItem"
    />
    <BaseModalAlert
      :modalHandler="modalAlert"
      @confirm="alertConfirmation"
      @close="modalHandlerAlert"
    ></BaseModalAlert>
    <ModalUser
      :roles="listRoles"
      :modalHandler="modalUser"
      @close="modalHandlerUser"
      @newUser="createUser"
    />
    <ModalRol
      :modalHandler="modalRol"
      @close="modalHandlerRol"
      @newRole="createRole"
    />
    <ModalGroup
      :group="sectionSelected"
      :modalHandler="modalGroup"
      :loadingPermissions="isLoadingGroupPermissions"
      :permissions="listGroupPermissions"
      @newGroup="createGroup"
      @close="modalHandlerGroup"
    />
    <ModalChangeUserOfGroup
      :groups="getMyGroups"
      :modalHandler="modalChangeUserOfGroup"
      @outData="updateUser"
      @close="modalHandlerChangeUserOfGroup"
    />
    <ModalChangeUserOfRole
      :roles="listRoles"
      :modalHandler="modalChangeUserOfRole"
      @outData="updateUser"
      @close="modalHandlerChangeUserOfRole"
    />
    <ModalDeleteUserEnterprise
      :modalHandler="modalDeleteUserEnterprise"
      @close="modalHandlerDeleteUserEnterprise"
      @outData="deleteUserEnterprise"
    />
    <ModalSelectUser
      :modalHandler="modalSelectUser"
      @close="modalHandlerSelectUser"
      @outData="updateUser"
    />
    <v-snackbar
      v-model="snackbar.isOpen"
      :color="snackbar.color"
      :timeout="5000"
    >
      {{ snackbar.text }}
      <template v-slot:action>
        <v-btn
          text
          @click="snackbarHandler({ isOpen: false, color: '', text: '' })"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { DELETE_ROLE } from '@/graphql/mutations/rolesMutations';
import { DELETE_GROUP } from '@/graphql/mutations/groupMutations';
import { GET_MY_USERS } from '@/graphql/querys/usersQuery';
import { GET_MY_ROLES, GET_LIST_ROLES } from '@/graphql/querys/rolesQuery';
import { GET_MY_GROUPS } from '@/graphql/querys/groupsQuery';
import { usersMixin } from '@/mixins/users/usersMixin';
import { groupsMixin } from '@/mixins/users/groupsMixin';
import { rolesMixin } from '@/mixins/users/rolesMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { snackbarMixin } from '@/mixins/alerts/snackbarMixin';

export default {
  components: {
    ListPermissions: () => import('@/components/users/ListPermissions.vue'),
    Menu: () => import('@/components/users/Menu.vue'),
    BaseErrorComponent: () => import('@/components/ui/BaseErrorComponent.vue'),
    ModalChangeUserOfGroup: () =>
      import('@/components/users/ModalChangeUserOfGroup.vue'),
    ModalChangeUserOfRole: () =>
      import('@/components/users/ModalChangeUserOfRole.vue'),
    ModalDeleteUserEnterprise: () =>
      import('@/components/users/ModalDeleteUserEnterprise.vue'),
    ModalSelectUser: () => import('@/components/users/ModalSelectUser.vue'),
  },
  mixins: [
    usersMixin,
    groupsMixin,
    rolesMixin,
    modalsAlertsMixin,
    snackbarMixin,
  ],
  data() {
    return {
      isLoadingViewTable: true,
      isLoadingViewNavigation: true,
      isLoadingUpdatePermissions: false,
      getMyUsers: [],
      // indica si esta en modo gestion de usuarios
      isUserManagement: true,
      // indica si se esta dentro de una seccion
      isSectionSelected: false,
      // almacena la longitud de de roles y grupos
      showRoleIcons: [],
      // almacena lo pocicion dentro de la lista de grupos y roles
      listItemSelected: {
        role: 0,
        group: 0,
      },
      // almacena la informacion cuando se esta en una seccion
      sectionSelected: {
        id: '',
        name: '',
        type: '',
        users: [],
        permissions: [],
      },
      // headers en modo seccion
      sectionHeaders: [
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
      // manejador de mensajes de errores en componentes
      infoUsersError: {
        icon: '',
        title: '',
        message: '',
      },
      modalChangeUserOfGroup: {
        isOpen: false,
        isLoading: false,
        info: {},
      },
      modalChangeUserOfRole: {
        isOpen: false,
        isLoading: false,
        info: {},
      },
      modalSelectUser: {
        isOpen: false,
        isLoading: false,
        info: {},
      },
    };
  },
  watch: {
    // observa el modo de gestion de usuarios
    isUserManagement(value) {
      this.isLoadingViewTable = true;
      this.isLoadingViewNavigation = true;
      // se ejecuta en modo gestion de usuarios
      if (value) {
        // cambia la pocicion de la lista a 0
        this.listItemSelected.group = 0;
        // equivalente a todos los usuarios
        this.sectionSelected = {
          type: 'ALL_USERS',
          users: this.getMyUsers,
          permissions: [],
        };
        // desactiva el modo de seccion seleccionada
        this.isSectionSelected = false;
      }
    },
    getMyRoles(roles) {
      // obtiene la pocicion dentro de la lista de roles
      const { role } = this.listItemSelected;
      this.sectionSelected = {
        id: roles[role].id,
        name: roles[role].name,
        type: 'ROLE',
        users: roles[role].users,
        permissions: roles[role].permissions,
      };
      if (roles[role].users.length === 0) {
        this.infoUsersError = {
          icon: 'mdi-account-multiple-remove',
          title: '',
          message: 'No hay usuarios todavía',
        };
      }
      this.rolesLength = roles.length;
      this.isSectionSelected = true;
      this.isLoadingViewTable = false;
      this.isLoadingViewNavigation = false;
    },
    getMyUsers(value) {
      // rellena la tabla al entrar por primera vez al componente
      if (!this.isSectionSelected) {
        this.sectionSelected = {
          type: 'ALL_USERS',
          users: this.getMyUsers,
          permissions: [],
        };
      }
      if (value) {
        this.isLoadingViewTable = false;
      }
    },
    getMyGroups(groups) {
      if (groups) {
        // valido si estoy viendo el mismo grupo que se actualizo
        if (this.isSectionSelected && this.sectionSelected.type === 'GROUP') {
          const isSelectedGroup = groups.some(
            ({ id }) => this.sectionSelected.id === id,
          );
          if (isSelectedGroup) {
            const group = groups.find(
              ({ id }) => this.sectionSelected.id === id,
            );
            this.selectSection(group);
          }
        }
        this.groupsLength = groups.length;
        this.isLoadingViewNavigation = false;
      }
    },
  },
  computed: {
    skipRolesList() {
      if (
        !this.modalUser.isOpen ||
        !this.profile.isOpen ||
        !this.modalChangeUserOfRole.isOpen
      )
        return false;
      return true;
    },
  },
  methods: {
    modalHandlerChangeUserOfGroup({ isOpen, isLoading, info }) {
      this.modalChangeUserOfGroup = { isOpen, isLoading, info };
    },
    modalHandlerChangeUserOfRole({ isOpen, isLoading, info }) {
      this.modalChangeUserOfRole = { isOpen, isLoading, info };
    },
    modalHandlerSelectUser({ isOpen, isLoading, info }) {
      this.modalSelectUser = { isOpen, isLoading, info };
    },
    // manejador de confirmaciones del alert
    alertConfirmation({ message, info }) {
      if (info.type === 'changeStatus') {
        this.modalHandlerAlert({
          isOpen: true,
          isLoading: true,
          message,
          info,
        });
        this.changeUserStatus(info.userEnterprise);
      }
    },
    // manejador del modal de confirmacion de eliminar
    deleteItemConfirmation(type, { id, name }) {
      const message =
        type === 'Group'
          ? 'será eliminado de forma permanente, si existen usuarios dentro del grupo seran movidos al grupo predeterminado'
          : 'será eliminado de forma permanente';
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: { nameItem: name, text: message },
        infoDelete: {
          // indica que se eliminara
          type,
          id,
          name,
        },
      });
    },
    // ejecuta la mutacion de eliminar dependiendo de que se eliminara
    deleteItem({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      switch (infoDelete.type) {
        case 'Role':
          this.$apollo
            .mutate({
              mutation: DELETE_ROLE,
              variables: {
                input: {
                  roleId: infoDelete.id,
                },
              },
            })
            .then(() => {
              this.$apollo.queries.getMyRoles.refetch();
              // //  regresa a la pocicion cero despues de eliminar
              // this.listItemSelected.role = 0;
              // // evita bugs de vista
              // const [{ id, name, users, permissions }] = data.getMyRoles;
              // this.sectionSelected = {
              //   id,
              //   name,
              //   type: 'ROLE',
              //   users,
              //   permissions,
              // };
              //  cierra modal de eliminar
              this.modalHandlerDelete({
                isOpen: false,
                isLoading: false,
                message: {},
                infoDelete: {},
              });
              // habre el snack de confirmacion
              this.snackbarHandler({
                isOpen: true,
                color: 'success',
                text: 'Rol eliminado correctamente',
              });
            })
            .catch(() => {
              const error =
                'No se pudo eliminar el rol, intente de nuevo o contacte a soporte';
              this.modalHandlerError({ isOpen: true, error });
            });
          break;
        case 'Group':
          this.$apollo
            .mutate({
              mutation: DELETE_GROUP,
              variables: {
                groupId: infoDelete.id,
              },
            })
            .then(() => {
              this.$apollo.queries.getMyGroups.refetch();
              this.selectAllUsers();
              this.modalHandlerDelete({
                isOpen: false,
                isLoading: false,
                message: {},
                infoDelete: {},
              });

              this.snackbarHandler({
                isOpen: true,
                color: 'success',
                text: 'Grupo eliminado correctamente',
              });
            })
            .catch(() => {
              const error =
                'No se pudo eliminar el grupo, intente de nuevo o contacte a soporte';
              this.modalHandlerError({ isOpen: true, error });
            });
          break;
        default:
          this.modalHandlerError({
            isOpen: true,
            error: 'No se recibió ninguna acción',
          });
      }
    },
    // manejador de actualizar permisos
    updatePermissions(type, data) {
      // data contiene el array de permisos
      // type el tipo de permiso
      // obtiene el id del role o grupo que esta seleccionado en ese momento
      const { id } = this.sectionSelected;
      // le da formato a los permisos que se enviaran a la mutacion
      const permissions = data.map(({ id: idPermissions, methods }) => {
        return { id: idPermissions, methods };
      });
      // objeto que se enviara al update
      const newPermissions = {
        id,
        permissions,
      };
      if (type === 'GROUP') {
        this.updateGroup(newPermissions);
      }
      if (type === 'ROLE') {
        this.updateRole(newPermissions);
      }
    },
    // manejador de seccion seleccionada
    selectSection({ id, name, users, members, permissions }) {
      this.isSectionSelected = true;
      if (!users || !members) {
        this.infoUsersError = {
          icon: 'mdi-account-multiple-remove',
          title: '',
          message: 'No hay usuarios todavía',
        };
      }
      this.sectionSelected = {
        id,
        type: members ? 'GROUP' : 'ROLE',
        name,
        users: users || members,
        permissions,
      };
    },
  },
  apollo: {
    getMyUsers: {
      query: GET_MY_USERS,
      fetchPolicy: 'no-cache',
      skip() {
        return !this.isUserManagement;
      },
      error() {
        this.isLoadingViewTable = false;
        this.infoUsersError = {
          icon: 'mdi-alert-outline',
          title: 'Error',
          message:
            'No se ha podido cargar ningún usuario, intente de nuevo o contacte con soporte',
        };
      },
    },
    getMyGroups: {
      query: GET_MY_GROUPS,
      fetchPolicy: 'no-cache',
      skip() {
        return !this.isUserManagement;
      },
      error() {
        this.isGroupsError = true;
        this.infoGroupsError = {
          icon: 'mdi-alert-outline',
          title: 'Error',
          message: 'No se ha podido cargar los roles, contacte con soporte',
        };
        this.isLoadingViewNavigation = false;
      },
    },
    // pide todos los datos de los roles
    getMyRoles: {
      query: GET_MY_ROLES,
      fetchPolicy: 'no-cache',
      skip() {
        return this.isUserManagement;
      },
      error() {
        this.isErrorRoles = true;
        this.infoRolesError = {
          icon: 'mdi-alert-outline',
          title: 'Error',
          message:
            'No se ha podido cargar ningún rol, intente de nuevo contacte con soporte',
        };
        this.isLoadingViewTable = false;
        this.isLoadingViewNavigation = false;
      },
    },
    // solo sirve para listar los roles
    listRoles: {
      query: GET_LIST_ROLES,
      fetchPolicy: 'no-cache',
      skip() {
        return this.skipRolesList;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .v-list-item  } from ../../../scss/views/users';
</style>
