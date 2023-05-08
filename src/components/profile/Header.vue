<template>
  <v-card :class="headerColor" tile flat height="5em" class="pt-2">
    <v-row>
      <v-col cols="2" class="d-flex align-center pl-10 ">
        <v-icon color="white" large>
          {{ getIcon() }}
        </v-icon>
        <v-skeleton-loader
          class="mx-auto"
          min-width="150px"
          type="list-item"
          tile
          v-if="isLoading"
        ></v-skeleton-loader>
        <template v-else>
          <span class="white--text text-truncate">
            {{ item.title }}
          </span>
          <span class="white--text text-truncate">
            {{ item.name }}
          </span>
          <b class="font-weight-bold" style="color: red;" v-if="item.isDelete">
            (Eliminado)
          </b>
        </template>
      </v-col>
      <v-col cols="5" class="d-flex align-center">
        <v-skeleton-loader
          type="chip"
          tile
          v-if="isLoading"
        ></v-skeleton-loader>
        <template v-else-if="listTags.length > 0" v-for="tag in listTags">
          <FieldTag :key="tag.id" :item="tag" class="mr-2"></FieldTag>
        </template>
        <template v-else>
          <FieldTag :item="defaultTag" class="mr-2"></FieldTag>
        </template>
        <TagMenu
          v-if="(canEdit || canEditOthers) && !item.isDelete"
          :item="item"
          :isLoading="isLoading"
          :type="typeItem"
          @updateItem="updateItem"
          @updateHistory="updateHistory"
        ></TagMenu>
      </v-col>
      <v-col cols="5" class="pr-10 pl-0">
        <div class="d-flex align-center justify-end">
          <div class="mr-10">
            <v-list
              :dark="isDealOpen"
              :color="isDealOpen ? 'primary' : 'white'"
              dense
              class="py-0"
            >
              <!-- Owner menu -->
              <v-list-item two-line class="owner-item">
                <v-icon class="mr-2">mdi-account</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-skeleton-loader
                      class="mx-auto"
                      type="chip"
                      tile
                      v-if="isLoading"
                    ></v-skeleton-loader>
                    <template v-else>
                      {{
                        item.owner ? item.owner.user.name : 'Sin propietario'
                      }}
                    </template>
                  </v-list-item-title>
                  <v-list-item-subtitle>Propietario</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="ml-0">
                  <Owner
                    v-if="!isLoading"
                    :isOpen.sync="isOpenMenuOwner"
                    :item="item"
                    :isLoading="isLoading"
                    :typeItem="typeItem"
                    @updateItem="updateItem"
                    @updateHistory="updateHistory"
                  >
                    <template #activator>
                      <v-btn
                        color="white"
                        v-show="canEditOwner && !item.isDelete"
                        icon
                        small
                        @click="isOpenMenuOwner = true"
                      >
                        <v-icon :color="isDealOpen ? 'white' : 'primary'">
                          mdi-chevron-down
                        </v-icon>
                      </v-btn>
                    </template>
                  </Owner>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </div>
          <div class="d-flex align-center">
            <!-- Boton de añadir trato -->
            <v-btn
              v-if="
                (typeItem === 'CONTACT' || typeItem === 'COMPANY') &&
                  (canEdit || canEditOthers) &&
                  !item.isDelete
              "
              color="success"
              @click="$emit('openModalDeal')"
            >
              Añadir trato
            </v-btn>
            <!-- Boton de trato ganado y perdido -->
            <div v-else>
              <v-chip v-if="item.status === 'WON'" label color="success">
                Trato Ganado
              </v-chip>
              <v-chip v-if="item.status === 'LOST'" label color="error">
                Trato Perdido
              </v-chip>
              <v-btn
                v-if="
                  item.status === 'OPEN' &&
                    (canEdit || canEditOthers) &&
                    !item.isDelete
                "
                color="success"
                class="mr-1"
                @click="changeStatus('WON')"
                :disabled="item.isDelete"
                :loading="isWonLoading"
              >
                Ganado
              </v-btn>
              <v-btn
                v-if="
                  item.status === 'OPEN' &&
                    (canEdit || canEditOthers) &&
                    !item.isDelete
                "
                color="error"
                @click="lostDeal"
                :disabled="item.isDelete"
                :loading="isLostLoading"
              >
                Perdido
              </v-btn>
              <v-btn
                v-if="
                  (item.status === 'WON' || item.status === 'LOST') &&
                    (canEdit || canEditOthers) &&
                    !item.isDelete
                "
                class="ml-2"
                color="secondary"
                @click="changeStatus('OPEN')"
                :disabled="item.isDelete"
                :loading="isLoadingUpdateDeal"
              >
                Abrir
              </v-btn>
            </div>
          </div>
          <!-- Acciones -->
          <div class="d-inline-block ml-3" v-if="canDelete || canDeleteOthers">
            <v-menu left bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="white" v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-if="!item.isDelete" @click="removeConfirm()">
                  <v-list-item-title>
                    Mover a pepelera
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="trashConfirm()" v-if="item.isDelete">
                  <v-list-item-title>
                    Eliminar permanentemente
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="restoreConfirm()" v-if="item.isDelete">
                  <v-list-item-title>
                    Restaurar
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </v-col>
      <ModalLostDeal
        :modalHandler="modalLostDeal"
        @close="modalHandlerLostDeal"
        @outData="changeStatus"
      />
      <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
      <BaseModalDelete
        :modalHandler="modalDelete"
        @cancel="modalHandlerDelete"
        @confirm="item.isDelete ? trash(modalDelete) : remove(modalDelete)"
      />
      <BaseModalRestore
        :modalHandler="modalRestore"
        @confirm="restore"
        @cancel="modalHandlerRestore"
      />
    </v-row>
  </v-card>
</template>

<script>
import { subject } from '@casl/ability';
import {
  PERMISSIONS_CONTACTS,
  PERMISSIONS_COMPANIES,
  PERMISSIONS_DEALS,
  PERMISSIONS_ADMIN,
} from '@/constants/permissions';
import {
  UPDATE,
  DELETE,
  DELETE_OTHERS,
  UPDATE_OTHERS,
  TO_ASSIGN,
} from '@/constants/methods';
import ability from '@/services/ability';
import { UTIL_ORDER } from '@/helpers/utils';
import TagMenu from '@/components/tags/TagMenu.vue';
import FieldTag from '@/components/tags/Tag.vue';
import Owner from '@/components/profile/Owner.vue';
import {
  DELETE_DEAL,
  TRASH_DEALS,
  RESTORE_DEALS,
} from '@/graphql/mutations/dealsMutations';
import {
  DELETE_CONTACTS,
  TRASH_CONTACTS,
  RESTORE_CONTACTS,
} from '@/graphql/mutations/contactsMutations';
import {
  DELETE_COMPANIES,
  TRASH_COMPANIES,
  RESTORE_COMPANIES,
} from '@/graphql/mutations/companiesMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { dealsMixin } from '@/mixins/dealsMixin';

export default {
  name: 'Header',
  components: {
    TagMenu,
    FieldTag,
    Owner,
    ModalLostDeal: () => import('@/components/deals/ModalLostDeal.vue'),
  },
  mixins: [modalsAlertsMixin, dealsMixin],
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    typeItem: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
    isLoading: {
      type: Boolean,
    },
  },
  data() {
    return {
      subject,
      DELETE,
      DELETE_OTHERS,
      UPDATE,
      UPDATE_OTHERS,
      TO_ASSIGN,
      PERMISSIONS_CONTACTS,
      PERMISSIONS_COMPANIES,
      PERMISSIONS_DEALS,
      PERMISSIONS_ADMIN,
      modalLostDeal: { isOpen: false, isLoading: false },
      isOpenMenuOwner: false,
      isWonLoading: false,
      isLostLoading: false,
      defaultTag: {
        id: '0',
        name: 'Ninguna etiqueta',
        color: 'gray',
        order: 0,
      },
    };
  },
  watch: {
    isLoadingUpdateDeal(value) {
      if (!value) {
        this.isWonLoading = false;
        this.isLostLoading = false;
      }
    },
  },
  computed: {
    isDealOpen() {
      if (this.typeItem === 'DEAL' && this.item.status !== 'OPEN') {
        return false;
      }
      return true;
    },
    canEditOwner() {
      return ability.can(TO_ASSIGN, PERMISSIONS_ADMIN);
    },
    canEdit() {
      if (this.typeItem === 'CONTACT') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_CONTACTS, {
            authorId: this?.item?.owner?.id || '',
          }),
        );
      }
      if (this.typeItem === 'COMPANY') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_COMPANIES, {
            authorId: this?.item?.owner?.id || '',
          }),
        );
      }
      if (this.typeItem === 'DEAL') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_DEALS, { authorId: this?.item?.owner?.id || '' }),
        );
      }
      return false;
    },
    canEditOthers() {
      if (this.typeItem === 'CONTACT') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_CONTACTS, {
                authorId: this?.item?.owner?.id || '',
              }),
            )
          );
        }
        return ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS);
      }
      if (this.typeItem === 'COMPANY') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_COMPANIES, {
                authorId: this?.item?.owner?.id || '',
              }),
            )
          );
        }
        return ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES);
      }
      if (this.typeItem === 'DEAL') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_DEALS, {
                authorId: this?.item?.owner?.id || '',
              }),
            )
          );
        }
        return ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS);
      }
      return false;
    },
    canDelete() {
      if (this.typeItem === 'CONTACT') {
        return ability.can(
          DELETE,
          subject(PERMISSIONS_CONTACTS, {
            authorId: this?.item?.owner?.id || '',
          }),
        );
      }
      if (this.typeItem === 'COMPANY') {
        return ability.can(
          DELETE,
          subject(PERMISSIONS_COMPANIES, {
            authorId: this?.item?.owner?.id || '',
          }),
        );
      }
      if (this.typeItem === 'DEAL') {
        return ability.can(
          DELETE,
          subject(PERMISSIONS_DEALS, { authorId: this?.item?.owner?.id || '' }),
        );
      }
      return false;
    },
    canDeleteOthers() {
      if (this.typeItem === 'CONTACT') {
        if (!this.canDelete) {
          return (
            ability.can(DELETE_OTHERS, PERMISSIONS_CONTACTS) &&
            !ability.can(
              DELETE_OTHERS,
              subject(PERMISSIONS_CONTACTS, {
                authorId: this?.item?.owner?.id || '',
              }),
            )
          );
        }
        return ability.can(DELETE_OTHERS, PERMISSIONS_CONTACTS);
      }
      if (this.typeItem === 'COMPANY') {
        if (!this.canDelete) {
          return (
            ability.can(DELETE_OTHERS, PERMISSIONS_COMPANIES) &&
            !ability.can(
              DELETE_OTHERS,
              subject(PERMISSIONS_COMPANIES, {
                authorId: this?.item?.owner?.id || '',
              }),
            )
          );
        }
        return ability.can(DELETE_OTHERS, PERMISSIONS_COMPANIES);
      }
      if (this.typeItem === 'DEAL') {
        if (!this.canDelete) {
          return (
            ability.can(DELETE_OTHERS, PERMISSIONS_DEALS) &&
            !ability.can(
              DELETE_OTHERS,
              subject(PERMISSIONS_DEALS, {
                authorId: this?.item?.owner?.id || '',
              }),
            )
          );
        }
        return ability.can(DELETE_OTHERS, PERMISSIONS_DEALS);
      }
      return false;
    },
    listTags() {
      if (this.item.tags) {
        return UTIL_ORDER({
          listItems: [...this.item.tags],
          orderBy: 'asc',
          nextElement: 'order',
        });
      }
      return [];
    },
    headerColor() {
      if (this.item.status === 'LOST') {
        return 'header-lost';
      }
      if (this.item.status === 'WON') {
        return 'header-won';
      }
      return 'header-normal';
    },
  },
  methods: {
    getIcon() {
      switch (this.typeItem) {
        case 'CONTACT':
          return 'mdi-account';
        case 'COMPANY':
          return 'mdi-office-building';
        case 'DEAL':
          return 'mdi-handshake';
        default:
          return '';
      }
    },
    restoreConfirm() {
      this.modalHandlerRestore({
        isOpen: true,
        isLoading: false,
        message: {
          title: '¿Seguro que deseas restaurar?',
          nameItem: `${
            this.typeItem === 'DEAL' ? this.item.title : this.item.name
          } `,
          text: 'será restaurado',
        },
        infoRestore: {},
      });
    },
    restore({ isOpen, message, infoRestore }) {
      this.modalHandlerRestore({
        isOpen,
        isLoading: true,
        message,
        infoRestore,
      });
      switch (this.typeItem) {
        case 'CONTACT':
          this.restoreContact();
          break;
        case 'COMPANY':
          this.restoreCompany();
          break;
        case 'DEAL':
          this.restoreDeal();
          break;
        default:
          // eslint-disable-next-line
          const error = 'No se ha podido encontrar la accion a realizar';
          // Error
          this.modalHandlerError({ isOpen: true, error });
          break;
      }
    },
    restoreContact() {
      if (ability.can(DELETE, PERMISSIONS_CONTACTS)) {
        this.$apollo
          .mutate({
            mutation: RESTORE_CONTACTS,
            variables: {
              input: [
                {
                  id: this.item.id,
                },
              ],
            },
          })
          // se ejecuta al finalizar la mutacion
          .finally(() => {
            this.modalHandlerRestore({
              isOpen: false,
              isLoading: false,
              message: {},
              infoRestore: {},
            });
            this.$router.push({ name: 'contacts' }, () => {});
          })
          .catch(() => {
            const error =
              'No se pudieron restaurar los contactos, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    restoreCompany() {
      if (ability.can(DELETE, PERMISSIONS_CONTACTS)) {
        this.$apollo
          .mutate({
            mutation: RESTORE_COMPANIES,
            variables: {
              input: [
                {
                  id: this.item.id,
                },
              ],
            },
          })
          // se ejecuta al finalizar la mutacion
          .finally(() => {
            this.modalHandlerRestore({
              isOpen: false,
              isLoading: false,
              message: {},
              infoRestore: {},
            });
            this.$router.push({ name: 'companies' }, () => {});
          })
          .catch(() => {
            const error =
              'No se pudieron restaurar los contactos, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    restoreDeal() {
      if (ability.can(DELETE, PERMISSIONS_CONTACTS)) {
        this.$apollo
          .mutate({
            mutation: RESTORE_DEALS,
            variables: {
              input: [
                {
                  id: this.item.id,
                },
              ],
            },
          })
          // se ejecuta al finalizar la mutacion
          .finally(() => {
            this.modalHandlerRestore({
              isOpen: false,
              isLoading: false,
              message: {},
              infoRestore: {},
            });
            this.$router.push({ name: 'deals' }, () => {});
          })
          .catch(() => {
            const error =
              'No se pudieron restaurar los contactos, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    removeConfirm() {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          title: '¿Seguro que deseas mover a la papelera?',
          nameItem: `${
            this.typeItem === 'DEAL' ? this.item.title : this.item.name
          } `,
          text: 'será movido a la papelera',
        },
        infoDelete: {},
      });
    },
    remove({ isOpen, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading: true, message, infoDelete });
      switch (this.typeItem) {
        case 'CONTACT':
          this.removeContact();
          break;
        case 'COMPANY':
          this.removeCompany();
          break;
        case 'DEAL':
          this.removeDeal();
          break;
        default:
          // eslint-disable-next-line
          const error = 'No se ha podido encontrar la accion a realizar';
          // Error
          this.modalHandlerError({ isOpen: true, error });
          break;
      }
    },
    removeContact() {
      if (this.canDelete || this.canDeleteOthers) {
        this.$apollo
          .mutate({
            // Query
            mutation: DELETE_CONTACTS,
            // Parameters
            variables: {
              input: [
                {
                  id: this.item.id,
                },
              ],
            },
          })
          .then(() => {
            // Close edit field
            this.modalHandlerDelete({
              isOpen: false,
              isLoading: false,
              message: {},
              infoDelete: {},
            });
            this.$router.push({ name: 'contacts' }, () => {});
          })
          .catch(() => {
            const error =
              'No se ha podido eliminar el contacto intente de nuevo o contacte al soporte';
            // Error
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    removeCompany() {
      if (this.canDelete || this.canDeleteOthers) {
        this.$apollo
          .mutate({
            // Query
            mutation: DELETE_COMPANIES,
            // Parameters
            variables: {
              input: [{ id: this.item.id }],
            },
          })
          .then(() => {
            // Close edit field
            this.modalHandlerDelete({
              isOpen: false,
              isLoading: false,
              message: {},
              infoDelete: {},
            });
            this.$router.push({ name: 'companies' }, () => {});
          })
          .catch(() => {
            const error =
              'No se ha podido eliminar la empresa intente de nuevo o contacte al soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    removeDeal() {
      if (this.canDelete || this.canDeleteOthers) {
        this.$apollo
          .mutate({
            // Query
            mutation: DELETE_DEAL,
            // Parameters
            variables: {
              input: [{ id: this.item.id }],
            },
          })
          .then(() => {
            this.$router.push({ name: 'pipeline' }, () => {});
            // Close edit field
            this.modalHandlerDelete({
              isOpen: false,
              isLoading: false,
              message: {},
              infoDelete: {},
            });
          })
          .catch(() => {
            const error =
              'No se ha podido eliminar el trato intente de nuevo o contacte al soporte';
            // Error
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    trashConfirm() {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          title: '¿Seguro que deseas eliminar?',
          nameItem: `${
            this.typeItem === 'DEAL' ? this.item.title : this.item.name
          } `,
          text: 'será eliminado permanentemente y no se podrá recuperar',
        },
        infoDelete: {},
      });
    },
    trash({ isOpen, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading: true, message, infoDelete });
      switch (this.typeItem) {
        case 'CONTACT':
          this.trashContact();
          break;
        case 'COMPANY':
          this.trashCompany();
          break;
        case 'DEAL':
          this.trasheDeal();
          break;
        default:
          // eslint-disable-next-line
          const error = 'No se ha podido encontrar la accion a realizar';
          // Error
          this.modalHandlerError({ isOpen: true, error });
          break;
      }
    },
    trashContact() {
      if (this.canDelete || this.canDeleteOthers) {
        this.$apollo
          .mutate({
            // Query
            mutation: TRASH_CONTACTS,
            // Parameters
            variables: {
              input: [
                {
                  id: this.item.id,
                },
              ],
            },
          })
          .then(() => {
            // Close edit field
            this.modalHandlerDelete({
              isOpen: false,
              isLoading: false,
              message: {},
              infoDelete: {},
            });
            this.$router.push({ name: 'contacts' }, () => {});
          })
          .catch(() => {
            const error =
              'No se ha podido eliminar el contacto intente de nuevo o contacte al soporte';
            // Error
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    trashCompany() {
      if (this.canDelete || this.canDeleteOthers) {
        this.$apollo
          .mutate({
            // Query
            mutation: TRASH_COMPANIES,
            // Parameters
            variables: {
              input: [{ id: this.item.id }],
            },
          })
          .then(() => {
            // Close edit field
            this.modalHandlerDelete({
              isOpen: false,
              isLoading: false,
              message: {},
              infoDelete: {},
            });
            this.$router.push({ name: 'companies' }, () => {});
          })
          .catch(() => {
            const error =
              'No se ha podido eliminar la empresa intente de nuevo o contacte al soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    trashDeal() {
      if (this.canDelete || this.canDeleteOthers) {
        this.$apollo
          .mutate({
            // Query
            mutation: TRASH_DEALS,
            // Parameters
            variables: {
              input: [{ id: this.item.id }],
            },
          })
          .then(() => {
            this.$router.push({ name: 'pipeline' }, () => {});
            // Close edit field
            this.modalHandlerDelete({
              isOpen: false,
              isLoading: false,
              message: {},
              infoDelete: {},
            });
          })
          .catch(() => {
            const error =
              'No se ha podido eliminar el trato intente de nuevo o contacte al soporte';
            // Error
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    modalHandlerLostDeal({ isOpen, isLoading }) {
      this.modalLostDeal = { isOpen, isLoading };
    },
    lostDeal() {
      this.modalHandlerLostDeal({ isOpen: true, isLoading: false });
    },
    updateItem(itemUpdated) {
      this.$emit('updateItem', itemUpdated);
    },
    updateHistory() {
      this.$emit('updateHistory');
    },
    changeStatus(status, infoLostDeal) {
      if (this.canEdit || this.canEditOthers) {
        if (status === 'LOST') {
          this.isLostLoading = true;
          const { lostReason, comments } = infoLostDeal;
          this.modalHandlerLostDeal({ isOpen: true, isLoading: true });
          this.updateDeal({ id: this.item.id, status, comments, lostReason });
        } else {
          this.isWonLoading = true;
          this.updateDeal({ id: this.item.id, status });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .header-normal, .header-won, .header-lost .owner-item } from ../../../../scss/components/header';
</style>
