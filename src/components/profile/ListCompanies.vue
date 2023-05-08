<template>
  <v-card tile flat>
    <v-divider />
    <v-card-title class="companies-title py-1">
      <v-icon class="mr-4">mdi-domain</v-icon>
      Empresas
      <v-spacer></v-spacer>
      <v-menu
        v-model="isShowAddCompany"
        class="mt-2"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-show="(canEditContact || canEditContactOthers) && !item.isDelete"
            icon
            v-on="on"
            @click="isShowAddCompany = !isShowAddCompany"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
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
              class="mr-2"
              outlined
              color="primary"
              small
              @click="cancel"
            >
              Cancelar
            </v-btn>
            <v-btn
              style="width:45%"
              v-if="(canEditContact || canEditContactOthers) && !item.isDelete"
              color="secondary"
              small
              @click="addCompany"
              :loading="isLoading"
              :disabled="disabledAddButton"
            >
              Guardar
            </v-btn>
          </div>
        </v-card>
      </v-menu>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-card flat max-height="20em" class="companies-container">
        <div v-if="companiesSelected.length === 0" class="pa-10">
          <span>
            No tiene empresas
          </span>
        </div>
        <template v-else v-for="(company, index) in listCompanies">
          <v-list-item class="Company" :key="company.id" outlined>
            <v-list-item-content>
              <v-list-item-title class="Company__title">
                <template>
                  <div class="Company__box" @click="goCompany(company.id)">
                    <v-icon class="pb-1">mdi-domain</v-icon>
                    <span class="Company__box_name">
                      {{ company.name }}
                    </span>
                  </div>
                </template>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="Company__edit mt-4">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-show="canEditContact || canEditContactOthers"
                    x-small
                    class="mr-2"
                    @click.stop="disconnectCompany(company.id)"
                    v-bind="attrs"
                    v-on="on"
                    :loading="isLoadingRemove"
                    color="grey"
                    outlined
                  >
                    <v-icon small>mdi-connection</v-icon>
                  </v-btn>
                </template>
                <span>Desvincular</span>
              </v-tooltip>

              <v-menu v-model="company.edit" :close-on-content-click="false">
                <template v-slot:activator="{ on: onMenu }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: onTooltip }">
                      <v-btn
                        v-show="
                          (canEditContact || canEditContactOthers) &&
                            (canEditCompany(company.owner) ||
                              canEditCompanyOthers(company.owner))
                        "
                        color="secondary"
                        x-small
                        @click.stop="company.edit = true"
                        v-on="{ ...onMenu, ...onTooltip }"
                      >
                        <v-icon small color="white">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Cambiar nombre</span>
                  </v-tooltip>
                </template>
                <v-card class="pa-4" width="18em">
                  <v-form
                    :ref="`form-${index}`"
                    v-model="isValidateFormName"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="company.name"
                      label="Nombre"
                      dense
                      outlined
                      hide-details="auto"
                      maxlength="50"
                      :rules="rules.general"
                    ></v-text-field>

                    <div class="d-flex justify-center mt-1">
                      <v-btn
                        style="width:45%"
                        class="mr-2"
                        x-small
                        color="primary"
                        outlined
                        @click="cancelEdit(company.id)"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        style="width:45%"
                        v-if="
                          (canEditContact || canEditContactOthers) &&
                            (canEditCompany(company.owner) ||
                              canEditCompanyOthers(company.owner))
                        "
                        x-small
                        color="secondary"
                        :loading="isLoadingChangeName"
                        @click="
                          updateName({
                            id: company.id,
                            name: company.name,
                            idx: index,
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
        </template>
      </v-card>
      <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    </v-card-text>
  </v-card>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import {
  PERMISSIONS_CONTACTS,
  PERMISSIONS_COMPANIES,
} from '@/constants/permissions';
// Mutations
import { UPDATE_COMPANY } from '@/graphql/mutations/companiesMutations';
// Mixins
import { rulesMixin } from '@/mixins/rulesMixin';
import { contactsMixin } from '@/mixins/contactsMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
// Constants
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';

export default {
  name: 'ListCompanies',
  components: {
    FieldSelectCompanySimple: () =>
      import('@/components/fields/FieldSelectCompanySimple.vue'),
  },
  mixins: [rulesMixin, contactsMixin, modalsAlertsMixin],
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
      default: 'CONTACT',
    },
    ownerId: {
      type: String,
      default: '',
    },
    companiesSelected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      UPDATE,
      UPDATE_OTHERS,
      PERMISSIONS_CONTACTS,
      PERMISSIONS_COMPANIES,
      search: '',
      company: '',
      companies: {},
      isLoading: false,
      listCompanies: [],
      isNewCompany: false,
      isLoadingRemove: false,
      isShowAddCompany: false,
      isValidateFormName: true,
      isLoadingChangeName: false,
      companyNew: {
        id: '',
        name: '',
      },
      companyRules: [(v) => !!v || 'Debes seleccionar o crear una empresa'],
      userCurrent: {},
    };
  },
  created() {
    // Update list companies
    this.listCompanies = this.formatListCompanies(this.companiesSelected);
  },
  watch: {
    // Update list companies
    companiesSelected: {
      handler(list) {
        this.listCompanies = this.formatListCompanies(list);
      },
      deep: true,
    },
    // Control new company and assign value
    company(value) {
      if (value && value.id) {
        this.isNewCompany = false;
        this.companyNew = { id: value.id, name: '' };
      } else if (value) {
        this.isNewCompany = true;
        this.companyNew = { id: '', name: value };
      } else {
        this.companyNew = { id: '', name: '' };
      }
    },
    isLoadingUpdateContact(value) {
      if (!value) {
        this.isLoading = false;
        // Reset variables
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
  computed: {
    canEditContact() {
      if (this.typeItem === 'CONTACT') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_CONTACTS, { authorId: this.ownerId || '' }),
        );
      }
      return false;
    },
    canEditContactOthers() {
      if (this.typeItem === 'CONTACT') {
        if (!this.canEditContact) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_CONTACTS, {
                authorId: this.ownerId || '',
              }),
            )
          );
        }
        return ability.can(
          UPDATE_OTHERS,
          subject(PERMISSIONS_CONTACTS, { authorId: this.ownerId || '' }),
        );
      }
      return false;
    },

    // Hide the submenu when search is empty
    menuProps() {
      return !this.search ? { value: false } : {};
    },
    disabledAddButton() {
      if (this.companyNew.id || this.companyNew.name) return false;
      return true;
    },
  },
  methods: {
    canEditCompany(owner) {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_COMPANIES, { authorId: owner.id || '' }),
      );
    },
    canEditCompanyOthers(owner) {
      if (!this.canEditCompany(owner)) {
        return (
          ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES) &&
          !ability.can(
            UPDATE_OTHERS,
            subject(PERMISSIONS_COMPANIES, {
              authorId: owner.id || '',
            }),
          )
        );
      }
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_COMPANIES, { authorId: owner.id || '' }),
      );
    },
    updateCompany(index, value) {
      this.companyNew = value;
    },
    deleteCompany() {
      this.companyNew = {
        id: '',
        name: '',
      };
    },
    // Format list companies
    formatListCompanies(list) {
      return list.map((company) => {
        return {
          id: company.id,
          name: company.name,
          edit: false,
          owner: company.owner,
        };
      });
    },
    // Reedirect to company by ID
    goCompany(id) {
      if (this.$router.name !== 'company') {
        this.$router.push({ name: 'company', params: { id } }, () => {});
      }
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
    },
    // Format companies to send in Mutation
    formatCompanies(companies) {
      return companies.map((company) => {
        return { id: company.id };
      });
    },
    // Mutation to add company
    addCompany() {
      if (this.canEditContact) {
        // Is empty?
        if (Object.keys(this.companyNew).length !== 0) {
          // Active loading
          this.isLoading = true;
          // const updateCompanies = this.formatCompanies(this.companiesSelected);
          // Update the list before with the new element
          // updateCompanies.push(result);
          this.updateContact({ id: this.itemId, company: this.companyNew });
        }
      }
    },
    // Remove relation contact of the company by id
    disconnectCompany(id) {
      if (this.canEditContact) {
        this.isLoadingRemove = true;
        // Assign list contact and remove the reactive
        const listCompanies = JSON.parse(
          JSON.stringify(this.companiesSelected),
        );
        // Format list contacts to save
        const updateCompanies = this.formatCompanies(listCompanies);
        // Get index to remove
        const index = updateCompanies.findIndex((item) => item.id === id);
        // Remove contact of the list
        updateCompanies.splice(index, 1);
        this.updateContact({
          id: this.itemId,
          company: { disconnect: { id } },
        });
      }
    },
    // Update name's contact
    updateName({ id, name, idx }) {
      if (this.canEditCompany || this.canEditCompanyOthers) {
        // Validate array of forms with input name
        this.$refs[`form-${idx}`][0].validate();
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
              this.$emit('updateContactCompany', updateCompany, idx);
              // Desactive loading
              this.isLoadingChangeName = false;
              // Close specific field by id
              // Reset validation
              this.isValidateFormName = false;
            })
            .catch(() => {
              // Desactive loading
              this.isLoadingChangeName = false;
              // Reset validation
              this.isValidateFormName = false;
              const error =
                'No se pudo cambiar el nombre de la empresa, intente de nuevo o contacte a soporte';
              this.modalHandlerError({ isOpen: true, error });
            });
        }
      }
    },
    // Get index of list contact by id
    getIndexField(id) {
      return this.listCompanies.findIndex((company) => company.id === id);
    },
    // Name to search in combobox
    text(value) {
      return `${value.name}`;
    },
    // Cancel edit
    cancelEdit(id) {
      // Search index into list contacts
      const index = this.getIndexField(id);
      // Close edit
      this.listCompanies[index].edit = false;
      // Find the value before
      const valueBefore = this.companiesSelected.find(
        (companyBefore) => companyBefore.id === id,
      ).name;
      // Reset value to the before
      this.listCompanies[index].name = valueBefore;
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
@import '{ .Company .companies-title .companies-container } from ../../../../scss/components/list.companies';
</style>
