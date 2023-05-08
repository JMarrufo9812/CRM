<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="140"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item class="text-list-menu" v-bind="attrs" v-on="on">
        <v-icon color="primary" class="mr-2">mdi-table-column</v-icon>
        Editar columnas
      </v-list-item>
    </template>
    <v-card>
      <v-card-title class="header-and-footer-card">
        <v-icon class="mr-2">mdi-table-column</v-icon>
        Columnas que se mostrarán
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <v-card max-height="490" class="scroll">
          <v-list-item>
            <template v-slot:default>
              <v-list-item-action>
                <v-checkbox
                  v-model="isAllHeadersSelected"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Seleccionar todas las columnas
                </v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
          <v-list dense flat>
            <v-subheader>Columnas por defecto</v-subheader>
            <v-list-item v-for="header in defaultHeaders" :key="header.key">
              <template v-slot:default>
                <v-list-item-action>
                  <v-checkbox
                    v-model="header.isSelect"
                    color="primary"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ header.label }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list>
          <v-list dense flat v-if="form.customForm.inputs !== null">
            <v-subheader v-if="form.customForm.inputs.length > 0">
              Columnas personalizadas
            </v-subheader>
            <v-list-item v-for="header in customHeaders" :key="header.key">
              <template v-slot:default>
                <v-list-item-action>
                  <v-checkbox
                    v-model="header.isSelect"
                    color="primary"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ header.label }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="py-4">
        <v-col class="pa-0" align="end">
          <v-btn class="mr-4" small outlined @click="menu = false">
            Cancelar
          </v-btn>
          <v-btn :disabled="validate" small color="primary" @click="outData">
            Guardar
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    type: {
      isRequired: true,
      type: String,
    },
    headers: {
      isRequired: true,
      type: [Array, Object],
    },
    form: {
      isRequired: true,
      type: Object,
      default: () => {
        return {
          defaultForm: { inputs: [] },
          customForm: { inputs: [] },
          headers: [],
        };
      },
    },
    loading: {
      type: Boolean,
    },
  },
  data() {
    return {
      menu: false,
      defaultHeaders: [],
      customHeaders: [],
    };
  },
  watch: {
    menu(value) {
      if (value) {
        this.getDefaultHeaders();
        this.getCustomHeaders();
      }
    },
  },
  computed: {
    isAllHeadersSelected: {
      // eslint-disable-next-line
      get: function() {
        const allHeadersLength = this.defaultHeaders.concat(this.customHeaders)
          .length;

        const headersSelectedlength = this.defaultHeaders
          .concat(this.customHeaders)
          .filter(({ isSelect }) => isSelect).length;

        if (allHeadersLength === headersSelectedlength) {
          return true;
        }
        return false;
      },
      // eslint-disable-next-line
      set: function(value) {
        if (!value) {
          this.handlerSelectAllHeaders(false);
        } else {
          this.handlerSelectAllHeaders(true);
        }
      },
    },
    validate() {
      const allHeaders = this.customHeaders
        ? this.defaultHeaders.concat(this.customHeaders)
        : this.defaultHeaders;

      const headersSelected = allHeaders.filter((header) => header.isSelect)
        .length;

      if (headersSelected >= 1) {
        return false;
      }
      return true;
    },
  },
  methods: {
    outData() {
      const allHeaders = this.customHeaders
        ? this.defaultHeaders.concat(this.customHeaders)
        : this.defaultHeaders;
      const headersSelected = allHeaders
        .filter((header) => header.isSelect)
        .map((header) => {
          // eslint-disable-next-line
          delete header.isSelect;
          return header;
        });
      const isAllHeadersSelected = this.compareInputsAndHeaders(
        headersSelected,
      );
      if (isAllHeadersSelected) {
        this.$emit('outData', []);
      } else {
        this.$emit('outData', headersSelected);
      }
      this.menu = false;
    },
    compareInputsAndHeaders(listHeaders) {
      const { customForm, defaultForm, headers } = this.form;
      const allInputs = [...defaultForm.inputs, ...headers];
      if (customForm.inputs) {
        allInputs.concat(customForm.inputs);
      }
      if (listHeaders.length === allInputs.length) {
        return true;
      }
      return false;
    },
    getDefaultHeaders() {
      const { defaultForm, headers } = this.form;
      if (this.headers.length === 0) {
        this.defaultHeaders = defaultForm.inputs
          .concat(headers)
          .map((input) => {
            return {
              isSelect: true,
              type: 'default',
              key: input.keyInput,
              label: input.label,
            };
          });
      } else {
        this.defaultHeaders = defaultForm.inputs
          .concat(headers)
          .map((input) => {
            const inputsSelected = this.headers.some(
              (header) => header.label === input.label,
            );
            if (inputsSelected) {
              // eslint-disable-next-line
              input.isSelect = true;
            } else {
              // eslint-disable-next-line
              input.isSelect = false;
            }
            return {
              isSelect: input.isSelect,
              type: 'default',
              key: input.keyInput,
              label: input.label,
            };
          });
      }
    },
    getCustomHeaders() {
      const { customForm } = this.form;
      const customHeaders = this.headers.filter(({ isSelect }) => !isSelect)
        .length;

      if (customHeaders === 0 && customForm.inputs) {
        this.customHeaders = customForm.inputs.map((input) => {
          return {
            isSelect: true,
            type: 'custom',
            key: input.id,
            label: input.label,
          };
        });
      } else if (customForm.inputs) {
        this.customHeaders = customForm.inputs.map((input) => {
          const inputsSelected = this.headers.some(
            (header) => header.label === input.label,
          );
          if (inputsSelected) {
            // eslint-disable-next-line
            input.isSelect = true;
          } else {
            // eslint-disable-next-line
            input.isSelect = false;
          }
          return {
            isSelect: input.isSelect,
            type: 'custom',
            key: input.id,
            label: input.label,
          };
        });
      }
    },
    handlerSelectAllHeaders(value) {
      const { defaultForm, customForm, headers } = this.form;
      this.defaultHeaders = defaultForm.inputs.concat(headers).map((input) => {
        return {
          isSelect: value,
          type: 'default',
          key: input.keyInput,
          label: input.label,
        };
      });
      if (customForm.inputs) {
        if (customForm.inputs.length !== 0) {
          this.customHeaders = customForm.inputs.map((input) => {
            return {
              isSelect: value,
              type: 'custom',
              key: input.id,
              label: input.label,
            };
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '{ .scroll .text-list-menu } from ../../../../scss/components/list.headers';
</style>
