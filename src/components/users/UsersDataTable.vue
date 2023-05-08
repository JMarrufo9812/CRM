<template>
  <v-card tile outlined>
    <v-data-table
      height="57em"
      :headers="headers"
      :items="data.users"
      :search="search"
      calculate-widths
      :hide-default-footer="data.users.length >= 10 ? false : true"
      :loading="loading"
      loading-text="Cargando usuarios..."
      class="users-table"
    >
      <template #[`item.icon`]="{item}">
        <v-btn icon :disabled="item.user.name ? false : true">
          <v-avatar
            :color="item.user.name ? 'secondary' : 'warning'"
            @click="openProfile(item)"
          >
            <img
              v-if="item.user.config && item.user.config.profileUrl !== null"
              :src="item.user.config.profileUrl"
            />
            <span
              v-else-if="item.user.name && item.user.lastName"
              class="white--text"
            >
              {{
                item.user.name.charAt(0).toUpperCase() +
                  item.user.lastName.charAt(0).toUpperCase()
              }}
            </span>
            <span v-else-if="!item.user.name" class="white--text">
              {{ item.user.email.charAt(0).toUpperCase() }}
            </span>
          </v-avatar>
        </v-btn>
      </template>
      <template #[`item.userName`]="{ item }">
        <v-list-item-content v-if="item.isActive === 'ACTIVE'">
          <v-list-item-title class="mb-0">
            {{ item.user.name }} {{ item.user.lastName }}
            <b>
              {{ item.role.type === 'OTHER' ? '' : '(Admin)' }}
            </b>
          </v-list-item-title>
          <v-list-item-subtitle class="button">
            {{ item.user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content v-if="item.isActive === 'PENDING'">
          <v-list-item-title class="button mb-0">
            (Esperando confirmación)
          </v-list-item-title>
          <v-list-item-subtitle class="button">
            {{ item.user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content v-if="item.isActive === 'INACTIVE'">
          <v-list-item-title class="button mb-0">
            {{ item.user.name }} {{ item.user.lastName }} (Inactivo)
          </v-list-item-title>
          <v-list-item-subtitle class="button">
            {{ item.user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
      <template #[`item.group`]="{ item }">
        {{ item.group ? item.group.name : 'Sin grupo' }}
      </template>
      <template #[`item.userStatus`]="{ item }">
        <v-list-item-title v-if="item.isActive === 'ACTIVE'">
          <v-icon x-small class="mb-1 success--text">
            mdi-checkbox-blank-circle
          </v-icon>
          Activo
        </v-list-item-title>
        <v-list-item-title v-if="item.isActive === 'PENDING'">
          <v-icon x-small class="mb-1 orange--text">
            mdi-checkbox-blank-circle
          </v-icon>
          Pendiente
        </v-list-item-title>
        <v-list-item-title v-if="item.isActive === 'INACTIVE'">
          <v-icon x-small class="mb-1">mdi-checkbox-blank-circle</v-icon>
          Inactivo
        </v-list-item-title>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-menu open-on-hover left bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="secondary" tile v-on="on">
              Acciones
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-show="item.isActive === 'PENDING' ? false : true"
              link
              @click="userActions('showProfile', item)"
            >
              <v-list-item-title>
                Ver usuario
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="item.role.type === 'OTHER'"
              :disabled="groupsLength <= 1 ? true : false"
              v-show="data.type === 'GROUP'"
              link
              @click="userActions('changeUserOfGroup', item)"
            >
              <v-list-item-title>
                Cambiar usuario a otro grupo
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="item.role.type === 'OTHER'"
              :disabled="rolesLength <= 1 ? true : false"
              v-show="data.type === 'ROLE'"
              link
              @click="userActions('changeUserOfRole', item)"
            >
              <v-list-item-title>
                Cambiar usuario a otro rol
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="item.role.type === 'OTHER'"
              v-show="
                data.type === 'ALL_USERS'
                  ? item.isActive === 'PENDING'
                    ? true
                    : true
                  : false
              "
              link
              @click="userActions('deleteUserWhitEnterprise', item)"
            >
              <v-list-item-title>
                {{
                  item.isActive === 'PENDING'
                    ? 'Cancelar invitación'
                    : 'Eliminar de mi empresa'
                }}
              </v-list-item-title>
            </v-list-item>
            <!-- <v-list-item
              v-if="item.role.type === 'OTHER'"
              v-show="
                data.type === 'ALL_USERS'
                  ? item.isActive === 'PENDING'
                    ? false
                    : true
                  : false
              "
              link
              @click="userActions('changeStatus', item)"
            >
              <v-list-item-title>
                {{
                  item.isActive === 'ACTIVE'
                    ? 'Pausar cuenta'
                    : item.isActive === 'INACTIVE'
                    ? 'Activar cuenta'
                    : ''
                }}
              </v-list-item-title>
            </v-list-item> -->
          </v-list>
        </v-menu>
      </template>
      <template v-slot:no-data>
        <div class="d-flex justify-center">
          <v-card flat width="30em">
            <div class="pa-12 text-center">
              <v-icon x-large>{{ error.icon }}</v-icon>
              <p class="text-h5 mt-2">
                {{ error.title }}
              </p>
              <p>{{ error.message }}</p>
              <v-btn color="secondary" @click="userAdd">
                Agregar
              </v-btn>
            </div>
          </v-card>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'UsersDataTable',
  props: {
    data: {
      type: [Object, Array],
      default: () => {
        return [];
      },
    },
    headers: {
      type: [Object, Array],
    },
    groupsLength: {
      type: Number,
      isRequired: false,
      default: () => {
        return 0;
      },
    },
    rolesLength: {
      type: Number,
      isRequired: false,
      default: () => {
        return 0;
      },
    },
    error: {
      type: Object,
      default: () => {
        return {
          icon: 'mdi-account-search-outline',
          title: '',
          message: 'No se encontraron usuarios',
        };
      },
    },
  },
  data() {
    return {
      search: '',
      loading: false,
    };
  },
  methods: {
    openProfile(user) {
      this.$emit('openProfile', user);
    },
    deleteItem(item, typeTable) {
      this.$emit('deleteItem', { item, typeTable });
    },
    editItem(item) {
      this.$emit('editItem', item);
    },
    userActions(type, item) {
      this.$emit('userActions', type, item);
    },
    userAdd() {
      this.$emit('add');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .background-grey .users-table } from ../../../../scss/components/users.data.table';
</style>
