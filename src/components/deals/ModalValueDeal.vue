<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="250"
    offset-x
    :disabled="!((canEdit || canEditOthers) && !deal.isDelete)"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon class="mb-1" color="primary">mdi-cash-multiple</v-icon>
      <span
        class="font-weight-bold"
        :class="{
          normalCursor: !((canEdit || canEditOthers) && !deal.isDelete),
        }"
        v-bind="attrs"
        v-on="on"
      >
        {{ deal.value ? deal.value.toFixed(2) : 0 }} MXN
      </span>
    </template>

    <v-card>
      <v-card-title class="py-1 font-weight-bold">
        Cambiar valor
      </v-card-title>
      <v-card-text class="pb-4">
        <VuetifyMoney
          v-model.number="value"
          :dense="true"
          :hide-details="true"
          :outlined="true"
          :options="inputMoneyOptions"
        />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          v-if="canEdit || canEditOthers"
          icon
          :disabled="!deal.value"
          color="error"
          class="mr-auto"
          @click="outData('delete')"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          outlined
          color="primary"
          small
          @click="menu = false"
          class="mr-3"
        >
          Cancelar
        </v-btn>
        <v-btn
          v-if="canEdit || canEditOthers"
          color="secondary"
          small
          :loading="isLoading"
          @click="outData('add')"
          :disabled="validateSameValue"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import { PERMISSIONS_DEALS } from '@/constants/permissions';
import { vuetifyMoneyMixin } from '@/mixins/vuetifyMoneyMixin';

export default {
  name: 'ModalValueDeal',
  props: {
    isLoading: {
      required: true,
      type: Boolean,
      default: false,
    },
    deal: {
      required: true,
      type: Object,
      default: () => {},
    },
  },
  mixins: [vuetifyMoneyMixin],
  data() {
    return {
      subject,
      UPDATE,
      UPDATE_OTHERS,
      PERMISSIONS_DEALS,
      menu: false,
      value: 0,
    };
  },
  watch: {
    menu(value) {
      if (value) this.value = this.deal.value;
    },
    isLoading(value) {
      if (!value) {
        this.menu = false;
      }
    },
  },
  computed: {
    validateSameValue() {
      if (
        this.deal.value === this.value ||
        this.value <= 0 ||
        this.value === null ||
        this.value === undefined
      )
        return true;

      return false;
    },
    canEdit() {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_DEALS, { authorId: this?.deal?.owner?.id || '' }),
      );
    },
    canEditOthers() {
      if (!this.canEdit) {
        return (
          ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS) &&
          !ability.can(
            UPDATE_OTHERS,
            subject(PERMISSIONS_DEALS, {
              authorId: this?.deal?.owner?.id || '',
            }),
          )
        );
      }
      return ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS);
    },
  },
  methods: {
    outData(type) {
      if (ability.can(UPDATE, PERMISSIONS_DEALS)) {
        if (type === 'delete') {
          this.$emit('outData', { id: this.deal.id, value: 0 });
        }
        if (type === 'add') {
          this.$emit('outData', {
            id: this.deal.id,
            value: this.value,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.normalCursor:hover {
  cursor: default;
}
</style>
