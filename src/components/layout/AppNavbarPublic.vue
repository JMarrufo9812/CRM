<template>
  <v-app-bar app color="primary">
    <v-img
      src="../../assets/images/CERVUS-LOGO.png"
      max-height="50"
      max-width="95"
      contain
    ></v-img>

    <v-spacer></v-spacer>
    <v-btn
      text
      v-for="item in items"
      :key="item.text"
      :to="item.href"
      class="mr-2"
      color="white"
    >
      {{ item.text }}
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn tile @click="openModalSignUp" color="white" class="mr-6" outlined>
      Regístrate
    </v-btn>
    <v-btn tile to="/login" class="mr-12" color="secondary">
      Iniciar sesión
    </v-btn>
    <ModalSignUp @close="modalHandlerAlert" />
    <BaseModalAlert
      :modalHandler="modalAlert"
      @confirm="alertConfirmation"
      @close="modalHandlerAlert"
    ></BaseModalAlert>
  </v-app-bar>
</template>

<script>
import ModalSignUp from '@/components/signUp/ModalSignUp.vue';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { modalMethodsMixin } from '@/mixins/modalsMixin';

export default {
  name: 'AppNavbarPublic',
  mixins: [modalsAlertsMixin, modalMethodsMixin],
  components: {
    ModalSignUp,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    openModalSignUp() {
      this.changeModal({
        id: 'signUp',
        status: true,
      });
    },
    closeModalSignUp() {
      this.changeModal({
        id: 'signUp',
        status: false,
      });
    },
    alertConfirmation({ message, info }) {
      this.modalHandlerAlert({
        isOpen: false,
        isLoading: false,
        message,
        info,
      });
      this.closeModalSignUp();
    },
  },
};
</script>
