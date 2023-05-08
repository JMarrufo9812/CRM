<template>
  <v-select
    v-model="ownersSelected"
    :items="userEnterprises"
    :label="label"
    :item-text="
      (item) => {
        return `${item.user.name} ${item.user.lastName}`;
      }
    "
    outlined
    dense
    hide-details="auto"
    return-object
    multiple
    @change="updateSelect"
  ></v-select>
</template>

<script>
import { GET_USERS_ENTERPRISE } from '@/graphql/querys/usersQuery';

export default {
  name: 'GlobalSelectUsers',
  props: {
    label: {
      type: String,
      default: 'Usuarios',
    },
    defaultSelect: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      ownersSelected: [],
      userEnterprises: [],
    };
  },
  watch: {
    defaultSelect: {
      handler(users) {
        if (users.length > 0) {
          this.ownersSelected = this.findUsers(users);
        } else {
          this.ownersSelected = [];
        }
        this.updateSelect();
      },
      immediate: true,
    },
    userEnterprises: {
      handler() {
        if (this.defaultSelect.id) {
          this.ownersSelected = this.findUsers(this.defaultSelect);
        } else {
          this.ownersSelected = [];
        }
        this.updateSelect();
      },
      immediate: true,
    },
  },
  methods: {
    findUsers(users) {
      return users.map((user) => {
        return this.findUser(user.id);
      });
    },
    findUser(id) {
      return this.userEnterprises.find((user) => user.id === id);
    },
    updateSelect() {
      this.$emit('change', this.ownersSelected);
    },
  },
  apollo: {
    userEnterprises: {
      query: GET_USERS_ENTERPRISE,
      variables: {
        filters: {
          status: 'ACTIVE',
        },
      },
    },
  },
};
</script>

<style></style>
