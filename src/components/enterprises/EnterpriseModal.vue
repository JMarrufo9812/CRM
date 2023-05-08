<template>
  <v-dialog v-model="isOpenModal" persistent max-width="850">
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step
          :complete="isCompletedRegister"
          :editable="isCompletedRegister"
          step="1"
        >
          Registro de empresa
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          :complete="isCompletedQuestions"
          :editable="isCompletedQuestions"
          step="2"
        >
          Preguntas
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="formEnterprise" v-model="isValidateEnterprise">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :rules="rules.general"
                    outlined
                    label="Nombre de tu empresa"
                    required
                    v-model="enterprise.name"
                    counter="50"
                    maxlength="50"
                    @input="checkEnterprise(enterprise.name)"
                    :loading="isLoadingChecking"
                    :error="existEnterprise"
                    :error-messages="errorMessages"
                    hide-details="auto"
                    class="required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :rules="rules.select"
                    outlined
                    label="Industria"
                    :items="industries"
                    :item-text="(industry) => industry.name"
                    :item-value="(industry) => industry.id"
                    required
                    v-model="enterprise.industry.id"
                    hide-details="auto"
                    class="required"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    :rules="rules.address"
                    outlined
                    label="Dirección de empresa"
                    required
                    v-model="enterprise.address"
                    counter="100"
                    maxlength="100"
                    hide-details="auto"
                    class="required"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  v-for="(phone, index) in enterprise.phones"
                  :key="index"
                >
                  <transition name="fade">
                    <v-text-field
                      :rules="rules.phoneNumber"
                      outlined
                      :label="
                        enterprise.phones.length > 1
                          ? `Teléfono ${index + 1}`
                          : 'Teléfono'
                      "
                      required
                      type="tel"
                      v-model="phone.number"
                      counter="10"
                      v-mask="'##########'"
                      :autofocus="enterprise.phones.length > 1 ? true : false"
                      hide-details="auto"
                      class="required"
                    >
                      <template slot="append-outer" v-if="index === 0">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              v-bind="attrs"
                              v-on="on"
                              color="success"
                              @click="addPhone"
                              :disabled="enterprise.phones.length > 2"
                            >
                              mdi-phone-plus
                            </v-icon>
                          </template>
                          <span>Agregar otro teléfono</span>
                        </v-tooltip>
                      </template>
                      <template slot="append-outer" v-else>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              v-bind="attrs"
                              v-on="on"
                              color="primary"
                              @click="deletePhone(index)"
                            >
                              mdi-minus-circle
                            </v-icon>
                          </template>
                          <span>Quitar teléfono</span>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </transition>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :rules="rules.general"
                    outlined
                    label="Puesto en la empresa"
                    required
                    v-model="jobTitle"
                    hide-details="auto"
                    class="required"
                    maxlength="25"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :rules="rules.website"
                    outlined
                    label="Página web"
                    v-model="enterprise.website"
                    hint="www.example.com"
                    persistent-hint
                    hide-details="auto"
                    maxlength="50"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <div class="d-flex justify-space-between pt-5">
            <v-btn color="primary" outlined @click="cancelModalRegister">
              Cancelar
            </v-btn>
            <v-btn color="secondary" @click="stepNext(2)">
              Continuar
              <v-icon>mdi-page-last</v-icon>
            </v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-form ref="formQuestions" v-model="isValidateQuestion">
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  v-for="(question, index) in questions"
                  :key="question.id"
                >
                  <v-select
                    v-model="enterprise.answers[index]"
                    :label="question.question"
                    :rules="rules.select"
                    outlined
                    :items="
                      question.options.map((i) => {
                        return {
                          question: question.question,
                          option: i,
                        };
                      })
                    "
                    item-text="option"
                    return-object
                    hide-details="auto"
                    class="required"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <div class="d-flex justify-space-between pt-5">
            <v-btn color="primary" outlined @click="cancelModalRegister">
              Cancelar
            </v-btn>
            <v-btn color="secondary" @click="save()">
              <span class="mr-3" v-if="!isLoading">Crear empresa</span>
              <v-progress-circular
                v-else
                indeterminate
                color="white"
              ></v-progress-circular>
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <EnterpriseModalConfirm
      :dialog.sync="isConfirmDialog"
      @confirm="cancel"
    ></EnterpriseModalConfirm>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-dialog>
</template>

<script>
// Querys
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import { GET_INDUSTRIES } from '@/graphql/querys/industriesQuery';
import { GET_QUESTIONS } from '@/graphql/querys/questionsQuery';

// Mutations
import { CREATE_ENTERPRISE } from '@/graphql/mutations/enterprisesMutations';
// Mixins
import { rulesMixin } from '@/mixins/rulesMixin';
import { checkEnterpriseMixin } from '@/mixins/checkEnterpriseMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

// Components
import EnterpriseModalConfirm from '@/components/enterprises/EnterpriseModalConfirm.vue';

export default {
  name: 'EnterpriseModal',
  components: {
    EnterpriseModalConfirm,
  },
  mixins: [rulesMixin, checkEnterpriseMixin, modalsAlertsMixin],
  props: {
    isOpenModal: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      userCurren: {},
      show: false,
      // Init Steps form
      step: 1,
      isLoading: false,
      // Get
      industries: [],
      questions: [],
      // Enterprise
      enterprise: {
        name: '',
        industry: {
          id: '',
        },
        address: '',
        website: '',
        phones: [
          {
            number: '',
          },
        ],
        answers: [],
      },
      jobTitle: '',
      isValidateEnterprise: true,
      isValidateQuestion: true,
      // Completed form
      isCompletedRegister: false,
      isCompletedQuestions: false,
      // Dialog confirm
      isConfirmDialog: false,
    };
  },
  computed: {
    errorMessages() {
      return this.existEnterprise
        ? ['La empresa ya existe, intenta con otro nombre']
        : [];
    },
  },
  methods: {
    // Control step form
    stepNext(stepNext) {
      // Validate a number step
      if (!this.existEnterprise) {
        const currentStep = Number(this.step);
        if (currentStep === 1 && this.$refs.formEnterprise.validate()) {
          this.isCompletedRegister = true;
          this.step = stepNext;
        } else if (currentStep === 2 && this.$refs.formQuestions.validate()) {
          this.isCompletedQuestions = true;
          this.step = stepNext;
        }
      }
    },
    // Add new input phone
    addPhone() {
      this.enterprise.phones.push({
        number: '',
      });
    },
    // Delete phone specific
    deletePhone(id) {
      this.enterprise.phones.splice(id, 1);
    },
    // Close modal
    closeModal() {
      this.$emit('update:isOpenModal', false);
    },
    // Cancel
    cancel() {
      this.closeModal();
      this.resetAllValidation();
      this.resetAll();
    },
    // Cancel modal register
    cancelModalRegister() {
      if (this.hasDataFormEnterprise()) {
        this.isConfirmDialog = true;
      } else {
        this.cancel();
      }
    },
    hasDataFormEnterprise() {
      if (
        !this.enterprise.name &&
        !this.enterprise.industry.id &&
        !this.enterprise.address &&
        !this.enterprise.phones[0].number &&
        !this.jobTitle &&
        !this.enterprise.website
      ) {
        return false;
      }

      return true;
    },
    // Save
    save() {
      this.validateAll();
      if (this.isValidateEnterprise && this.isValidateQuestion) {
        this.create();
      }
    },
    create() {
      this.isLoading = true;
      // Assign enterprise a new const
      const enterpriseNew = JSON.parse(JSON.stringify(this.enterprise));

      // Apollo mutation
      this.$apollo
        .mutate({
          mutation: CREATE_ENTERPRISE,
          variables: {
            enterpriseInput: {
              enterprise: {
                name: enterpriseNew.name,
                industry: {
                  id: enterpriseNew.industry.id,
                },
                address: enterpriseNew.address,
                website: enterpriseNew.website,
                phones: enterpriseNew.phones,
              },
              jobTitle: this.jobTitle,
              answers: enterpriseNew.answers,
            },
          },
          update: (store, { data: { createEnterprise } }) => {
            // Get data with ID user current
            const data = store.readQuery({
              query: GET_USER_LOGGED,
            });
            // Push result
            data.userCurrent.enterprises.push({
              ...createEnterprise.enterprise,
              userEnterpriseId: createEnterprise.id,
            });
            // Write in Store the result data
            store.writeQuery({ query: GET_USER_LOGGED, data });
          },
          // Update the list before I get the result
          optimisticResponse: {
            __typename: 'Mutation',
            createEnterprise: {
              id: -1,
              __typename: 'UserEnterprise',
              enterprise: {
                __typename: 'Enterprise',
                id: -1,
                name: enterpriseNew.name,
              },
            },
          },
        })
        .then(() => {
          this.isLoading = false;
          this.cancel();
        })
        .catch(() => {
          this.isLoading = false;
          const error =
            'No se pudo crear la empresa, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    // Validation all forms
    validateAll() {
      this.$refs.formEnterprise.validate();
      this.$refs.formQuestions.validate();
    },
    // Reset all forms
    resetAll() {
      this.$refs.formEnterprise.reset();
      this.$refs.formQuestions.reset();
      this.selected = null;
      this.jobTitle = '';
      this.step = 1;
      this.isCompletedRegister = false;
      this.isCompletedQuestions = false;
      this.enterprise.phones = [
        {
          number: '',
        },
      ];
    },
    // Reset all validations
    resetAllValidation() {
      this.$refs.formEnterprise.resetValidation();
      this.$refs.formQuestions.resetValidation();
    },
  },
  apollo: {
    industries: {
      query: GET_INDUSTRIES,
    },
    questions: {
      query: GET_QUESTIONS,
    },
  },
};
</script>

<style lang="scss" scoped></style>
