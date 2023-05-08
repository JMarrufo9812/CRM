<template>
  <v-dialog v-model="modal.status" scrollable width="60em" persistent>
    <v-card height="44em">
      <v-card-title class="primary white--text">
        {{ textTitle }}
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-2">
        <div v-if="isLoadingTemplate" class="text-center my-10">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          Cargando plantilla...
        </div>
        <v-form ref="formEmail" v-model="valid" v-show="!isLoadingTemplate">
          <v-row no-gutters>
            <v-col cols="12">
              <v-combobox
                v-model="email.selectContacts"
                :items="listContacts"
                :filter="filterObject"
                :menu-props="menuContacts"
                :search-input.sync="search"
                class="mb-2"
                label="Para:"
                item-text="email"
                hide-details="auto"
                dense
                multiple
                outlined
                hide-selected
                append-icon=""
                :rules="[...rules.isRequiredOne, ...rules.emailsCombobox]"
              >
                <template #[`append`]>
                  <v-btn
                    v-if="!isActiveCC"
                    text
                    small
                    color="primary"
                    @click="isActiveCC = true"
                  >
                    CC
                  </v-btn>
                  <v-btn
                    v-if="!isActiveBCC"
                    text
                    small
                    color="primary"
                    @click="isActiveBCC = true"
                  >
                    BCC
                  </v-btn>
                </template>
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    :disabled="data.disabled"
                    :color="
                      validEmail(data.item.email ? data.item.email : data.item)
                        ? 'success'
                        : 'error'
                    "
                    class="my-1"
                  >
                    <v-avatar
                      v-if="data.item === Object(data.item)"
                      color="secondary"
                      left
                      v-text="data.item.name.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    <v-avatar
                      v-else
                      color="secondary"
                      left
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item.name ? data.item.name : data.item }}
                    <v-icon small @click="data.parent.selectItem(data.item)">
                      mdi-close
                    </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ on, attrs, item }">
                  <v-list-item two-line dense v-on="on" :attrs="attrs">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.email }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No se encontraron resultados "
                        <strong>{{ search }}</strong>
                        ". Presiona
                        <kbd>entrar</kbd>
                        para añadirlo.
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12">
              <v-combobox
                v-show="isActiveCC"
                v-model="email.selectCC"
                :items="listContacts"
                :filter="filterObject"
                :menu-props="menuCC"
                :search-input.sync="searchCC"
                class="mb-2"
                label="CC:"
                item-text="email"
                hide-details="auto"
                dense
                multiple
                outlined
                hide-selected
                append-icon=""
                :autofocus="isActiveCC"
                :rules="rules.emailsCombobox"
              >
                <template slot="append-outer">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        color="error"
                        @click="isActiveCC = false"
                      >
                        mdi-minus-circle
                      </v-icon>
                    </template>
                    <span>Quitar CC</span>
                  </v-tooltip>
                </template>
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    :disabled="data.disabled"
                    :color="
                      validEmail(data.item.email ? data.item.email : data.item)
                        ? 'success'
                        : 'error'
                    "
                    class="my-1"
                  >
                    <v-avatar
                      v-if="data.item === Object(data.item)"
                      color="secondary"
                      left
                      v-text="data.item.name.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    <v-avatar
                      v-else
                      color="secondary"
                      left
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item.name ? data.item.name : data.item }}
                    <v-icon small @click="data.parent.selectItem(data.item)">
                      mdi-close
                    </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ on, attrs, item }">
                  <v-list-item two-line dense v-on="on" :attrs="attrs">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.email }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No se encontraron resultados "
                        <strong>{{ search }}</strong>
                        ". Presiona
                        <kbd>entrar</kbd>
                        para añadirlo
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12">
              <v-combobox
                v-show="isActiveBCC"
                v-model="email.selectBCC"
                :items="listContacts"
                :filter="filterObject"
                :menu-props="menuBCC"
                :search-input.sync="searchBCC"
                class="mb-2"
                label="BCC:"
                item-text="email"
                hide-details="auto"
                dense
                multiple
                outlined
                hide-selected
                append-icon=""
                :autofocus="isActiveBCC"
                :rules="rules.emailsCombobox"
              >
                <template slot="append-outer">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        color="error"
                        @click="isActiveBCC = false"
                      >
                        mdi-minus-circle
                      </v-icon>
                    </template>
                    <span>Quitar BCC</span>
                  </v-tooltip>
                </template>
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    :disabled="data.disabled"
                    :color="
                      validEmail(data.item.email ? data.item.email : data.item)
                        ? 'success'
                        : 'error'
                    "
                    class="my-1"
                  >
                    <v-avatar
                      v-if="data.item === Object(data.item)"
                      color="secondary"
                      left
                      v-text="data.item.name.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    <v-avatar
                      v-else
                      color="secondary"
                      left
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item.name ? data.item.name : data.item }}
                    <v-icon small @click="data.parent.selectItem(data.item)">
                      mdi-close
                    </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ on, attrs, item }">
                  <v-list-item two-line dense v-on="on" :attrs="attrs">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.email }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No se encontraron resultados "
                        <strong>{{ search }}</strong>
                        ". Presiona
                        <kbd>entrar</kbd>
                        para añadirlo
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12">
              <EmailEditorSubject
                :isEdit="modal.isEdit"
                :isLoading="isLoadingTemplate"
                :subject="subjectDefault"
                @updateSubject="updateSubject"
                :reset="modal.status"
              ></EmailEditorSubject>
              <p v-if="!isValidSubject" class="red--text">
                El asunto es requerido
              </p>
            </v-col>
            <v-col cols="12" class="pt-2">
              <v-divider></v-divider>
              <EmailEditor
                :message="messageDefault"
                :signature="signature"
                @saveFiles="saveFiles"
                @updateMessage="updateMessage"
                :reset="modal.status"
              ></EmailEditor>
              <p v-if="!isValidMessage" class="red--text">
                El mensaje es requerido
              </p>
            </v-col>
          </v-row>
        </v-form>
        <div class="previewEmail" v-if="resend" v-html="content"></div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-switch
          dense
          v-model="isTracking"
          inset
          :label="`${isTracking ? 'Desactivar' : 'Activar'} seguimiento`"
        ></v-switch>
        <v-spacer></v-spacer>
        <v-btn
          style="width:10em"
          color="secondary"
          @click="sendEmail"
          :loading="isLoading"
        >
          Enviar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import EmailEditor from '@/components/emails/EmailEditor.vue';
import {
  GET_CONTACT,
  GET_CONTACTS_TO_EMAIL,
} from '@/graphql/querys/contactsQuery';
import { GET_COMPANY } from '@/graphql/querys/companiesQuery';
import { GET_DEAL } from '@/graphql/querys/dealsQuery';
import { SEND_EMAIL } from '@/graphql/mutations/emailsMutations';
import { rulesMixin } from '@/mixins/rulesMixin';
import { GET_TEMPLATE_EMAIL } from '@/graphql/querys/templateEmailsQuery';
import EmailEditorSubject from '@/components/emails/EmailEditorSubject.vue';
import { successesMixin } from '@/mixins/successes';
import { errorsMixin } from '@/mixins/errors';
import { GET_FORM_EMAIL } from '@/graphql/querys/formsQuery';

// eslint-disable-next-line
const juice = require('juice');

export default {
  name: 'ModalEmail',
  components: { EmailEditor, EmailEditorSubject },
  mixins: [
    rulesMixin,
    modalMethodsMixin,
    modalApolloMixin,
    successesMixin,
    errorsMixin,
  ],
  data() {
    return {
      formContactExtend: [
        {
          id: 'firstName',
          label: 'Nombre',
        },
        {
          id: 'lastName',
          label: 'Apellido',
        },
      ],
      form: {
        formContact: {
          defaultForm: {
            inputs: [],
          },
          customForm: {
            inputs: [],
          },
        },
        formCompany: {
          defaultForm: {
            inputs: [],
          },
          customForm: {
            inputs: [],
          },
        },
        formDeal: {
          defaultForm: {
            inputs: [],
          },
          customForm: {
            inputs: [],
          },
        },
      },
      // Modal control
      isLoadingTemplate: false,
      modalId: 'sendEmail',
      modal: {},
      // Modal signature
      isOpenModalSignature: false,
      // resend handler
      content: '',
      resend: false,
      // To
      search: '',
      // CC
      isActiveCC: false,
      searchCC: '',
      // BCC
      isActiveBCC: false,
      searchBCC: '',
      // List
      contacts: [],
      // Content default
      subjectDefault: '',
      messageDefault: '',
      signature: '',
      isTracking: false,
      // Validations
      isValidMessage: true,
      isValidSubject: true,
      valid: true,
      // Loading
      isLoading: false,
      // Email schema
      email: {
        selectContacts: [],
        selectCC: [],
        selectBCC: [],
        subject: '',
        message: '',
        files: [],
        images: [],
        attachments: [],
      },
      // Email schema default
      emailDefault: {
        selectContacts: [],
        selectCC: [],
        selectBCC: [],
        subject: '',
        message: '',
        files: [],
        images: [],
        attachments: [],
      },
      fieldsEmailSubject: [],
      fieldsEmailMessage: [],
    };
  },
  watch: {
    isActiveCC(isActive) {
      if (!isActive) this.email.selectCC = [];
    },
    isActiveBCC(isActive) {
      if (!isActive) this.email.selectBCC = [];
    },
    search(newSearch) {
      if (newSearch === '') this.search = null;
    },
    searchCC(newSearch) {
      if (newSearch === '') this.searchCC = null;
    },
    selectBCC(newSearch) {
      if (newSearch === '') this.selectBCC = null;
    },
    modal(modalItem) {
      if (modalItem.status) {
        if (modalItem.item) {
          if (modalItem.item.type === 'RESPONSE') {
            const {
              info: {
                from: { value },
              },
            } = modalItem.item;
            value.forEach((email) => {
              const isExistContact = this.listContacts.some(
                (contact) => contact.email === email.address,
              );
              if (isExistContact) {
                const findObject = this.listContacts.find(
                  (contact) => contact.email === email.address,
                );
                this.email.selectContacts.push(findObject);
              } else {
                this.email.selectContacts.push(email.address);
              }
            });
          }
          if (modalItem.item.type === 'RESEND') {
            this.resend = true;
            const { data, subject } = modalItem.item.info;
            this.subjectDefault = `RE: ${subject}`;
            this.content = juice(
              decodeURIComponent(
                escape(atob(data.replace(/-/g, '+').replace(/_/g, '/'))),
              ),
            );
          }
        }
      }
      if (modalItem.status && modalItem.isEdit) {
        this.getEmail();
      }
    },
    'email.selectContacts': {
      handler() {
        this.search = null;
      },
    },
    'email.selectCC': {
      handler() {
        this.searchCC = null;
      },
    },
    'email.selectBCC': {
      handler() {
        this.searchBCC = null;
      },
    },
    'email.subject': {
      handler(subject) {
        this.validSubject(subject);
      },
    },
    'email.message': {
      handler(message) {
        this.validMessage(message);
      },
    },
  },
  computed: {
    fields() {
      return [...this.fieldsContact, ...this.fieldsCompany, ...this.fieldsDeal];
    },
    fieldsContact() {
      const inputs = [
        ...this.formContactExtend,
        ...this.form.formContact.defaultForm.inputs,
        ...(this.form.formContact.customForm.inputs
          ? this.form.formContact.customForm.inputs
          : []),
      ];

      return this.formatListFields(inputs, 'contact');
    },
    fieldsCompany() {
      const inputs = [
        ...this.form.formCompany.defaultForm.inputs,
        ...(this.form.formCompany.customForm.inputs
          ? this.form.formCompany.customForm.inputs
          : []),
      ];

      return this.formatListFields(inputs, 'company');
    },
    fieldsDeal() {
      const inputs = [
        ...this.form.formDeal.defaultForm.inputs,
        ...(this.form.formDeal.customForm.inputs
          ? this.form.formDeal.customForm.inputs
          : []),
      ];

      return this.formatListFields(inputs, 'deal');
    },
    searchControl() {
      if (
        this.search !== null &&
        this.search !== undefined &&
        this.search !== ''
      ) {
        return this.search;
      }
      if (
        this.searchCC !== null &&
        this.searchCC !== undefined &&
        this.searchCC !== ''
      ) {
        return this.searchCC;
      }
      if (
        this.searchBCC !== null &&
        this.searchBCC !== undefined &&
        this.searchBCC !== ''
      ) {
        return this.searchBCC;
      }
      return '';
    },
    textTitle() {
      if (this.modal?.item?.type === 'RESEND') {
        return 'Reenviar correo';
      }
      if (this.modal?.item?.type === 'RESPONSE') {
        return 'Responder correo';
      }

      return 'Nuevo mensaje';
    },
    listContacts() {
      if (!this.contacts.list) return [];
      return this.contacts.list.filter((contact) => contact.email !== null);
    },
    menuContacts() {
      return this.menuProps(this.search);
    },
    menuCC() {
      return this.menuProps(this.searchCC);
    },
    menuBCC() {
      return this.menuProps(this.searchBCC);
    },
    hasSearch() {
      if (
        this.search !== null &&
        this.search !== undefined &&
        this.search !== ''
      ) {
        return this.search.length > 0;
      }
      return false;
    },
    hasSearchCC() {
      if (
        this.searchCC !== null &&
        this.searchCC !== undefined &&
        this.searchCC !== ''
      ) {
        return this.searchCC.length > 0;
      }
      return false;
    },
    hasSearchBCC() {
      if (
        this.searchBCC !== null &&
        this.searchBCC !== undefined &&
        this.searchBCC !== ''
      ) {
        return this.searchBCC.length > 0;
      }
      return false;
    },
    readOnly() {
      if (
        this.selectedContacts === null ||
        this.selectedContacts === undefined ||
        this.selectedContacts.length === 0
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    formatListFields(inputs, type) {
      return inputs.map(({ id, label, keyInput }) => {
        return {
          id,
          label,
          keyInput: keyInput || id,
          isCustom: Boolean(!keyInput),
          type,
        };
      });
    },
    updateSubject(subject) {
      this.email.subject = subject;
    },
    updateMessage(message) {
      this.email.message = message;
    },
    getEmail() {
      this.isLoadingTemplate = true;
      this.$apollo
        .query({
          query: GET_TEMPLATE_EMAIL,
          variables: {
            emailTemplateId: this.modal.item.id,
          },
        })
        .then(
          ({
            data: {
              emailTemplate: {
                content: { subject, message },
              },
            },
          }) => {
            this.subjectDefault = subject;
            this.messageDefault = message;
            this.isLoadingTemplate = false;
          },
        )
        .catch(() => {
          this.isLoadingTemplate = false;
          this.addError({
            code: 400,
            message:
              'No se pudo cargar la plantilla, intente de nuevo o contacte a soporte',
          });
        });
    },
    validEmail(email) {
      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return regexEmail.test(email);
    },
    saveFiles(files) {
      this.email.files = files;
    },
    formatListEmails(listContacts) {
      return listContacts.map((contact) => {
        if (typeof contact === 'string') {
          return { address: contact };
        }

        const { id, email } = contact;

        return {
          id,
          address: email,
        };
      });
    },
    getFieldsType(listFields, typeField) {
      const listDefault = listFields.filter((item) => !item.isCustom);
      const listCustom = listFields.filter((item) => item.isCustom);
      const resultDefault = listDefault
        .filter((item) => item.type === typeField)
        .map((item) => {
          const { type, isCustom, ...rest } = item;
          return rest;
        });

      const resultCustom = listCustom
        .filter((item) => item.type === typeField)
        .map((item) => {
          const { type, isCustom, ...rest } = item;
          return rest;
        });

      if (resultCustom.length > 0) {
        return [...resultDefault, ...[{ custom: [...resultCustom] }]];
      }
      return [...resultDefault];
    },
    convertArrayToObject(array) {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          ...item,
        };
      }, initialValue);
    },
    async searchValueField({ keyInput, type, isCustom }, item, result) {
      // Here search values of field
      if (item.id !== item.address) {
        let resultField = {};
        if (type === 'contact') {
          try {
            resultField = result;
          } catch {
            resultField = null;
          }
        }

        if (type === 'company') {
          try {
            resultField = await this.$apollo.query({
              query: GET_COMPANY,
              variables: {
                companyId: result.data.contact.companies[0].id,
              },
            });
          } catch {
            resultField = null;
          }
        }

        if (type === 'deal') {
          try {
            resultField = await this.$apollo.query({
              query: GET_DEAL,
              variables: {
                dealId: result.data.contact.deals[0].id,
              },
            });
          } catch {
            resultField = null;
          }
        }

        if (isCustom && resultField && resultField?.data) {
          if (keyInput === 'firstName') {
            const nameComplete = resultField.data[type]?.name;
            if (nameComplete.split(' ').length > 1) {
              return nameComplete
                .split(' ')
                .slice(0, -1)
                .join(' ');
            }
            return nameComplete;
          }
          if (keyInput === 'lastName') {
            return resultField.data[type].name
              .split(' ')
              .slice(-1)
              .join(' ');
          }

          const fieldCustom = resultField.data[type].customForms.find(
            (field) => field.id === keyInput,
          );
          return fieldCustom ? fieldCustom.value : '';
        }
        if (resultField && resultField?.data) {
          return resultField.data[type][keyInput];
        }
        return '';
      }
      if (keyInput === 'isClient') {
        return false;
      }

      return '';
    },
    getFieldsIntoEmail() {
      const subject = this.fieldsEmailSubject.map((idField) => {
        return this.fields.find(({ id }) => id === idField);
      });
      const message = this.fieldsEmailMessage.map((idField) => {
        return this.fields.find(({ id }) => id === idField);
      });
      return [...subject, ...message];
    },
    async formatParams(list) {
      const listParams = await Promise.all(
        list.map(async (item) => {
          let result = {};

          try {
            if (item.id) {
              result = await this.$apollo.query({
                query: GET_CONTACT,
                variables: {
                  contactId: item.id,
                },
              });
            }
          } catch {
            result = null;
          }
          const getFields = await Promise.all(
            this.getFieldsIntoEmail().map(async (fieldItem) => {
              if (fieldItem.keyInput === 'companies') {
                const company = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );
                return {
                  company: company && company.length > 0 ? company[0].name : '',
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              if (fieldItem.keyInput === 'contact') {
                const contact = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );
                return {
                  contact: contact ? contact.name : '',
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              if (fieldItem.keyInput === 'company') {
                const company = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );
                return {
                  company: company ? company.name : '',
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              if (fieldItem.keyInput === 'value') {
                const value = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );
                return {
                  value: value ? `${value}` : '',
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              if (fieldItem.keyInput === 'pipeline') {
                const pipeline = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );
                return {
                  pipeline: pipeline ? pipeline.name : '',
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              if (fieldItem.keyInput === 'owner') {
                const owner = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );
                return {
                  owner: owner
                    ? `${owner.user.name} ${owner.user.lastName}`
                    : '',
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              if (fieldItem.keyInput === 'phones') {
                const phones = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );

                return {
                  phones:
                    phones && phones.length > 0
                      ? `Teléfono${phones.length > 1 ? 's' : ''}: ${phones
                          .map((phone) => {
                            return phone.number;
                          })
                          .join(', ')}`
                      : '',
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              if (fieldItem.keyInput === 'tags') {
                const tags = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );
                return {
                  tags:
                    tags && tags.length > 0
                      ? `Etiquetas: ${tags
                          .map((tag) => {
                            return tag.name;
                          })
                          .join(', ')}`
                      : '',
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              if (fieldItem.keyInput === 'birthday') {
                const birthday = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );
                let getTextBirthday = '';
                if (birthday) {
                  const [day, month] = birthday.split('/');
                  getTextBirthday = moment({
                    month: month - 1,
                    day,
                  }).format('DD [de] MMMM');
                }
                return {
                  birthday: getTextBirthday,
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              if (fieldItem.keyInput === 'expectedCloseDate') {
                const expectedCloseDate = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );
                let getTextExpectedCloseDate = '';
                if (expectedCloseDate) {
                  const [year, month, day] = expectedCloseDate.split('-');
                  getTextExpectedCloseDate = moment({
                    year,
                    month: month - 1,
                    day,
                  }).format('DD [de] MMMM [del] YYYY');
                }
                return {
                  expectedCloseDate: getTextExpectedCloseDate,
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              if (fieldItem.keyInput === 'isClient') {
                const isClient = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );
                return {
                  isClient: isClient ? 'Es cliente' : 'No es cliente',
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              if (fieldItem.keyInput === 'socialMedias') {
                const socialMedias = await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                );

                return {
                  socialMedias:
                    socialMedias && socialMedias.length > 0
                      ? socialMedias
                          .map((social) => {
                            const typeSocial =
                              social.type.charAt(0).toUpperCase() +
                              social.type.slice(1);
                            return `${typeSocial}: ${social.url}`;
                          })
                          .join(' ')
                      : '',
                  type: fieldItem.type,
                  isCustom: fieldItem.isCustom,
                };
              }

              return {
                [fieldItem.keyInput]: await this.searchValueField(
                  fieldItem,
                  item,
                  result,
                ),
                type: fieldItem.type,
                isCustom: fieldItem.isCustom,
              };
            }),
          );

          if (getFields.length > 0) {
            const fieldsContact = this.getFieldsType(getFields, 'contact');
            const fieldsCompany = this.getFieldsType(getFields, 'company');
            const fieldsDeal = this.getFieldsType(getFields, 'deal');
            const resultContact = this.convertArrayToObject(fieldsContact);
            const resultCompany = this.convertArrayToObject(fieldsCompany);
            const resultDeal = this.convertArrayToObject(fieldsDeal);

            const fieldsObject = {};

            if (!this.isObjectEmpty(resultContact)) {
              fieldsObject.contact = { ...resultContact };
            }
            if (!this.isObjectEmpty(resultCompany)) {
              fieldsObject.company = { ...resultCompany };
            }
            if (!this.isObjectEmpty(resultDeal)) {
              fieldsObject.deal = { ...resultDeal };
            }
            if (!this.isObjectEmpty(fieldsObject)) {
              return {
                id: item.id,
                ...fieldsObject,
              };
            }
            return fieldsObject;
          }
          return null;
        }),
      );
      // TODO-- Permitir que el ID se coloque cuando sea un correo para enviar todos los campos nulos.
      if (listParams.length === 1 && listParams[0] === null) {
        return null;
      }
      return listParams.filter((item) => item !== null);
    },
    isObjectEmpty(obj) {
      return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    },
    validMessage(message) {
      if (!this.modal.status) {
        this.isValidMessage = true;
      } else if (this.modal?.item?.type === 'RESEND') {
        this.isValidMessage = true;
      } else {
        this.isValidMessage = !this.isEmptyEditor(message, 'MESSAGE');
      }
    },
    validSubject(subject) {
      if (!this.modal.status) {
        this.isValidSubject = true;
      } else if (this.modal?.item?.type === 'RESEND') {
        this.isValidSubject = true;
      } else {
        this.isValidSubject = !this.isEmptyEditor(subject, 'SUBJECT');
      }
    },
    isEmptyEditor(content, type) {
      let resultTest = false;
      if (type === 'SUBJECT') {
        const regexNoSpacesP = /<p>.*[a-zA-ZñÑ].*<\/p>/g;
        resultTest = regexNoSpacesP.test(content);
      }
      if (type === 'MESSAGE') {
        const regexNoSpaces = /<div>.*[a-zA-ZñÑ].*<\/div>/g;
        const regexNoSpacesH = /<h[1-3]>.*[a-zA-ZñÑ].*<\/h[1-3]>/g;
        resultTest =
          regexNoSpaces.test(content) || regexNoSpacesH.test(content);
      }
      return content === '' || content === '<div></div>' || !resultTest;
    },
    async dataUrlToFile(dataUrl, fileName) {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      return new File([blob], fileName, { type: 'image/png' });
    },
    parserEmail(images) {
      return images.map(async (img) => {
        const base64 = img.file;
        const file = await this.dataUrlToFile(base64, img.name);
        return { file, cid: img.cid };
      });
    },
    uid() {
      const a = new Uint32Array(3);
      window.crypto.getRandomValues(a);
      return (
        performance.now().toString(36) +
        Array.from(a)
          .map((A) => A.toString(36))
          .join('')
      ).replace(/\./g, '');
    },
    embedInlineImages(html) {
      return html.replace(/<img[^>]*>/gi, (imgTag) => {
        return imgTag.replace(
          /\b(src\s*=\s*(?:['"]?))([^'"> ]+)/i,
          (src, prefix, url) => {
            const cid = this.uid();
            const getAlt = new RegExp('alt="([^"]*)"');
            const nameImage = getAlt.exec(imgTag)[1];

            this.addAttachment({
              file: url,
              cid,
              name: nameImage,
            });

            return `${prefix}cid:${cid}`;
          },
        );
      });
    },
    addAttachment(attach) {
      this.email.attachments.push(attach);
    },
    formatFiles(files) {
      return files.map((item) => {
        return { file: item };
      });
    },
    removeTagP(html) {
      return html.replace(/<p>(.*?)<\/p>/gi, (element, content) => content);
    },
    transformHTMLSubject(subject) {
      this.fieldsEmailSubject = [];
      return this.transformHTML(this.removeTagP(subject), 'subject');
    },
    transformHTMLMessage(message) {
      this.fieldsEmailMessage = [];
      return this.transformHTML(message, 'message');
    },
    findFieldVariable(id) {
      const field = this.fields.find((item) => item.id.toString() === id);
      if (field.keyInput === 'companies') {
        return `${field.type}.company`;
      }
      return `${field.type}.${field.keyInput}`;
    },
    transformHTML(html, type) {
      return html.replace(
        /<span\s(?:class="variable")\s(?:data-variable-id="(.*?)")>(.*?)<\/span>/gi,
        (element, id) => {
          if (type === 'subject') {
            this.fieldsEmailSubject.push(id);
          }
          if (type === 'message') {
            this.fieldsEmailMessage.push(id);
          }
          return `{${this.findFieldVariable(id.toString())}}`;
        },
      );
    },
    async sendEmail() {
      this.$refs.formEmail.validate();
      this.validSubject(this.email.subject);
      this.validMessage(this.email.message);
      if (this.valid && this.isValidSubject && this.isValidMessage) {
        this.isLoading = true;
        const result = this.embedInlineImages(this.email.message);
        if (this.email.attachments.length > 0) {
          const images = await this.parserEmail(this.email.attachments);
          this.email.images = await Promise.all(images).then((results) => {
            return results;
          });
        }
        const to = this.formatListEmails(this.email.selectContacts);
        const cc = this.formatListEmails(this.email.selectCC);
        const bcc = this.formatListEmails(this.email.selectBCC);
        const gmailInput = {
          to,
          subject: this.transformHTMLSubject(this.email.subject),
          htmlContent: this.transformHTMLMessage(result),
        };
        if (this.resend) {
          gmailInput.htmlContent = `${gmailInput.htmlContent} ${this.content}`;
        }

        if (cc.length > 0) gmailInput.cc = cc;
        if (bcc.length > 0) gmailInput.bcc = bcc;
        if (this.email.files.length > 0) {
          gmailInput.attachments = this.formatFiles(this.email.files);
          if (this.email.images.length > 0) {
            gmailInput.attachments = gmailInput.attachments.concat(
              this.email.images,
            );
          }
        } else if (this.email.images.length > 0) {
          gmailInput.attachments = this.email.images;
        }
        gmailInput.tracking = this.isTracking;

        const params = (await this.formatParams([...to, ...cc, ...bcc])) || [];

        if (params && params.length > 0) {
          gmailInput.params = params;
        }

        const listJustEmails =
          to.filter(
            (item) => !Object.prototype.hasOwnProperty.call(item, 'id'),
          ) || [];

        if (params.length > 0 && listJustEmails.length > 0) {
          this.isLoading = false;
          this.addError({
            code: 400,
            message:
              'No se pudo enviar el correo, los campos personalizdos solo pueden usarse con contactos registrados',
          });
        } else {
          this.$apollo
            .mutate({
              client: 'email',
              mutation: SEND_EMAIL,
              variables: {
                gmailInput,
              },
            })
            .then(() => {
              this.close();
              this.isLoading = false;
              this.addSuccess('Se envió el correo éxitosamente.');
            })
            .catch(() => {
              this.isLoading = false;
              this.addError({
                code: 400,
                message:
                  'No se pudo enviar el correo, intente de nuevo o contacte a soporte',
              });
            });
        }
      }
    },
    resetData() {
      this.$refs.formEmail.resetValidation();
      // Content
      this.email = JSON.parse(JSON.stringify(this.emailDefault));
      this.isValidMessage = true;
      this.isValidSubject = true;
      this.resend = false;
      this.content = '';
      // To
      this.search = '';
      // CC
      this.isActiveCC = false;
      this.searchCC = '';
      // BCC
      this.isActiveBCC = false;
      this.searchBCC = '';

      this.subjectDefault = '';
      this.messageDefault = '';
      this.isTracking = false;
    },
    close() {
      this.changeModal({
        id: 'sendEmail',
        status: false,
        isEdit: false,
        item: null,
      });
      setTimeout(() => {
        this.resetData();
      }, 1);
    },
    filterObject(item, queryText) {
      return (
        item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 ||
        item.email.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1
      );
    },
    menuProps(search) {
      return !search ? { value: false } : {};
    },
  },
  apollo: {
    contacts: {
      query: GET_CONTACTS_TO_EMAIL,
      variables() {
        return {
          filters: {
            orderBy: 'desc',
            search: this.searchControl,
            take: 10,
            withEmail: true,
          },
        };
      },
      skip() {
        return !this.hasSearch && !this.hasSearchCC && !this.hasSearchBCC;
      },
    },
    form: {
      query: GET_FORM_EMAIL,
      update(data) {
        return {
          formContact: data.formContact,
          formCompany: data.formCompany,
          formDeal: data.formDeal,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .previewEmail } from ../../../../scss/components/email.content';
</style>
