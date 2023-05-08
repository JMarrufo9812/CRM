<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <v-icon class="mr-1">
          mdi-account-circle
        </v-icon>
        {{ selectedOwner }}
      </v-btn>
    </template>
    <v-card tile>
      <v-card-title class="py-1 title-menu">
        Asignar a
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-autocomplete
          v-model="ownerId"
          :items="ownersList"
          :loading="isLoading"
          :item-text="(data) => `${data.user.name} ${data.user.lastName}`"
          item-value="id"
          outlined
          dense
          hide-details="auto"
          no-data-text="No se encuentran usuarios"
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined small @click="cancel" class="mr-3">
          Cancelar
        </v-btn>
        <v-btn color="secondary" small @click="updateOwner()">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { USERS_LIST } from '@/graphql/querys/usersQuery';

export default {
  name: 'MenuOwner',
  props: {
    ownerDefaultId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      ownerId: '',
      isOpenMenuOwner: false,
      ownersList: [],
      isLoading: false,
    };
  },
  watch: {
    ownerDefaultId: {
      handler(newOwner) {
        this.ownerId = newOwner;
      },
      immediate: true,
    },
  },
  computed: {
    selectedOwner() {
      const selectedOwner = this.getOwner();
      if (selectedOwner && selectedOwner.user) {
        return `${selectedOwner.user.name} ${selectedOwner.user.lastName}`;
      }
      return '';
    },
  },
  methods: {
    getOwner() {
      if (this.ownersList.length) {
        return this.ownersList.find((owner) => owner.id === this.ownerId);
      }
      return '';
    },
    close() {
      this.menu = false;
    },
    cancel() {
      this.close();
      this.ownerId = this.ownerDefaultId;
    },
    updateOwner() {
      this.$emit('updateOwner', this.getOwner());
      this.close();
    },
  },
  apollo: {
    ownersList: {
      query: USERS_LIST,
      fetchPolicy: 'no-cache',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .title-menu } from ../../../../scss/components/menu.owner';
</style>
