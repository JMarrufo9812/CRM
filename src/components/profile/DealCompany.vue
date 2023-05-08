<template>
  <div>
    <v-card flat>
      <v-divider />
      <v-card-title class="company-name py-1">
        <v-icon color="primary" class="mr-4">mdi-domain</v-icon>
        Empresa
        <v-spacer></v-spacer>
        <v-menu
          v-model="isShowAddCompany"
          :close-on-content-click="false"
          left
          nudge-right="30"
          nudge-bottom="-20"
          absolute
          v-if="(canEditDeal || canEditDealOthers) && !item.isDelete"
        >
          <template v-slot:activator="{ on: onMenu }">
            <v-tooltip
              top
              v-show="(canEditDeal || canEditDealOthers) && !item.isDelete"
            >
              <template v-slot:activator="{ on: onTooltip }">
                <v-btn
                  v-on="{ ...onMenu, ...onTooltip }"
                  icon
                  @click="isShowAddCompany = !isShowAddCompany"
                  :loading="isLoadingUpdateDeal"
                >
                  <v-icon color="secondary">
                    {{
                      companySelected ? 'mdi-compare-horizontal' : 'mdi-plus'
                    }}
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ companySelected ? 'Reemplazar' : 'Agregar' }}</span>
            </v-tooltip>
          </template>
          <v-card class="pa-4" width="18em">
            <v-form ref="formCompany">
              <FieldSelectCompanySimple
                :inputProps="{ class: 'no-icon full-width', isDense: true }"
                :resetHandler="isShowAddCompany"
                @outData="updateCompany"
                @deleteData="deleteCompany"
              />
            </v-form>
            <div class="d-flex justify-center pt-2 ml-2">
              <v-btn
                style="width:45%"
                color="primary"
                outlined
                small
                class="mr-2"
                @click="cancel"
                :disabled="isLoadingUpdateDeal"
              >
                Cancelar
              </v-btn>
              <v-btn
                style="width:45%"
                v-if="(canEditDeal || canEditDealOthers) && !item.isDelete"
                color="secondary"
                :loading="isLoadingUpdateDeal"
                small
                :disabled="disabledAddButton"
                @click="addCompany"
              >
                Guardar
              </v-btn>
            </div>
          </v-card>
        </v-menu>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <div
          v-if="
            !companySelected ||
              companySelected === null ||
              companySelected === undefined
          "
          class="pa-2 text-center"
        >
          <span>
            No tiene empresa
          </span>
        </div>
        <v-list-item v-else class="Company" outlined>
          <v-list-item-content>
            <v-list-item-title class="Company__title">
              <template>
                <div
                  class="Company__box"
                  @click="goCompany(companySelected.id)"
                >
                  <v-icon>mdi-office-building</v-icon>
                  <span class="Company__box_name">
                    {{ companySelected.name }}
                    <b
                      class="font-weight-bold"
                      style="color: red;"
                      v-if="companySelected.isDelete"
                    >
                      (Eliminado)
                    </b>
                  </span>
                </div>
              </template>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action v-if="isLoadingRemove">
            <v-progress-circular
              :size="20"
              color="secondary"
              indeterminate
            ></v-progress-circular>
          </v-list-item-action>
          <v-list-item-action
            v-if="
              !isLoadingRemove &&
                (canEditDeal || canEditDealOthers) &&
                !item.isDelete
            "
            class="Company__edit mt-4"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  x-small
                  outlined
                  @click.stop="disconnectCompany(companySelected.id)"
                  v-bind="attrs"
                  v-on="on"
                  class="mr-1 mt-2"
                  color="grey"
                >
                  <v-icon small color="grey">mdi-connection</v-icon>
                </v-btn>
              </template>
              <span>Desvincular</span>
            </v-tooltip>
            <v-menu
              v-if="(canEditCompany || canEditCompanyOthers) && !item.isDelete"
              v-model="isEdit"
              :close-on-content-click="false"
              left
            >
              <template v-slot:activator="{ on: onMenu }">
                <v-tooltip
                  bottom
                  v-show="
                    (canEditCompany || canEditCompanyOthers) && !item.isDelete
                  "
                >
                  <template v-slot:activator="{ on: onTooltip }">
                    <v-btn
                      x-small
                      color="secondary"
                      v-on="{ ...onMenu, ...onTooltip }"
                      @click="isEdit = true"
                      class="mt-2"
                    >
                      <v-icon small color="white">mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Cambiar nombre</span>
                </v-tooltip>
              </template>
              <v-card class="pa-4" width="18em">
                <v-form
                  ref="formCompany"
                  v-model="isValidateFormName"
                  lazy-validation
                >
                  <v-text-field
                    v-model="companyName"
                    :rules="rules.general"
                    label="Nombre"
                    hide-details="auto"
                    maxlength="50"
                    dense
                    outlined
                  ></v-text-field>

                  <div class="d-flex justify-center mt-1">
                    <v-btn
                      style="width:48%"
                      class="mr-2"
                      small
                      color="primary"
                      outlined
                      :disables="isLoadingChangeName"
                      @click="cancelEdit"
                      tile
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      tile
                      style="width:48%"
                      v-if="
                        (canEditCompany || canEditCompanyOthers) &&
                          !item.isDelete
                      "
                      :loading="isLoadingChangeName"
                      small
                      color="secondary"
                      @click="
                        updateName({
                          id: companySelected.id,
                          name: companyName,
                        })
                      "
                    >
                      Guardar
                    </v-btn>
                  </div>
                </v-form>
              </v-card>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
      </v-card-text>
    </v-card>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </div>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import {
  PERMISSIONS_DEALS,
  PERMISSIONS_COMPANIES,
} from '@/constants/permissions';
// Mutations
import { UPDATE_COMPANY } from '@/graphql/mutations/companiesMutations';
// Mixins
import { rulesMixin } from '@/mixins/rulesMixin';
// Constants
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { dealsMixin } from '@/mixins/dealsMixin';

export default {
  name: 'DealCompany',
  components: {
    FieldSelectCompanySimple: () =>
      import('@/components/fields/FieldSelectCompanySimple.vue'),
  },
  mixins: [rulesMixin, modalsAlertsMixin, dealsMixin],
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemId: {
      type: String,
      default: '',
      required: true,
    },
    typeItem: {
      type: String,
      required: true,
      default: 'DEAL',
    },
    ownerId: {
      type: String,
      default: '',
    },
    companySelected: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      UPDATE,
      UPDATE_OTHERS,
      PERMISSIONS_DEALS,
      PERMISSIONS_COMPANIES,
      isEdit: false,
      searchCompanies: {},
      companyName: '',
      isLoading: false,
      isLoadingRemove: false,
      isShowAddCompany: false,
      isValidateFormName: true,
      isLoadingChangeName: false,
      companyNew: {
        id: '',
        name: '',
      },
      userCurrent: {},
    };
  },
  // Reassign company name to other variable to show
  created() {
    this.companyName = this.companySelected?.name || '';
  },
  computed: {
    canEditDeal() {
      if (this.typeItem === 'DEAL') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_DEALS, { authorId: this.ownerId || '' }),
        );
      }
      return false;
    },
    canEditDealOthers() {
      if (!this.canEditDeal) {
        return (
          ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS) &&
          !ability.can(
            UPDATE_OTHERS,
            subject(PERMISSIONS_DEALS, {
              authorId: this.ownerId || '',
            }),
          )
        );
      }
      return ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS);
    },
    canEditCompany() {
      if (this.typeItem === 'DEAL') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_COMPANIES, {
            authorId: this.companySelected?.owner?.id || '',
          }),
        );
      }
      return false;
    },
    canEditCompanyOthers() {
      if (!this.canEditCompany) {
        return (
          ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES) &&
          !ability.can(
            UPDATE_OTHERS,
            subject(PERMISSIONS_COMPANIES, {
              authorId: this.companySelected?.owner?.id || '',
            }),
          )
        );
      }
      return ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES);
    },
    disabledAddButton() {
      if (this.companyNew.id || this.companyNew.name) return false;
      return true;
    },
  },
  watch: {
    // Reassign company name to other variable to show and update
    companySelected() {
      this.companyName = this.companySelected?.name || '';
    },
    isLoadingUpdateDeal(value) {
      if (!value) {
        this.company = '';
        if (this.isShowAddCompany) {
          this.$refs.formCompany.reset();
        }
        this.isShowAddCompany = false;
        this.isLoadingRemove = false;
        this.companyNew = {
          id: '',
          name: '',
        };
      }
    },
  },
  methods: {
    updateCompany(index, value) {
      this.companyNew = value;
    },
    deleteCompany() {
      this.companyNew = {
        id: '',
        name: '',
      };
    },
    // Reedirect to contact profile by id
    goCompany(id) {
      this.$router.push({ name: 'company', params: { id } }, () => {});
    },
    // Cancel add company and reset
    cancel() {
      // Reset company new
      this.company = '';
      this.companyNew = {
        id: '',
        name: '',
      };
      // Hide add company
      this.isShowAddCompany = false;
      // Reset validate
      this.isValidate = false;
    },
    // Mutation to add company
    addCompany() {
      if (this.canEditDeal || this.canEditDealOthers) {
        // Is empty?
        if (Object.keys(this.companyNew).length !== 0) {
          // Active loading
          this.isLoading = true;
          // Mutation to update company's deal
          this.updateDeal({ id: this.itemId, company: this.companyNew });
        }
      }
    },
    disconnectCompany() {
      if (this.canEditDeal || this.canEditDealOthers) {
        this.isLoadingRemove = true;
        this.updateDeal({ id: this.itemId, company: { id: '' } });
      }
    },
    // Update name's contact
    updateName({ id, name }) {
      if (this.canEditCompany) {
        // Validate input name
        this.$refs.formCompany.validate();
        // Is valid?
        if (this.isValidateFormName) {
          // Active loading
          this.isLoadingChangeName = true;
          // Mutation to update name's contact
          this.$apollo
            .mutate({
              // Query
              mutation: UPDATE_COMPANY,
              // Parameters
              variables: {
                companyInput: {
                  id,
                  name,
                },
              },
            })
            .then(({ data: { updateCompany } }) => {
              this.$emit('updateDealCompany', updateCompany);
              // Desactive loading
              this.isLoadingChangeName = false;
              // Close specific field by id
              this.isEdit = false;
              // Reset validation
              this.isValidateFormName = false;
            })
            .catch(() => {
              // Desactive loading
              this.isLoadingChangeName = false;
              // Reset validation
              this.isValidateFormName = false;
              const error =
                'No se pudo actualizar el nombre de la empresa, intente de nuevo o contacte a soporte';
              this.modalHandlerError({ isOpen: true, error });
            });
        }
      }
    },
    text(value) {
      return `${value.name}`;
    },
    cancelEdit() {
      // Reset value to the before
      this.companyName = this.companySelected.name;
      this.isEdit = false;
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
@import '{ .v-autocomplete .Company .company-name } from ../../../../scss/components/deal.company';
</style>
