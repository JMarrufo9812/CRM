<template>
  <v-card>
    <v-card-title class="py-1 font-weight-bold">
      <slot name="title"></slot>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="formTag" v-model="isValidFormTag">
        <v-text-field
          label="Nombre de etiqueta"
          outlined
          dense
          v-model="tag.name"
          maxlength="25"
          counter
          :rules="rules.general"
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
    <v-divider></v-divider>
    <v-card-actions class="justify-end">
      <slot name="actions" :tagSelect="tag"></slot>
      <v-btn color="primary" outlined small @click="close" class="mr-3">
        Cancelar
      </v-btn>
      <v-btn color="secondary" small @click="saveTag" :loading="isLoading">
        Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// Rules form
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'TagForm',
  mixins: [rulesMixin],
  props: {
    tag: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tabs: '',
      isValidFormTag: true,
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
    };
  },
  created() {
    // The color is defined
    if (this.tag.color) {
      // Check if the color is default
      if (this.isColorDefault(this.tag.color)) {
        // Default tab color
        this.tabs = 'choose';
      } else {
        // If the color is custom
        this.tabs = 'custom';
        this.hex = this.tag.color;
      }
    }
  },
  watch: {
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
          this.$emit('save', this.tag);
        }
        // Valid name and color custom
      } else if (this.isValidFormTag && this.isValidColorCustom) {
        const customTag = { ...this.tag };
        customTag.color = this.hex;
        this.$emit('save', customTag);
      }
    },
    // Close the form
    close() {
      this.$emit('close', true);
    },
  },
};
</script>
