<template>
  <v-card tile flat>
    <v-divider />
    <v-card-title class="contacts-title py-1">
      <v-icon color="primary" class="mr-4">mdi-account</v-icon>
      Contactos
      <v-spacer></v-spacer>
      <v-menu
        v-model="isShowAddContact"
        class="mt-2"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-show="(canEditCompany || canEditCompanyOthers) && !item.isDelete"
            icon
            @click="isShowAddContact = !isShowAddContact"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
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
          <div class="d-flex justify-space-around pt-2 ml-2">
            <v-btn
              style="width:45%"
              color="primary"
              outlined
              small
              @click="cancel"
            >
              Cancelar
            </v-btn>
            <v-btn
              style="width:45%"
              v-if="(canEditCompany || canEditCompanyOthers) && !item.isDelete"
              color="secondary"
              small
              @click="addContact"
              :disabled="disabledAddButton"
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
      <v-card flat max-height="20em">
        <div v-if="contactsSelected.length === 0" class="pa-10 text-center">
          <span>
            No tiene contactos
          </span>
        </div>
        <template v-else v-for="(contact, index) in listContacts">
          <v-list-item class="Contact" :key="contact.id" outlined>
            <v-list-item-content>
              <v-list-item-title class="Contact__title">
                <template>
                  <div class="Contact__box" @click="goContact(contact.id)">
                    <v-icon>mdi-account</v-icon>
                    <span class="Contact__box_name">
                      {{ contact.name }}
                    </span>
                  </div>
                </template>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="Contact__edit">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-if="canEditCompany || canEditCompanyOthers"
                    color="grey"
                    outlined
                    x-small
                    class="mr-2 mt-2"
                    @click.stop="disconnectContact(contact.id)"
                    v-bind="attrs"
                    v-on="on"
                    :loading="isLoadingRemove"
                  >
                    <v-icon small>mdi-connection</v-icon>
                  </v-btn>
                </template>
                <span>Desvincular</span>
              </v-tooltip>
              <v-menu v-model="contact.edit" :close-on-content-click="false">
                <template v-slot:activator="{ on: onMenu }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: onTooltip }">
                      <v-btn
                        v-if="
                          (canEditContact(contact.owner) ||
                            canEditContactOthers(contact.owner)) &&
                            (canEditCompany || canEditCompanyOthers) &&
                            !item.isDelete
                        "
                        color="secondary"
                        x-small
                        class="mt-2"
                        @click.stop="contact.edit = true"
                        v-on="{ onMenu, onTooltip }"
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
                      v-model="contact.name"
                      label="Nombre"
                      maxlength="50"
                      dense
                      outlined
                      hide-details="auto"
                      :rules="rules.general"
                    ></v-text-field>

                    <div class="d-flex justify-center mt-1">
                      <v-btn
                        x-small
                        color="primary"
                        style="width:45%"
                        outlined
                        class="mr-2"
                        @click="cancelEdit(contact.id)"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        v-if="
                          (canEditContact(contact.owner) ||
                            canEditContactOthers(contact.owner)) &&
                            (canEditCompany || canEditCompanyOthers) &&
                            !item.isDelete
                        "
                        style="width:45%"
                        x-small
                        color="secondary"
                        :loading="isLoadingChangeName"
                        @click="
                          updateName({
                            id: contact.id,
                            name: contact.name,
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
    </v-card-text>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-card>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { permissionGroupMixin } from '@/mixins/permissionGroupMixin';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import {
  PERMISSIONS_CONTACTS,
  PERMISSIONS_COMPANIES,
} from '@/constants/permissions';
// Mutations
import { UPDATE_CONTACT } from '@/graphql/mutations/contactsMutations';
// Mixins
import { rulesMixin } from '@/mixins/rulesMixin';
// Constants
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { companiesMixin } from '@/mixins/companiesMixin';

export default {
  name: 'ListContacts',
  components: {
    FieldSelectContactSimple: () =>
      import('@/components/fields/FieldSelectContactSimple.vue'),
  },
  mixins: [rulesMixin, permissionGroupMixin, modalsAlertsMixin, companiesMixin],
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
    contactsSelected: {
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
      contact: '',
      contacts: {},
      isLoading: false,
      listContacts: [],
      isNewContact: false,
      isLoadingRemove: false,
      isShowAddContact: false,
      isValidateFormName: true,
      isLoadingChangeName: false,
      contactNew: {
        id: '',
        name: '',
      },
      userCurrent: {},
    };
  },
  created() {
    // Update list contacts
    this.listContacts = this.formatListContacts(this.contactsSelected);
  },
  watch: {
    // Update list contacts
    contactsSelected: {
      handler(list) {
        this.listContacts = this.formatListContacts(list);
      },
      deep: true,
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
    isLoadingUpdateCompany(value) {
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
    canEditCompany() {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_COMPANIES, { authorId: this.ownerId || '' }),
      );
    },
    canEditCompanyOthers() {
      if (!this.canEditCompany) {
        return (
          ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES) &&
          !ability.can(
            UPDATE_OTHERS,
            subject(PERMISSIONS_COMPANIES, {
              authorId: this.ownerId || '',
            }),
          )
        );
      }
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_COMPANIES, { authorId: this.ownerId || '' }),
      );
    },
    // Hide the submenu when search is empty
    menuProps() {
      return !this.search ? { value: false } : {};
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
    canEditContact(owner) {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_CONTACTS, { authorId: owner.id || '' }),
      );
    },
    canEditContactOthers(owner) {
      if (!this.canEditContact(owner)) {
        return (
          ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS) &&
          !ability.can(
            UPDATE_OTHERS,
            subject(PERMISSIONS_CONTACTS, {
              authorId: owner.id || '',
            }),
          )
        );
      }
      return ability.can(
        UPDATE_OTHERS,
        subject(PERMISSIONS_CONTACTS, { authorId: owner.id || '' }),
      );
    },
    updateContact(index, value) {
      this.contactNew = value;
    },
    deleteContact() {
      this.contactNew = {
        id: '',
        name: '',
      };
    },
    // Format list contacts
    formatListContacts(list) {
      return list.map((contact) => {
        return {
          id: contact.id,
          name: contact.name,
          edit: false,
          owner: contact.owner,
        };
      });
    },
    // Reedirect to contact by ID
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
    },
    // Format contacts to send in Mutation
    formatContacts(contacts) {
      return contacts.map((contact) => {
        return { id: contact.id };
      });
    },
    // Mutation to add contact
    addContact() {
      if (this.canEditCompany) {
        // Check a contact if is new or selected of the list
        // const result = this.checkContact(this.contactNew);
        // Is empty?
        if (Object.keys(this.contactNew).length !== 0) {
          // Active loading
          this.isLoading = true;
          // Mutation update company
          this.updateCompany({ id: this.itemId, contact: this.contactNew });
        }
      }
    },
    // Remove relation contact of the company by id
    disconnectContact(id) {
      if (this.canEditCompany) {
        this.isLoadingRemove = true;
        // Assign list contact and remove the reactive
        const listContacts = JSON.parse(JSON.stringify(this.contactsSelected));
        // Format list contacts to save
        const updateContacts = this.formatContacts(listContacts);
        // Get index to remove
        const index = updateContacts.findIndex((item) => item.id === id);
        // Remove contact of the list
        updateContacts.splice(index, 1);
        // Mutation to update company and remove the contact
        this.updateCompany({
          id: this.itemId,
          contact: { disconnect: { id } },
        });
      }
    },
    // Update name's contact
    updateName({ id, name, idx }) {
      if (this.canEditContact) {
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
              this.$emit('updateCompanyContact', updateContact, idx);
              // Desactive loading
              this.isLoadingChangeName = false;
              // Reset validation
              this.isValidateFormName = false;
            })
            .catch(() => {
              // Desactive loading
              this.isLoadingChangeName = false;
              // Reset validation
              this.isValidateFormName = false;
              const error =
                'No se pudo actualizar el nombre, intente de nuevo o contacte a soporte';
              this.modalHandlerError({ isOpen: true, error });
            });
        }
      }
    },
    // Get index of list contact by id
    getIndexField(id) {
      return this.listContacts.findIndex((contact) => contact.id === id);
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
      this.listContacts[index].edit = false;
      // Find the value before
      const valueBefore = this.contactsSelected.find(
        (contactBefore) => contactBefore.id === id,
      ).name;
      // Reset value to the before
      this.listContacts[index].name = valueBefore;
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
@import '{ .Contact .contacts-title} from ../../../../scss/components/list.contacts';
</style>
