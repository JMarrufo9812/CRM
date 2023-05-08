<template>
  <div class="pipeline">
    <div v-if="!isLoading" class="Pipeline__stages open">
      <ul>
        <li
          class="Stage"
          v-for="stage in listStages"
          :key="stage.id"
          :class="{
            active: stage.done,
            desactive: deal.status === 'LOST' && stage.done,
            'cursor-pointer': (canEdit || canEditOthers) && !deal.isDelete,
          }"
          @click="updateStage(stage)"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="Stage__content" v-bind="attrs" v-on="on">
                <div class="Stage__name"></div>
                <span class="Stage__separator"></span>
              </div>
            </template>
            <span class="d-block font-weight-bold">
              {{ stage.name ? stage.name : '' }}
            </span>
            <span class="d-block">
              {{ daysInStage(stage.daysInStage) }}
            </span>
          </v-tooltip>
        </li>
      </ul>
    </div>
    <v-progress-linear
      v-else
      class="mb-7"
      height="12"
      indeterminate
      color="secondary"
    ></v-progress-linear>
  </div>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { PERMISSIONS_DEALS } from '@/constants/permissions';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
// import moment from 'moment';
import { UTIL_ORDER } from '@/helpers/utils';

export default {
  name: 'Stages',
  props: {
    ownerId: {
      type: String,
      required: true,
    },
    deal: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
    },
  },
  data() {
    return {
      subject,
      PERMISSIONS_DEALS,
      UPDATE,
    };
  },
  computed: {
    listStages() {
      const { stage } = this.deal;
      const orderedStages = UTIL_ORDER({
        listItems: this.deal?.pipeline?.stages,
        orderBy: 'ASC',
        nextElement: 'order',
      });
      const list = orderedStages.map((pStage, index) => {
        // eslint-disable-next-line
        pStage.done = index <= stage?.order - 1;
        return pStage;
      });
      return list;
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
    updateStage({ id, name }) {
      if ((this.canEdit || this.canEditOthers) && !this.deal.isDelete) {
        if (this.deal.stage.id !== id) {
          this.$emit('updateStage', { id, name });
        }
      }
    },
    daysInStage(daysInStage) {
      if (daysInStage) {
        if (daysInStage === 1) {
          return `Estuvo 1 dia`;
        }
        return `Estuvo ${daysInStage} dias`;
      }
      if (daysInStage === 0) {
        return 'Estuvo menos de un dia';
      }
      return 'Nunca ha estado';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .cursor-pointer .pipeline } from ../../../../scss/components/stages';
</style>
