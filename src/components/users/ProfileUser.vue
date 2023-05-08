<template>
  <v-navigation-drawer
    v-model="profile.isOpen"
    temporary
    right
    app
    clipped
    width="360"
  >
    <v-row class="primary">
      <v-col cols="6" class="mt-2">
        <v-icon @click="close" class="white--text ml-5">
          mdi-arrow-left
        </v-icon>
      </v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col cols="12" align="center">
        <v-avatar size="90" color="secondary">
          <img
            v-if="
              profile.info.user &&
                profile.info.user.config &&
                profile.info.user.config.profileUrl
            "
            :src="profile.info.user.config.profileUrl"
          />
          <span
            v-else-if="
              profile.info.user &&
                profile.info.user.name &&
                profile.info.user.lastName
            "
            class="white--text"
          >
            {{
              profile.info.user
                ? profile.info.user.name.charAt(0).toUpperCase()
                : ''
            }}
            {{
              profile.info.user
                ? profile.info.user.lastName.charAt(0).toUpperCase()
                : ''
            }}
          </span>
        </v-avatar>
      </v-col>
      <v-col cols="12" align="center">
        <v-list-item-title>
          {{ profile.info.user ? profile.info.user.name : '' }}
          {{ profile.info.user ? profile.info.user.lastName : '' }}
          <b>
            {{
              profile.info.role
                ? profile.info.role.type === 'OTHER'
                  ? ''
                  : '(Admin)'
                : ''
            }}
          </b>
        </v-list-item-title>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-list>
      <!-- correo -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Correo</v-list-item-title>
          <v-list-item-subtitle>
            {{ profile.info.user ? profile.info.user.email : '' }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- grupo -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Grupo</v-list-item-title>
          <v-list-item-subtitle>
            {{
              profile.info.group
                ? profile.info.group.name
                : 'Error al cargar el nombre del grupo'
            }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-edit-dialog
          cancel-text="cancelar"
          save-text="Guardar"
          @close="resetValues"
          @cancel="resetValues"
          @save="updateUser"
          large
        >
          <v-btn
            v-show="
              profile.info
                ? profile.info.role
                  ? profile.info.role.type === 'OTHER'
                  : false
                : false
            "
            class="ml-4 secondary"
            x-small
            tile
            left
          >
            Cambiar grupo
          </v-btn>
          <template v-slot:input>
            <v-select
              v-model="dataToUpdate.group"
              label="Grupos"
              single-line
              :items="groupsToSelect"
              :item-text="({ name }) => name"
              :item-value="({ id }) => id"
            ></v-select>
          </template>
        </v-edit-dialog>
      </v-list-item>
      <!-- rol -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Rol
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ profile.info.user ? profile.info.role.name : '' }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-edit-dialog
          cancel-text="cancelar"
          save-text="Guardar"
          @close="resetValues"
          @cancel="resetValues"
          @save="updateUser"
          large
        >
          <v-btn
            v-show="
              profile.info
                ? profile.info.role
                  ? profile.info.role.type === 'OTHER'
                  : false
                : false
            "
            class="ml-4 secondary"
            x-small
            tile
            left
          >
            cambiar rol
          </v-btn>
          <template v-slot:input>
            <v-select
              v-model="dataToUpdate.role"
              label="Roles"
              single-line
              :items="rolesToSelect"
              :item-text="({ name }) => name"
              :item-value="({ id }) => id"
            ></v-select>
          </template>
        </v-edit-dialog>
      </v-list-item>
      <v-list-item
        v-for="(phone, index) in profile.info.user
          ? profile.info.user.phones
            ? profile.info.user.phones
            : ''
          : ''"
        :key="index"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{
              profile.info.user.phones
                ? 'Teléfono \t' + (index + 1)
                : 'Ningún telefono todavía'
            }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ phone.number }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'ProfileUser',
  props: {
    profile: {
      required: true,
      type: [Array, Object],
      default: () => {
        return {
          isOpen: false,
          isLoading: false,
          info: { user: { config: {} } },
        };
      },
    },
    roles: {
      required: true,
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    groups: {
      required: true,
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      rolesToSelect: [],
      groupsToSelect: [],
      dataToUpdate: {
        role: '',
        group: '',
      },
    };
  },
  watch: {
    profile({ info: { role, group } }) {
      if (!this.profile.isOpen) {
        this.resetValues();
      } else {
        this.rolesToSelect = this.roles.filter(
          (roledb) => role.id !== roledb.id,
        );
        this.groupsToSelect = this.groups.filter(
          (groupdb) => group.id !== groupdb.id,
        );
      }
    },
  },
  methods: {
    updateUser() {
      const { id, user } = this.profile.info;
      const userToUpdate = {
        id,
        user: {
          id: user.id,
        },
        role: {
          id: this.dataToUpdate.role,
        },
        group: {
          id: this.dataToUpdate.group,
        },
      };
      this.$emit('updateUser', userToUpdate);
    },
    close() {
      this.$emit('close', {
        isOpen: false,
        isLoading: false,
        info: this.profile.info,
      });
    },
    resetValues() {
      this.dataToUpdate = {
        role: '',
        group: '',
      };
    },
  },
};
</script>
