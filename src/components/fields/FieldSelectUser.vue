<template>
  <v-select
    v-model="user.id"
    :menu-props="{
      value: menu,
      top: false,
      offsetY: true,
    }"
    @click="clickOnTextField"
    @blur="menu = false"
    @change="updateValue"
    :prepend-icon="field.icon"
    :items="ownersList"
    :item-text="({ user }) => `${user.name} ${user.lastName}`"
    :item-value="(user) => user.id"
    :rules="field.isRequired ? rules.isRequired : []"
    persistent-hint
    hide-details="auto"
    :dense="inputProps ? inputProps.isDense : false"
    outlined
    :class="[
      inputProps ? inputProps.class : '',
      field.isRequired ? 'required' : '',
    ]"
    :label="field.label || 'Propietario'"
    :disabled="!canEditOwner"
  ></v-select>
</template>

<script>
import ability from '@/services/ability';
import { USERS_LIST } from '@/graphql/querys/usersQuery';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';

import { rulesMixin } from '@/mixins/rulesMixin';
import { PERMISSIONS_ADMIN } from '@/constants/permissions';
import { TO_ASSIGN } from '@/constants/methods';

export default {
  name: 'FieldSelectUser',
  mixins: [rulesMixin],
  props: {
    field: {
      type: Object,
      required: true,
    },
    inputProps: {
      type: Object,
      required: false,
    },
    resetHandler: {
      type: Boolean,
      default: false,
    },
    isScrolled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menu: false,
      user: { id: '' },
    };
  },
  watch: {
    isScrolled(value) {
      if (value) this.menu = false;
    },
    resetHandler(value) {
      if (value) {
        this.defaultValue();
        this.updateValue();
        this.$apollo.queries.ownersList.refetch();
      } else this.resetValues();
    },
    userCurrent() {
      this.defaultValue();
      this.updateValue();
    },
  },
  computed: {
    canEditOwner() {
      return ability.can(TO_ASSIGN, PERMISSIONS_ADMIN);
    },
  },
  methods: {
    updateValue() {
      this.field.value = this.user;
      this.menu = false;
    },
    defaultValue() {
      this.user.id = this.userCurrent.id;
    },
    resetValues() {
      delete this.field.value;
      this.user.id = '';
    },
    clickOnTextField() {
      this.menu = !this.menu;
      this.$emit('scrolled', false);
    },
  },
  apollo: {
    ownersList: {
      fetchPolicy: 'no-cache',
      query: USERS_LIST,
    },
    userCurrent: {
      query: GET_USER_LOGGED,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .no-icon } from ../../../../scss/components/fields';
</style>
