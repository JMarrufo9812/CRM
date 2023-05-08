<template>
  <v-dialog
    v-model="modal.status"
    @click:outside="close"
    max-width="800px"
    persistent
  >
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          Cuéntanos sobre ti
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">
          Cuéntanos sobre tu empresa
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Responde algunas preguntas</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="formUser" v-model="isValidate">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    :rules="rules.general"
                    outlined
                    label="Nombre(s)"
                    v-model="signUp.user.name"
                    class="required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :rules="rules.general"
                    outlined
                    label="Apellido(s)"
                    v-model="signUp.user.lastName"
                    class="required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    :rules="rules.emailRequired"
                    outlined
                    validate-on-blur
                    label="Correo"
                    @input="checkEmail(signUp.user.email)"
                    v-model="signUp.user.email"
                    :loading="isLoadingCheckEmail"
                    :error-messages="
                      existEmail ? 'Este correo ya está registrado' : ''
                    "
                    class="required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :rules="rules.password"
                    hint="Al menos 8 carácteres. Combina letras y números."
                    persistent-hint
                    validate-on-blur
                    counter
                    outlined
                    label="Contraseña nueva"
                    v-model="signUp.user.password"
                    :type="isShowPassword ? 'text' : 'password'"
                    :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="isShowPassword = !isShowPassword"
                    class="required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    :rules="rules.isRequired"
                    v-model="confirmPassword"
                    counter
                    @keyup="verificationPassword"
                    :error="errorPassword"
                    :error-messages="
                      errorPassword ? 'Las contraseñas no coinciden.' : ''
                    "
                    :type="isShowPasswordConfirmation ? 'text' : 'password'"
                    :append-icon="
                      isShowPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append="
                      isShowPasswordConfirmation = !isShowPasswordConfirmation
                    "
                    outlined
                    label="Confirmar contraseña"
                    class="required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row
                v-for="(phone, index) in signUp.user.phones"
                :key="`${index}-phone`"
              >
                <v-col cols="12" md="6">
                  <v-text-field
                    :rules="rules.phoneNumber"
                    v-model="phone.number"
                    type="tel"
                    counter="10"
                    maxlength="10"
                    outlined
                    :label="
                      signUp.user.phones.length > 1
                        ? `Teléfono ${index + 1}`
                        : 'Teléfono'
                    "
                    v-mask="'##########'"
                    class="required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex justify-center" cols="12" md="6">
                  <v-btn
                    @click="addNewPhoneUser"
                    outlined
                    tile
                    small
                    v-if="index === 0"
                    :disabled="signUp.user.phones.length >= 3"
                  >
                    <v-icon class="mr-2">mdi-phone-plus-outline</v-icon>
                    Añadir otro teléfono
                  </v-btn>
                  <v-btn
                    v-else
                    @click="deletePhoneUser(index)"
                    outlined
                    tile
                    color="error"
                    small
                  >
                    <v-icon class="mr-2">mdi-phone-minus</v-icon>
                    Eliminar Teléfono
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    :rules="rules.general"
                    outlined
                    label="Puesto dentro de la empresa"
                    v-model="signUp.jobTitle"
                    class="required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :rules="rules.general"
                    outlined
                    label="Ciudad"
                    v-model="signUp.user.country"
                    class="required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="d-flex justify-space-between">
                  <v-btn outlined tile @click="close">Cancelar</v-btn>
                  <v-btn color="secondary" tile @click="validateFormUser">
                    Continuar
                    <v-icon>mdi-page-last</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-form ref="formEnterprise" v-model="isValidateTwoStep">
            <v-container>
              <v-row cols="12">
                <v-col cols="12" md="6">
                  <v-text-field
                    :rules="[...rules.general, ...rules.isRequired]"
                    outlined
                    label="Nombre de tu empresa"
                    v-model="signUp.enterprise.name"
                    @input="checkEnterprise(signUp.enterprise.name)"
                    :loading="isLoadingChecking"
                    :error-messages="
                      existEnterprise
                        ? 'La empresa ya existe, intenta con otro nombre'
                        : ''
                    "
                    class="required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    :rules="rules.select"
                    outlined
                    label="Industria"
                    :items="industries"
                    :item-text="(industry) => industry.name"
                    :item-value="(industry) => industry.id"
                    v-model="signUp.enterprise.industry.id"
                    class="required"
                    hide-details="auto"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="signUp.enterprise.address"
                    :rules="rules.address"
                    outlined
                    label="Dirección de la empresa"
                    class="required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row
                v-for="(phone, index) in signUp.enterprise.phones"
                :key="`${index}-phone`"
              >
                <v-col cols="12" md="6">
                  <v-text-field
                    :rules="rules.phoneNumber"
                    v-model="phone.number"
                    type="tel"
                    counter="10"
                    maxlength="10"
                    outlined
                    :label="
                      signUp.enterprise.phones.length > 1
                        ? `Teléfono ${index + 1}`
                        : 'Teléfono'
                    "
                    v-mask="'##########'"
                    class="required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex justify-center" cols="12" md="6">
                  <v-btn
                    outlined
                    tile
                    small
                    v-if="index === 0"
                    :disabled="signUp.enterprise.phones.length >= 3"
                    @click="addNewPhoneEnterprise"
                  >
                    <v-icon class="mr-2">mdi-phone-plus-outline</v-icon>
                    Añadir otro teléfono
                  </v-btn>
                  <v-btn
                    v-else
                    outlined
                    tile
                    color="error"
                    small
                    @click="deletePhoneEnterprise(index)"
                  >
                    <v-icon class="mr-2">mdi-phone-minus</v-icon>
                    Eliminar Teléfono
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    :rules="rules.website"
                    outlined
                    label="Página web"
                    v-model="signUp.enterprise.website"
                    hint="Ejemplo: www.miempresa.com"
                    persistent-hint
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="d-flex justify-space-between">
                  <v-btn outlined tile @click="step = 1">
                    <v-icon>mdi-page-first</v-icon>
                    Atrás
                  </v-btn>
                  <v-btn tile color="secondary" @click="validateFormEnterprise">
                    Continuar
                    <v-icon>mdi-page-last</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-form ref="formQuestions" v-model="isValidate">
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  v-for="({ id, question, options }, index) in questions"
                  :key="id"
                >
                  <v-select
                    v-model="signUp.answers[index]"
                    :label="question"
                    :rules="rules.select"
                    :items="
                      options.map((answer) => {
                        return {
                          question,
                          option: answer,
                        };
                      })
                    "
                    item-text="option"
                    return-object
                    outlined
                    class="required"
                    hide-details="auto"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="d-flex justify-space-between">
                  <v-btn outlined tile @click="step = 2">
                    <v-icon>mdi-page-first</v-icon>
                    Atrás
                  </v-btn>
                  <v-btn
                    color="secondary"
                    tile
                    @click="outData"
                    :loading="isLoading"
                  >
                    Regístrarme
                    <v-icon>mdi-page-last</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>

<script>
import { SIGN_UP } from '@/graphql/mutations/authMutations';
import { GET_QUESTIONS } from '@/graphql/querys/questionsQuery';
import { GET_INDUSTRIES } from '@/graphql/querys/industriesQuery';
import { CHECK_ENTERPRISE_EXIST } from '@/graphql/querys/emailsQuery';
import { rulesMixin } from '@/mixins/rulesMixin';
import { checkEnterpriseMixin } from '@/mixins/checkEnterpriseMixin';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';

export default {
  name: 'ModalSignUp',
  mixins: [
    rulesMixin,
    checkEnterpriseMixin,
    modalMethodsMixin,
    modalApolloMixin,
  ],
  data() {
    return {
      isLoading: false,
      modalId: 'signUp',
      modal: { status: false },
      questions: [],
      industries: [],
      // posicion del formulario
      step: 1,
      // activa o desactiva la vista de la contraseña
      isShowPassword: false,
      isShowPasswordConfirmation: false,
      // indica si el password es correcto
      errorPassword: false,
      // guarda una copia del password
      confirmPassword: '',
      // manejador de validaor de los formularios
      isValidate: true,
      isValidateTwoStep: true,
      isLoadingCheckEmail: false,
      existEmail: false,
      // nuevo usuario
      signUp: {
        jobTitle: '',
        user: {
          email: '',
          password: '',
          name: '',
          lastName: '',
          country: '',
          phones: [{ number: '' }],
        },
        enterprise: {
          name: '',
          industry: {
            id: '',
          },
          address: '',
          website: '',
          phones: [{ number: '' }],
        },
        answers: [],
      },
    };
  },
  watch: {
    modal() {
      if (!this.modal.status) {
        this.reset();
      }
    },
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
    signUpMutation({ jobTitle, user, enterprise, answers }) {
      this.isLoading = true;
      this.$apollo
        .mutate({
          mutation: SIGN_UP,
          variables: {
            input: {
              jobTitle,
              user,
              enterprise,
              answers,
            },
          },
        })
        .then(() => {
          this.isLoading = false;
          this.closeModalSignUp();
          this.$router.push({
            path: '/login',
            query: { signup: true },
          });
        })
        .catch((error) => {
          this.isLoading = false;
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    deletePhoneUser(index) {
      this.signUp.user.phones.splice(index, 1);
    },
    deletePhoneEnterprise(index) {
      this.signUp.enterprise.phones.splice(index, 1);
    },
    // elimina el input de telefono
    outData() {
      this.$refs.formQuestions.validate();
      if (this.isValidate) {
        const register = JSON.parse(JSON.stringify(this.signUp));
        this.signUpMutation(register);
      }
    },
    close() {
      this.$emit('close', {
        isOpen: true,
        isLoading: false,
        message: {
          title: '¿Seguro que deseas salir?',
          text: 'Si sales en este momento toda tu información se perderá',
        },
        info: {},
      });
    },
    // valida los formularios de cada steaper
    validateFormUser() {
      this.$refs.formUser.validate();
      if (this.isValidate && !this.existEmail) {
        this.step = 2;
      }
    },
    validateFormEnterprise() {
      this.$refs.formEnterprise.validate();
      if (this.isValidateTwoStep && !this.existEnterprise) {
        this.step = 3;
      }
    },
    addNewPhoneUser() {
      if (this.signUp.user.phones.length >= 3) return;
      this.signUp.user.phones.push({ number: '' });
    },
    addNewPhoneEnterprise() {
      if (this.signUp.enterprise.phones.length >= 3) return;
      this.signUp.enterprise.phones.push({ number: '' });
    },
    // verifica el password
    verificationPassword() {
      this.errorPassword = this.confirmPassword !== this.signUp.user.password;
    },
    // reinicia todo las variables a como estaban al principio
    reset() {
      this.step = 1;
      this.signUp = {
        jobTitle: '',
        user: {
          email: '',
          password: '',
          name: '',
          lastName: '',
          country: '',
          phones: [{ number: '' }],
        },
        enterprise: {
          name: '',
          industry: {
            id: '',
          },
          address: '',
          website: '',
          phones: [{ number: '' }],
        },
        answers: [],
      };
      if (this.$refs.formUser) {
        this.$refs.formUser.reset();
        this.$refs.formEnterprise.reset();
        this.$refs.formQuestions.reset();
        this.$refs.formUser.resetValidation();
        this.$refs.formEnterprise.resetValidation();
        this.$refs.formQuestions.resetValidation();
      }
    },
    checkEmail(email) {
      if (email) {
        this.isLoadingCheckEmail = true;
        this.$apollo
          .query({
            query: CHECK_ENTERPRISE_EXIST,
            variables: {
              input: {
                email,
              },
            },
          })
          .then(({ data: { checkEmailUser } }) => {
            this.existEmail = checkEmailUser;
            this.isLoadingCheckEmail = false;
          })
          .catch(() => {
            this.isLoadingCheckEmail = false;
          });
      }
    },
  },
  apollo: {
    questions: {
      query: GET_QUESTIONS,
      fetchPolicy: 'no-cache',
      skip() {
        return !this.modal.status;
      },
    },
    industries: {
      query: GET_INDUSTRIES,
      fetchPolicy: 'no-cache',
      skip() {
        return !this.modal.status;
      },
    },
  },
};
</script>
<style lang="scss" scoped></style>
