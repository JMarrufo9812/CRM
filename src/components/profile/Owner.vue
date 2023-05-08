<template>
  <v-menu
    v-model="isOpenMenuOwner"
    :close-on-content-click="false"
    :nudge-width="70"
    offset-y
    bottom
    left
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
          :disabled="validateSameValue"
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
import { dealsMixin } from '@/mixins/dealsMixin';
import { contactsMixin } from '@/mixins/contactsMixin';
import { companiesMixin } from '@/mixins/companiesMixin';

export default {
  name: 'Owner',
  mixins: [modalsAlertsMixin, dealsMixin, contactsMixin, companiesMixin],
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
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
  },
  watch: {
    isOpen(value) {
      if (value) {
        this.ownerId = this.item.owner ? this.item.owner.id : '';
      }
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
  computed: {
    validateSameValue() {
      return this.item.owner?.id === this.ownerId;
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
    findOwner(id) {
      const owner = this.ownersList.find((user) => user.id === id);
      return {
        __typename: 'UserEnterprise',
        id: owner.id,
        user: {
          __typename: 'User',
          id: owner.user.id,
          name: owner.user.name,
        },
      };
    },
    updateOwner() {
      this.isLoading = true;
      const idItem = this.item.id;
      const idUser = this.ownerId;
      const owner = this.findOwner(idUser);
      switch (this.typeItem) {
        case 'CONTACT':
          this.updateOwnerContact(idItem, idUser, owner);
          break;
        case 'COMPANY':
          this.updateOwnerCompany(idItem, idUser, owner);
          break;
        case 'DEAL':
          this.updateOwnerDeal(idItem, idUser, owner);
          break;
        default:
          this.updateOwnerContact(idItem, idUser, owner);
          break;
      }
    },
    updateOwnerCompany(idItem, idUser) {
      this.updateCompany({ id: idItem, owner: { id: idUser } });
    },
    updateOwnerContact(idItem, idUser) {
      this.updateContact({ id: idItem, owner: { id: idUser } });
    },
    updateOwnerDeal(idItem, idUser, owner) {
      this.updateDeal({ id: idItem, owner });
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
