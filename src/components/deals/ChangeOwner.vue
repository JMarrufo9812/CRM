<template>
  <v-menu
    v-model="isOpenMenuOwner"
    :close-on-content-click="false"
    :nudge-width="70"
    offset-y
    right
    bottom
    @input="close"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind="attrs" v-on="on"></slot>
    </template>
    <v-card tile>
      <v-card-title class="py-1 title-menu">
        Transferir propiedad
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-autocomplete
          v-model="ownerId"
          :items="ownersList"
          :loading="isLoading"
          :item-text="({ user }) => `${user.name} ${user.lastName}`"
          item-value="id"
          label="Propietario"
          outlined
          dense
          hide-details="auto"
          no-data-text="No se encuentran usuarios"
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined small @click="close" class="mr-3">
          Cancelar
        </v-btn>
        <v-btn
          :loading="isLoading"
          color="secondary"
          small
          @click="updateOwner"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-menu>
</template>

<script>
import { USERS_LIST } from '@/graphql/querys/usersQuery';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { UPDATE_OWNER_DEALS } from '@/graphql/mutations/dealsMutations';
import { UPDATE_OWNER_CONTACTS } from '@/graphql/mutations/contactsMutations';
import { UPDATE_OWNER_COMPANIES } from '@/graphql/mutations/companiesMutations';
import { snackbarMixin } from '@/mixins/alerts/snackbarMixin';

export default {
  name: 'ChangeOwner',
  mixins: [modalsAlertsMixin, snackbarMixin],
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    typeItem: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
    itemsSelected: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    isOpen() {
      this.isOpenMenuOwner = this.isOpen;
    },
    isLoadingUpdateDeal(value) {
      if (!value) {
        this.isLoading = false;
        this.close();
      }
    },
    isLoadingUpdateContact(value) {
      if (!value) {
        this.isLoading = false;
        this.close();
      }
    },
    isLoadingUpdateCompany(value) {
      if (!value) {
        this.isLoading = false;
        this.close();
      }
    },
  },
  data() {
    return {
      ownerId: '',
      ownersList: [],
      isOpenMenuOwner: false,
      isLoading: false,
    };
  },
  methods: {
    close() {
      this.$emit('update:isOpen', false);
    },
    updateOwner() {
      this.isLoading = true;
      const listItems = this.itemsSelected;
      const idUser = this.ownerId;
      switch (this.typeItem) {
        case 'CONTACT':
          this.updateOwnerContact(listItems, idUser);
          break;
        case 'COMPANY':
          this.updateOwnerCompany(listItems, idUser);
          break;
        case 'DEAL':
          this.updateOwnerDeal(listItems, idUser);
          break;
        default:
          this.updateOwnerContact(listItems, idUser);
          break;
      }
    },
    updateOwnerCompany(listItems, idUser) {
      this.$apollo
        .mutate({
          // Query
          mutation: UPDATE_OWNER_COMPANIES,
          // Parameters
          variables: {
            companyListAssign: {
              ownerId: idUser,
              companies: listItems,
            },
          },
        })
        .then(({ data: { assignCompanies } }) => {
          // Result
          if (assignCompanies) {
            this.isLoading = false;
            this.close();
            this.$emit(
              'success',
              'Se inició el cambio de propietario, te avisaremos cuando esté listo',
            );
          }
        })
        .catch(() => {
          // Error
          this.isLoading = false;
          // Error
          this.$emit(
            'error',
            'No se pudo cambiar el propietario, intente de nuevo o contacte a soporte',
          );
        });
    },
    updateOwnerContact(listItems, idUser) {
      this.$apollo
        .mutate({
          // Query
          mutation: UPDATE_OWNER_CONTACTS,
          // Parameters
          variables: {
            contactListAssign: {
              ownerId: idUser,
              contacts: listItems,
            },
          },
        })
        .then(({ data: { assignContacts } }) => {
          // Result
          if (assignContacts) {
            this.isLoading = false;
            this.close();
            this.$emit(
              'success',
              'Se inició el cambio de propietario, te avisaremos cuando esté listo.',
            );
          }
        })
        .catch(() => {
          // Error
          this.isLoading = false;
          // Error
          this.$emit(
            'error',
            'No se pudo cambiar el propietario, intente de nuevo o contacte a soporte',
          );
        });
    },
    updateOwnerDeal(listItems, idUser) {
      this.$apollo
        .mutate({
          // Query
          mutation: UPDATE_OWNER_DEALS,
          // Parameters
          variables: {
            dealListAssign: {
              ownerId: idUser,
              deals: listItems,
            },
          },
        })
        .then(({ data: { assignDeals } }) => {
          // Result
          if (assignDeals) {
            this.isLoading = false;
            this.close();
            this.$emit(
              'success',
              'Se inició el cambio de propietario, te avisaremos cuando esté listo.',
            );
          }
        })
        .catch(() => {
          // Error
          this.isLoading = false;
          // Error
          this.$emit(
            'error',
            'No se pudo cambiar el propietario, intente de nuevo o contacte a soporte',
          );
        });
    },
  },
  apollo: {
    ownersList: {
      query: USERS_LIST,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .title-menu } from ../../../../scss/components/menu.owner';
</style>
