<template>
  <v-container fluid style="height:100%">
    <v-row>
      <v-col cols="8" class="header-search">
        <p class="ml-6 my-4">
          {{ title }}
        </p>
      </v-col>
      <!-- search input -->
      <v-col cols="4" class="header-search">
        <v-text-field
          v-if="!$route.query.filterId && !$route.query.recyclebin"
          v-model="searchCompany"
          color="#ffffff"
          label="Buscar"
          outlined
          dense
          append-icon="mdi-magnify"
          hide-details="auto"
          class="py-2 pr-8"
          :dark="true"
        ></v-text-field>
      </v-col>
      <!-- tabla -->
      <v-col cols="12" class="pa-0">
        <CompaniesDataTable
          :updateData="updateData"
          :headers="formatHeaders"
          :searchCompany="searchCompany"
          @selectCompanies="updateSelectCompanies"
          @endUpdateData="updateData = false"
          @changeHeaderOrder="updateHeaders"
          @companies="updateCompaniesShow"
          @informationBar="updateInformationBar"
        >
          <template #top>
            <v-col cols="6" class="white py-6 pl-12">
              <!-- Menu de configuraciones -->
              <v-menu
                v-if="!$route.query.filterId && !$route.query.recyclebin"
                bottom
                offset-y
              >
                <template v-slot:activator="{ on: onMenu }">
                  <v-tooltip bottom>
                    <template #activator="{ on: onTooltip }">
                      <v-btn
                        class="mr-4"
                        outlined
                        v-on="{ ...onMenu, ...onTooltip }"
                      >
                        <v-icon>mdi-cog</v-icon>
                      </v-btn>
                    </template>
                    <span>Configuraciones</span>
                  </v-tooltip>
                </template>
                <v-list dense>
                  <ListHeaders
                    :type="viewInfo.type"
                    :headers="headers"
                    :form="getForm"
                    @outData="updateHeaders"
                  />
                  <v-list-item
                    class="text-list-menu"
                    v-if="$can(FUSE, PERMISSIONS_COMPANIES)"
                    @click="getDuplicateCompanies"
                  >
                    <v-icon color="primary" class="mr-2">
                      mdi-account-switch-outline
                    </v-icon>
                    Buscar duplicados
                  </v-list-item>

                  <v-list-item
                    class="text-list-menu"
                    v-if="$can(EXPORT, PERMISSIONS_COMPANIES)"
                    @click="modalHandlerExport({ isOpen: true })"
                  >
                    <v-icon color="primary" left>
                      mdi-clipboard-arrow-up-outline
                    </v-icon>
                    Exportar Empresas
                  </v-list-item>
                  <v-list-item
                    class="text-list-menu"
                    @click="
                      $router.push({
                        path: '/companies',
                        query: { recyclebin: true },
                      })
                    "
                  >
                    <v-icon color="primary" class="mr-2">
                      mdi-delete-outline
                    </v-icon>
                    Papelera de reciclaje
                  </v-list-item>
                </v-list>
              </v-menu>
              <!-- Boton de eliminar -->
              <v-tooltip bottom v-if="$can(BULK_DELETE, PERMISSIONS_ADMIN)">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-show="companiesSelected.length >= 1"
                    @click="
                      $route.query.recyclebin
                        ? trashCompanyConfirmation()
                        : deleteCompanyConfirmation()
                    "
                    class="mr-2 text-white"
                    color="secondary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>
                  {{
                    $route.query.recyclebin
                      ? 'Eliminar Permanentemente'
                      : 'Mover a papelera'
                  }}
                </span>
              </v-tooltip>
              <!-- Boton de restaurar -->
              <v-tooltip
                bottom
                v-if="
                  $can(BULK_DELETE, PERMISSIONS_ADMIN) &&
                    $route.query.recyclebin
                "
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-show="companiesSelected.length >= 1"
                    @click="restoreCompaniesConfirmation"
                    class="mr-2 text-white"
                    color="#396A5D"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="white">mdi-restore</v-icon>
                  </v-btn>
                </template>
                <span>Restaurar</span>
              </v-tooltip>
              <!-- Botón de cambiar propietario -->
              <ChangeOwner
                v-if="!$route.query.recyclebin"
                :isOpen.sync="isOpenMenuOwner"
                :isLoading="isLoading"
                :typeItem="typeItem"
                :itemsSelected="companiesSelected"
                @success="changeOwnerSuccess"
                @error="changeOwnerError"
              >
                <template #activator>
                  <v-tooltip bottom v-if="$can(TO_ASSIGN, PERMISSIONS_ADMIN)">
                    <template
                      v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }"
                    >
                      <v-btn
                        v-show="companiesSelected.length >= 1"
                        color="primary"
                        class="mr-2"
                        v-bind="{ ...attrsTooltip }"
                        v-on="{ ...onTooltip }"
                        @click="isOpenMenuOwner = true"
                      >
                        <v-icon>mdi-account-switch</v-icon>
                      </v-btn>
                    </template>
                    <span>Cambiar propietario</span>
                  </v-tooltip>
                </template>
              </ChangeOwner>
            </v-col>
            <v-col cols="6" class="d-flex justify-end white py-6 pr-12">
              <!-- Menu de filtros -->
              <MenuFilters
                v-if="!$route.query.filterId && !$route.query.recyclebin"
                :filters="customFilters"
                @action="actionsHandler"
              >
                <template #text-button>
                  <span>
                    {{
                      filterSelected.isFilterSelected
                        ? filterSelected.name
                        : 'Filtros'
                    }}
                  </span>
                </template>
              </MenuFilters>
              <!-- boton de agregar -->
              <v-menu
                v-if="!$route.query.filterId && !$route.query.recyclebin"
                offset-y
                left
                ransition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="secondary"
                    small
                    fab
                    depressed
                    v-on="on"
                    class="ml-4"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item
                    class="text-list-menu"
                    @click="
                      modalHandlerCompany({ isOpen: true, isLoading: false })
                    "
                  >
                    <v-icon color="primary" left>mdi-domain-plus</v-icon>
                    Nueva Empresa
                  </v-list-item>

                  <v-list-item
                    class="text-list-menu"
                    v-if="$can(IMPORT, PERMISSIONS_COMPANIES)"
                    @click="modalHandlerImport({ isOpen: true })"
                  >
                    <v-icon color="primary" left>
                      mdi-clipboard-arrow-down-outline
                    </v-icon>
                    Importar Empresas
                  </v-list-item>
                </v-list>
              </v-menu>
              <!-- Boton ver todos -->
              <v-btn
                v-if="$route.query.filterId || $route.query.recyclebin"
                @click="goToAllCompanies"
                class="mr-2"
                outlined
              >
                Ver todas las empresas
              </v-btn>
            </v-col>
          </template>
        </CompaniesDataTable>
      </v-col>
      <!-- footer info -->

      <v-col
        v-if="!$route.query.recyclebin && informationBar.totalCount"
        cols="12"
        class="d-inline-flex white mt-10 pl-12 pt-8"
      >
        <div class="d-inline-flex mr-12">
          <p class="mr-10 footer-title">Total</p>
          <p class="footer-info">{{ informationBar.totalCount }}</p>
        </div>
        <div class="d-inline-flex mr-12">
          <p class="footer-title-info mr-4">Con tratos abiertos</p>
          <p class="footer-info">{{ informationBar.companiesWithOpenDeals }}</p>
        </div>
        <div class="d-inline-flex mr-12">
          <p class="footer-title-info mr-4">Con tratos ganados</p>
          <p class="footer-info">{{ informationBar.companiesWithWonDeals }}</p>
        </div>
      </v-col>
    </v-row>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    <ModalCompany
      :inputs="inputsForm"
      :modalHandler="modalCompany"
      @close="modalHandlerCompany"
      @outData="createCompany"
    />
    <ModalFilter
      :modalHandler="modalFilter"
      :type="viewInfo"
      @outData="outDataFilterHandler"
      @close="modalHandlerFilter"
    />
    <ModalCompaniesDuplicate
      :modalHandler="modalMergeDuplicates"
      :companies="duplicateList"
      @correctDuplicate="correctDuplicate"
      @close="modalHandlerMergeDuplicates"
    />
    <ModalExportData
      :typeItems="viewInfo"
      :items="companies"
      :headers="formatHeaders"
      :modalHandler="modalExport"
      @close="modalHandlerExport"
    />
    <ModalImportData
      :typeItems="viewInfo"
      :modalHandler="modalImport"
      :form="getForm"
      @close="modalHandlerImport"
    />
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="confirmHandler"
    />
    <BaseModalRestore
      :modalHandler="modalRestore"
      @confirm="restoreCompanies"
      @cancel="modalHandlerRestore"
    />
    <v-snackbar
      v-model="snackbar.isOpen"
      :color="snackbar.color"
      :timeout="5000"
    >
      {{ snackbar.text }}
      <template v-slot:action>
        <v-btn
          text
          @click="snackbarHandler({ isOpen: false, color: '', text: '' })"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import ChangeOwner from '@/components/deals/ChangeOwner.vue';
// ability
import ability from '@/services/ability';
import {
  CREATE,
  DELETE,
  BULK_DELETE,
  TO_ASSIGN,
  EXPORT,
  IMPORT,
  FUSE,
} from '@/constants/methods';
import {
  PERMISSIONS_COMPANIES,
  PERMISSIONS_ADMIN,
} from '@/constants/permissions';
// helpers
import { UTIL_ORDER } from '@/helpers/utils';
// graphql
import { GET_FORM } from '@/graphql/querys/formsQuery';
import {
  CREATE_COMPANY,
  DELETE_COMPANIES,
  TRASH_COMPANIES,
  RESTORE_COMPANIES,
} from '@/graphql/mutations/companiesMutations';
import { GET_HEADERS } from '@/graphql/querys/headersQuery';
// mixins
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { snackbarMixin } from '@/mixins/alerts/snackbarMixin';
import { filtersMixin } from '@/mixins/filtersMixin';
import { mergeDuplicatesMixin } from '@/mixins/mergeDuplicatesMixin';
import { headersMixin } from '@/mixins/headersMixin';
import { exportsMixin } from '@/mixins/exportsMixin';
import { importMixin } from '@/mixins/importMixin';

export default {
  components: {
    CompaniesDataTable: () =>
      import('@/components/companies/CompaniesDataTable.vue'),
    ModalCompany: () => import('@/components/companies/ModalCompany.vue'),
    ModalFilter: () => import('@/components/filters/ModalFilter.vue'),
    MenuFilters: () => import('@/components/filters/MenuFilters.vue'),
    ModalCompaniesDuplicate: () =>
      import('@/components/companies/ModalCompaniesDuplicate.vue'),
    ListHeaders: () => import('@/components/headers/ListHeaders.vue'),
    ChangeOwner,
  },
  mixins: [
    modalsAlertsMixin,
    snackbarMixin,
    filtersMixin,
    mergeDuplicatesMixin,
    headersMixin,
    exportsMixin,
    importMixin,
  ],
  data() {
    return {
      typeItem: 'COMPANY',
      isOpenMenuOwner: false,
      isLoading: false,
      viewInfo: { type: 'COMPANY', name: 'Empresas' },
      CREATE,
      DELETE,
      BULK_DELETE,
      TO_ASSIGN,
      EXPORT,
      IMPORT,
      FUSE,
      PERMISSIONS_COMPANIES,
      PERMISSIONS_ADMIN,
      updateData: false,
      inputsForm: [],
      companies: [],
      informationBar: {},
      companiesSelected: [],
      menu: false,
      searchCompany: '',
      modalCompany: {
        isOpen: false,
        isLoading: false,
      },
    };
  },
  watch: {
    // organiza los inputs deacuerdo a su order
    getForm({ defaultForm, customForm }) {
      const inputs = customForm.inputs
        ? defaultForm.inputs.concat(customForm.inputs)
        : defaultForm.inputs;
      this.inputsForm = UTIL_ORDER({
        listItems: inputs,
        orderBy: 'ASC',
        nextElement: 'order',
      });
    },
  },
  computed: {
    title() {
      if (this.$route.query.filterId) {
        return 'Empresas importadas';
      }
      if (this.$route.query.recyclebin) {
        return 'Papelera de empresas';
      }
      return 'Todas las empresas';
    },
  },
  methods: {
    changeOwnerSuccess(message) {
      this.snackbarHandler({ isOpen: true, color: 'success', text: message });
      this.companiesSelected = [];
      this.updateData = true;
    },
    changeOwnerError(message) {
      this.modalHandlerError({
        isOpen: true,
        error: message,
      });
    },
    updateInformationBar(informationBar) {
      this.informationBar = informationBar;
    },
    createCompany(input) {
      this.modalHandlerCompany({ isOpen: true, isLoading: true });
      this.$apollo
        .mutate({
          mutation: CREATE_COMPANY,
          variables: {
            input,
          },
          update: () => {
            this.updateData = true;
            this.modalHandlerCompany({ isOpen: false, isLoading: false });
          },
        })
        // se ejecuta al finalizar la mutacion
        .finally(() => {
          // regresamos el valor a false para manejarlo de nuevo en el futuro
          this.updateData = false;
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Empresa creada correctamente',
          });
        })
        .catch(() => {
          const error =
            'No se pudo crear la empresa, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
          this.modalHandlerCompany({ isOpen: true, isLoading: false });
        });
    },
    deleteCompanyConfirmation() {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          title: '¿Seguro que desea mover a la papelera?',
          nameItem: 'Las empresas seleccionadas',
          text: 'serán movidas a la papelera',
        },
        infoDelete: {},
      });
    },
    deleteCompanies({ isOpen, isLoading, message, infoDelete }) {
      if (ability.can(BULK_DELETE, PERMISSIONS_ADMIN)) {
        this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
        this.$apollo
          .mutate({
            mutation: DELETE_COMPANIES,
            variables: {
              input: this.companiesSelected,
            },
            update: () => {
              // indicamos que se deve de actualizar la vista de contactos
              this.updateData = true;
              // cierra modal de eliminar
            },
          })
          // se ejecuta al finalizar la mutacion
          .finally(() => {
            // regresamos el valor a false para manejarlo de nuevo en el futuro
            this.updateData = false;
            this.companiesSelected = [];
            this.modalHandlerDelete({
              isOpen: false,
              isLoading,
              message,
              infoDelete,
            });
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'Se eliminó correctamente',
            });
          })
          .catch(() => {
            const error =
              'No se pudo eliminar las empresas, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    confirmHandler({ isOpen, isLoading, message, infoDelete }) {
      if (this.$route.query.recyclebin) {
        this.trashCompanies({ isOpen, isLoading, message, infoDelete });
      } else {
        this.deleteCompanies({ isOpen, isLoading, message, infoDelete });
      }
    },
    trashCompanyConfirmation() {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          nameItem: 'Las empresas seleccionadas',
          text: 'serán eliminadas permanentemente',
        },
        infoDelete: {},
      });
    },
    trashCompanies({ isOpen, isLoading, message, infoDelete }) {
      if (ability.can(BULK_DELETE, PERMISSIONS_ADMIN)) {
        this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
        this.$apollo
          .mutate({
            mutation: TRASH_COMPANIES,
            variables: {
              input: this.companiesSelected,
            },
            update: () => {
              // indicamos que se deve de actualizar la vista de contactos
              this.updateData = true;
              // cierra modal de eliminar
            },
          })
          // se ejecuta al finalizar la mutacion
          .finally(() => {
            // regresamos el valor a false para manejarlo de nuevo en el futuro
            this.updateData = false;
            this.companiesSelected = [];
            this.modalHandlerDelete({
              isOpen: false,
              isLoading,
              message,
              infoDelete,
            });
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'Se eliminó correctamente',
            });
          })
          .catch(() => {
            const error =
              'No se pudo eliminar las empresas, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    restoreCompaniesConfirmation() {
      this.modalHandlerRestore({
        isOpen: true,
        isLoading: false,
        message: {
          title: '¿Seguro que deseas restaurar?',
          nameItem: 'Las empresas seleccionadas',
          text: 'serán restauradas',
        },
        infoRestore: {},
      });
    },
    restoreCompanies({ isOpen, isLoading, message, infoRestore }) {
      if (ability.can(BULK_DELETE, PERMISSIONS_ADMIN)) {
        this.modalHandlerRestore({
          isOpen,
          isLoading,
          message,
          infoRestore,
        });
        this.$apollo
          .mutate({
            mutation: RESTORE_COMPANIES,
            variables: {
              input: this.companiesSelected,
            },
            update: () => {
              // indicamos que se deve de actualizar la vista de contactos
              this.updateData = true;
              // cierra modal de eliminar
            },
          })
          // se ejecuta al finalizar la mutacion
          .finally(() => {
            // regresamos el valor a false para manejarlo de nuevo en el futuro
            this.updateData = false;
            this.companiesSelected = [];
            this.modalHandlerRestore({
              isOpen: false,
              isLoading,
              message,
              infoRestore,
            });
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'Se restauró correctamente',
            });
          })
          .catch(() => {
            const error =
              'No se pudo restaurar las empresas, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    updateSelectCompanies(companies) {
      this.companiesSelected = companies.map(({ id }) => {
        return { id };
      });
    },
    updateCompaniesShow(companies) {
      this.companies = companies;
    },
    modalHandlerCompany({ isOpen, isLoading }) {
      this.modalCompany = { isOpen, isLoading };
    },
    async goToAllCompanies() {
      await this.$router.push({ name: 'companies' });
      this.updateData = true;
    },
  },
  apollo: {
    getForm: {
      query: GET_FORM,
      fetchPolicy: 'no-cache',
      variables: {
        type: 'COMPANY',
      },
    },
    headers: {
      query: GET_HEADERS,
      variables: {
        type: 'COMPANIES',
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .header-search } from ../../../scss/components/header.search';
@import '{ .text-list-menu  } from ../../../scss/views/companies';
@import '{ .footer-title, .footer-title-info, .footer-info  } from ../../../scss/components/footer.data.table';
</style>
