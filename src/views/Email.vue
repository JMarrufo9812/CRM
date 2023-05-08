<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4" md="2" class="py-0 px-0" style="min-height:45em">
        <v-navigation-drawer permanent width="100%">
          <div
            v-if="hasEmailIntegration"
            class="d-flex justify-center pt-6 pb-10"
          >
            <v-btn color="secondary" @click="openModalSendEmail">
              <v-icon>mdi-plus</v-icon>
              Redactar
            </v-btn>
          </div>
          <v-list>
            <v-list-item
              v-for="[icon, text, url] in links"
              :key="icon"
              link
              :to="{ path: `${url}` }"
              exact
              color="secondary"
            >
              <div class="d-flex pl-4">
                <v-icon class="mr-2">{{ icon }}</v-icon>
                <v-list-item-title>{{ text }}</v-list-item-title>
              </div>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="8" md="10">
        <ModalEmail></ModalEmail>
        <ModalEmailTemplate></ModalEmailTemplate>
        <router-view v-if="hasEmailIntegration"></router-view>
        <div v-else style="height: 100%;" class="d-flex align-center">
          <v-row class="">
            <v-col class="text-center">
              <p>Para poder ver este apartado necesitas vincular tu correo</p>
              <v-btn color="success" @click="goIntegrationEmail">
                Ir a integración de correo
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { modalMethodsMixin } from '@/mixins/modalsMixin';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import ModalEmail from '@/components/emails/ModalEmail.vue';
import ModalEmailTemplate from '@/components/emails/ModalEmailTemplate.vue';

export default {
  name: 'Email',
  mixins: [modalMethodsMixin],
  components: {
    ModalEmail,
    ModalEmailTemplate,
  },
  data() {
    return {
      userCurrent: {},
      drawer: true,
      links: [
        ['mdi-email', 'Recibidos', '/email/inbox'],
        ['mdi-send', 'Enviados', '/email/sent'],
        ['mdi-information', 'Spam', '/email/spam'],
        ['mdi-delete', 'Papelera', '/email/trash'],
        [' mdi-format-text-rotation-none ', 'Plantillas', '/email/templates'],
      ],
    };
  },
  computed: {
    hasEmailIntegration() {
      return this.userCurrent.integrations.some(
        (integration) => integration.name === 'googleGmail',
      );
    },
  },
  methods: {
    openModalSendEmail() {
      this.changeModal({ id: 'sendEmail', status: true });
    },
    goIntegrationEmail() {
      this.$router.push('/settings/email');
    },
  },
  apollo: {
    userCurrent: {
      query: GET_USER_LOGGED,
    },
  },
};
</script>
