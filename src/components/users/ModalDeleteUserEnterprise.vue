<template>
  <v-dialog v-model="modalHandler.isOpen" scrollable width="40em">
    <v-card>
      <v-card-title class="primary d-flex justify-space-between py-6">
        <span class="white--text ml-2">
          Eliminar usuario
        </span>
        <div>
          <v-icon @click="close" class="white--text">
            mdi-close
          </v-icon>
        </div>
      </v-card-title>
      <div v-if="modalHandler.info.existData">
        <v-icon x-large class="justify-center">
          mdi-alert-outline
        </v-icon>
        <p>
          El usuario sera eliminado de la empresa esto significa que no podra
          acceder a la empresa y sus datos. Seleccione a continuacion a quien
          desea traspasar sus datos para que no sean eliminados. Si usted desea
          puede eliminarlos en el futuro. Esto se hace como medida de seguridad
        </p>

        <v-list>
          <p>Datos del usuario:</p>
          <v-list-item
            v-for="(value, key, index) in modalHandler.info.countList"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title v-if="key === 'contacts'">
                Contactos
                <span class="ml-6">{{ value }}</span>
              </v-list-item-title>
              <v-list-item-title v-if="key === 'companies'">
                Empresas
                <span class="ml-6">{{ value }}</span>
              </v-list-item-title>
              <v-list-item-title v-if="key === 'deals'">
                Tratos
                <span class="ml-12">{{ value }}</span>
              </v-list-item-title>
              <v-list-item-title v-if="key === 'activities'">
                Actividades
                <span class="ml-2">{{ value }}</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-select
          v-model="modalHandler.info.toUser"
          label="Transferir a:"
          :items="usersList"
          :item-text="({ user }) => `${user.name} ${user.lastName}`"
          :item-value="(user) => user.id"
          persistent-hint
          hide-details="auto"
          class="pt-4"
          outlined
        ></v-select>
      </div>
      <div v-else>
        <div class="d-flex justify-center py-2">
          <v-icon color="warning" x-large>
            mdi-alert-outline
          </v-icon>
        </div>
        <p class="text-center mb-8">
          El usuario será eliminado de la empresa esto significa que no podrá
          acceder a la empresa en el futuro. Este usuario aún no ha creado datos
          dentro de la empresa puede proceder a eliminarlo de manera segura
        </p>
      </div>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn large tile outlined color="primary" @click="close">
          cancelar
        </v-btn>
        <v-btn
          large
          tile
          color="secondary"
          @click="outData"
          class="mr-2"
          :loading="modalHandler.isLoading"
        >
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { USERS_LIST } from '@/graphql/querys/usersQuery';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';

export default {
  name: 'ModalDeleteUserEnterprise',
  props: {
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false, user: {} };
      },
    },
  },
  data() {
    return {
      usersList: [],
    };
  },
  watch: {
    modalHandler({ isOpen, info }) {
      if (isOpen && info.existData) {
        this.getUserCurrent();
        this.getListUsers();
      }
    },
  },
  methods: {
    getListUsers() {
      this.$apollo
        .query({
          query: USERS_LIST,
        })
        .then(({ data: { ownersList } }) => {
          this.usersList = ownersList.filter(
            (userEnterprise) =>
              userEnterprise.id !== this.modalHandler.info.fromUser,
          );
        });
      // .catch((error) => {
      //   console.log(error);
      // });
    },
    getUserCurrent() {
      this.$apollo
        .query({
          query: GET_USER_LOGGED,
        })
        .then(({ data: { userCurrent } }) => {
          this.modalHandler.info.toUser = userCurrent.id;
        });
      // .catch((error) => {
      //   console.log(error);
      // });
    },
    outData() {
      this.$emit('outData', {
        isOpen: true,
        isLoading: true,
        info: this.modalHandler.info,
      });
    },
    close() {
      this.$emit('close', { isOpen: false, isLoading: false, info: {} });
      this.resetValues();
    },
    resetValues() {
      this.usersList = [];
    },
  },
};
</script>

<style></style>
