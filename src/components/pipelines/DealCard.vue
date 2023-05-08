<template>
  <v-card
    :disabled="moveLoading || (!canEdit && !canEditOthers)"
    :data-deal-id="source.id"
    :data-stage-id="source.stage.id"
    :style="dealShow || dealMoved === source.id ? 'opacity: 0 !important;' : ''"
    :class="statusColor(source.status)"
    width="100%"
    :to="`/deal/${source.id}`"
    :ripple="false"
    :rounded="true"
  >
    <div class="d-flex d-inline-block justify-space-between pr-2 pl-4 pt-2">
      <div>
        <span class="title-deal">
          {{ source.title }}
        </span>
      </div>

      <div>
        <v-avatar size="23" color="secondary">
          <span
            v-if="source.owner.user.config.profileUrl === null || errorImage"
            class="white--text"
          >
            {{ source.owner.user.name.charAt(0).toUpperCase()
            }}{{ source.owner.user.lastName.charAt(0).toUpperCase() }}
          </span>
          <v-img
            v-else
            :src="source.owner.user.config.profileUrl"
            @error="catchErrorImage"
          />
        </v-avatar>
      </div>
    </div>
    <div class="pl-4 pt-2">
      <v-icon class="mb-1 mr-2" small>mdi-cash-multiple</v-icon>
      <span class="deal-value">{{ source.value | formatPrice }} MXN</span>
    </div>
    <div class="d-flex justify-end">
      <v-chip
        :color="getColorRotten(source.dateEntryIntoStage, source.stage.maxDays)"
        x-small
        class="mb-2 mr-2 white--text"
      >
        <span class="deal-tag mb-1">
          {{ getTextRotten(source.dateEntryIntoStage, source.stage.maxDays) }}
        </span>
      </v-chip>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment';
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { PERMISSIONS_DEALS } from '@/constants/permissions';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import { dealsMixin } from '@/mixins/dealsMixin';

export default {
  name: 'DealCard',
  mixins: [dealsMixin],
  props: {
    index: {
      // index of current item
      type: Number,
    },
    source: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {};
      },
    },
    dealShow: Boolean,
    dealMoved: String,
    moveLoading: Boolean,
  },
  data() {
    return {
      errorImage: false,
      subject,
      UPDATE,
      UPDATE_OTHERS,
      PERMISSIONS_DEALS,
    };
  },
  computed: {
    canEdit() {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_DEALS, { authorId: this?.source?.owner?.id || '' }),
      );
    },
    canEditOthers() {
      if (!this.canEdit) {
        return (
          ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS) &&
          !ability.can(
            UPDATE_OTHERS,
            subject(PERMISSIONS_DEALS, {
              authorId: this?.source?.owner?.id || '',
            }),
          )
        );
      }
      return ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS);
    },
  },
  methods: {
    catchErrorImage(error) {
      if (error) this.errorImage = true;
    },
    statusColor(status) {
      if (status === 'WON') {
        return 'line-won-deal';
      }
      if (status === 'LOST') {
        return 'line-lost-deal';
      }
      return 'line-open-deal';
    },
    rottenCalculate(date) {
      const currentDate = moment().format();
      const compareDates = moment(currentDate).diff(date, 'days');
      return compareDates;
    },
    getTextRotten(dateEntryIntoStage, maxDaysInStage) {
      const daysInStage = this.rottenCalculate(dateEntryIntoStage);
      if (maxDaysInStage !== 0) {
        if (daysInStage < maxDaysInStage) {
          return 'Buen estado';
        }
        if (daysInStage === maxDaysInStage) {
          return 'Proximo a caducar';
        }
        if (daysInStage > maxDaysInStage) {
          return 'Caducado';
        }
      }
      return 'Buen Estado';
    },
    getColorRotten(dateEntryIntoStage, maxDaysInStage) {
      const daysInStage = this.rottenCalculate(dateEntryIntoStage);
      if (maxDaysInStage !== 0) {
        if (daysInStage < maxDaysInStage) {
          return '#396A5D';
        }
        if (daysInStage === maxDaysInStage) {
          return '#CD9B9B';
        }
        if (daysInStage > maxDaysInStage) {
          return '#881414';
        }
      }
      return '#396A5D';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .line-open-deal , .line-lost-deal, .line-won-deal, .title-deal,.deal-value, .deal-tag } from ../../../../scss/components/deal.card';
</style>
