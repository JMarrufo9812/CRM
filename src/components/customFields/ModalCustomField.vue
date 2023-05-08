<template>
  <v-dialog v-model="modalHandler.isOpen" width="700" persistent>
    <v-card>
      <v-card-title
        class="d-flex justify-space-between primary white--text py-4"
      >
        <span>
          {{ modalHandler.isEdit ? 'Editar' : 'Agregar' }} campo personalizado
        </span>
        <v-icon @click="close" class="white--text">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6" class="mt-6 pr-8">
            <p class="text-center font-weight-bold">
              Configuración
            </p>
            <v-form ref="formCustomFields" v-model="isValidate">
              <v-text-field
                v-model="input.label"
                prepend-icon="mdi-cogs"
                label="Nombre de campo"
                outlined
                :rules="rules.general"
                counter
                maxlength="50"
              ></v-text-field>
              <v-card outlined class="ml-8 mb-8">
                <v-card-actions>
                  <v-switch
                    v-model="input.isRequired"
                    label="Obligatorio"
                    class="pt-0 mt-0"
                    hide-details="auto"
                    dense
                    inset
                  ></v-switch>
                </v-card-actions>
              </v-card>
              <v-select
                v-model="input.type"
                @change="handlerResetExampleInput"
                :items="typeInput"
                outlined
                :rules="rules.select"
                item-value="value"
                prepend-icon="mdi-format-list-bulleted-type"
                label="Tipo"
              >
                <template v-slot:item="{ item }">
                  <span>
                    <v-icon class="pr-2">{{ item.icon }}</v-icon>
                    {{ item.name }}
                  </span>
                </template>
                <template v-slot:selection="{ item }">
                  <span>
                    <v-icon class="pr-2">{{ item.icon }}</v-icon>
                    {{ item.name }}
                  </span>
                </template>
              </v-select>
              <v-row
                v-show="input.type === 'RADIO' || input.type === 'CHECKBOX'"
              >
                <v-col cols="9" class="pr-0">
                  <v-text-field
                    v-model="option"
                    :prepend-icon="
                      input.type === 'RADIO'
                        ? 'mdi-radiobox-blank '
                        : 'mdi-checkbox-blank-outline'
                    "
                    label="Agregar opción"
                    hide-details="auto"
                    dense
                    outlined
                    counter
                    maxlength="50"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" align="right">
                  <v-btn
                    :disabled="option.trim().length < 1"
                    @click="addOption"
                    class="mt-3"
                    x-small
                    outlined
                  >
                    Agregar
                  </v-btn>
                </v-col>
                <v-col cols="12" v-show="input.items[0]">
                  <v-card outlined>
                    <v-card-title>Opciones</v-card-title>
                    <v-list dense>
                      <v-list-item
                        v-for="(option, index) in input.items"
                        :key="index"
                      >
                        <v-list-item-title>
                          {{ option.label }}
                          <v-btn @click="deleteOption(index)" icon class="mb-1">
                            <v-icon small>mdi-close-thick</v-icon>
                          </v-btn>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="6" class="mt-6 vertical-line-right">
            <p class="text-center font-weight-bold">
              Previsualización
            </p>
            <Fields :field="input" />
          </v-col>
        </v-row>
        <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pa-5 justify-end">
        <v-btn class="mr-8" large tile outlined color="primary" @click="close">
          Cancelar
        </v-btn>
        <v-btn
          large
          tile
          normal
          color="secondary"
          :disabled="input.label.trim().length < 1"
          @click="outData(forForm, input)"
          :loading="modalHandler.isLoading"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { GET_FORM } from '@/graphql/querys/formsQuery';

export default {
  name: 'ModalCustomField',
  props: {
    forForm: {
      required: true,
      type: String,
    },
    isImportModal: {
      required: false,
      type: Boolean,
    },
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false, isEdit: false };
      },
    },
    editField: {
      required: false,
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mixins: [rulesMixin, modalsAlertsMixin],
  components: {
    Fields: () => import('@/components/fields/Fields.vue'),
  },
  data() {
    return {
      isValidate: false,
      option: '',
      input: {
        id: '',
        label: '',
        type: 'TEXT',
        items: [],
        isRequired: false,
        value: '',
      },
      typeInput: [
        { name: 'Texto', value: 'TEXT', icon: 'mdi-format-text' },
        {
          name: 'Caja de texto',
          value: 'TEXT_BOX',
          icon: 'mdi-format-textbox ',
        },
        { name: 'Correo', value: 'EMAIL', icon: 'mdi-email' },
        { name: 'Numérico', value: 'NUMBER', icon: 'mdi-numeric' },
        { name: 'Teléfono', value: 'PHONE', icon: 'mdi-phone' },
        { name: 'Fecha', value: 'DATE', icon: 'mdi-calendar' },
        {
          name: 'Valor monetario',
          value: 'MONETARY_VALUE',
          icon: 'mdi-cash-multiple',
        },
        {
          name: 'Selección única',
          value: 'RADIO',
          icon: 'mdi-radiobox-marked',
        },
        {
          name: 'Selección múltiple',
          value: 'CHECKBOX',
          icon: 'mdi-checkbox-multiple-marked-outline',
        },
      ],
    };
  },
  watch: {
    modalHandler(value) {
      if (value.isOpen && this.isImportModal) {
        this.typeInput = this.typeInput.filter((input) => {
          return input.value !== 'CHECKBOX' && input.value !== 'RADIO';
        });
      }
      if (!value.isOpen) {
        this.resetValues();
      }
      if (value.isOpen && value.isEdit) {
        const { id, label, type, items, isRequired } = this.editField;
        this.input = { id, label, type, items, isRequired };
      }
    },
  },
  methods: {
    outData(forForm, { id, type, label, items, isRequired }) {
      this.$refs.formCustomFields.validate();
      if (this.isValidate) {
        if (type === 'CHECKBOX' || type === 'RADIO') {
          if (items.length >= 2) {
            if (this.modalHandler.isEdit)
              this.$emit('outDataEdit', forForm, {
                id,
                type,
                label,
                items,
                isRequired,
              });
            else
              this.$emit('outData', forForm, {
                type,
                label,
                items,
                isRequired,
              });
          } else {
            const error = 'Agrega dos opciones como mínimo';
            this.modalHandlerError({ isOpen: true, error });
          }
        } else if (this.modalHandler.isEdit) {
          this.$emit('outDataEdit', forForm, {
            id,
            type,
            label,
            items,
            isRequired,
          });
        } else {
          this.$emit('outData', forForm, { type, label, items, isRequired });
        }
      }
    },
    close() {
      this.$emit('close', { isOpen: false, isLoading: false });
    },
    handlerResetExampleInput() {
      this.input.value = '';
    },
    resetValues() {
      this.$refs.formCustomFields.resetValidation();
      // this.$refs.formCustomFields.reset();
      this.option = '';
      this.input = {
        label: '',
        type: 'TEXT',
        items: [],
        isRequired: false,
        value: '',
      };
    },
    addOption() {
      this.input.items.push({ label: this.option, value: this.option });
      this.option = '';
    },
    deleteOption(index) {
      this.input.items.splice(index, 1);
    },
  },
  apollo: {
    getForm: {
      query: GET_FORM,
      variables() {
        return {
          type: this.forForm,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .vertical-line-right } from ../../../../scss/components/modal.custom.field';
</style>
