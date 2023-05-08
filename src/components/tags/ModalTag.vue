<template>
  <v-dialog v-model="modalHandler.isOpen" width="470">
    <v-card>
      <v-card-title class="d-flex justify-space-between primary white--text">
        <span>
          {{ modalHandler.isEdit ? 'Editar etiqueta' : 'Agregar Etiqueta' }}
        </span>
        <v-icon @click="close" class="white--text">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text>
        <v-form ref="formTag" v-model="isValidFormTag">
          <v-text-field
            v-model="tag.name"
            dense
            label="Nombre de etiqueta"
            class="mt-4"
            maxlength="25"
            counter
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-form>
        <v-divider></v-divider>
        <v-tabs grow v-model="tabs">
          <v-tab href="#choose">Elige un color</v-tab>
          <v-tab href="#custom">Personalizar color</v-tab>
          <v-tab-item value="choose">
            <div class="mt-3 d-flex justify-center">
              <v-chip-group column v-model="tag.color">
                <v-chip
                  v-for="(color, index) in colors"
                  :key="index"
                  :color="color.hex"
                  :value="color.hex"
                  dark
                >
                  <v-icon color="white">
                    {{
                      color.hex === tag.color
                        ? 'mdi-check-bold'
                        : 'mdi-invert-colors'
                    }}
                  </v-icon>
                </v-chip>
              </v-chip-group>
            </div>
            <div v-if="!isValidColorChoose" class="d-flex justify-center mt-2">
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
            <div v-if="!isValidColorCustom" class="d-flex justify-center mt-2">
              <span class="error--text">Debes seleccionar un color</span>
            </div>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions class="justify-end">
        <slot name="actions" :tagSelect="tag"></slot>
        <v-btn color="primary" outlined @click="close" class="mr-3">
          Cancelar
        </v-btn>
        <v-btn
          :loading="modalHandler.isLoading"
          color="secondary"
          :disabled="validateTag"
          @click="saveTag"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false };
      },
    },
  },
  data() {
    return {
      isValidFormTag: true,
      tabs: '',
      isValidColorChoose: true,
      isValidColorCustom: true,
      hex: '#FFFFFF',
      type: 'hex',
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
      tag: {
        name: '',
        color: '',
      },
    };
  },
  watch: {
    modalHandler({ isOpen, isEdit, info }) {
      if (!isOpen) this.resetValues();
      if (isOpen && isEdit) {
        this.tag.id = info.id;
        this.tag.name = info.name;
        this.tag.color = info.color;
        if (this.isColorDefault(info.color)) {
          // Default tab color
          this.tabs = 'choose';
        } else {
          // If the color is custom
          this.tabs = 'custom';
          this.hex = this.tag.color;
        }
      }
    },
    // Reset validations of color when change the tab
    tabs() {
      this.resetValidColor();
    },
    // Reinit validation when the color is selected
    'tag.color': {
      handler() {
        this.isValidColorChoose = true;
      },
    },
  },
  computed: {
    // Format de list of tags
    listTags() {
      const list = [...this.customTags];
      list.unshift(this.defaultTag);
      return list;
    },
    // Color v-model picker color
    color: {
      get() {
        return this[this.type];
      },
      set(valueColor) {
        this[this.type] = valueColor;
      },
    },
    validateTag() {
      if (this.tag.name.trim().length >= 1) return false;
      return true;
    },
  },
  methods: {
    // Is a color default?
    isColorDefault(color) {
      return this.colors.some((item) => item.hex === color);
    },
    // Reset validation colors
    resetValidColor() {
      this.isValidColorChoose = true;
      this.isValidColorCustom = true;
    },
    // Validation of color depending of the tab selected
    checkValidColor() {
      if (this.tabs === 'choose') {
        this.isValidColorChoose =
          this.tag.color !== undefined && this.tag.color !== '';
      } else {
        this.isValidColorCustom = this.color !== undefined && this.color !== '';
      }
    },
    // Emit save with the info of the tag
    saveTag() {
      // Validations of the name and the color
      this.$refs.formTag.validate();
      this.checkValidColor();
      // Emit a tag depending of the tab selected and the color choose
      if (this.tabs === 'choose') {
        // Valid name and color default
        if (this.isValidFormTag && this.isValidColorChoose) {
          this.$emit('outData', {
            isOpen: true,
            isLoading: true,
            isEdit: this.modalHandler.isEdit,
            info: this.tag,
          });
        }
        // Valid name and color custom
      } else if (this.isValidFormTag && this.isValidColorCustom) {
        const customTag = { ...this.tag };
        customTag.color = this.hex;
        this.$emit('outData', {
          isOpen: true,
          isLoading: true,
          isEdit: this.modalHandler.isEdit,
          info: customTag,
        });
      }
    },
    // Close the form
    close() {
      this.$emit('close', {
        isOpen: false,
        isEdit: false,
        isLoading: false,
        info: {},
      });
    },
    resetValues() {
      if (this.tag.id) delete this.tag.id;
      this.tag = {
        name: '',
        color: '',
      };
    },
  },
};
</script>
