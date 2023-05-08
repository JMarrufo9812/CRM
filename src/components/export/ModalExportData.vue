<template>
  <v-dialog v-model="modalHandler.isOpen" width="450" persistent>
    <v-card>
      <v-card-title class="primary white--text pl-10">
        Exportar {{ typeItems.name }}
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="pt-4" v-if="!isDocumentReady">
          <p>Tipo de Exportación</p>
          <v-radio-group v-model="formatDocument" mandatory dense>
            <v-radio label="Archivo XLS (Excel)" value="xls"></v-radio>
            <v-radio
              label="CSV (valores separados por comas) "
              value="csv"
            ></v-radio>
          </v-radio-group>
        </div>
        <div class="pt-4" v-if="!isDocumentReady">
          <p>Datos a exportar</p>
          <v-radio-group v-model="isExportViewData" mandatory dense>
            <v-radio
              label="Vista actual (Los datos que se muestran en la tabla)"
              :value="true"
            ></v-radio>
            <v-radio label="Todos(Todos los datos)" :value="false"></v-radio>
          </v-radio-group>
        </div>
        <downloadexcel
          v-show="isDocumentReady"
          :data="dataExport"
          :type="formatDocument"
          :fields="dataHeaders"
          :worksheet="typeItems.name"
          :name="`${typeItems.name}.${formatDocument}`"
        >
          <v-card outlined class="mt-4">
            <v-row>
              <v-col cols="12" align="center" justify="center">
                <img
                  v-show="formatDocument === 'xls'"
                  style="width: 100px; height: 120px"
                  src="@/assets/images/excel-icon.png"
                  alt="Excel"
                />
                <img
                  v-show="formatDocument === 'csv'"
                  style="width: 85px; height: 85px"
                  src="@/assets/images/csv-icon.png"
                  alt="Excel"
                />
              </v-col>
              <v-col cols="12" align="center" justify="center">
                <v-btn class="mb-4" outlined large>
                  <v-icon>mdi-download</v-icon>
                  Descargar
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </downloadexcel>
        <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
      </v-card-text>
      <v-card-actions v-if="!isDocumentReady" class="pa-5 justify-end">
        <v-btn class="mr-8" large tile outlined color="primary" @click="close">
          Cancelar
        </v-btn>
        <v-btn
          large
          tile
          normal
          color="secondary"
          :loading="isLoadingExport"
          @click="exportHandler"
        >
          Exportar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import downloadexcel from 'vue-json-excel';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { GET_CONTACTS } from '@/graphql/querys/contactsQuery';
import { GET_COMPANIES } from '@/graphql/querys/companiesQuery';
import { GET_DEALS } from '@/graphql/querys/dealsQuery';

export default {
  name: 'ModalExportData',
  mixins: [modalsAlertsMixin],
  components: {
    downloadexcel,
  },
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
    items: {
      required: true,
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    headers: {
      required: true,
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    form: {
      isRequired: true,
      type: Object,
    },
  },
  data() {
    return {
      formatDocument: 'xls',
      isExportViewData: true,
      isLoadingExport: false,
      isDocumentReady: false,
      dataExport: [],
      dataHeaders: {},
      filters: {
        orderBy: 'desc',
        isDelete: false,
      },
    };
  },
  watch: {
    modalHandler({ isOpen }) {
      if (!isOpen) {
        this.resetValues();
      }
    },
  },
  methods: {
    async exportHandler() {
      this.isLoadingExport = true;
      this.getHeaders();
      if (this.isExportViewData) {
        // rompe la reactividad
        this.dataExport = JSON.parse(JSON.stringify(this.items));
        this.formatData();
        this.isDocumentReady = true;
      } else {
        if (this.typeItems.type === 'CONTACT') {
          const list = await this.getAllContacts();
          if (list !== null) {
            this.dataExport = list;
            this.formatData();
            this.isDocumentReady = true;
          } else {
            const error =
              'No se pudieron exportar los contactos, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          }
        }
        if (this.typeItems.type === 'COMPANY') {
          const list = await this.getAllCompanies();
          if (list !== null) {
            this.dataExport = list;
            this.formatData();
            this.isDocumentReady = true;
          } else {
            const error =
              'No se pudieron exportar las empresas, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          }
        }
        if (this.typeItems.type === 'DEAL') {
          const list = await this.getAllDeals();
          if (list !== null) {
            this.dataExport = list;
            this.formatData();
            this.isDocumentReady = true;
          } else {
            const error =
              'No se pudieron exportar los tratos, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          }
        }
      }
      this.isLoadingExport = false;
    },
    formatData() {
      // arma el formato json que pide la libreria
      this.dataExport = this.dataExport.map((item) => {
        // eslint-disable-next-line
        for (let property in item) {
          // eslint-disable-next-line
          let getValue = item[property];
          let typeValue = typeof getValue;
          // manualmente se detecta el tipo de dato ya que todos los detecta como objectos
          if (typeValue === 'object') {
            // eslint-disable-next-line
            typeValue = Array.isArray(getValue)
              ? 'array'
              : getValue
              ? 'object'
              : 'null';
          }
          if (typeValue === 'array') {
            if (property === 'customForms' && !this.isExportViewData) {
              item[property].forEach(({ id, value }) => {
                // eslint-disable-next-line
                item[id] = value;
              });
            }
            if (property === 'phones') {
              // eslint-disable-next-line
              item[property] = item[property]
                .map(({ number }) => {
                  return number;
                })
                .join(',');
            }
            if (property === 'tags') {
              // eslint-disable-next-line
              item[property] = item[property]
                .map(({ name }) => {
                  return name;
                })
                .join(',');
            }
            if (property === 'companies' || property === 'contacts') {
              // eslint-disable-next-line
              item[property] = item[property]
                .map(({ name }) => {
                  return name;
                })
                .join(',');
            }
            if (property === 'socialMedias') {
              // eslint-disable-next-line
              item[property] = item[property]
                .map(({ url }) => {
                  return url;
                })
                .join(',');
            }
          }
          if (typeValue === 'object') {
            if (property === 'owner' || property === 'createdBy') {
              // eslint-disable-next-line
              item[
                property
              ] = `${item[property].user.name} ${item[property].user.lastName}`;
            }
            if (
              property === 'contact' ||
              property === 'company' ||
              property === 'pipeline' ||
              property === 'stage'
            ) {
              // eslint-disable-next-line
              item[property] = item[property].name;
            }
          }
          if (typeValue === 'boolean') {
            if (property === 'isClient') {
              // eslint-disable-next-line
              item[property] = item[property] ? 'Antiguo' : 'Nuevo';
            }
          }
          if (property === 'status') {
            const translateStatus = (status) => {
              if (status === 'WON') return 'Ganado';
              if (status === 'LOST') return 'Perdido';
              if (status === 'OPEN') return 'Abierto';
              return 'error';
            };
            // eslint-disable-next-line
            item[property] = translateStatus(item[property]);
          }
        }
        return item;
      });
    },
    getHeaders() {
      // arma los headers del documento
      this.headers.forEach(({ text, value }) => {
        this.dataHeaders[text] = value;
      });
    },
    async getAllContacts() {
      return this.$apollo
        .query({
          query: GET_CONTACTS,
          fetchPolicy: 'no-cache',
          variables: {
            filters: this.filters,
          },
        })
        .then(({ data: { contacts } }) => {
          return contacts.list;
        })
        .catch(() => {
          return null;
        });
    },
    async getAllCompanies() {
      return this.$apollo
        .query({
          query: GET_COMPANIES,
          fetchPolicy: 'no-cache',
          variables: {
            filters: this.filters,
          },
        })
        .then(({ data: { companies } }) => {
          return companies.list;
        })
        .catch(() => {
          return null;
        });
    },
    async getAllDeals() {
      return this.$apollo
        .query({
          query: GET_DEALS,
          fetchPolicy: 'no-cache',
          variables: {
            filters: this.filters,
          },
        })
        .then(({ data: { deals } }) => {
          return deals.list;
        })
        .catch(() => {
          return null;
        });
    },
    close() {
      this.$emit('close', { isOpen: false });
    },
    resetValues() {
      this.isLoadingExport = false;
      this.isDocumentReady = false;
      this.dataExport = [];
      this.dataHeaders = {};
      this.isExportViewData = true;
      this.formatDocument = 'xls';
    },
  },
};
</script>
