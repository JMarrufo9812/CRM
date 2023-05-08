<template>
  <v-card flat height="100%">
    <v-card
      flat
      v-for="(permission, index) in permissions"
      :key="permission.name"
      class="mx-4 mt-4"
    >
      <v-card-subtitle class="pb-0">
        {{ permission.name }}
      </v-card-subtitle>
      <v-card-actions>
        <v-select
          :disabled="loading"
          @change="outData"
          v-model="selectedPermissions[index]"
          outlined
          :items="permission.methods"
          item-text="label"
          :item-value="
            (method) => ({ name: permission.name, label: method.label })
          "
        ></v-select>
      </v-card-actions>
    </v-card>
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
      selectedPermissions: [],
      newPermissions: [],
    };
  },
  watch: {
    permissions: {
      immediate: true,
      handler(newVal) {
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
      },
    },
  },
  methods: {
    outData() {
      if (this.selectedPermissions.length > 0) {
        this.newPermissions = this.newPermissions.map((newPermissions) => {
          const getEnabled = this.selectedPermissions.find(
            (selectedPermission) =>
              selectedPermission.name === newPermissions.name,
          );
          // eslint-disable-next-line no-param-reassign
          newPermissions.methods = newPermissions.methods.map((method) => {
            method.isEnabled = false; // eslint-disable-line no-param-reassign
            return method;
          });

          if (getEnabled) {
            // eslint-disable-next-line no-param-reassign
            newPermissions.methods = newPermissions.methods.map((method) => {
              // eslint-disable-line no-param-reassign
              if (method.label === getEnabled.label) {
                method.isEnabled = true; // eslint-disable-line no-param-reassign
              }
              return method;
            });
          }
          return newPermissions;
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
// @import '{ .scroll } from ../../../../scss/components/list.group.permissions';
</style>
