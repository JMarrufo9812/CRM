<template>
  <v-dialog
    v-model="modalHandler.isOpen"
    persistent
    max-width="480px"
    scrollable
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between primary white--text ">
        <span>
          selecciona el usuario que deseas mover
        </span>
        <v-icon @click="close" color="white">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text class="pt-10">
        <v-select
          v-model="userSelected"
          outlined
          label="usuarios"
          :items="users"
          :item-text="
            ({ user }) => (user ? `${user.name} ${user.lastName}` : '')
          "
          :item-value="(user) => user.id"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-col align="end">
          <v-btn
            @click="close"
            class="mr-8"
            large
            tile
            outlined
            color="primary"
          >
            cancelar
          </v-btn>
          <v-btn
            @click="outData"
            large
            tile
            normal
            color="secondary"
            :loading="modalHandler.isLoading"
            :disabled="!userSelected"
          >
            Guardar
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import { GET_MY_USERS } from '@/graphql/querys/usersQuery';

export default {
  props: {
    // manejador de modal
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false, info: {} };
      },
    },
  },
  data() {
    return {
      userSelected: '',
      getMyUsers: [],
      userCurrent: {},
    };
  },
  computed: {
    users() {
      if (this.modalHandler.info.type === 'GROUP') {
        return this.getMyUsers;
      }
      return this.getMyUsers.filter(({ id }) => id !== this.userCurrent.id);
    },
  },
  watch: {
    modalHandler({ isOpen }) {
      if (!isOpen) {
        this.resetHandler();
      }
    },
  },
  methods: {
    outData() {
      if (this.modalHandler.info.type === 'GROUP') {
        this.$emit('outData', {
          id: this.userSelected,
          role: {},
          group: { id: this.modalHandler.info?.id },
        });
      }
      if (this.modalHandler.info.type === 'ROLE') {
        this.$emit('outData', {
          id: this.userSelected,
          group: {},
          role: { id: this.modalHandler.info?.id },
        });
      }
    },
    // cierra el modal
    close() {
      this.$emit('close', { isOpen: false, isLoading: false, info: {} });
    },
    resetHandler() {
      this.userSelected = '';
    },
  },
  apollo: {
    getMyUsers: {
      query: GET_MY_USERS,
      fetchPolicy: 'no-cache',
    },
    userCurrent: {
      query: GET_USER_LOGGED,
    },
  },
};
</script>
