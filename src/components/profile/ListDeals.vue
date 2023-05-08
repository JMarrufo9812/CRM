<template>
  <v-card tile flat>
    <v-divider />
    <v-card-title class="deals-title py-1">
      <v-icon class="mr-4">mdi-handshake</v-icon>
      Tratos
      <v-spacer></v-spacer>
      <v-menu
        v-model="isOpenMenuAddDeal"
        left
        bottom
        offset-y
        :close-on-content-click="false"
        :close-on-click="true"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            v-show="(canEdit || canEditOthers) && !item.isDelete"
            icon
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-list dense v-if="(canEdit || canEditOthers) && !item.isDelete">
          <v-list-item @click="$emit('openModalDeal')">
            <v-list-item-title>
              Nuevo
            </v-list-item-title>
          </v-list-item>
          <v-menu
            v-model="isShowAddDeal"
            :close-on-content-click="false"
            :close-on-click="true"
          >
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on">
                <v-list-item-title>
                  Existente
                </v-list-item-title>
              </v-list-item>
            </template>
            <v-card class="pa-4" width="18em">
              <v-alert
                v-if="warningDealExistInfo.show"
                dense
                border="left"
                type="warning"
              >
                <p style="font-size:.75em" class="mb-0">
                  {{ warningDealExistInfo.text }}
                </p>
              </v-alert>
              <v-form ref="formDeal">
                <FieldSelectDealSimple
                  :inputProps="{ class: 'no-icon', isDense: true }"
                  :resetHandler="isShowAddDeal"
                  @outData="verificationDeal"
                  @deleteDeal="deleteDealSelected"
                />
              </v-form>
              <div class="d-flex justify-center pt-2 ml-2">
                <v-btn
                  @click="isShowAddDeal = false"
                  style="width:45%"
                  class="mr-2"
                  outlined
                  color="primary"
                  small
                >
                  Cancelar
                </v-btn>
                <v-btn
                  :disabled="disabledAddButton"
                  @click="addExistingDeal"
                  :loading="isLoadingAddDeal"
                  style="width:45%"
                  color="secondary"
                  small
                >
                  Guardar
                </v-btn>
              </div>
            </v-card>
          </v-menu>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-card flat max-height="20em" class="deals-container">
        <div
          class="d-flex align-center justify-center"
          style="height:100%;"
          v-if="deals === null || !deals.length"
        >
          <span class="d-block text-center pa-10">No hay tratos</span>
        </div>
        <template v-else-if="listDealsOpen.length && !isLoading">
          <v-subheader>Abiertos</v-subheader>
          <v-card
            v-for="(deal, index) in listDealsOpen"
            :key="`${index}-${deal.id}`"
            class="ma-4 deal__card"
            @click="goDeal(deal.id)"
          >
            <v-card-title
              class="d-flex justify-space-between deals-title pt-1 pb-0"
            >
              <div class="text-truncate" style="width: 85%">
                {{ deal.title }}
              </div>
              <div
                style="width: 15%"
                v-if="(canEdit || canEditOthers) && !item.isDelete"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      x-small
                      class="mr-2"
                      @click.stop="disconnectDeal(deal.id)"
                      v-bind="attrs"
                      v-on="on"
                      :loading="isLoadingRemove"
                      color="grey"
                      outlined
                    >
                      <v-icon small>mdi-connection</v-icon>
                    </v-btn>
                  </template>
                  <span>Desvincular</span>
                </v-tooltip>
              </div>
            </v-card-title>
            <v-card-text class="d-flex justify-space-between">
              <div class="text-truncate" style="width:70%">
                <v-icon>
                  {{
                    typeItem === 'CONTACT'
                      ? 'mdi-office-building'
                      : 'mdi-account'
                  }}
                </v-icon>
                <span v-if="typeItem === 'COMPANY'" class="black--text">
                  {{ deal.contact ? deal.contact.name : 'Sin contacto' }}
                </span>
                <span v-else class="black--text ">
                  {{ deal.company ? deal.company.name : 'Sin empresa' }}
                </span>
              </div>
              <div class="text-truncate" style="width:30%">
                <span class="black--text  d-block">
                  {{ deal.value | formatPrice }}
                </span>
              </div>
            </v-card-text>
            <v-progress-linear
              background-color="secondary"
              color="success"
              :value="getPercentage(deal.stage.id, deal.pipeline.stages)"
              height="5"
            ></v-progress-linear>
          </v-card>
        </template>
        <template v-if="listDealsClosed.length && !isLoading">
          <v-subheader>Cerrados</v-subheader>
          <v-card
            v-for="(deal, index) in listDealsClosed"
            :key="`${index}-${deal.id}-closed`"
            @click="goDeal(deal.id)"
            class="ma-4 deal__card"
          >
            <v-card-title
              class="d-flex justify-space-between deals-title pt-1 pb-0"
            >
              <div class="text-truncate" style="width: 85%">
                {{ deal.title }}
              </div>
              <div
                style="width: 15%"
                v-if="(canEdit || canEditOthers) && !item.isDelete"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      x-small
                      class="mr-2"
                      @click.stop="disconnectDeal(deal.id)"
                      v-bind="attrs"
                      v-on="on"
                      :loading="isLoadingRemove"
                      color="grey"
                      outlined
                    >
                      <v-icon small>mdi-connection</v-icon>
                    </v-btn>
                  </template>
                  <span>Desvincular</span>
                </v-tooltip>
              </div>
            </v-card-title>
            <v-card-text class="d-flex justify-space-between">
              <div class="text-truncate" style="width:70%">
                <v-icon>
                  {{
                    typeItem === 'CONTACT'
                      ? 'mdi-office-building'
                      : 'mdi-account'
                  }}
                </v-icon>
                <span v-if="typeItem === 'COMPANY'" class="black--text">
                  {{ deal.contact ? deal.contact.name : 'Sin contacto' }}
                </span>
                <span v-else class="black--text ">
                  {{ deal.company ? deal.company.name : 'Sin empresa' }}
                </span>
              </div>
              <div class="text-truncate" style="width:30%">
                <span class="black--text  d-block">
                  {{ deal.value | formatPrice }}
                </span>
              </div>
            </v-card-text>
            <v-progress-linear
              background-color="secondary"
              :color="deal.status === 'WON' ? 'success' : 'error'"
              value="100"
              height="5"
            ></v-progress-linear>
          </v-card>
        </template>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { permissionGroupMixin } from '@/mixins/permissionGroupMixin';
import { contactsMixin } from '@/mixins/contactsMixin';
import { companiesMixin } from '@/mixins/companiesMixin';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import {
  PERMISSIONS_CONTACTS,
  PERMISSIONS_COMPANIES,
} from '@/constants/permissions';

export default {
  name: 'ListDeals',
  components: {
    FieldSelectDealSimple: () =>
      import('@/components/fields/FieldSelectDealSimple.vue'),
  },
  mixins: [permissionGroupMixin, contactsMixin, companiesMixin],
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemId: {
      type: String,
      default: '',
      required: true,
    },
    typeItem: {
      type: String,
      required: true,
      default: undefined,
    },
    ownerId: {
      type: String,
      default: '',
    },
    deals: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isLoading: {
      type: Boolean,
    },
  },
  data() {
    return {
      UPDATE,
      PERMISSIONS_CONTACTS,
      PERMISSIONS_COMPANIES,
      isShowAddDeal: false,
      isOpenMenuAddDeal: false,
      isLoadingAddDeal: false,
      isLoadingRemove: false,
      existingDealSelected: {},
      warningDealExistInfo: {
        show: false,
        text: '',
      },
    };
  },
  watch: {
    isShowAddDeal() {
      this.warningDealExistInfo = {
        show: false,
        text: '',
      };
    },
    isLoadingAddDeal(value) {
      if (!value) {
        this.isShowAddDeal = false;
        this.isOpenMenuAddDeal = false;
      }
    },
    isLoadingUpdateContact(value) {
      if (!value) {
        this.isLoadingAddDeal = false;
        this.isLoadingRemove = false;
      }
    },
    isLoadingUpdateCompany(value) {
      if (!value) {
        this.isLoadingAddDeal = false;
        this.isLoadingRemove = false;
      }
    },
  },
  computed: {
    canEdit() {
      if (this.typeItem === 'CONTACT') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_CONTACTS, { authorId: this.ownerId || '' }),
        );
      }
      if (this.typeItem === 'COMPANY') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_COMPANIES, { authorId: this.ownerId || '' }),
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
                authorId: this.ownerId || '',
              }),
            )
          );
        }
        return ability.can(
          UPDATE_OTHERS,
          subject(PERMISSIONS_CONTACTS, { authorId: this.ownerId || '' }),
        );
      }
      if (this.typeItem === 'COMPANY') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_COMPANIES, {
                authorId: this.ownerId || '',
              }),
            )
          );
        }
        return ability.can(
          UPDATE_OTHERS,
          subject(PERMISSIONS_COMPANIES, { authorId: this.ownerId || '' }),
        );
      }
      return false;
    },
    listDealsOpen() {
      return this.deals.filter((deal) => deal.status === 'OPEN');
    },
    listDealsClosed() {
      return this.deals.filter((deal) => deal.status !== 'OPEN');
    },
    disabledAddButton() {
      if (this.existingDealSelected.id) return false;
      return true;
    },
  },
  methods: {
    deleteDealSelected() {
      this.existingDealSelected = {};
      this.warningDealExistInfo = {
        show: false,
        text: '',
      };
    },
    disconnectDeal(dealId) {
      this.isLoadingRemove = true;
      if (this.typeItem === 'CONTACT') {
        this.updateContact({
          id: this.itemId,
          deal: { id: dealId, disconnect: true },
        });
      }
      if (this.typeItem === 'COMPANY') {
        this.updateCompany({
          id: this.itemId,
          deal: { id: dealId, disconnect: true },
        });
      }
    },
    addExistingDeal() {
      this.isLoadingAddDeal = true;
      if (this.typeItem === 'CONTACT') {
        this.updateContact({
          id: this.itemId,
          deal: { id: this.existingDealSelected.id, disconnect: false },
        });
      }
      if (this.typeItem === 'COMPANY') {
        this.updateCompany({
          id: this.itemId,
          deal: { id: this.existingDealSelected.id, disconnect: false },
        });
      }
    },
    verificationDeal(deal) {
      if (deal.contact?.id || deal.company?.id) {
        if (this.typeItem === 'CONTACT' && deal.contact?.id) {
          this.warningDealExistInfo = {
            show: true,
            text:
              'El trato seleccionado ya cuenta con un contacto asignado, si continua el contacto será reemplazado',
          };
        }
        if (this.typeItem === 'COMPANY' && deal.company?.id) {
          this.warningDealExistInfo = {
            show: true,
            text:
              'El trato seleccionado ya cuenta con una empresa asignada, si continua la empresa será reemplazada',
          };
        }
      }
      this.existingDealSelected = deal;
    },
    goDeal(id) {
      this.$router.push({ name: 'deal', params: { id } }, () => {});
    },
    goContact(id) {
      this.$router.push({ name: 'contact', params: { id } }, () => {});
    },
    getPercentage(id, stages) {
      const index = this.getIndexStage(id, stages) + 1;
      const total = this.getCountStage(stages);
      return (index * 100) / total;
    },
    getIndexStage(id, stages) {
      return stages.findIndex((stage) => stage.id === id);
    },
    getCountStage(stages) {
      return stages.length;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .profile__input .deals-title } from ../../../../scss/components/list.deals';
</style>
