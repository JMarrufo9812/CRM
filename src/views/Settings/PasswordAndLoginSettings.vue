<template>
  <v-card outlined width="35em">
    <v-card-title class="d-flex flex-column justify-center mt-10">
      <p class="title-password">Contraseña</p>
      <p class="text-password">
        Elija una contraseña segura y no la reutilice para otras cuentas.
      </p>
    </v-card-title>
    <v-card-text>
      <div class="d-flex justify-center">
        <v-form v-model="isValidate" ref="formPasswords">
          <v-text-field
            v-model="oldPassword"
            prepend-inner-icon="mdi-lock"
            :type="isShowOldPassword ? 'text' : 'password'"
            :rules="rules.isRequired"
            :append-icon="isShowOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="isShowOldPassword = !isShowOldPassword"
            label="Contraseña actual"
            outlined
            :error="!isValidPasswordCurrent"
            :error-messages="errorMessages"
            dense
            required
          ></v-text-field>
          <v-text-field
            v-model="newPassword"
            hint="Al menos 8 carácteres. Combina letras y números."
            persistent-hint
            validate-on-blur
            prepend-inner-icon="mdi-lock-outline"
            :rules="rules.password"
            counter
            :type="isShowNewPassword ? 'text' : 'password'"
            :append-icon="isShowNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="isShowNewPassword = !isShowNewPassword"
            label="Nueva contraseña"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="confirmNewPassword"
            prepend-inner-icon="mdi-lock-outline"
            counter
            :rules="rules.isRequired"
            :type="isShowNewPassword ? 'text' : 'password'"
            :append-icon="isShowNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="isShowNewPassword = !isShowNewPassword"
            :error="verificationPassword"
            :error-messages="
              verificationPassword ? 'Las contraseñas no coinciden' : ''
            "
            label="Confirmar nueva contraseña"
            outlined
            dense
          ></v-text-field>
        </v-form>
      </div>
      <div class="d-flex justify-center mb-12">
        <v-btn
          @click="resetPasswordInputs"
          class="mt-4 mr-2"
          large
          tile
          outlined
          color="primary"
        >
          Cancelar
        </v-btn>
        <v-btn
          :loading="loadingChangePassword"
          @click="updateUserPassword"
          class="mt-4"
          large
          tile
          color="secondary"
        >
          Cambiar contraseña
        </v-btn>
      </div>
      <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
      <v-snackbar
        v-model="snackbar.isOpen"
        :color="snackbar.color"
        :timeout="7000"
      >
        {{ snackbar.text }}
        <template v-slot:action>
          <v-btn
            text
            @click="snackbarHandler({ isOpen: false, color: '', text: '' })"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </v-card-text>
  </v-card>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { snackbarMixin } from '@/mixins/alerts/snackbarMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import { UPDATE_USER_PASSWORD } from '@/graphql/mutations/usersMutations';

export default {
  name: 'PasswordAndLoginSettigns',
  mixins: [rulesMixin, snackbarMixin, modalsAlertsMixin],
  data() {
    return {
      isValidate: true,
      isShowNewPassword: false,
      isShowOldPassword: false,
      loadingChangePassword: false,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      isValidPasswordCurrent: true,
    };
  },
  computed: {
    errorMessages() {
      return !this.isValidPasswordCurrent
        ? ['La contraseña actual es incorrecta']
        : [];
    },
    verificationPassword() {
      return this.confirmNewPassword !== this.newPassword;
    },
  },
  watch: {
    oldPassword() {
      this.isValidPasswordCurrent = true;
    },
  },
  methods: {
    updateUserPassword() {
      if (this.$refs.formPasswords.validate()) {
        const { user } = this.userCurrent;
        this.loadingChangePassword = true;
        this.$apollo
          .mutate({
            mutation: UPDATE_USER_PASSWORD,
            variables: {
              input: {
                id: user.id,
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
              },
            },
          })
          .then(
            ({
              data: {
                updateUserPassword: { message, status },
              },
            }) => {
              this.loadingChangePassword = false;
              if (status === 400) {
                const error = 'La contraseña actual es incorrecta';
                this.modalHandlerError({ isOpen: true, error });
                this.isValidPasswordCurrent = false;
              }
              if (status === 200 && message.success) {
                this.resetPasswordInputs();
                this.snackbarHandler({
                  isOpen: true,
                  color: 'success',
                  text:
                    'La contraseña se actualizo correctamente, asegúrate de introducir tu nueva contraseña la próxima vez que inicies sesión',
                });
              }
              if (status === 200 && !message.success) {
                const error =
                  'No se pudo actualizar la contraseña porque es igual a la actual por favor introduzca una contraseña diferente';
                this.modalHandlerError({ isOpen: true, error });
              }
            },
          )
          .catch((error) => {
            this.modalHandlerError({ isOpen: true, error });
            this.loadingChangePassword = false;
          });
      }
    },
    resetPasswordInputs() {
      this.$refs.formPasswords.reset();
      this.$refs.formPasswords.resetValidation();
      this.isShowNewPassword = false;
      this.isShowOldPassword = false;
      this.errorPassword = false;
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmNewPassword = '';
    },
  },
  apollo: {
    userCurrent: {
      query: GET_USER_LOGGED,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .text-password, .title-password, .inputs-user-settings } from ../../../../scss/views/password.and.login.settings';
</style>
