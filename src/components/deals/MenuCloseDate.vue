<template>
  <v-menu
    v-model="menuModal"
    bottom
    offset-y
    max-width="300"
    nudge-bottom="10"
    :close-on-content-click="false"
    :close-on-click="false"
    :disabled="!((canEdit || canEditOthers) && !deal.isDelete)"
  >
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <v-btn
          text
          small
          color="primary"
          :class="{
            normalCursor: !((canEdit || canEditOthers) && !deal.isDelete),
          }"
        >
          <v-icon class="mr-1">mdi-flag-outline</v-icon>
          {{ dateClose ? dateFormat : 'Fecha prevista de cierre' }}
        </v-btn>
      </span>
    </template>
    <v-card>
      <v-card-title class="py-1 font-weight-bold">
        Fecha prevista de cierre
      </v-card-title>
      <v-card-text>
        <v-menu
          v-model="menuDate"
          :close-on-content-click="false"
          :nudge-left="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="dateSelected"
              ref="closeDate"
              dense
              readonly
              v-bind="attrs"
              v-on="on"
              outlined
              hide-details="auto"
              append-icon="mdi-calendar"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @input="menuDate = false"
            :max="maxDate"
            :min="minDate"
          ></v-date-picker>
        </v-menu>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          v-if="canEdit || canEditOthers"
          :disabled="!dateClose"
          icon
          color="error"
          class="mr-auto"
          @click="removeCloseDate"
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined small @click="cancel" class="mr-3">
          Cancelar
        </v-btn>
        <v-btn
          v-if="canEdit || canEditOthers"
          color="secondary"
          :disabled="validateSomeValue"
          small
          :loading="isLoading"
          @click="updateCloseDate"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import moment from 'moment';
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { PERMISSIONS_DEALS } from '@/constants/permissions';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import { dateMixin } from '@/mixins/dateMixin';

export default {
  name: 'MenuCloseDate',
  mixins: [dateMixin],
  props: {
    ownerId: {
      type: String,
      required: true,
    },
    dealId: { type: String, required: true },
    dateClose: {
      type: String,
    },
    isLoading: {
      type: Boolean,
    },
    deal: {
      required: true,
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      subject,
      UPDATE,
      UPDATE_OTHERS,
      PERMISSIONS_DEALS,
      // Control menus
      menuModal: false,
      menuDate: false,
      // Assign value date close
      date: '',
    };
  },
  watch: {
    dateClose: {
      handler(value) {
        // Update date to date close
        this.date = value || this.getToday();
      },
      immediate: true,
    },
    isLoading(value) {
      if (!value) {
        // Close menu modal
        this.menuModal = false;
      }
    },
  },
  computed: {
    dateSelected() {
      return moment(this.date).format('LL');
    },
    owner() {
      if (this.ownerId) {
        return { authorId: this.ownerId || '' };
      }
      return { authorId: '' };
    },
    dateFormat() {
      return moment(this.dateClose, 'YYYY-MM-DD').format('LL');
    },
    validateSomeValue() {
      return this.dateClose === this.date;
    },
    canEdit() {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_DEALS, { authorId: this.ownerId || '' }),
      );
    },
    canEditOthers() {
      if (!this.canEdit) {
        return (
          ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS) &&
          !ability.can(
            UPDATE_OTHERS,
            subject(PERMISSIONS_DEALS, {
              authorId: this.ownerId || '',
            }),
          )
        );
      }
      return ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS);
    },
  },
  methods: {
    // Get date today
    getToday() {
      return moment().format('YYYY-MM-DD');
    },
    // Validation date, check if date has the format 'YYYY-MM-DD' and is a valid date
    validationDate(date) {
      // If date is empty is valid
      if (!date) return true;
      // Format date of 'dd/mm/yyyy' to 'yyyy-mm-ddd'
      const dateFormat = moment(date);
      // Is a valid date?
      return moment(dateFormat).isValid();
    },
    // Cancel the action
    cancel() {
      // Close menu calendar
      this.menuModal = false;
    },
    // Update close date
    updateCloseDate() {
      if (this.canEdit || this.canEditOthers) {
        // Is a date valid?
        if (this.validationDate(this.date)) {
          // Emit date formated convert to date ISO
          this.$emit('outData', {
            id: this.dealId,
            expectedCloseDate: this.date,
          });
        }
      }
    },
    // Remove close date with empty value
    removeCloseDate() {
      if (this.canEdit || this.canEditOthers) {
        // Emit empty value
        this.$emit('outData', {
          id: this.dealId,
          expectedCloseDate: '',
        });
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
