<template>
  <v-dialog v-model="modalHandler.isOpen" width="750" scrollable persistent>
    <v-card>
      <v-card-title class="primary white--text pl-10">
        Importar {{ typeItems.name }}
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-stepper v-model="step" non-linear>
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">
              Cargar archivo
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2">
              Seleccionar campos
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">
              Cargar datos en la aplicación
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card flat class="mb-2">
                <v-card-title class="justify-center">
                  <v-icon large class="mr-2">mdi-comment-alert-outline</v-icon>
                  Antes de importar!
                </v-card-title>
                <v-card-subtitle class="mt-1">
                  <p class="text-center">
                    Puedes descargar un archivo de ejemplo para evitar errores
                    en la importación
                  </p>
                  <div class="d-flex justify-center pt-2">
                    <v-btn
                      class="ma-2"
                      outlined
                      :href="downloadFile"
                      target="_blank"
                    >
                      Descargar ejemplo
                    </v-btn>
                  </div>
                </v-card-subtitle>
                <v-card-text class="py-4">
                  <vue-dropzone
                    id="dropZone"
                    ref="dropzone"
                    :options="dropOptions"
                    :useCustomSlot="true"
                    :include-styling="false"
                    @vdropzone-drag-over.stop="startDragging"
                    @vdropzone-drag-leave="endDragging"
                    @vdropzone-drop="endDragging"
                    @vdropzone-success="uploadFile"
                    @vdropzone-error="getError"
                    @vdropzone-total-upload-progress="uploadProgress"
                  >
                    <v-card
                      :disabled="isUploadProgress"
                      color="#F0F0F0"
                      outlined
                      class="dropzone-custom-content pa-12"
                      :class="[{ 'blur-drop-zone': dragging }]"
                    >
                      <v-col cols="12" align="center" class="pb-0">
                        <v-progress-linear
                          v-if="isUploadProgress"
                          class="mb-4"
                          color="green"
                          height="6"
                          stream
                          :buffer-value="progress"
                        ></v-progress-linear>
                        <v-icon v-if="!isSuccessUpload" x-large>
                          mdi-file-download-outline
                        </v-icon>
                        <v-icon v-else x-large>mdi-file-outline</v-icon>
                      </v-col>
                      <v-card-title
                        class="dropzone-custom-title justify-center"
                      >
                        <span v-if="!isSuccessUpload" class="text-center">
                          Arrastra y suelta o elige un archivo para cargar
                        </span>
                        <span v-else>
                          {{ file.name }}
                        </span>
                      </v-card-title>
                      <v-card-subtitle class="subtitle text-center">
                        <span v-if="!isSuccessUpload">
                          Sólo los archivos .csv, .xlsx y .xls son compatibles.
                        </span>
                        <v-btn
                          v-else
                          @click="removeDocumentUpload"
                          text
                          small
                          color="error"
                        >
                          Eliminar
                        </v-btn>
                      </v-card-subtitle>
                    </v-card>
                  </vue-dropzone>
                  <XlsxRead :file="file">
                    <xlsx-json @parsed="getData"></xlsx-json>
                  </XlsxRead>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    large
                    :disabled="!isSuccessUpload"
                    color="secondary"
                    @click="step = 2"
                  >
                    Continuar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="2" class="pa-2">
              <v-card flat>
                <v-card-title class="d-flex justify-center">
                  Asigna los campos correspondientes a guardar
                </v-card-title>
                <div
                  class="text-center"
                  v-if="$can(CUSTOM_FIELDS_MANAGEMENT, PERMISSIONS_SETTINGS)"
                >
                  <span class="d-block mb-3">¿Necesitas más campos?</span>
                  <v-btn
                    @click="
                      modalHandlerCustomFields({
                        isOpen: true,
                        isLoading: false,
                        isEdit: false,
                      })
                    "
                    small
                    color="secondary"
                  >
                    Crear campo personalizado
                  </v-btn>
                </div>
                <v-card-text>
                  <v-row class="justify-center pb-2">
                    <v-col
                      cols="8"
                      v-if="typeItems.type === 'DEAL' && step !== 1"
                    >
                      <Fields
                        :field="inputPipeline"
                        :resetHandler="modalHandler.isOpen"
                      />
                    </v-col>
                  </v-row>
                  <v-row v-for="(column, index) in columns" :key="index">
                    <v-col align-self="center" cols="6">{{ column }}</v-col>
                    <v-col cols="6">
                      <v-select
                        v-if="step !== 1"
                        label="Campos disponibles"
                        outlined
                        :items="inputs"
                        item-text="label"
                        item-value="key"
                        return-object
                        clearable
                        hide-details="auto"
                        @click:clear="clearValue(column)"
                      >
                        <template v-slot:item="{ item, on, attrs }">
                          <v-list-item
                            :disabled="item.isSelect"
                            @click="structureData(item, column)"
                            v-bind="attrs"
                            v-on="on"
                          >
                            {{ item.label }}
                          </v-list-item>
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn large @click="backStepOne" outlined color="primary">
                    Atrás
                  </v-btn>
                  <v-btn large color="secondary" @click="assembleDataHandler">
                    Continuar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card outlined>
                <v-card-title
                  v-if="!isEndImport && !isErrorImport"
                  class="justify-center center-info"
                >
                  <v-icon color="success" x-large class="mr-2 text-center">
                    mdi-file-check-outline
                  </v-icon>
                  El documento está listo para ser importado
                </v-card-title>
                <v-card-title
                  v-if="isEndImport && !isErrorImport"
                  class="justify-center center-info px-12 text-center"
                >
                  <v-icon color="success" x-large class="mr-2">
                    mdi-bell-ring-outline
                  </v-icon>
                  Los datos se cargarán y te avisaremos cuando esté listo, ahora
                  puedes seguir trabajando
                </v-card-title>
                <v-card-title
                  v-if="!isEndImport && isErrorImport"
                  class="justify-center center-info px-12 text-center"
                >
                  <v-icon color="success" x-large class="mr-2">
                    mdi-alert-circle-outline
                  </v-icon>
                  Ha ocurrido un error durante la importación, intente de nuevo
                  o contacte a soporte
                </v-card-title>
                <v-divider></v-divider>
                <v-card-actions class="justify-end">
                  <v-btn
                    v-if="!isEndImport"
                    @click="backStepTwo"
                    color="primary"
                    outlined
                    large
                  >
                    Atrás
                  </v-btn>
                  <v-btn
                    v-if="!isEndImport && !isErrorImport"
                    :loading="isLoadingImport"
                    color="secondary"
                    large
                    @click="handlerImport"
                  >
                    Importar
                  </v-btn>
                  <v-btn
                    v-if="isEndImport"
                    outlined
                    large
                    color="primary"
                    @click="close"
                  >
                    Cerrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
        <BaseModalAlert
          :modalHandler="modalAlert"
          :cancel="false"
          @confirm="modalHandlerAlert"
        ></BaseModalAlert>
        <ModalCustomField
          :forForm="typeItems.type"
          :isImportModal="true"
          :modalHandler="modalCustomField"
          @outData="createCustomField"
          @close="modalHandlerCustomFields"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';
import vueDropzone from 'vue2-dropzone';
import { customFieldsMixin } from '@/mixins/customFieldsMixin';
import { CUSTOM_FIELDS_MANAGEMENT } from '@/constants/methods';
import { PERMISSIONS_SETTINGS } from '@/constants/permissions';
import {
  IMPORT_CONTACTS,
  IMPORT_COMPANIES,
  IMPORT_DEALS,
} from '@/graphql/mutations/importMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import {
  XlsxRead,
  XlsxJson,
} from '../../../node_modules/vue-xlsx/dist/vue-xlsx.es';

const getTemplate = () => `
     <span></span>
`;

export default {
  name: 'ModalImportData',
  components: {
    XlsxRead,
    XlsxJson,
    vueDropzone,
  },
  mixins: [modalsAlertsMixin, customFieldsMixin],
  props: {
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return {
          isOpen: false,
        };
      },
    },
    typeItems: {
      required: true,
      type: Object,
    },
    form: {
      required: true,
      type: [Array, Object],
    },
  },
  data() {
    return {
      PERMISSIONS_SETTINGS,
      CUSTOM_FIELDS_MANAGEMENT,
      file: null,
      step: 1,
      isSuccessUpload: false,
      dragging: false,
      isUploadProgress: false,
      progress: 0,
      dropOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 1, // MB
        maxFiles: 1,
        acceptedFiles: '.xls, .xlsx, .csv',
        addRemoveLinks: false,
        previewTemplate: getTemplate(),
      },
      inputs: [],
      columns: [],
      columnsValues: [],
      dataObject: [],
      dataAssemble: [],
      dataImports: [],
      isLoadingImport: false,
      isEndImport: false,
      isErrorImport: false,
      inputPipeline: {
        keyInput: 'pipeline',
        type: 'SELECT_PIPELINE',
        label: 'Selecciona el embudo donde se importarán los tratos',
        value: {},
      },
      // indica a la mutacion de custom fields que se esta creando desde el modal de importar
      isImportModal: true,
    };
  },
  computed: {
    downloadFile() {
      if (this.typeItems.type === 'CONTACT')
        return '/files/contactos-ejemplo.xls';
      if (this.typeItems.type === 'COMPANY')
        return '/files/empresas-ejemplo.xlsx';
      if (this.typeItems.type === 'DEAL') return '/files/tratos-ejemplo.xlsx';
      return '';
    },
  },
  watch: {
    modalHandler({ isOpen }) {
      if (!isOpen) {
        this.resetValues();
      } else {
        this.getInputs();
      }
    },
    isSuccessUpload(value) {
      if (value) {
        this.isUploadProgress = false;
        this.$refs.dropzone.disable();
      } else {
        this.$refs.dropzone.enable();
      }
    },
  },
  methods: {
    close() {
      this.$emit('close', { isOpen: false });
    },
    resetValues() {
      this.removeDocumentUpload();
      this.step = 1;
      this.inputs = [];
      this.columns = [];
      this.columnsValues = [];
      this.dataObject = [];
      this.dataAssemble = [];
      this.dataImports = [];
      this.isLoadingImport = false;
      this.isErrorImport = false;
      this.isEndImport = false;
    },
    backStepOne() {
      this.step = 1;
      this.inputPipeline.value = {};
      this.dataObject.forEach(({ column }) => {
        this.clearValue(column);
      });
    },
    backStepTwo() {
      this.isErrorImport = false;
      this.step = 2;
    },
    getError({ accepted }) {
      let error = '';
      if (!accepted) {
        error =
          'El archivo que seleccionaste no es válido, las extenciones de archivos permitidas son .xls, .xlsx, .csv';
      } else {
        error =
          'Ocurrió un error al cargar el archivo inténtelo de nuevo o contacte a soporte';
      }
      this.modalHandlerError({ isOpen: true, error });
    },
    uploadFile(file) {
      this.file = file;
      this.progress = 100;
      this.isSuccessUpload = true;
    },
    removeDocumentUpload() {
      this.$refs.dropzone.removeAllFiles(true);
      // evita que salte el modal de error al cancelar una carga de un archivo
      this.modalHandlerError({ isOpen: false, error: '' });
      this.file = null;
      this.isSuccessUpload = false;
      this.isUploadProgress = false;
    },
    getData(data) {
      this.columnsValues = data;
      const allColumns = data.flatMap((item) => {
        return Object.keys(item);
      });
      this.columns = new Set(allColumns);
    },
    startDragging() {
      this.dragging = true;
    },
    endDragging() {
      this.dragging = false;
    },
    uploadProgress(totaluploadprogress) {
      this.isUploadProgress = true;
      this.progress = totaluploadprogress - 10;
    },
    getInputs() {
      const { customForm, defaultForm, headers } = this.form;

      const dates = headers.filter((header) => {
        return (
          header.keyInput === 'wonTime' ||
          header.keyInput === 'lostTime' ||
          header.keyInput === 'createdAt' ||
          header.keyInput === 'updatedAt'
        );
      });
      let allInputs = [];

      if (this.typeItems.type === 'DEAL') {
        allInputs = customForm?.inputs
          ? defaultForm?.inputs.concat(customForm?.inputs).concat(dates)
          : defaultForm?.inputs.concat(dates);
      } else {
        allInputs = customForm?.inputs
          ? defaultForm?.inputs.concat(customForm?.inputs)
          : defaultForm?.inputs;
      }

      const formatInputs = allInputs.map((input) => {
        return {
          label: input.label,
          key: input.keyInput ? input.keyInput : input.id,
          isSelect: false,
          isDefault: !!input.keyInput,
          type: input.type,
        };
      });

      const cleanInputs = formatInputs.filter(({ key, type }) => {
        return (
          key !== 'tags' &&
          key !== 'owner' &&
          key !== 'socialMedias' &&
          key !== 'isClient' &&
          type !== 'RADIO' &&
          type !== 'CHECKBOX' &&
          key !== 'pipeline'
        );
      });
      this.inputs = cleanInputs;
    },
    clearValue(data) {
      const { input } = this.dataObject.find(({ column }) => data === column);
      this.inputs = this.inputs.map((inp) => {
        if (inp.key === input.key) {
          // eslint-disable-next-line
          inp.isSelect = false;
        }
        return inp;
      });

      this.dataObject = this.dataObject.filter(({ column }) => data !== column);
    },
    structureData(input, column) {
      const existInput = this.dataObject.some(
        (itemObject) => itemObject.column === column,
      );
      if (existInput) {
        this.dataObject = this.dataObject.filter(
          (dataObject) => dataObject.column !== column,
        );
        this.dataObject.push({ input, column });
      } else {
        this.dataObject.push({ input, column });
      }

      this.inputs = this.inputs.map((item) => {
        const exist = this.dataObject.some(
          (dataObject) => dataObject.input.key === item.key,
        );
        // eslint-disable-next-line
        if (exist) item.isSelect = true;
        // eslint-disable-next-line
        else item.isSelect = false;
        return item;
      });
    },
    assembleDataHandler() {
      let error = '';
      if (
        this.typeItems.type === 'CONTACT' ||
        this.typeItems.type === 'COMPANY'
      ) {
        const existName = this.dataObject.some(
          ({ input }) => input.key === 'name',
        );
        if (existName) {
          this.assembleData();
        } else {
          error = 'El campo de tipo nombre debe ser asignado';
          this.modalHandlerError({ isOpen: true, error });
        }
      } else {
        const existTitle = this.dataObject.some(
          ({ input }) => input.key === 'title',
        );

        if (
          this.inputPipeline.value.pipelineId &&
          this.inputPipeline.value.stageId &&
          existTitle
        ) {
          this.assembleData();
        }

        if (!existTitle) {
          error = 'El campo de tipo título debe ser asignado';
          this.modalHandlerError({ isOpen: true, error });
        }

        if (
          !this.inputPipeline.value.pipelineId &&
          !this.inputPipeline.value.stageId
        ) {
          error =
            'Selecciona el embudo y la etapa donde se importarán los tratos';
          this.modalHandlerError({ isOpen: true, error });
        }
      }
    },
    assembleData() {
      const matchValues = this.columnsValues.map((item) => {
        const assignValuesDefault = this.dataObject
          .filter(({ input }) => input.isDefault)
          .map(({ column, input }) => {
            if (input.key === 'companies') {
              return { company: item[column] };
            }
            if (input.key === 'contacts') {
              return { contact: item[column] };
            }
            return { [input.key]: item[column] };
          });

        const assignValuesCustom = this.dataObject
          .filter(({ input }) => !input.isDefault)
          .map(({ column, input }) => {
            return { id: input.key, value: item[column], type: input.type };
          });

        return {
          ...Object.assign({}, ...assignValuesDefault),
          customs: assignValuesCustom,
        };
      });
      const fixValues = matchValues.map((item) => {
        if (this.typeItems.type === 'DEAL') {
          if (!item.title) {
            // eslint-disable-next-line
            item.title = 'N/A';
          }
          if (item.value) {
            // eslint-disable-next-line
            item.value = parseFloat(item.value);
            // eslint-disable-next-line
            if (isNaN(item.value)) {
              // eslint-disable-next-line
              item.value = 0;
            }
          } else {
            // eslint-disable-next-line
            item.value = 0;
          }
          if (item.expectedCloseDate) {
            // eslint-disable-next-line
            // const date = new Date(item.expectedCloseDate);
            // eslint-disable-next-line
            // const validateDate = !isNaN(date.getTime());
            const date = moment(item.expectedCloseDate).format('YYYY-MM-DD');
            const validateDate = moment(date, 'YYYY-MM-DD').isValid();
            // eslint-disable-next-line
            if (!validateDate) {
              this.modalHandlerAlert({
                isOpen: true,
                isLoading: false,
                message: {
                  title: 'Fechas inválidas encontradas',
                  text:
                    'Se encontraron fechas inválidas en el documento, si continúa es posible que algunas fechas no se guarden, asegurate de haber introducido las fechas en el formato correcto; para obtener más ayuda puedes descargar nuestro documento guía',
                },
                info: {},
              });
              // eslint-disable-next-line
              delete item.expectedCloseDate;
            } else {
              // eslint-disable-next-line
              item.expectedCloseDate = date;
            }
          } else {
            // eslint-disable-next-line
            delete item.expectedCloseDate;
          }
          if (item.wonTime) {
            // eslint-disable-next-line
            // const date = new Date(item.expectedCloseDate);
            // eslint-disable-next-line
            // const validateDate = !isNaN(date.getTime());
            const date = moment(item.wonTime).format('YYYY-MM-DD');
            const validateDate = moment(date, 'YYYY-MM-DD').isValid();
            // eslint-disable-next-line
            if (!validateDate) {
              this.modalHandlerAlert({
                isOpen: true,
                isLoading: false,
                message: {
                  title: 'Fechas inválidas encontradas',
                  text:
                    'Se encontraron fechas inválidas en el documento, si continúa es posible que algunas fechas no se guarden, asegurate de haber introducido las fechas en el formato correcto, para obtener más ayuda puedes descargar nuestro documento guía',
                },
                info: {},
              });
              // eslint-disable-next-line
              delete item.wonTime;
            } else {
              // eslint-disable-next-line
              item.wonTime = date;
            }
          } else {
            // eslint-disable-next-line
            delete item.wonTime;
          }
          if (item.lostTime) {
            // eslint-disable-next-line
            // const date = new Date(item.expectedCloseDate);
            // eslint-disable-next-line
            // const validateDate = !isNaN(date.getTime());
            const date = moment(item.lostTime).format('YYYY-MM-DD');
            const validateDate = moment(date, 'YYYY-MM-DD').isValid();
            // eslint-disable-next-line
            if (!validateDate) {
              this.modalHandlerAlert({
                isOpen: true,
                isLoading: false,
                message: {
                  title: 'Fechas inválidas encontradas',
                  text:
                    'Se encontraron fechas inválidas en el documento, si continúa es posible que algunas fechas no se guarden, asegurate de haber introducido las fechas en el formato correcto, para obtener más ayuda puedes descargar nuestro documento guía',
                },
                info: {},
              });
              // eslint-disable-next-line
              delete item.lostTime;
            } else {
              // eslint-disable-next-line
              item.lostTime = date;
            }
          } else {
            // eslint-disable-next-line
            delete item.lostTime;
          }
          if (item.createdAt) {
            // eslint-disable-next-line
            // const date = new Date(item.expectedCloseDate);
            // eslint-disable-next-line
            // const validateDate = !isNaN(date.getTime());
            const date = moment(item.createdAt).format('YYYY-MM-DD');
            const validateDate = moment(date, 'YYYY-MM-DD').isValid();
            // eslint-disable-next-line
            if (!validateDate) {
              this.modalHandlerAlert({
                isOpen: true,
                isLoading: false,
                message: {
                  title: 'Fechas inválidas encontradas',
                  text:
                    'Se encontraron fechas inválidas en el documento, si continúa es posible que algunas fechas no se guarden, asegurate de haber introducido las fechas en el formato correcto, para obtener más ayuda puedes descargar nuestro documento guía',
                },
                info: {},
              });
              // eslint-disable-next-line
              delete item.createdAt;
            } else {
              // eslint-disable-next-line
              item.createdAt = date;
            }
          } else {
            // eslint-disable-next-line
            delete item.createdAt;
          }
          if (item.updatedAt) {
            // eslint-disable-next-line
            // const date = new Date(item.expectedCloseDate);
            // eslint-disable-next-line
            // const validateDate = !isNaN(date.getTime());
            const date = moment(item.updatedAt).format('YYYY-MM-DD');
            const validateDate = moment(date, 'YYYY-MM-DD').isValid();
            // eslint-disable-next-line
            if (!validateDate) {
              this.modalHandlerAlert({
                isOpen: true,
                isLoading: false,
                message: {
                  title: 'Fechas inválidas encontradas',
                  text:
                    'Se encontraron fechas inválidas en el documento, si continúa es posible que algunas fechas no se guarden, asegurate de haber introducido las fechas en el formato correcto, para obtener mas ayuda puedes descargar nuestro documento guía',
                },
                info: {},
              });
              // eslint-disable-next-line
              delete item.updatedAt;
            } else {
              // eslint-disable-next-line
              item.updatedAt = date;
            }
          } else {
            // eslint-disable-next-line
            delete item.updatedAt;
          }
        }
        if (this.typeItems.type !== 'DEAL') {
          if (!item.name) {
            // eslint-disable-next-line
            item.name = 'N/A';
          }
          if (item.phones) {
            // eslint-disable-next-line
            item.phones = `${item.phones}`;
          } else {
            // eslint-disable-next-line
            delete item.phones;
          }
        }
        return item;
      });
      this.dataImports = fixValues;
      this.step = 3;
    },
    handlerImport() {
      this.isLoadingImport = true;
      if (this.typeItems.type === 'CONTACT')
        this.importContacts(this.dataImports);
      if (this.typeItems.type === 'COMPANY')
        this.importCompanies(this.dataImports);
      if (this.typeItems.type === 'DEAL') this.importDeals(this.dataImports);
    },
    importContacts(contacts) {
      this.$apollo
        .mutate({
          mutation: IMPORT_CONTACTS,
          variables: {
            input: contacts,
          },
        })
        .then(() => {
          this.isLoadingImport = false;
          this.isEndImport = true;
        })
        .catch(() => {
          this.isLoadingImport = false;
          this.isErrorImport = true;
        });
    },
    importCompanies(companies) {
      this.$apollo
        .mutate({
          mutation: IMPORT_COMPANIES,
          variables: {
            input: companies,
          },
        })
        .then(() => {
          this.isLoadingImport = false;
          this.isEndImport = true;
        })
        .catch(() => {
          this.isLoadingImport = false;
          this.isErrorImport = true;
        });
    },
    importDeals(deals) {
      const { pipelineId, stageId } = this.inputPipeline.value;
      const input = { deals, pipelineId, stageId };
      this.$apollo
        .mutate({
          mutation: IMPORT_DEALS,
          variables: {
            input,
          },
        })
        .then(() => {
          this.isLoadingImport = false;
          this.isEndImport = true;
        })
        .catch((err) => {
          console.log(err);
          this.isLoadingImport = false;
          this.isErrorImport = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .dropzone-custom-content .blur-drop-zone .center-info} from ../../../../scss/components/modal.import.data';
</style>
