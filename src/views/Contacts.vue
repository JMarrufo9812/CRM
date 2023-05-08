<template>
  <v-container fluid style="height: 100%">
    <v-row>
      <!-- title -->
      <v-col cols="8" class="header-search">
        <p class="ml-6 my-4">
          {{ title }}
        </p>
      </v-col>
      <!-- search input -->
      <v-col cols="4" class="header-search">
        <v-text-field
          v-if="!$route.query.filterId && !$route.query.recyclebin"
          v-model="searchContact"
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
        <ContactsDataTable
          :headers="formatHeaders"
          :updateData="updateData"
          :searchContact="searchContact"
          @endUpdateData="updateData = false"
          @selectContacts="updateSelectContacts"
          @changeHeaderOrder="updateHeaders"
          @contacts="updateContactsShow"
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
                    v-if="$can(FUSE, PERMISSIONS_CONTACTS)"
                    @click="getDuplicateContacts"
                  >
                    <v-icon class="mr-2">mdi-account-switch-outline</v-icon>
                    Buscar duplicados
                  </v-list-item>
                  <v-list-item
                    class="text-list-menu"
                    v-if="$can(EXPORT, PERMISSIONS_CONTACTS)"
                    @click="modalHandlerExport({ isOpen: true })"
                  >
                    <v-icon left>
                      mdi-clipboard-arrow-up-outline
                    </v-icon>
                    Exportar contactos
                  </v-list-item>
                  <v-list-item
                    class="text-list-menu"
                    @click="
                      $router.push({
                        path: '/contacts',
                        query: { recyclebin: true },
                      })
                    "
                  >
                    <v-icon class="mr-2">
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
                    v-show="contactsSelected.length >= 1"
                    @click="
                      $route.query.recyclebin
                        ? trashContactConfirmation()
                        : deleteContactConfirmation()
                    "
                    class="mr-2 white--text"
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
                      : 'Mover a pepelera'
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
                    v-show="contactsSelected.length >= 1"
                    @click="restoreContactsConfirmation"
                    class="mr-2 white--text"
                    color="success"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-restore</v-icon>
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
                :itemsSelected="contactsSelected"
                @success="changeOwnerSuccess"
                @error="changeOwnerError"
              >
                <template #activator>
                  <v-tooltip bottom v-if="$can(TO_ASSIGN, PERMISSIONS_ADMIN)">
                    <template
                      v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }"
                    >
                      <v-btn
                        v-show="contactsSelected.length >= 1"
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
              <!-- Boton de agregar -->
              <v-menu
                v-if="!$route.query.filterId && !$route.query.recyclebin"
                offset-y
                left
                ransition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    small
                    color="secondary"
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
                      modalHandlerContact({ isOpen: true, isLoading: false })
                    "
                  >
                    <v-icon color="primary" left>mdi-account-plus</v-icon>
                    Nuevo Contacto
                  </v-list-item>
                  <v-list-item
                    class="text-list-menu"
                    v-if="$can(IMPORT, PERMISSIONS_CONTACTS)"
                    @click="modalHandlerImport({ isOpen: true })"
                  >
                    <v-icon color="primary" left>
                      mdi-clipboard-arrow-down-outline
                    </v-icon>
                    Importar Contactos
                  </v-list-item>
                </v-list>
              </v-menu>
              <!-- Boton ver todos -->
              <v-btn
                v-if="$route.query.filterId || $route.query.recyclebin"
                @click="goToAllContacts"
                class="mr-2"
                outlined
              >
                ver todos los contactos
              </v-btn>
            </v-col>
          </template>
        </ContactsDataTable>
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
          <p class="footer-info">{{ informationBar.contactsWithOpenDeals }}</p>
        </div>
        <div class="d-inline-flex mr-12">
          <p class="footer-title-info mr-4">Con tratos ganados</p>
          <p class="footer-info">{{ informationBar.contactsWithWonDeals }}</p>
        </div>
      </v-col>
    </v-row>
    <!-- modals -->
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="confirmHandler"
    />
    <BaseModalRestore
      :modalHandler="modalRestore"
      @confirm="restoreContacts"
      @cancel="modalHandlerRestore"
    />
    <ModalContact
      :modalHandler="modalContact"
      :inputs="inputsForm"
      @close="modalHandlerContact"
      @outData="createContact"
    />
    <ModalFilter
      :modalHandler="modalFilter"
      :type="viewInfo"
      @outData="outDataFilterHandler"
      @close="modalHandlerFilter"
    />
    <ModalContactsDuplicate
      :modalHandler="modalMergeDuplicates"
      :contacts="duplicateList"
      @correctDuplicate="correctDuplicate"
      @close="modalHandlerMergeDuplicates"
    />
    <ModalExportData
      :typeItems="viewInfo"
      :items="contacts"
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
  PERMISSIONS_CONTACTS,
  PERMISSIONS_ADMIN,
} from '@/constants/permissions';
import {
  CREATE,
  IMPORT,
  EXPORT,
  DELETE,
  BULK_DELETE,
  TO_ASSIGN,
  FUSE,
} from '@/constants/methods';
// helpers
import { UTIL_ORDER } from '@/helpers/utils';
// graphql
import {
  CREATE_CONTACT,
  DELETE_CONTACTS,
  TRASH_CONTACTS,
  RESTORE_CONTACTS,
} from '@/graphql/mutations/contactsMutations';
import { GET_FORM } from '@/graphql/querys/formsQuery';
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
  name: 'Contacts',
  mixins: [
    filtersMixin,
    modalsAlertsMixin,
    snackbarMixin,
    mergeDuplicatesMixin,
    headersMixin,
    exportsMixin,
    importMixin,
  ],
  components: {
    ContactsDataTable: () =>
      import('@/components/contacts/ContactsDataTable.vue'),
    ModalContact: () => import('@/components/contacts/ModalContact.vue'),
    ModalFilter: () => import('@/components/filters/ModalFilter.vue'),
    MenuFilters: () => import('@/components/filters/MenuFilters.vue'),
    ModalContactsDuplicate: () =>
      import('@/components/contacts/ModalContacsDuplicate.vue'),
    ListHeaders: () => import('@/components/headers/ListHeaders.vue'),
    ChangeOwner,
  },
  data() {
    return {
      typeItem: 'CONTACT',
      isOpenMenuOwner: false,
      isLoading: false,
      viewInfo: { type: 'CONTACT', name: 'Contactos' },
      PERMISSIONS_CONTACTS,
      PERMISSIONS_ADMIN,
      CREATE,
      IMPORT,
      EXPORT,
      DELETE,
      BULK_DELETE,
      TO_ASSIGN,
      FUSE,
      inputsForm: [],
      updateData: false,
      contacts: [],
      informationBar: {},
      contactsSelected: [],
      modalContact: {
        isOpen: false,
        isLoading: false,
      },
      headers: [],
      searchContact: '',
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
        return 'Contactos importados';
      }
      if (this.$route.query.recyclebin) {
        return 'Papelera de contactos';
      }
      return 'Todos los contactos';
    },
  },
  methods: {
    changeOwnerSuccess(message) {
      this.snackbarHandler({ isOpen: true, color: 'success', text: message });
      this.contactsSelected = [];
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
    modalHandlerContact({ isOpen, isLoading }) {
      this.modalContact = { isOpen, isLoading };
    },
    createContact(input) {
      this.modalHandlerContact({ isOpen: true, isLoading: true });
      this.$apollo
        .mutate({
          mutation: CREATE_CONTACT,
          variables: {
            input,
          },
          update: () => {
            // indicamos que se deve de actualizar la vista de contactos
            this.updateData = true;
            this.modalHandlerContact({ isOpen: false, isLoading: false });
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'El contacto se creó correctamente',
            });
          },
        })
        // se ejecuta al finalizar la mutacion
        .finally(() => {
          // regresamos el valor a false para manejarlo de nuevo en el futuro
          this.updateData = false;
        })
        .catch(() => {
          const error =
            'No se pudo crear el contacto, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
          this.modalHandlerContact({ isOpen: true, isLoading: false });
        });
    },
    updateSelectContacts(contacts) {
      this.contactsSelected = contacts.map(({ id }) => {
        return { id };
      });
    },
    updateContactsShow(contacts) {
      this.contacts = contacts;
    },
    deleteContactConfirmation() {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          title: '¿Seguro que deseas mover a la papelera?',
          nameItem: 'Los contactos seleccionados',
          text: 'serán movidos a la papelera',
        },
        infoDelete: {},
      });
    },
    deleteContacts({ isOpen, isLoading, message, infoDelete }) {
      if (ability.can(BULK_DELETE, PERMISSIONS_ADMIN)) {
        this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
        this.$apollo
          .mutate({
            mutation: DELETE_CONTACTS,
            variables: {
              input: this.contactsSelected,
            },
          })
          .then(() => {
            // indicamos que se deve de actualizar la vista de contactos
            this.updateData = true;
          })
          // se ejecuta al finalizar la mutacion
          .finally(() => {
            // regresamos el valor a false para manejarlo de nuevo en el futuro
            this.updateData = false;
            this.contactsSelected = [];
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
              'No se pudieron eliminar los contactos, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    confirmHandler({ isOpen, isLoading, message, infoDelete }) {
      if (this.$route.query.recyclebin) {
        this.trashContacts({ isOpen, isLoading, message, infoDelete });
      } else {
        this.deleteContacts({ isOpen, isLoading, message, infoDelete });
      }
    },
    trashContactConfirmation() {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          nameItem: 'Los contactos seleccionados',
          text: 'serán eliminados permanentemente',
        },
        infoDelete: {},
      });
    },
    trashContacts({ isOpen, isLoading, message, infoDelete }) {
      if (ability.can(BULK_DELETE, PERMISSIONS_ADMIN)) {
        this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
        this.$apollo
          .mutate({
            mutation: TRASH_CONTACTS,
            variables: {
              input: this.contactsSelected,
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
            this.contactsSelected = [];
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
              'No se pudieron eliminar los contactos, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    restoreContactsConfirmation() {
      this.modalHandlerRestore({
        isOpen: true,
        isLoading: false,
        message: {
          title: '¿Seguro que deseas restaurar?',
          nameItem: 'Los contactos seleccionados',
          text: 'serán restaurados',
        },
        infoRestore: {},
      });
    },
    restoreContacts({ isOpen, isLoading, message, infoRestore }) {
      if (ability.can(BULK_DELETE, PERMISSIONS_ADMIN)) {
        this.modalHandlerRestore({
          isOpen,
          isLoading,
          message,
          infoRestore,
        });
        this.$apollo
          .mutate({
            mutation: RESTORE_CONTACTS,
            variables: {
              input: this.contactsSelected,
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
            this.contactsSelected = [];
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
              'No se pudieron restaurar los contactos, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    async goToAllContacts() {
      await this.$router.push({ name: 'contacts' });
      this.updateData = true;
    },
  },
  apollo: {
    getForm: {
      query: GET_FORM,
      fetchPolicy: 'no-cache',
      variables: {
        type: 'CONTACT',
      },
    },
    headers: {
      query: GET_HEADERS,
      variables: {
        type: 'CONTACTS',
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .header-search } from ../../../scss/components/header.search';
@import '{ .text-list-menu  } from ../../../scss/views/contacts';
@import '{ .footer-title, .footer-title-info, .footer-info } from ../../../scss/components/footer.data.table';
</style>
