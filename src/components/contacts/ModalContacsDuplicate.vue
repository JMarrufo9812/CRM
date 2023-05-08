<template>
  <v-row>
    <v-dialog v-model="modalHandler.isOpen" width="850" scrollable persistent>
      <v-card>
        <v-card-title class="d-flex justify-space-between primary white--text">
          <span>
            Contactos duplicados
          </span>
          <v-icon @click="close" class="white--text" left>
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card class="mx-12 my-4" flat>
          <div class="pb-2">
            <span class="font-weight-bold">
              Nota:
            </span>
            Se consideran contactos duplicados cuando uno o más contactos
            cuentan con
            <span class="font-weight-bold secondary--text">
              el mismo nombre, el mismo correo y la misma empresa
            </span>
          </div>
          <v-divider></v-divider>
          <div
            class="pt-4"
            v-if="contacts.length >= 1 && !modalHandler.isLoading"
          >
            <span>
              A continuación
              <span class="font-weight-bold">
                selecciona
              </span>
              el contacto
              <span class="font-weight-bold secondary--text">principal</span>
              el cual será el que se conservara y los demás serán eliminados:
            </span>
          </div>
        </v-card>
        <v-card-text class="text-center" v-if="modalHandler.isLoading">
          <v-sheet color="white" height="400" width="800" class="ml-7">
            <v-progress-circular
              style="margin-top:25%"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-sheet>
        </v-card-text>
        <v-card-text
          v-if="contacts.length === 0 && !modalHandler.isLoading"
          class="pt-10"
        >
          <v-card
            height="300"
            flat
            class="d-flex justify-center align-center text-no-duplicate"
          >
            <v-icon large color="success" class="mr-2">
              mdi-check-circle-outline
            </v-icon>
            No existen contactos duplicados
          </v-card>
        </v-card-text>
        <v-card-text
          v-if="contacts.length >= 1 && !modalHandler.isLoading"
          class="px-12 pt-4"
        >
          <v-card
            outlined
            v-for="(groupContact, index) in contacts"
            :key="index"
            class="mb-4 group-contact"
            hover
          >
            <v-card-title class="py-2 primary white--text">
              {{ groupContact.list[0].name }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-list
                v-for="(contact, index) in groupContact.list"
                :key="index"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small class="mr-2 mb-1">mdi-account</v-icon>
                      <span>{{ contact.name }}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle class="pt-2">
                      <span v-if="contact.email">{{ contact.email }}</span>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="py-2">
                      Propietario actual:
                      <span class="font-weight-bold">
                        {{ contact.owner.user.name }}
                        {{ contact.owner.user.lastName }}
                      </span>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <!-- companies -->
                      <span
                        v-if="contact.companies.length === 1"
                        class="cursorStyle font-weight-bold"
                      >
                        <v-icon x-small class="mb-1">
                          mdi-domain
                        </v-icon>
                        {{ contact.companies[0].name }}
                      </span>
                      <v-menu allow-overflow>
                        <template v-slot:activator="{ on: menu, attrs }">
                          <v-tooltip top color="white">
                            <template v-slot:activator="{ on: tooltip }">
                              <v-chip
                                outlined
                                v-show="contact.companies.length > 1"
                                v-bind="attrs"
                                v-on="{ ...tooltip, ...menu }"
                                small
                              >
                                <v-icon x-small class="mr-1">
                                  mdi-domain
                                </v-icon>
                                + {{ contact.companies.length }}
                              </v-chip>
                            </template>
                            <span class="black--text">
                              Este contacto cuenta con más de una empresa has
                              click para ver
                            </span>
                          </v-tooltip>
                        </template>
                        <v-list>
                          <v-list-item
                            v-for="(company, index) in contact.companies"
                            :key="index"
                            dense
                          >
                            <v-icon class="mr-2" x-small>mdi-domain</v-icon>
                            <span>
                              {{ company.name }}
                            </span>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      <!-- phones -->
                      <span
                        v-if="contact.phones.length === 1"
                        class="cursorStyle font-weight-bold"
                      >
                        <v-icon x-small class="ml-4 mb-1">
                          mdi-phone
                        </v-icon>
                        {{ contact.phones[0].number }}
                      </span>
                      <v-menu allow-overflow>
                        <template v-slot:activator="{ on: menu, attrs }">
                          <v-tooltip top color="white">
                            <template v-slot:activator="{ on: tooltip }">
                              <v-chip
                                outlined
                                class="ml-4"
                                v-show="contact.phones.length > 1"
                                v-bind="attrs"
                                v-on="{ ...tooltip, ...menu }"
                                small
                              >
                                <v-icon x-small class="mr-1">
                                  mdi-phone
                                </v-icon>
                                + {{ contact.phones.length }}
                              </v-chip>
                            </template>
                            <span class="black--text">
                              Este contacto cuenta con más de un telefono has
                              click para ver
                            </span>
                          </v-tooltip>
                        </template>
                        <v-list>
                          <v-list-item
                            v-for="(phone, index) in contact.phones"
                            :key="index"
                            dense
                          >
                            <v-icon class="mr-2" x-small>mdi-phone</v-icon>
                            <span>
                              {{ phone.number }}
                            </span>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      <v-tooltip top color="white">
                        <template v-slot:activator="{ on: tooltip }">
                          <v-chip outlined class="ml-4" small v-on="tooltip">
                            <v-icon x-small class="mr-1">
                              mdi-handshake
                            </v-icon>
                            {{ contact.counts ? contact.counts.openDeals : 0 }}
                          </v-chip>
                        </template>
                        <span class="black--text">
                          Tratos
                        </span>
                      </v-tooltip>
                      <v-tooltip top color="white">
                        <template v-slot:activator="{ on: tooltip }">
                          <v-chip outlined class="ml-4" small v-on="tooltip">
                            <v-icon x-small class="mr-1">
                              mdi-calendar
                            </v-icon>
                            {{
                              contact.counts
                                ? contact.counts.totalActivities
                                : 0
                            }}
                          </v-chip>
                        </template>
                        <span class="black--text">
                          Actividades
                        </span>
                      </v-tooltip>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="py-2">
                      <span class="mb-2">
                        creado el {{ contact.createdAt | timeZone('LL') }}
                        por
                      </span>
                      <span class="font-weight-bold secondary--text">
                        {{ contact.createdBy.user.name }}
                        {{ contact.createdBy.user.lastName }}
                      </span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="action">
                    <v-radio-group v-model="keepContact.id">
                      <v-radio label="Principal" :value="contact.id"></v-radio>
                    </v-radio-group>
                  </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
              </v-list>
            </v-card-text>
            <v-card-actions class="pa-5 justify-end">
              <v-btn
                :disabled="checkSelectContact(groupContact.list)"
                tile
                color="secondary"
                @click="formatContacts(groupContact.list)"
                :loading="isFuseLoading"
              >
                Fusionar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
        <v-card-actions class="pa-5 justify-end">
          <v-btn
            class="mr-8"
            large
            tile
            outlined
            color="primary"
            @click="close"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-row>
</template>

<script>
import { FUSE_CONTACTS } from '@/graphql/mutations/contactsMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  mixins: [modalsAlertsMixin],
  props: {
    contacts: {
      required: false,
      type: [Array, Object],
    },
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
      isFuseLoading: false,
      keepContact: { id: '' },
    };
  },
  methods: {
    checkSelectContact(groupContacs) {
      const checkExist = groupContacs.some(
        (contact) => contact.id === this.keepContact.id,
      );
      return !checkExist;
    },
    formatContacts(contacts) {
      const deleteContacts = contacts
        .filter((contact) => contact.id !== this.keepContact.id)
        .map(({ id }) => {
          return { id };
        });
      this.fuseContacts(this.keepContact, deleteContacts);
    },
    fuseContacts(keep, deleteContacts) {
      this.isFuseLoading = true;
      this.$apollo
        .mutate({
          mutation: FUSE_CONTACTS,
          variables: {
            input: {
              keep,
              delete: deleteContacts,
            },
          },
        })
        .then(({ data: { fuseContacts } }) => {
          this.isFuseLoading = false;
          this.$emit('correctDuplicate', 'CONTACT', fuseContacts);
        })
        .catch(() => {
          this.isFuseLoading = false;
          const error =
            'No se ha podido fusionar el contacto, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    close() {
      this.$emit('close', { isOpen: false, isLoading: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .action .group-contact .text-no-duplicate } from ../../../../scss/components/modal.contacts.duplicate';
</style>
