<template>
  <v-dialog v-model="modalHandler.isOpen" width="900" scrollable persistent>
    <v-card>
      <v-card-title
        class="d-flex justify-space-between primary white--text py-4"
      >
        <span>{{ modalHandler.isEdit ? 'Editar' : 'Agregar' }} filtro</span>
        <v-icon @click="close" class="white--text">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text class="text-center" v-if="isLoading">
        <v-sheet color="white" height="400" width="800" class="ml-7">
          <v-progress-circular
            style="margin-top:25%"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-sheet>
      </v-card-text>
      <v-card-text v-else class="pt-2 px-2">
        <v-form v-model="isValidate" ref="formFilter">
          <v-row>
            <v-col>
              <v-text-field
                v-model="filter.name"
                :rules="this.rules.isRequired"
                outlined
                class="mt-8 ml-8 required"
                label="Nombre de filtro"
                hide-details="auto"
                maxlength="25"
                counter="25"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-container fluid>
                <v-switch
                  inset
                  v-model="filter.isVisible"
                  :disabled="filter.isDefault"
                >
                  <template v-slot:label>
                    <span v-if="!filter.isVisible">
                      <v-icon class="mb-2">mdi-lock-outline</v-icon>
                      Filtro privado: Solo el creador puede ver y utilizar este
                      filtro
                    </span>
                    <span v-if="filter.isVisible">
                      <v-icon class="mb-2">
                        mdi-lock-open-variant-outline
                      </v-icon>
                      Filtro público: todos los usuarios de la empresa pueden
                      ver y usar este filtro
                    </span>
                  </template>
                </v-switch>
              </v-container>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-alert v-if="conditionsError.show" dense outlined type="error">
                {{ conditionsError.message }}
              </v-alert>
            </v-col>
          </v-row>
        </v-form>
        <v-card
          outlined
          class="pa-4 mb-4"
          v-for="({ glue, conditions }, index) in filter.conditions.conditions"
          :key="index"
        >
          <p>
            {{
              glue === 'AND'
                ? `Mostrar ${section} que cumplan TODAS estas condiciones:`
                : 'Y que cumplan CUALQUIERA de estas condiciones:'
            }}
          </p>
          <v-row v-for="(subcondition, index) in conditions" :key="index">
            <v-col
              cols="12"
              class="d-flex justify-space-between pb-0"
              :class="{ 'pb-4': conditions.length - 1 === index }"
            >
              <v-row>
                <v-col cols="3" class="pr-0">
                  <v-select
                    v-model="subcondition.typeTable"
                    @input="
                      getFiltersParams(glue, subcondition.typeTable, index)
                    "
                    @change="resetValuesTypeTable(glue, index)"
                    :items="typeTableItems"
                    item-text="text"
                    item-value="value"
                    class="mr-2"
                    label="Tipo"
                    outlined
                    dense
                    hide-details="auto"
                  ></v-select>
                </v-col>
                <v-col cols="3" class="pr-0">
                  <v-select
                    v-show="
                      glue === 'AND'
                        ? typeLabelItems.andItems[index]
                          ? typeLabelItems.andItems[index].length >= 1
                          : false
                        : typeLabelItems.orItems[index]
                        ? typeLabelItems.orItems[index].length >= 1
                        : false
                    "
                    v-model="subcondition.typeLabel"
                    :items="
                      glue === 'AND'
                        ? typeLabelItems.andItems[index]
                        : typeLabelItems.orItems[index]
                    "
                    @input="
                      getOperators(
                        glue,
                        subcondition.typeTable,
                        subcondition.typeLabel,
                        index,
                      )
                    "
                    @change="resetValuesTypeLabel(glue, index)"
                    item-text="label"
                    item-value="typeLabel"
                    label="Campo"
                    outlined
                    dense
                    hide-details="auto"
                  ></v-select>
                </v-col>
                <v-col cols="3" class="pr-0">
                  <v-select
                    v-show="
                      glue === 'AND'
                        ? operatorItems.andItems[index]
                          ? operatorItems.andItems[index].length >= 1
                          : false
                        : operatorItems.orItems[index]
                        ? operatorItems.orItems[index].length >= 1
                        : false
                    "
                    v-model="subcondition.operator"
                    @input="getTypeField(glue, index)"
                    :items="
                      glue === 'AND'
                        ? operatorItems.andItems[index]
                        : operatorItems.orItems[index]
                    "
                    item-text="name"
                    item-value="symbol"
                    label="Operadores"
                    outlined
                    dense
                    hide-details="auto"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <Fields
                    v-show="viewValueHandler(subcondition)"
                    :inputProps="{ class: 'no-icon', isDense: true }"
                    :field="fieldConfig(subcondition)"
                    :resetHandler="modalHandler.isOpen"
                  />
                  <!-- {{ fieldConfig(subcondition) }} -->
                </v-col>
              </v-row>
              <v-btn small icon @click="deleteCondition(glue, index)">
                <v-icon class="mt-2 ml-4">mdi-minus-circle-outline</v-icon>
              </v-btn>
            </v-col>
            <v-col
              v-if="conditions.length - 1 !== index"
              cols="12"
              align="end"
              class="pt-0"
            >
              <span>{{ glue === 'AND' ? 'Y' : 'O' }} esta condición:</span>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-col cols="12" class="pl-0">
            <v-btn x-small outlined @click="addConditions(glue)">
              <v-icon small>mdi-plus</v-icon>
              Añadir condicion
            </v-btn>
          </v-col>
        </v-card>
      </v-card-text>
      <v-card-actions class="pa-5 justify-end">
        <v-btn
          @click="deleteFilterConfirmation"
          v-if="modalHandler.isEdit"
          large
          tile
          outlined
          color="error"
        >
          <v-icon>mdi-trash-can-outline</v-icon>
          Eliminar
        </v-btn>
        <v-btn large tile outlined color="primary" @click="close">
          cancelar
        </v-btn>
        <v-btn
          large
          tile
          normal
          color="secondary"
          @click="
            outDataCreateorUpdate(modalHandler.isEdit ? 'UPDATE' : 'CREATE')
          "
          :loading="modalHandler.isLoading"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
    <BaseModalDelete
      :modalHandler="modalDelete"
      @confirm="outDataDelete"
      @cancel="modalHandlerDelete"
    />
  </v-dialog>
</template>

<script>
import { GET_FILTER_PARAMS } from '@/graphql/querys/filtersQuery';
import { rulesMixin } from '@/mixins/rulesMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  name: 'ModalFilter',
  mixins: [modalsAlertsMixin, rulesMixin],
  props: {
    type: {
      required: true,
      type: Object,
    },
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false, isEdit: false, info: {} };
      },
    },
  },
  components: { Fields: () => import('@/components/fields/Fields.vue') },
  data() {
    return {
      isLoading: false,
      isValidate: true,
      conditionsError: {
        show: false,
        message: '',
      },
      section: '',
      filters: [],
      filter: {
        name: '',
        type: '',
        isVisible: false,
        conditions: {
          glue: 'AND',
          conditions: [
            {
              glue: 'AND',
              conditions: [],
            },
            {
              glue: 'OR',
              conditions: [],
            },
          ],
        },
      },
      typeTableItems: [
        { text: 'Trato', value: 'DEAL' },
        { text: 'Empresa', value: 'COMPANY' },
        { text: 'Contacto', value: 'CONTACT' },
        // { text: 'Acción', value: 'ACTION' },
      ],
      typeLabelItems: {
        andItems: [],
        orItems: [],
      },
      operatorItems: {
        andItems: [],
        orItems: [],
      },
      typesFields: {
        andTypes: [],
        orTypes: [],
      },
    };
  },
  watch: {
    async modalHandler({ isOpen, isEdit, info }) {
      if (!isOpen) {
        this.resetValues();
      }
      if (isOpen && !isEdit) {
        this.filters = [];
        ['DEAL', 'COMPANY', 'CONTACT'].map(async (type) => {
          const {
            data: { filters },
          } = await this.getFilter(type);
          this.filters.push(filters);
        });
        const { type, name } = this.type;
        this.filter.type = type;
        this.section = name;
      }
      if (isOpen && isEdit) {
        this.isLoading = true;
        this.filters = [];
        // espera a que todas las condiciones con await se cumplan para pasar a la siguiente funcion
        await Promise.all(
          ['DEAL', 'COMPANY', 'CONTACT'].map(async (type) => {
            const {
              data: { filters },
            } = await this.getFilter(type);
            this.filters.push(filters);
          }),
        );
        this.fillItems(info);
      }
    },
  },
  methods: {
    // rellena los arrays de los items cuando esta en modo editar
    fillItems(info) {
      this.filter = { ...info };
      // recorre el arreglo de condiciones que existen y rellena los arrays de los items corresponiedntes
      info.conditions.conditions.forEach(({ glue, conditions }) => {
        if (conditions.length > 0) {
          conditions.forEach((condition, index) => {
            this.getFiltersParams(glue, condition.typeTable, index);
            this.getOperators(
              glue,
              condition.typeTable,
              condition.typeLabel,
              index,
            );
            this.getTypeField(glue, index);
          });
        }
      });
      this.isLoading = false;
    },
    fieldConfig(condition) {
      if (condition.typeField === 'NUMBER') {
        // eslint-disable-next-line
        condition.label = 'Cantidad';
      }
      if (condition.typeField === 'DATE') {
        // eslint-disable-next-line
        condition.label = 'Fecha';
      }
      if (condition.typeLabel === 'CREATED_BY') {
        // eslint-disable-next-line
        condition.label = 'Creador';
      }
      if (condition.typeLabel === 'TAGS') {
        // eslint-disable-next-line
        condition.label = 'Etiquetas';
      }
      if (condition.typeLabel === 'STATUS') {
        // eslint-disable-next-line
        condition.label = 'Estados';
      }
      if (condition.typeLabel === 'NAME') {
        // eslint-disable-next-line
        condition.label = 'Nombre';
      }
      return condition;
    },
    viewValueHandler({ typeField, operator }) {
      return (
        typeField !== '' && operator !== 'IS NOT NULL' && operator !== 'IS NULL'
      );
    },
    getFilter(type) {
      return this.$apollo.query({
        query: GET_FILTER_PARAMS,
        fetchPolicy: 'no-cache',
        variables: {
          typeTable: type,
        },
      });
    },
    getFiltersParams(glue, type, index) {
      const { columns } = this.filters.find(
        ({ typeTable }) => typeTable === type,
      );
      if (glue === 'AND') {
        this.typeLabelItems.andItems[index] = columns;
      }
      if (glue === 'OR') {
        this.typeLabelItems.orItems[index] = columns;
      }
    },
    getOperators(glue, type, label, index) {
      const { columns } = this.filters.find(
        ({ typeTable }) => typeTable === type,
      );
      const { typeField } = columns.find(
        ({ typeLabel }) => typeLabel === label,
      );
      if (glue === 'AND') {
        this.operatorItems.andItems[index] = typeField.operators;
        this.typesFields.andTypes[index] = typeField.type;
      }
      if (glue === 'OR') {
        this.operatorItems.orItems[index] = typeField.operators;
        this.typesFields.orTypes[index] = typeField.type;
      }
    },
    getTypeField(glueParam, index) {
      const {
        conditions: { conditions },
      } = this.filter;
      const findGlue = conditions.find(({ glue }) => glue === glueParam);
      if (glueParam === 'AND') {
        findGlue.conditions[index].typeField = this.typesFields.andTypes[index];
      }
      if (glueParam === 'OR') {
        findGlue.conditions[index].typeField = this.typesFields.orTypes[index];
      }
    },
    outDataCreateorUpdate(action) {
      this.$refs.formFilter.validate();
      if (this.isValidate) {
        if (
          this.filter.conditions.conditions[0].conditions.length === 0 &&
          this.filter.conditions.conditions[1].conditions.length === 0
        ) {
          this.conditionsError = {
            show: true,
            message: 'Agrega una condición como mínimo',
          };
          setTimeout(() => {
            this.conditionsError = {
              show: false,
              message: '',
            };
          }, 3000);
        } else {
          this.$emit('outData', action, this.filter);
        }
      }
    },
    outDataDelete({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      this.$emit('outData', 'DELETE', this.filter);
    },
    close() {
      this.$emit('close', {
        isOpen: false,
        isLoading: false,
        isEdit: false,
        info: {},
      });
    },
    resetValues() {
      this.$refs.formFilter.resetValidation();
      this.$refs.formFilter.reset();
      this.filters = [];
      this.typeLabelItems = {
        andItems: [],
        orItems: [],
      };
      this.operatorItems = {
        andItems: [],
        orItems: [],
      };
      this.typeField = {
        andTypes: [],
        orTypes: [],
      };
      this.filter = {
        name: '',
        type: '',
        isVisible: false,
        conditions: {
          glue: 'AND',
          conditions: [
            {
              glue: 'AND',
              conditions: [],
            },
            {
              glue: 'OR',
              conditions: [],
            },
          ],
        },
      };
    },
    addConditions(type) {
      this.conditionsError = {
        show: false,
        message: '',
      };
      this.filter.conditions.conditions = this.filter.conditions.conditions.map(
        (condition) => {
          if (condition.glue === type) {
            condition.conditions.push({
              typeTable: '',
              typeLabel: '',
              typeField: '',
              operator: '',
              value: null,
            });
          }
          return condition;
        },
      );
    },
    deleteFilterConfirmation() {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: { nameItem: 'El filtro', text: 'será eliminado' },
        infoDelete: {},
      });
    },
    deleteCondition(glue, index) {
      this.filter.conditions.conditions = this.filter.conditions.conditions.map(
        (condition) => {
          if (condition.glue === glue) {
            condition.conditions.splice(index, 1);
          }
          return condition;
        },
      );
      if (glue === 'AND') {
        this.typeLabelItems.andItems.splice(index, 1);
        this.operatorItems.andItems.splice(index, 1);
        this.typesFields.andTypes.splice(index, 1);
      }
      if (glue === 'OR') {
        this.typeLabelItems.orItems.splice(index, 1);
        this.operatorItems.orItems.splice(index, 1);
        this.typesFields.orTypes.splice(index, 1);
      }
    },
    resetValuesTypeTable(glue, index) {
      this.filter.conditions.conditions = this.filter.conditions.conditions.map(
        (condition) => {
          if (condition.glue === glue) {
            // eslint-disable-next-line
            condition.conditions[index].typeLabel = '';
            // eslint-disable-next-line
            condition.conditions[index].typeField = '';
            // eslint-disable-next-line
            condition.conditions[index].operator = '';
            // eslint-disable-next-line
            condition.conditions[index].value = '';
            // eslint-disable-next-line
            delete condition.conditions[index].label;
            // eslint-disable-next-line
            delete condition.conditions[index].type;
          }
          return condition;
        },
      );
      if (glue === 'AND') {
        this.operatorItems.andItems[index] = [];
        this.typesFields.andTypes[index] = [];
      }
      if (glue === 'OR') {
        this.operatorItems.orItems[index] = [];
        this.typesFields.orTypes[index] = [];
      }
    },
    resetValuesTypeLabel(glue, index) {
      this.filter.conditions.conditions = this.filter.conditions.conditions.map(
        (condition) => {
          if (condition.glue === glue) {
            // eslint-disable-next-line
            condition.conditions[index].typeField = '';
            // eslint-disable-next-line
            condition.conditions[index].operator = '';
            // eslint-disable-next-line
            condition.conditions[index].value = '';
            // eslint-disable-next-line
            delete condition.conditions[index].label;
            // eslint-disable-next-line
            delete condition.conditions[index].type;
          }
          return condition;
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .delete-button } from ../../../../scss/components/modal.filter';
</style>
