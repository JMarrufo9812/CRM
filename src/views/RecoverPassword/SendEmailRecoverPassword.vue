<template>
  <div class="d-flex" style="height:100%">
    <div style="width: 60%;">
      <v-card
        outlined
        tile
        color="#EBEBEB"
        style="margin-right: 5rem; margin-left: 5rem"
        v-show="!isSendEmail && !error.show"
      >
        <v-card-title class="title-reset-password pb-12">
          Restablece tu contraseña
        </v-card-title>
        <v-card-text>
          <v-form
            v-model="isValidate"
            ref="formEmail"
            @submit="sendEmail"
            onSubmit="return false;"
          >
            <v-text-field
              v-model="email"
              class="input-password"
              :error-messages="emailErrorMessage"
              :rules="rules.emailRequired"
              label="Correo"
              required
              solo
              flat
            ></v-text-field>
            <v-btn
              :loading="this.isLoading"
              @click="sendEmail"
              color="secondary"
              tile
              class="mt-4"
            >
              Restrablecer contraseña
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <v-card
        outlined
        tile
        color="#EBEBEB"
        style="margin-right: 5rem; margin-left: 5rem"
        v-show="isSendEmail && !error.show"
      >
        <v-card-title class=" title-reset-password justify-center">
          <v-icon class="col-12 text-center pa-0" x-large>
            mdi-email-send-outline
          </v-icon>
          Se envió el correo de recuperación
        </v-card-title>
        <v-card-subtitle class="text-center pt-4">
          Revisa tu bandeja de entrada y sigue las instrucciones para cambiar tu
          contraseña.
        </v-card-subtitle>
        <v-card-actions class="d-flex justify-center">
          <v-btn to="/login" color="secondary" tile>
            Volver a pagina principal
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div class="d-flex align-end justify-end white" style="width: 40%;">
      <v-img
        src="../../assets/images/horse-2.svg"
        style="max-height:90%; max-width: 70%"
      ></v-img>
    </div>
  </div>
</template>

<script>
import { RECOVER_PASSWORD } from '@/graphql/mutations/passwordMutations';
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'sendEmailRecoverPassword',
  components: {
    // BaseErrorComponent: () => import('@/components/ui/BaseErrorComponent.vue'),
  },
  mixins: [rulesMixin],
  data() {
    return {
      isValidate: true,
      email: '',
      isLoading: false,
      isSendEmail: false,
      emailErrorMessage: '',
      error: {
        show: false,
        icon: 'mdi-alert',
        colorIcon: 'error',
        title: '',
        message: '',
      },
    };
  },
  watch: {
    email() {
      this.cleanEmailErrorMessage();
    },
  },
  methods: {
    sendEmail() {
      this.$refs.formEmail.validate();
      if (this.isValidate) {
        this.isLoading = true;
        this.$apollo
          .mutate({
            mutation: RECOVER_PASSWORD,
            variables: {
              input: {
                email: this.email,
              },
            },
          })
          .then(() => {
            this.isLoading = false;
            this.isSendEmail = true;
          })
          .catch(({ graphQLErrors }) => {
            const [{ statusCode }] = graphQLErrors;
            if (statusCode === 404)
              this.emailErrorMessage = 'Éste correo no está registrado';
            else {
              this.error.show = true;
              this.error.message =
                'Ha ocurrido un error intente nuevamente o contacte a soporte';
            }
            this.isLoading = false;
            this.isSendEmail = false;
          });
      }
    },
    cleanEmailErrorMessage() {
      this.emailErrorMessage = '';
    },
    cleanError() {
      this.error = {
        show: false,
        icon: 'mdi-alert',
        colorIcon: 'error',
        title: '',
        message: '',
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import '{  .title-reset-password, .input-password  } from  ../../../../scss/views/send.email.recover.password';
</style>
