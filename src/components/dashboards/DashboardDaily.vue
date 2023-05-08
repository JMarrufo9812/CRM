<template>
  <v-row>
    <v-col cols="4">
      <CardBookedActivitiesInDayPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardBookedActivitiesInDayPreview>
    </v-col>
    <v-col cols="4">
      <CardCompletedActivitiesPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardCompletedActivitiesPreview>
    </v-col>
    <v-col cols="4">
      <CardEffectiveActivitiesPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardEffectiveActivitiesPreview>
    </v-col>
    <v-col cols="4">
      <CardRebookedActivitiesPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardRebookedActivitiesPreview>
    </v-col>
    <v-col cols="4">
      <CardExpiredActivitiesPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardExpiredActivitiesPreview>
    </v-col>
    <v-col cols="4">
      <CardIneffectiveActivitiesPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardIneffectiveActivitiesPreview>
    </v-col>
    <v-col cols="4">
      <CardSentEmailsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardSentEmailsPreview>
    </v-col>
    <v-col cols="4">
      <CardOpenEmailsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardOpenEmailsPreview>
    </v-col>
    <v-col cols="4">
      <CardOpenRateEmailsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardOpenRateEmailsPreview>
    </v-col>

    <v-col cols="4">
      <CardTotalOpenDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardTotalOpenDealsPreview>
    </v-col>
    <v-col cols="4">
      <CardNewDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardNewDealsPreview>
    </v-col>
    <v-col cols="4">
      <CardAdvancedDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardAdvancedDealsPreview>
    </v-col>
  </v-row>
</template>

<script>
import { dashboardsMixin } from '@/mixins/charts/dashboardsMixin';

// Cards
import CardBookedActivitiesInDayPreview from '@/components/charts/cards/CardBookedActivitiesInDayPreview.vue';
import CardCompletedActivitiesPreview from '@/components/charts/cards/CardCompletedActivitiesPreview.vue';
import CardEffectiveActivitiesPreview from '@/components/charts/cards/CardEffectiveActivitiesPreview.vue';
import CardRebookedActivitiesPreview from '@/components/charts/cards/CardRebookedActivitiesPreview.vue';
import CardExpiredActivitiesPreview from '@/components/charts/cards/CardExpiredActivitiesPreview.vue';
import CardIneffectiveActivitiesPreview from '@/components/charts/cards/CardIneffectiveActivitiesPreview.vue';
import CardSentEmailsPreview from '@/components/charts/cards/CardSentEmailsPreview.vue';
import CardOpenEmailsPreview from '@/components/charts/cards/CardOpenEmailsPreview.vue';
import CardOpenRateEmailsPreview from '@/components/charts/cards/CardOpenRateEmailsPreview.vue';
import CardTotalOpenDealsPreview from '@/components/charts/cards/CardTotalOpenDealsPreview.vue';
import CardAdvancedDealsPreview from '@/components/charts/cards/CardAdvancedDealsPreview.vue';

// Tables
import CardNewDealsPreview from '@/components/charts/cards/CardNewDealsPreview.vue';

export default {
  name: 'DashboardDaily',
  components: {
    CardBookedActivitiesInDayPreview,
    CardCompletedActivitiesPreview,
    CardEffectiveActivitiesPreview,
    CardRebookedActivitiesPreview,
    CardExpiredActivitiesPreview,
    CardIneffectiveActivitiesPreview,
    CardSentEmailsPreview,
    CardOpenEmailsPreview,
    CardOpenRateEmailsPreview,
    CardTotalOpenDealsPreview,
    CardNewDealsPreview,
    CardAdvancedDealsPreview,
  },
  mixins: [dashboardsMixin],
  data() {
    return {
      defaultPeriod: 'TODAY',
    };
  },
};
</script>

<style lang="scss" scoped>
.chart::v-deep {
  .chartButton {
    display: none;
  }
  &:hover .chartButton {
    display: block;
  }
}
</style>
