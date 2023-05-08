<template>
  <div class="d-flex justify-center">
    <v-card tile flat width="30em" height="30em" class="settings-email-box">
      <div
        v-if="!hasEmailIntegration"
        class="d-flex flex-column align-center justify-center full-heigth px-12"
      >
        <p class="text-center">
          Sincroniza tu correo principal para hacer un seguimiento de tus tratos
          y contactos.
        </p>
        <v-btn
          v-if="!hasEmailIntegration"
          color="success"
          @click="addEmail"
          :loading="isLoadingAddEmail"
        >
          Añadir correo
        </v-btn>
      </div>
      <div class="d-flex align-center full-heigth" v-if="hasEmailIntegration">
        <div class="d-flex flex-column mx-12" style="width: 100%">
          <p class="title-email-settings">
            Sincronización de correo
          </p>
          <v-text-field readonly dense outlined :value="getEmailIntegration()">
            <template v-slot:append>
              <v-icon color="success">mdi-check-circle</v-icon>
            </template>
          </v-text-field>
          <div class="d-flex justify-end">
            <v-btn
              outlined
              class="mx-3"
              color="primary"
              @click="remove"
              :loading="isLoadingRemoveEmail"
            >
              Quitar
            </v-btn>
            <v-btn
              color="secondary"
              @click="addEmail"
              :loading="isLoadingAddEmail"
            >
              Cambiar
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>

    <v-card tile flat width="30em" height="30em">
      <div class="d-flex justify-start primary pa-4">
        <p class="title-email-settings white--text mb-0">
          Configurar firma de correo
        </p>
      </div>
      <div class="d-flex justify-center pt-6" style="height:70%">
        <EmailEditorSignature
          :signature.sync="signature"
          :signatureBefore="userEnterpriseSignature.signature"
        ></EmailEditorSignature>
        <p v-if="!isValidSignature" class="red--text">
          La firma es requerida
        </p>
      </div>
      <div class="d-flex justify-end pt-6 pr-11">
        <v-btn
          outlined
          color="primary"
          class="mr-4"
          :loading="isLoadingRemove"
          :disabled="hasSignatured"
          @click="removeSignature"
        >
          Remover firma
        </v-btn>
        <v-btn
          color="secondary"
          class="mr-3"
          :loading="isLoadingSignature"
          :disabled="!hasChanges"
          @click="saveSignature"
        >
          Guardar
        </v-btn>
      </div>
    </v-card>
    <BaseModalDeleteItem
      :dialog.sync="isOpenDelete"
      :config="configModalDelete"
      :isLoading="isLoadingDelete"
      :item="itemSelected"
      @remove="removeEmail"
    ></BaseModalDeleteItem>
  </div>
</template>

<script>
import {
  GET_TOKEN_GMAIL,
  CREATE_SIGNATURE,
  DESYNCHRONIZE_GOOGLE_GMAIL,
} from '@/graphql/mutations/emailsMutations';
import { GET_GMAIL_URI, GET_SIGNATURE } from '@/graphql/querys/emailsQuery';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import EmailEditorSignature from '@/components/emails/EmailEditorSignature.vue';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import BaseModalDeleteItem from '@/components/ui/BaseModalDeleteItem.vue';

export default {
  name: 'SettingsEmail',
  components: {
    EmailEditorSignature,
    BaseModalDeleteItem,
  },
  mixins: [modalMethodsMixin, modalApolloMixin],
  data() {
    return {
      isLoadingDelete: false,
      configModalDelete: {
        title: 'Desvincular correo',
        subtitle: 'Estas por quitar tu correo',
        description:
          'Se perderán tus datos de seguimiento del correo, ¿estás seguro?',
      },
      itemSelected: {},
      isOpenDelete: false,
      getGmailUri: '',
      userEnterpriseSignature: { signature: '' },
      signature: '',
      isValidSignature: true,
      isLoadingSignature: false,
      isLoadingRemove: false,
      isLoadingAddEmail: false,
      isLoadingRemoveEmail: false,
    };
  },
  created() {
    if (this.$route.query.code) {
      this.sendTokenGmail();
    }
  },
  computed: {
    hasChanges() {
      return (
        this.userEnterpriseSignature.signature !== this.signature &&
        this.signature !== '<div></div>'
      );
    },
    hasSignatured() {
      return !this.userEnterpriseSignature.signature.length > 0;
    },
    hasEmailIntegration() {
      return this.userCurrent.integrations.some(
        (integration) => integration.name === 'googleGmail',
      );
    },
  },
  methods: {
    getEmailIntegration() {
      if (this.userCurrent.integrations.length > 0) {
        const { email = '' } = this.userCurrent.integrations.find(
          (integration) => integration.name === 'googleGmail',
        );
        return email;
      }
      return '';
    },
    addEmail() {
      const url = this.getGmailUri;
      window.location.href = url;
    },
    remove() {
      this.itemSelected = { name: this.getEmailIntegration() };
      this.changeModal({ id: 'deleteTemplateEmail', status: true });
    },
    removeEmail() {
      this.isLoadingRemoveEmail = true;
      this.isLoadingDelete = true;
      this.$apollo
        .mutate({
          mutation: DESYNCHRONIZE_GOOGLE_GMAIL,
          update: (store, { data: { desynchronizeGoogleGmail } }) => {
            if (desynchronizeGoogleGmail) {
              const data = store.readQuery({ query: GET_USER_LOGGED });
              data.userCurrent.integrations = this.userCurrent.integrations.filter(
                (integration) => integration.name !== 'googleGmail',
              );
              store.writeQuery({ query: GET_USER_LOGGED, data });
            }
          },
        })
        .then(() => {
          this.isLoadingRemoveEmail = false;
          this.isLoadingDelete = false;
          this.changeModal({ id: 'deleteTemplateEmail', status: false });
        })
        .catch(() => {
          this.isLoadingRemoveEmail = false;
          this.isLoadingDelete = false;
          this.changeModal({ id: 'deleteTemplateEmail', status: false });
        });
    },

    sendTokenGmail() {
      this.isLoadingAddEmail = true;
      this.$apollo
        .mutate({
          // Query
          mutation: GET_TOKEN_GMAIL,
          // Parameters
          variables: {
            codeToken: this.$route.query.code,
          },
          update: (store, { data: { syncronizeGoogleGmail } }) => {
            if (syncronizeGoogleGmail.success) {
              const data = store.readQuery({ query: GET_USER_LOGGED });
              data.userCurrent.integrations.push({
                __typename: 'Integration',
                id: '',
                name: 'googleGmail',
                email: syncronizeGoogleGmail.email,
                keyItem: '',
              });
              store.writeQuery({ query: GET_USER_LOGGED, data });
            }
          },
        })
        .then(({ data: { syncronizeGoogleGmail } }) => {
          this.isLoadingAddEmail = false;
          if (!syncronizeGoogleGmail.success) {
            this.$router.push({ name: 'settings-email' });
          }
        })
        .catch(() => {
          this.isLoadingAddEmail = false;
        });
    },
    saveSignature() {
      console.log('signature: this.signature,', this.signature);
      this.isLoadingSignature = true;
      this.$apollo
        .mutate({
          // Query
          mutation: CREATE_SIGNATURE,
          // Parameters
          variables: {
            userEnterpriseInput: {
              signature: this.signature,
            },
          },
        })
        .then(() => {
          // console.log('result', result);
          this.userEnterpriseSignature.signature = this.signature;
          this.isLoadingSignature = false;
        })
        .catch(() => {
          // console.log('error', error);
          this.isLoadingSignature = false;
        });
    },
    removeSignature() {
      this.isLoadingRemove = true;
      this.$apollo
        .mutate({
          // Query
          mutation: CREATE_SIGNATURE,
          // Parameters
          variables: {
            userEnterpriseInput: {
              signature: '',
            },
          },
        })
        .then(() => {
          // console.log('result', result);
          this.userEnterpriseSignature.signature = '';
          this.isLoadingRemove = false;
        })
        .catch(() => {
          // console.log('error', error);
          this.isLoadingRemove = false;
        });
    },
  },
  apollo: {
    getGmailUri: {
      query: GET_GMAIL_URI,
    },
    userCurrent: {
      query: GET_USER_LOGGED,
    },
    userEnterpriseSignature: {
      query: GET_SIGNATURE,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .full-heigth, .title-email-settings, .settings-email-box} from ../../../../scss/views/settings.email';
</style>
