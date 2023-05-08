<template>
  <v-dialog v-model="modalHandler.isOpen" width="570" scrollable persistent>
    <v-card>
      <v-card-title class="primary d-flex justify-space-between py-6">
        <span class="white--text ml-9">
          Agregar usuario
        </span>
        <div>
          <v-icon @click="close" class="white--text">
            mdi-close
          </v-icon>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form ref="formUser" v-model="isValidate">
          <v-container>
            <v-row>
              <v-col cols="12" md="7">
                <v-text-field
                  v-model="newUser.user.email"
                  :rules="[...rules.email, ...rules.isRequired]"
                  @input="checkEmail(newUser.user.email)"
                  :loading="isLoadingCheckingUser"
                  :error-messages="
                    existEmail
                      ? 'El usuario ya está registrado en la empresa'
                      : ''
                  "
                  outlined
                  label="Correo"
                  required
                  maxlength="50"
                  counter
                  hide-details="auto"
                >
                  <template v-slot:append>
                    <v-tooltip v-if="existEmail" right max-width="10%">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">
                          mdi-information-outline
                        </v-icon>
                      </template>
                      <p>
                        Si desea volver a enviar la solicitud puede cancelarla e
                        intentar agregar de nuevo al usuario
                      </p>
                    </v-tooltip>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="5">
                <v-select
                  v-model="newUser.role.id"
                  :rules="rules.select"
                  outlined
                  :items="roles"
                  :item-text="(roles) => roles.name"
                  :item-value="(roles) => roles.id"
                  label="Rol"
                  required
                  hide-details="auto"
                ></v-select>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field
                  v-model="newUser.jobTitle"
                  :rules="rules.general"
                  counter
                  maxlength="25"
                  outlined
                  label="Puesto dentro de la empresa"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn class="mr-3" large tile outlined color="primary" @click="close">
          cancelar
        </v-btn>
        <v-btn
          large
          tile
          normal
          color="secondary"
          @click="outData"
          :loading="modalHandler.isLoading"
        >
          Enviar invitación
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { CHECK_EXIST_USER_EMAIL } from '@/graphql/querys/usersQuery';

export default {
  name: 'ModalUser',
  mixins: [rulesMixin],
  props: {
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false };
      },
    },
    roles: {
      required: true,
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      isValidate: true,
      isLoadingCheckingUser: false,
      existEmail: false,
      newUser: {
        user: {
          email: '',
        },
        role: {
          id: '',
        },
        jobTitle: '',
      },
    };
  },
  watch: {
    modalHandler({ isOpen }) {
      if (!isOpen) {
        this.resetValues();
      }
    },
  },
  methods: {
    outData() {
      this.$refs.formUser.validate();
      if (this.isValidate && !this.existEmail) {
        this.$emit('newUser', this.newUser);
      }
    },
    close() {
      this.$emit('close', { isOpen: false, isLoading: false });
      this.resetValues();
    },
    resetValues() {
      this.$refs.formUser.resetValidation();
      this.isLoadingCheckingUser = false;
      this.existEmail = false;
      this.newUser = {
        user: {
          email: '',
        },
        role: {
          id: '',
        },
        jobTitle: '',
      };
    },
    checkEmail(email) {
      if (email) {
        this.isLoadingCheckingUser = true;
        this.$apollo
          .query({
            query: CHECK_EXIST_USER_EMAIL,
            variables: {
              input: {
                email,
              },
            },
          })
          .then(({ data: { checkExistentEmailUser } }) => {
            this.existEmail = checkExistentEmailUser;
            this.isLoadingCheckingUser = false;
          })
          .catch(() => {
            this.isLoadingCheckingUser = false;
          });
      }
    },
  },
};
</script>
