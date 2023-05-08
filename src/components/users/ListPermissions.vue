<template>
  <v-card tile outlined height="95%" class="scroll">
    <v-list v-for="permission in permissionsData" :key="permission.name">
      <div class="d-flex align-center ml-4">
        <v-switch
          v-model="permission.isEnabled"
          @change="selectedGroupPermissions(permission)"
          color="secondary"
          inset
          :disabled="isLoading"
        ></v-switch>
        <span class="ml-2 title-group-permissions">{{ permission.name }}</span>
      </div>
      <v-list-item v-for="method in permission.methods" :key="method.label">
        <v-list-item-action>
          <v-switch
            v-model="selectedPermissions"
            inset
            dense
            color="secondary"
            :value="{ name: permission.name, label: method.label }"
            @change="outPermissions"
            :disabled="isLoading"
          ></v-switch>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            {{ method.label }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'ListPermissions',
  props: {
    permissions: {
      required: true,
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    isModal: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    loading: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      permissionsData: [],
      selectedPermissions: [],
      newPermissions: [],
      isLoading: false,
    };
  },
  watch: {
    permissions: {
      immediate: true,
      handler(newVal) {
        this.permissionsData = newVal.map((permission) => {
          const allPermissionsSelected = !permission.methods.some(
            (method) => !method.isEnabled,
          );
          if (allPermissionsSelected) {
            // eslint-disable-next-line
            permission.isEnabled = true;
          } else {
            // eslint-disable-next-line
            permission.isEnabled = false;
          }
          return permission;
        });
        // rompe la reactividad
        this.newPermissions = JSON.parse(JSON.stringify(newVal));
        const selectedPermissions = this.permissions
          .map((permission) => {
            const methods = permission.methods
              .filter((method) => {
                return method.isEnabled;
              })
              .map((method) => {
                return { name: permission.name, label: method.label };
              });
            return methods;
          })
          .filter((isEmpty) => {
            return isEmpty.length > 0;
          });
        this.selectedPermissions = [].concat(...selectedPermissions);
        this.isLoading = false;
      },
    },
  },
  methods: {
    selectedGroupPermissions({ methods, name, isEnabled }) {
      if (isEnabled) {
        methods.forEach((method) => {
          const existPermissionInArray = this.selectedPermissions.some(
            (methodSelected) =>
              methodSelected.label === method.label &&
              methodSelected.name === method.name,
          );
          if (!existPermissionInArray) {
            this.selectedPermissions.push({ name, label: method.label });
          }
        });
      } else {
        this.selectedPermissions = this.selectedPermissions.filter(
          (methodSelected) => methodSelected.name !== name,
        );
      }
      this.outPermissions();
    },
    outPermissions() {
      this.isLoading = true;
      if (this.selectedPermissions.length > 0) {
        this.newPermissions = this.newPermissions.map((newPermission) => {
          const { name: permissionName, methods } = newPermission;
          // buscamos el permiso con el name
          const findPermission = this.selectedPermissions.find(
            ({ name: namePermissionSelected }) => {
              return permissionName === namePermissionSelected;
            },
          );
          if (findPermission) {
            const findMethods = methods.map((method) => {
              const findLabel = this.selectedPermissions.find(
                ({ name, label }) => {
                  return label === method.label && name === permissionName;
                },
              );
              if (findLabel) {
                method.isEnabled = true; // eslint-disable-line no-param-reassign
              } else {
                method.isEnabled = false; // eslint-disable-line no-param-reassign
              }
              return method;
            });
            newPermission.methods = findMethods; // eslint-disable-line no-param-reassign
          } else {
            // eslint-disable-next-line no-param-reassign
            newPermission.methods = newPermission.methods.map((method) => {
              method.isEnabled = false; // eslint-disable-line no-param-reassign
              return method;
            });
          }
          return newPermission;
        });
      } else {
        this.newPermissions = this.newPermissions.map((permission) => {
          const { methods } = permission;
          const disabledMethods = methods.map((method) => {
            method.isEnabled = false; // eslint-disable-line no-param-reassign
            return method;
          });
          permission.methods = disabledMethods; // eslint-disable-line no-param-reassign
          return permission;
        });
      }
      const [{ typePermission }] = this.newPermissions;
      this.$emit('emitPermissions', typePermission, this.newPermissions);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '{ .scroll .title-group-permissions} from ../../../../scss/components/list.permissions';
</style>
