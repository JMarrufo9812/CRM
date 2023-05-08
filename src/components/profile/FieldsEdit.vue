<template>
  <v-container>
    <v-row
      class="profile__input"
      v-for="input in listFieldsMix"
      :key="input.id"
    >
      <v-col cols="4" class="d-flex align-center">{{ input.name }}</v-col>
      <v-col cols="8" class="d-flex align-center">
        <FieldValue v-if="!isEmptyInput(input.value)" :field="input" />
        <v-menu
          v-model="input.edit"
          :close-on-content-click="false"
          offset-y
          left
          nudge-right="50"
          absolute
          @input="menuStatus(input)"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              absolute
              x-small
              color="secondary"
              class="profile__input__edit mr-4"
              v-show="
                !isEmptyInput(input.value) &&
                  (canEdit || canEditOthers) &&
                  !item.isDelete
              "
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small color="white">mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              v-show="
                isEmptyInput(input.value) &&
                  (canEdit || canEditOthers) &&
                  !item.isDelete
              "
              text
              color="success"
              small
              v-bind="attrs"
              v-on="on"
              class="profile__input__add"
            >
              <v-icon x-small>mdi-plus</v-icon>
              Añadir valor
            </v-btn>
          </template>
          <v-card class="pa-4" tile width="15em" v-if="input.edit">
            <v-form
              ref="form"
              v-model="formValidate"
              @submit.prevent="save(input)"
            >
              <Fields
                :inputProps="{ isDense: true, class: 'no-icon' }"
                :field="input"
                @outValue="getValueInput"
              />
            </v-form>
            <div class="d-flex justify-center mt-2">
              <v-btn
                style="width: 45%"
                class="mr-2"
                x-small
                color="primary"
                outlined
                @click="cancel(input)"
              >
                Cancelar
              </v-btn>
              <v-btn
                style="width: 45%"
                :disabled="validateInputsValue(input)"
                x-small
                color="secondary"
                @click="save(input)"
                :loading="isLoading"
              >
                Guardar
              </v-btn>
            </div>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-container>
</template>

<script>
// ability
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import {
  PERMISSIONS_CONTACTS,
  PERMISSIONS_COMPANIES,
  PERMISSIONS_DEALS,
} from '@/constants/permissions';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
// Queries
import { GET_FORM_CONTACT } from '@/graphql/local-state/queries';
// mixins
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { dealsMixin } from '@/mixins/dealsMixin';
import { contactsMixin } from '@/mixins/contactsMixin';
import { companiesMixin } from '@/mixins/companiesMixin';

export default {
  name: 'FieldsEdit',
  mixins: [modalsAlertsMixin, dealsMixin, contactsMixin, companiesMixin],
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    typeItem: {
      type: String,
      required: true,
      default: () => {
        return {};
      },
    },
    inputsDefault: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    inputsCustom: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },
  components: {
    Fields: () => import('@/components/fields/Fields.vue'),
    FieldValue: () => import('@/components/fields/FieldValue.vue'),
  },
  data() {
    return {
      subject,
      UPDATE,
      UPDATE_OTHERS,
      PERMISSIONS_CONTACTS,
      PERMISSIONS_COMPANIES,
      PERMISSIONS_DEALS,
      isLoading: false,
      // inputs Defaults
      listValuesDefault: [],
      listFieldsDefault: [],
      // Inputs custom
      listValuesCustom: [],
      listFieldsCustom: [],
      // handler querys
      skipContactQuery: true,
      skipCompanyQuery: true,
      skipDealQuery: true,
      formValidate: true,
    };
  },
  watch: {
    // Check changes and reInit
    item: {
      handler() {
        // defaults
        this.listValuesDefault = this.formatValuesDefault();
        this.listFieldsDefault = this.formatListDefaultFields();
        // custom
        this.listValuesCustom = this.formatValuesCustom();
        this.listFieldsCustom = this.formatListCustomFields();
      },
      immediate: true,
    },
    isLoadingUpdateDeal(value) {
      if (!value) this.isLoading = false;
    },
    isLoadingUpdateContact(value) {
      if (!value) this.isLoading = false;
    },
    isLoadingUpdateCompany(value) {
      if (!value) this.isLoading = false;
    },
  },
  computed: {
    canEdit() {
      if (this.typeItem === 'CONTACT') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_CONTACTS, {
            authorId: this?.item?.owner?.id || '',
          }),
        );
      }
      if (this.typeItem === 'COMPANY') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_COMPANIES, {
            authorId: this?.item?.owner?.id || '',
          }),
        );
      }
      if (this.typeItem === 'DEAL') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_DEALS, { authorId: this?.item?.owner?.id || '' }),
        );
      }
      return false;
    },
    canEditOthers() {
      if (this.typeItem === 'CONTACT') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_CONTACTS, {
                authorId: this?.item?.owner?.id || '',
              }),
            )
          );
        }
        return ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS);
      }
      if (this.typeItem === 'COMPANY') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_COMPANIES, {
                authorId: this?.item?.owner?.id || '',
              }),
            )
          );
        }
        return ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES);
      }
      if (this.typeItem === 'DEAL') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_DEALS, {
                authorId: this?.item?.owner?.id || '',
              }),
            )
          );
        }
        return ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS);
      }
      return false;
    },
    // List complete with default and custom fields
    listFieldsMix() {
      return [...this.listFieldsDefault, ...this.listFieldsCustom];
    },
  },
  methods: {
    // Save control
    save(input) {
      if (this.formValidate) {
        this.isLoading = true;
        let updateField;
        if (!input.keyInput) {
          updateField = this.formatCustomUpdate(input);
          this.saveCustomHandler(updateField);
        } else {
          // Assign field and values depending of the type
          // eslint-disable-next-line
          updateField = this.formatUpdateJSON(input.keyInput, input.value);
          // Get index field
          this.saveDefaultHandler(input, updateField);
        }
      }
    },
    // Cancel edit control
    cancel(input) {
      if (!this.isCustom(input)) {
        // If cancel reset the value
        this.resetValueDefault(input);
        // Close edit field
        this.closeEditField(this.getIndexField(input));
      } else {
        this.resetValueCustom(input);
        this.closeEditFieldCustom(this.getIndexFieldCustom(input));
      }
    },
    menuStatus(input) {
      if (!input.edit) {
        this.cancel(input);
      }
    },
    // update input value
    getValueInput({ keyInput, input, index }) {
      if (keyInput === 'socialMedias') {
        this.listFieldsDefault = this.listFieldsDefault.map((field) => {
          if (field.keyInput === keyInput) {
            // eslint-disable-next-line
            field.value[index] = input;
          }
          return field;
        });
      }
    },
    // valida si los valores de los inputs son iguales evita guardar el mismo valores
    // y evita guardar historial inecesario
    validateInputsValue({ id, type, keyInput, value }) {
      let oldValue;
      // validate if input is custom or default and get the index for get to oldValue and compare
      if (keyInput) {
        const indexField = this.getIndexField({ id, type, keyInput, value });
        oldValue = this.getValueDefault(indexField);
      } else {
        const indexField = this.getIndexFieldCustom({ id, type, value });
        oldValue = this.getValueCustom(indexField);
      }
      if (type === 'CHECKBOX') {
        if (JSON.stringify(oldValue) === JSON.stringify(value)) return true;
      }
      if (keyInput === 'phones') {
        // console.log('value', value);
        // console.log('oldValue', oldValue);
        if (
          oldValue.length === 0 &&
          value.length === 1 &&
          value[0].number.length < 10
        ) {
          return true;
        }
        // compara los dos arreglos
        if (JSON.stringify(oldValue) === JSON.stringify(value)) {
          return true;
        }
        return value.some(({ number }) => number.length < 10);
      }
      if (keyInput === 'socialMedias') {
        const newSocialMedias = value
          .filter(({ url }) => url)
          .map(({ type: typeSM, url }) => {
            return { url, type: typeSM };
          });
        const oldSocialMedias = oldValue
          .filter(({ url }) => url)
          .map(({ type: typeSM, url }) => {
            return { url, type: typeSM };
          });

        const isEqual = newSocialMedias.every((newSM) =>
          oldSocialMedias.some(
            (oldSM) => newSM.url === oldSM.url && newSM.type === oldSM.type,
          ),
        );
        if (isEqual) return true;
      }
      if (oldValue === value) {
        return true;
      }
      if (typeof oldValue !== 'boolean' && typeof value !== 'boolean') {
        if (!oldValue && !value) {
          return true;
        }
      }
      return false;
    },
    /** Apply format to fields default
    For example: [{id: '', name: '', keyInput: '',
    order: 0, type: 'TEXT', value: '', items: [], edit: false }] */
    formatListDefaultFields() {
      return this.inputsDefault.map((item) => {
        const { id, label, items, keyInput, type, order } = item;
        return {
          id,
          name: label,
          // Change the label to name. This is for no show the label into the input component
          label,
          items,
          keyInput,
          value: this.item[keyInput],
          type,
          order,
          edit: false,
          icon: 'no-icon',
        };
      });
    },
    // Format to default fields
    formatDefaultUpdate(input) {
      return { [input.keyInput]: input.value };
    },
    // Get index of the field default
    getIndexField(input) {
      return this.listFieldsDefault.findIndex(
        (field) => field.keyInput === input.keyInput,
      );
    },
    /**  Apply format to values default
    For example: [{id: '', value: ''}, ...] */
    formatValuesDefault() {
      return JSON.parse(
        JSON.stringify(
          this.inputsDefault.map((input) => {
            return {
              id: input.id,
              value: this.item[input.keyInput],
            };
          }),
        ),
      );
    },
    // Reset field default with the value before
    resetValueDefault(input) {
      const indexField = this.getIndexField(input);
      this.listFieldsDefault = this.listFieldsDefault.map((defaultField) => {
        if (defaultField.id === input.id) {
          // eslint-disable-next-line
          defaultField.value = JSON.parse(
            JSON.stringify(this.getValueDefault(indexField)),
          );
        }
        return defaultField;
      });
    },
    // Get the value of the field default
    getValueDefault(indexField) {
      return this.listValuesDefault.find(
        (item) => item.id === this.listFieldsDefault[indexField].id,
      ).value;
    },
    // Close edit field
    closeEditField(indexField) {
      this.listFieldsDefault[indexField].edit = false;
    },
    /**
     ************************************ Default fields*******************************
     */
    saveDefaultHandler(input, updateField) {
      if (input.keyInput === 'socialMedias') {
        // eslint-disable-next-line
        const formatSocialMedias = updateField.socialMedias.map(
          ({ type, url }) => {
            return { type, url };
          },
        );

        const validSocialMedias = [];

        formatSocialMedias.forEach((socialMedia) => {
          if (socialMedia.url && socialMedia.url.length > 0) {
            validSocialMedias.push(socialMedia);
          }
        });
        // eslint-disable-next-line
        updateField.socialMedias = validSocialMedias;
      }
      if (input.keyInput === 'phones') {
        if (updateField.phones.length === 1) {
          if (updateField.phones[0].number.length === 0) {
            // eslint-disable-next-line
            updateField.phones = [];
          }
        } else {
          // eslint-disable-next-line
          updateField.phones = updateField.phones.filter(
            ({ number }) => number.length >= 10,
          );
        }
      }
      switch (this.typeItem) {
        case 'CONTACT':
          this.saveDefaultContact(updateField);
          break;
        case 'COMPANY':
          this.saveDefaultCompany(updateField);
          break;
        case 'DEAL':
          this.saveDefaultDeal(updateField);
          break;
        default:
          this.modalHandlerError({
            isOpen: true,
            error:
              'No se pudo actualizar no se ha encontrado referencia para actualizar',
          });
          break;
      }
    },
    saveDefaultContact(updateField) {
      if (this.canEdit || this.canEditOthers) {
        this.updateContact({ id: this.item.id, ...updateField });
      }
    },
    // Save default
    saveDefaultCompany(updateField) {
      if (this.canEdit || this.canEditOthers) {
        this.updateCompany({ id: this.item.id, ...updateField });
      }
    },
    saveDefaultDeal(updateField) {
      if (this.canEdit || this.canEditOthers) {
        this.updateDeal({ id: this.item.id, ...updateField });
      }
    },
    //  **************************************Custom fields**********************************
    /**  Apply format to values custom
    For example: [{id: '', value: ''}, ...] */
    formatValuesCustom() {
      if (this.inputsCustom?.length > 0) {
        return JSON.parse(
          JSON.stringify(
            this.inputsCustom.map((inputCustom) => {
              if (this.item?.customForms?.length) {
                const { value } =
                  this.item.customForms.find(
                    (input) => input.id === inputCustom.id,
                  ) || {};
                return { id: inputCustom.id, value };
              }
              return { id: inputCustom.id, value: '' };
            }),
          ),
        );
      }
      return [];
    },
    /** Apply format to fields custom
    For example: [{id: '', name: '',
    order: 0, type: 'TEXT', value: '', items: [], edit: false }] */
    formatListCustomFields() {
      if (
        Array.isArray(this.listValuesCustom) &&
        this.listValuesCustom?.length > 0
      ) {
        return this.inputsCustom.map((item) => {
          const { id, label, items, type, order } = item;
          const { value } = this.listValuesCustom.find(
            (custom) => custom.id === id,
          );
          return {
            id,
            // Change the label to name. This is for no show the label into the input component
            name: label,
            label,
            items,
            value: value || '',
            type,
            order,
            edit: false,
            icon: 'no-icon',
          };
        });
      }
      return [];
    },
    // Get index of the field custom
    getIndexFieldCustom(input) {
      return this.listFieldsCustom.findIndex((field) => field.id === input.id);
    },
    // Format custom field to update
    formatCustomUpdate(input) {
      return { id: input.id, value: input.value };
    },
    // Save custom
    saveCustomHandler(updateField) {
      switch (this.typeItem) {
        case 'CONTACT':
          this.saveCustomContact(updateField);
          break;
        case 'COMPANY':
          this.saveCustomCompany(updateField);
          break;
        case 'DEAL':
          this.saveCustomDeal(updateField);
          break;
        default:
          this.modalHandlerError({
            isOpen: true,
            error:
              'No se pudo actualizar no se ha encontrado referencia para actualizar',
          });
          break;
      }
    },
    saveCustomContact(updateField) {
      if (this.canEdit) {
        this.updateContact({ id: this.item.id, customForm: updateField });
      }
    },
    saveCustomCompany(updateField) {
      if (this.canEdit) {
        this.updateCompany({ id: this.item.id, customForm: updateField });
      }
    },
    saveCustomDeal(updateField) {
      if (this.canEdit) {
        this.updateDeal({ id: this.item.id, customForm: updateField });
      }
    },
    resetValueCustom(input) {
      const indexField = this.getIndexFieldCustom(input);
      this.listFieldsCustom[indexField].value = this.getValueCustom(indexField);
    },
    getValueCustom(indexField) {
      return this.listValuesCustom.find(
        (item) => item.id === this.listFieldsCustom[indexField].id,
      ).value;
    },
    closeEditFieldCustom(indexField) {
      this.listFieldsCustom[indexField].edit = false;
    },
    // Format JSON value
    formatUpdateJSON(key, value) {
      return {
        [key]: value,
      };
    },
    /**
     *********************************** Validaciones*************************************
     */
    // Check the value is empty or null depending the type of field
    isEmptyInput(value) {
      if (value !== null && value !== '') {
        // Type of value
        const type = typeof value;
        switch (type) {
          case 'boolean':
            return false;
          case 'object':
            if (Array.isArray(value)) {
              return value.length === 0;
            }
            return (
              Object.keys(value).length === 0 && value.constructor === Object
            );
          default:
            return value === null || value === undefined;
        }
      } else {
        return true;
      }
    },
    // Check is a field custom
    isCustom(input) {
      return typeof input.keyInput === 'undefined' || input.keyInput === null;
    },
  },
  apollo: {
    formContact: {
      query: GET_FORM_CONTACT,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .profile__input } from ../../../../scss/components/fields.edit';
</style>
