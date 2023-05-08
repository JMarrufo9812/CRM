<template>
  <v-select
    v-model="user.id"
    :prepend-icon="field.icon"
    :items="ownersList"
    :item-text="({ user }) => `${user.name} ${user.lastName}`"
    :item-value="(user) => user.id"
    @change="updateValue"
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
  ></v-select>
</template>

<script>
import { USERS_LIST } from '@/graphql/querys/usersQuery';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';

import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldSelectUserFilter',
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
  },
  data() {
    return {
      user: { id: '' },
    };
  },
  watch: {
    resetHandler(value) {
      if (value) {
        this.defaultValue();
        this.updateValue();
      } else this.resetValues();
    },
    userCurrent() {
      this.defaultValue();
      this.updateValue();
    },
  },
  methods: {
    updateValue() {
      this.field.value = this.user.id;
    },
    defaultValue() {
      this.user.id = this.userCurrent.id;
    },
    resetValues() {
      delete this.field.value;
      this.user.id = '';
    },
  },
  apollo: {
    ownersList: {
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
