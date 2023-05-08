<template>
  <v-select
    v-model="ownersSelected"
    :items="userEnterprises"
    :item-text="itemText"
    label="Usuarios"
    multiple
    outlined
    dense
    hide-details="auto"
    return-object
    @change="updateSelect"
    :loading="$apollo.queries.userEnterprises.loading"
  >
    <template v-slot:prepend-item>
      <v-list-item ripple @click="toggle">
        <v-list-item-action>
          <v-icon :color="userEnterprises.length > 0 ? 'primary' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Todos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script>
import { GET_USERS_ENTERPRISE } from '@/graphql/querys/usersQuery';

export default {
  name: 'SelectUsers',
  props: {
    all: {
      type: Boolean,
      default: false,
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
  created() {
    this.ownersSelected = this.noReactive(this.defaultSelect);
    this.updateSelect();
  },
  watch: {
    defaultSelect: {
      handler(newValue, beforeValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(beforeValue)) {
          this.ownersSelected = this.noReactive(this.defaultSelect);
          this.updateSelect();
        }
      },
      immediate: true,
    },
    userEnterprises: {
      handler(list) {
        if (list.length) {
          if (this.all) {
            this.ownersSelected = list;
          } else if (this.defaulSelect && this.defaulSelect.length) {
            this.ownersSelected = this.defaultSelect;
          }
          this.updateSelect();
        }
      },
      immediate: true,
    },
  },
  computed: {
    allUsers() {
      return this.ownersSelected.length === this.userEnterprises.length;
    },
    someUsers() {
      return this.ownersSelected.length > 0 && !this.userEnterprises;
    },
    icon() {
      if (this.allUsers) return 'mdi-close-box';
      if (this.someUsers) return 'mdi-minus-box';
      return 'mdi-checkbox-blank-outline';
    },
  },
  methods: {
    itemText(item) {
      return `${item.user?.name} ${item.user?.lastName}`;
    },
    updateSelect() {
      this.$emit('change', this.noReactive(this.ownersSelected));
    },
    toggle() {
      this.$nextTick(() => {
        if (this.allUsers) {
          this.ownersSelected = [];
        } else {
          this.ownersSelected = this.userEnterprises.slice();
        }
        this.updateSelect();
      });
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
