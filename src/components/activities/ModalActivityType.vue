<template>
  <v-row>
    <v-dialog v-model="modal.status" scrollable max-width="430px" persistent>
      <v-card>
        <v-card-title class="primary white--text">
          {{ formatTitle }}
          <v-spacer />
          <v-btn icon color="white" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-3">
          <v-form ref="formActivityType" v-model="isValidFormActivityType">
            <v-text-field
              v-model="typeActivity.name"
              outlined
              dense
              :rules="rules.general"
              hide-details="auto"
              label="Nombre de tipo de actividad"
              required
              maxlength="30"
              counter
            ></v-text-field>
          </v-form>
          <v-tabs grow v-model="tabs">
            <v-tab href="#choose">Elige un color</v-tab>
            <v-tab href="#custom">Personalizar color</v-tab>
            <v-tab-item value="choose">
              <div class="mt-3 d-flex justify-center">
                <v-chip-group column v-model="typeActivity.color">
                  <v-chip
                    v-for="(color, index) in colors"
                    :key="index"
                    :color="color.hex"
                    :value="color.hex"
                    dark
                  >
                    <v-icon color="white">
                      {{
                        color.hex === typeActivity.color
                          ? 'mdi-check-bold'
                          : 'mdi-invert-colors'
                      }}
                    </v-icon>
                  </v-chip>
                </v-chip-group>
              </div>
              <div
                v-if="!isValidColorChoose"
                class="d-flex justify-center mt-2"
              >
                <span class="error--text">Debes seleccionar un color</span>
              </div>
            </v-tab-item>
            <v-tab-item value="custom">
              <div class="mt-3 d-flex justify-center">
                <v-color-picker
                  v-model="color"
                  flat
                  dot-size="30"
                  hide-mode-switch
                  mode="hexa"
                ></v-color-picker>
              </div>
              <div
                v-if="!isValidColorCustom"
                class="d-flex justify-center mt-2"
              >
                <span class="error--text">Debes seleccionar un color</span>
              </div>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="secondary" outlined @click="close">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            :loading="isLoadingActivityType"
            @click="modal.isEdit ? updateTypeActivity() : saveActivityType()"
          >
            {{ titleActionButton }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-row>
</template>

<script>
import { lexoRankMixin } from '@/mixins/lexoRankMixin';
import { rulesMixin } from '@/mixins/rulesMixin';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import {
  CREATE_ACTIVITY_TYPE,
  UPDATE_ACTIVITY_TYPE,
} from '@/graphql/mutations/activitiesMutations';

export default {
  name: 'ModalActivityType',
  mixins: [
    modalMethodsMixin,
    modalApolloMixin,
    rulesMixin,
    lexoRankMixin,
    modalsAlertsMixin,
  ],
  props: {
    activityTypes: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      isLoadingActivityType: false,
      tabs: '',
      modalId: 'createActivityType',
      modal: {},
      typeActivity: {
        name: '',
        color: '',
      },
      isValidColorChoose: true,
      isValidColorCustom: true,
      isValidFormActivityType: true,
      hex: '#FFFFFF',
      colors: [
        {
          name: 'Verde',
          hex: '#08a742',
        },
        {
          name: 'Rojo',
          hex: '#f94839',
        },
        {
          name: 'Azul',
          hex: '#317ae2',
        },
        {
          name: 'Amarillo',
          hex: '#fccf00',
        },
        {
          name: 'Morado',
          hex: '#721ea9',
        },
        {
          name: 'Gris',
          hex: '#dcdddd',
        },
      ],
    };
  },
  watch: {
    'typeActivity.color': {
      handler() {
        this.isValidColorChoose = true;
      },
    },
    'modal.isEdit': {
      handler(isEdit) {
        if (isEdit) {
          const { name, color, order } = this.modal.item;
          this.typeActivity = {
            name,
            color,
            order,
          };

          if (this.isColorDefault(color)) {
            // Default tab color
            this.tabs = 'choose';
          } else {
            // If the color is custom
            this.tabs = 'custom';
            this.hex = color;
          }
        } else {
          this.reset();
        }
      },
    },
  },
  computed: {
    color: {
      get() {
        return this.hex;
      },
      set(valueColor) {
        this.hex = valueColor;
      },
    },
    formatTitle() {
      return this.modal.isEdit
        ? 'Editar tipo de actividad'
        : 'Crear tipo de actividad';
    },

    titleActionButton() {
      return this.modal.isEdit ? 'Actualizar' : 'Crear';
    },
  },
  methods: {
    isColorDefault(color) {
      return this.colors.some((item) => item.hex === color);
    },
    close() {
      this.changeModal({
        id: this.modalId,
        status: false,
        isEdit: false,
        item: null,
      });
    },
    checkValidColor() {
      if (this.tabs === 'choose') {
        this.isValidColorChoose =
          this.typeActivity.color !== undefined &&
          this.typeActivity.color !== '';
        this.isValidColorCustom = true;
      } else {
        this.isValidColorChoose = true;
        this.isValidColorCustom = this.color !== undefined && this.color !== '';
      }
    },
    saveActivityType() {
      this.$refs.formActivityType.validate();
      this.checkValidColor();
      if (
        this.isValidFormActivityType &&
        this.isValidColorChoose &&
        this.isValidColorCustom
      ) {
        this.createActivityType({
          name: this.typeActivity.name,
          color: this.getColor(),
        });
      }
    },
    getColor() {
      if (this.tabs === 'choose') {
        // Valid name and color default
        if (
          this.isValidFormActivityType &&
          this.isValidColorChoose &&
          this.isValidColorCustom
        ) {
          return this.typeActivity.color;
        }
        // Valid name and color custom
      } else if (this.isValidFormActivityType && this.isValidColorCustom) {
        return this.hex;
      }
      return '';
    },
    createActivityType({ name, color }) {
      this.isLoadingActivityType = true;
      const order = this.createNewOrder(this.activityTypes);
      this.$apollo
        .mutate({
          // Query
          mutation: CREATE_ACTIVITY_TYPE,
          // Parameters
          variables: {
            activityTypeInput: {
              name,
              color,
              order,
            },
          },
        })
        .then(() => {
          // Result
          this.$emit('refetch');
          this.close();
          this.reset();
          this.isLoadingActivityType = false;
        })
        .catch(() => {
          // Error
          const error =
            'No se pudo crear el tipo de actividad, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
          this.isLoadingActivityType = false;
        });
    },
    updateTypeActivity() {
      this.isLoadingActivityType = true;

      const { id } = this.modal.item;
      const { name } = this.typeActivity;
      const color = this.getColor();
      this.$apollo
        .mutate({
          // Query
          mutation: UPDATE_ACTIVITY_TYPE,
          // Parameters
          variables: {
            activityTypeInput: {
              id,
              name,
              color,
            },
          },
        })
        .then(() => {
          // Result
          this.$emit('refetch');
          this.isLoadingActivityType = false;
          this.close();
        })
        .catch(() => {
          this.isLoadingActivityType = false;

          // Error
          const error =
            'No se pudo actualizar el tipo de actividad, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    reset() {
      this.typeActivity = {
        name: '',
        color: '',
      };
      this.isValidColorChoose = true;
      this.isValidColorCustom = true;
      this.tabs = 'choose';
      if (this.$refs.formActivityType) {
        this.$refs.formActivityType.resetValidation();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
