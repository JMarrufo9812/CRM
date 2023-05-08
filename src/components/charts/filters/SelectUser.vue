<template>
  <v-select
    v-model="ownerSelected"
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
    @change="updateSelect"
  ></v-select>
</template>

<script>
import { GET_USERS_ENTERPRISE } from '@/graphql/querys/usersQuery';

export default {
  name: 'SelectUser',
  props: {
    label: {
      type: String,
      default: 'Usuario',
    },
    defaultSelect: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      ownerSelected: '',
      userEnterprises: [],
    };
  },
  watch: {
    defaultSelect: {
      handler(user) {
        if (user && user.id) {
          this.ownerSelected = this.findUser(user.id);
        } else {
          this.ownerSelected =
            this.userEnterprises.length > 0 ? this.userEnterprises[0] : '';
        }
        this.updateSelect();
      },
      immediate: true,
    },
    userEnterprises: {
      handler() {
        if (this.defaultSelect.id) {
          this.ownerSelected = this.findUser(this.defaultSelect.id);
        } else {
          this.ownerSelected =
            this.userEnterprises.length > 0 ? this.userEnterprises[0] : '';
        }
        this.updateSelect();
      },
      immediate: true,
    },
  },
  methods: {
    findUser(id) {
      return this.userEnterprises.find((user) => user.id === id);
    },
    updateSelect() {
      this.$emit('change', this.ownerSelected);
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
