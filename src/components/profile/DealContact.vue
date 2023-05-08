<template>
  <div>
    <v-card flat>
      <v-divider />
      <v-card-title class="contact-name py-1">
        <v-icon color="primary" class="mr-4">mdi-account</v-icon>
        Contacto
        <v-spacer></v-spacer>
        <v-menu
          v-model="isShowAddContact"
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
                  @click="isShowAddContact = !isShowAddContact"
                  :loading="isLoading"
                >
                  <v-icon color="secondary">
                    {{
                      contactSelected ? 'mdi-compare-horizontal' : 'mdi-plus'
                    }}
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ contactSelected ? 'Reemplazar' : 'Agregar' }}</span>
            </v-tooltip>
          </template>
          <v-card class="pa-4" width="18em">
            <v-form ref="formContact">
              <FieldSelectContactSimple
                :inputProps="{ class: 'no-icon full-width', isDense: true }"
                :resetHandler="isShowAddContact"
                @outData="updateContact"
                @deleteData="deleteContact"
              />
            </v-form>
            <div class="d-flex justify-center pt-2 ml-2">
              <v-btn
                style="width:45%"
                color="primary"
                outlined
                small
                class="mr-2"
                :disabled="isLoading"
                @click="cancel"
              >
                Cancelar
              </v-btn>
              <v-btn
                v-if="(canEditDeal || canEditDealOthers) && !item.isDelete"
                color="secondary"
                style="width:45%"
                small
                :disabled="disabledAddButton"
                @click="addContact"
                :loading="isLoading"
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
            !contactSelected ||
              contactSelected === null ||
              contactSelected === undefined
          "
          class="pa-2 text-center"
        >
          <span>
            No tiene contacto
          </span>
        </div>
        <v-list-item v-else class="Contact" outlined>
          <v-list-item-content>
            <v-list-item-title class="Contact__title">
              <template>
                <div
                  class="Contact__box"
                  @click="goContact(contactSelected.id)"
                >
                  <v-icon>mdi-account</v-icon>
                  <span class="Contact__box_name">
                    {{ contactSelected.name }}
                    <b
                      class="font-weight-bold"
                      style="color: red;"
                      v-if="contactSelected.isDelete"
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
            class="Contact__edit"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  x-small
                  outlined
                  @click.stop="disconnectContact()"
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
              v-model="isEdit"
              :close-on-content-click="false"
              left
              v-if="(canEditContact || canEditContactOthers) && !item.isDelete"
            >
              <template v-slot:activator="{ on: onMenu }">
                <v-tooltip
                  bottom
                  v-show="
                    (canEditContact || canEditContactOthers) && !item.isDelete
                  "
                >
                  <template v-slot:activator="{ on: onTooltip }">
                    <v-btn
                      x-small
                      color="secondary"
                      @click="isEdit = true"
                      v-on="{ ...onMenu, ...onTooltip }"
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
                  ref="formContact"
                  v-model="isValidateFormName"
                  lazy-validation
                >
                  <v-text-field
                    v-model="contactName"
                    label="Nombre"
                    dense
                    outlined
                    hide-details="auto"
                    maxlength="50"
                    :rules="rules.general"
                  ></v-text-field>

                  <div class="d-flex justify-center mt-1">
                    <v-btn
                      style="width:48%"
                      x-small
                      color="primary"
                      outlined
                      class="mr-2"
                      @click="cancelEdit(contact.id)"
                      :disabled="isLoadingChangeName"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      style="width:48%"
                      v-if="
                        (canEditDeal || canEditDealOthers) && !item.isDelete
                      "
                      x-small
                      color="secondary"
                      :loading="isLoadingChangeName"
                      @click="
                        updateName({
                          id: contactSelected.id,
                          name: contactName,
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
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import {
  PERMISSIONS_DEALS,
  PERMISSIONS_CONTACTS,
  PERMISSIONS_GROUP_DEAL,
  PERMISSIONS_GROUP_CONTACT,
} from '@/constants/permissions';
// Mutations
import { UPDATE_CONTACT } from '@/graphql/mutations/contactsMutations';
// Mixins
import { rulesMixin } from '@/mixins/rulesMixin';
// Constants
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { dealsMixin } from '@/mixins/dealsMixin';
import { contactsMixin } from '@/mixins/contactsMixin';

export default {
  name: 'DealContact',
  components: {
    FieldSelectContactSimple: () =>
      import('@/components/fields/FieldSelectContactSimple.vue'),
  },
  mixins: [rulesMixin, modalsAlertsMixin, dealsMixin, contactsMixin],
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
    contactSelected: {
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
      PERMISSIONS_CONTACTS,
      PERMISSIONS_GROUP_DEAL,
      PERMISSIONS_GROUP_CONTACT,
      search: '',
      contact: '',
      searchContacts: {},
      isEdit: false,
      contactName: '',
      isLoading: false,
      isNewContact: false,
      isLoadingRemove: false,
      isShowAddContact: false,
      isValidateFormName: true,
      isLoadingChangeName: false,
      contactNew: {
        id: '',
        name: '',
      },
      contactRules: [(v) => !!v || 'Debes seleccionar o crear un contacto'],
      isValidate: true,
      userCurrent: {},
    };
  },
  // Reassign contact name to other variable to show
  created() {
    this.contactName = this.contactSelected?.name || '';
  },
  watch: {
    // Reassign contact name to other variable to show and update
    contactSelected() {
      this.contactName = this.contactSelected?.name || '';
    },
    // Control new contact and assign value
    contact(value) {
      if (value && value.id) {
        this.isNewContact = false;
        this.contactNew = { id: value.id, name: '' };
      } else if (value) {
        this.isNewContact = true;
        this.contactNew = { id: '', name: value };
      } else {
        this.contactNew = { id: '', name: '' };
      }
    },
    isLoadingUpdateDeal(value) {
      if (!value) {
        this.isLoading = false;
        // Reset variables
        this.contact = '';
        if (this.isShowAddContact) {
          this.$refs.formContact.reset();
        }
        this.isShowAddContact = false;
        this.isLoadingRemove = false;
        this.contactNew = {
          id: '',
          name: '',
        };
      }
    },
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
    canEditContact() {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_CONTACTS, {
          authorId: this.contactSelected?.owner?.id || '',
        }),
      );
    },
    canEditContactOthers() {
      if (!this.canEditContact) {
        return (
          ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS) &&
          !ability.can(
            UPDATE_OTHERS,
            subject(PERMISSIONS_CONTACTS, {
              authorId: this.contactSelected?.owner?.id || '',
            }),
          )
        );
      }
      return ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS);
    },
    // Hide the submenu when search is empty
    menuProps() {
      return !this.search ? { value: false } : {};
    },
    hasSearch() {
      if (
        this.search !== null &&
        this.search !== undefined &&
        this.search !== ''
      ) {
        return this.search.length > 2;
      }
      return false;
    },
    readOnly() {
      if (
        this.contact === null ||
        this.contact === undefined ||
        this.contact === ''
      ) {
        return false;
      }
      return true;
    },
    disabledAddButton() {
      if (this.contactNew.id || this.contactNew.name) return false;
      return true;
    },
  },
  methods: {
    updateContact(index, value) {
      this.contactNew = value;
    },
    deleteContact() {
      this.contactNew = {
        id: '',
        name: '',
      };
    },
    // Reedirect to contact profile by id
    goContact(id) {
      this.$router.push({ name: 'contact', params: { id } }, () => {});
    },
    // Cancel add contact and reset
    cancel() {
      // Reset contact new
      this.contact = '';
      this.contactNew = {
        id: '',
        name: '',
      };
      // Hide add contact
      this.isShowAddContact = false;
      // Reset validate
      this.isValidate = false;
    },
    // Mutation to add contact
    addContact() {
      if (this.canEditDeal || this.canEditDealOthers) {
        // Is empty?
        if (Object.keys(this.contactNew).length !== 0) {
          // Active loading
          this.isLoading = true;
          // Mutation to update contact's deal
          this.updateDeal({ id: this.itemId, contact: this.contactNew });
        }
      }
    },
    // Remove relation contact of the contact by id
    disconnectContact() {
      if (this.canEditDeal || this.canEditDealOthers) {
        this.isLoadingRemove = true;
        this.updateDeal({ id: this.itemId, contact: { id: '' } });
      }
    },
    // Update name's contact
    updateName({ id, name }) {
      if (this.canEditContact || this.canEditContactOthers) {
        // Validate array of forms with input name
        this.$refs.formContact.validate();
        // Is valid?
        if (this.isValidateFormName) {
          // Active loading
          this.isLoadingChangeName = true;
          // Mutation to update name's contact
          this.$apollo
            .mutate({
              // Query
              mutation: UPDATE_CONTACT,
              // Parameters
              variables: {
                contactInput: {
                  id,
                  name,
                },
              },
            })
            .then(({ data: { updateContact } }) => {
              this.$emit('updateDealContact', updateContact);
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
                'No se pudo actualizar el nombre del contacto, intente de nuevo o contacte a soporte';
              this.modalHandlerError({ isOpen: true, error });
            });
        }
      }
    },
    // Name to search in combobox
    text(value) {
      return `${value.name}`;
    },
    // Cancel edit
    cancelEdit() {
      // Reset value to the before
      this.contactName = this.contactSelected.name;
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
@import '{ .v-autocomplete  .Contact .contact-name} from ../../../../scss/components/deal.contact';
</style>
