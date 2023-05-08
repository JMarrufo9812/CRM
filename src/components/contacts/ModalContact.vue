<template>
  <v-row>
    <v-dialog v-model="modalHandler.isOpen" width="400" scrollable persistent>
      <v-card>
        <v-card-title class="primary d-flex justify-space-between py-6">
          <span class="white--text ml-9">
            Agregar Contacto
          </span>
          <div>
            <v-menu v-if="$can(CUSTOM_FIELDS_MANAGEMENT, PERMISSIONS_SETTINGS)">
              <template v-slot:activator="{ on }">
                <v-icon small class="white--text mr-4" v-on="on">
                  mdi-cog
                </v-icon>
              </template>
              <v-list>
                <v-list-item
                  @click="
                    modalHandlerCustomFields({
                      isOpen: true,
                      isLoading: false,
                      isEdit: false,
                    })
                  "
                >
                  <v-icon left>mdi-text-box-plus-outline</v-icon>
                  Agregar campo
                </v-list-item>
                <v-list-item to="/settings/enterprise/custom-fields/contacts">
                  <v-icon left>mdi-clipboard-edit-outline</v-icon>
                  Editar campos
                </v-list-item>
              </v-list>
            </v-menu>

            <v-icon @click="close" class="white--text">
              mdi-close
            </v-icon>
          </div>
        </v-card-title>
        <v-card-text class="pt-6" v-scroll.self="onScroll">
          <v-form ref="formContact" v-model="isValidate">
            <v-row>
              <v-col cols="12" v-for="(input, index) in inputs" :key="index">
                <Fields
                  :field="input"
                  :resetHandler="modalHandler.isOpen"
                  :isScrolled="isScrolled"
                  @scrolled="scrolled"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between mx-2 my-2">
          <v-btn width="45%" large outlined color="primary" @click="close">
            Cancelar
          </v-btn>
          <v-btn
            width="45%"
            large
            normal
            color="secondary"
            @click="outData"
            :loading="modalHandler.isLoading"
          >
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ModalCustomField
      :forForm="'CONTACT'"
      :modalHandler="modalCustomField"
      @outData="createCustomField"
      @close="modalHandlerCustomFields"
    />
  </v-row>
</template>

<script>
import { customFieldsMixin } from '@/mixins/customFieldsMixin';
import { CUSTOM_FIELDS_MANAGEMENT } from '@/constants/methods';
import { PERMISSIONS_SETTINGS } from '@/constants/permissions';

export default {
  name: 'ModalContact',
  props: {
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false };
      },
    },
    inputs: {
      required: true,
      type: Array,
      default: () => {
        return {};
      },
    },
  },
  components: {
    Fields: () => import('@/components/fields/Fields.vue'),
    ModalCustomField: () =>
      import('@/components/customFields/ModalCustomField.vue'),
  },
  mixins: [customFieldsMixin],
  data() {
    return {
      isValidate: '',
      contact: {},
      isScrolled: false,
      PERMISSIONS_SETTINGS,
      CUSTOM_FIELDS_MANAGEMENT,
    };
  },
  watch: {
    modalHandler(value) {
      if (!value.isOpen) {
        this.resetValues();
      } else {
        this.isScrolled = false;
      }
    },
  },
  methods: {
    scrolled(value) {
      this.isScrolled = value;
    },
    onScroll() {
      this.isScrolled = true;
    },
    outData() {
      let inputs = [...this.inputs];
      const existCustomFields = this.inputs.some((input) => !input.keyInput);
      if (existCustomFields) {
        const customForms = inputs
          .filter((input) => !input.keyInput)
          .map(({ id, value }) => {
            return { id, value };
          });
        const cleanInputs = inputs.filter((input) => input.keyInput);
        // eslint-disable-next-line
        inputs = cleanInputs;
        inputs.push({ keyInput: 'customForms', value: customForms });
      }
      // arma un nuevo Arreglo con el keyInput y el value
      inputs
        .filter(({ value }) => value !== undefined && value !== '')
        .forEach(({ keyInput, value }) => {
          this.contact[keyInput] = value;
        });
      this.$refs.formContact.validate();
      if (this.isValidate) {
        this.$emit('outData', this.contact);
      }
    },
    close() {
      this.$emit('close', { isOpen: false, isLoading: false });
    },
    resetValues() {
      this.contact = {};
      this.$refs.formContact.resetValidation();
      this.$refs.formContact.reset();
    },
  },
};
</script>
