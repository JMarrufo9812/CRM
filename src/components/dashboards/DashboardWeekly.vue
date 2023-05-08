<template>
  <v-row>
    <v-col cols="4">
      <BarActivitiesByWeekPreview
        defaultPeriod="THIS_WEEK"
        :filtersGlobal="filtersChartsGlobal"
      ></BarActivitiesByWeekPreview>
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
      <BarActivityTypeByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarActivityTypeByStagePreview>
    </v-col>
    <v-col cols="4">
      <BarUncompletedActivitiesByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarUncompletedActivitiesByStagePreview>
    </v-col>
    <v-col cols="4">
      <BarExpiredActivitiesByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarExpiredActivitiesByStagePreview>
    </v-col>
    <v-col cols="4">
      <CardNewDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardNewDealsPreview>
    </v-col>
    <v-col cols="4">
      <CardWonDealsEarningValuePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardWonDealsEarningValuePreview>
    </v-col>
    <v-col cols="4">
      <CardAdvancedDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardAdvancedDealsPreview>
    </v-col>
    <v-col cols="4">
      <BarWonDealsEarningValuePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarWonDealsEarningValuePreview>
    </v-col>
    <v-col cols="4">
      <BarStageConvertionRatePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarStageConvertionRatePreview>
    </v-col>
    <v-col cols="4">
      <BarSalesCycleByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarSalesCycleByStagePreview>
    </v-col>
  </v-row>
</template>

<script>
import { dashboardsMixin } from '@/mixins/charts/dashboardsMixin';

// Cards
import CardCompletedActivitiesPreview from '@/components/charts/cards/CardCompletedActivitiesPreview.vue';
import CardEffectiveActivitiesPreview from '@/components/charts/cards/CardEffectiveActivitiesPreview.vue';
import CardNewDealsPreview from '@/components/charts/cards/CardNewDealsPreview.vue';
import CardWonDealsEarningValuePreview from '@/components/charts/cards/CardWonDealsEarningValuePreview.vue';
import CardAdvancedDealsPreview from '@/components/charts/cards/CardAdvancedDealsPreview.vue';

// Bars
import BarActivitiesByWeekPreview from '@/components/charts/bars/BarActivitiesByWeekPreview.vue';
import BarActivityTypeByStagePreview from '@/components/charts/bars/BarActivityTypeByStagePreview.vue';
import BarWonDealsEarningValuePreview from '@/components/charts/bars/BarWonDealsEarningValuePreview.vue';
import BarStageConvertionRatePreview from '@/components/charts/bars/BarStageConvertionRatePreview.vue';
import BarUncompletedActivitiesByStagePreview from '@/components/charts/bars/BarUncompletedActivitiesByStagePreview.vue';
import BarExpiredActivitiesByStagePreview from '@/components/charts/bars/BarExpiredActivitiesByStagePreview.vue';
import BarSalesCycleByStagePreview from '@/components/charts/bars/BarSalesCycleByStagePreview.vue';

export default {
  name: 'DashboardWeekly',
  components: {
    CardCompletedActivitiesPreview,
    CardEffectiveActivitiesPreview,
    CardNewDealsPreview,
    CardWonDealsEarningValuePreview,
    CardAdvancedDealsPreview,
    BarActivitiesByWeekPreview,
    BarActivityTypeByStagePreview,
    BarWonDealsEarningValuePreview,
    BarStageConvertionRatePreview,
    BarUncompletedActivitiesByStagePreview,
    BarExpiredActivitiesByStagePreview,
    BarSalesCycleByStagePreview,
  },
  mixins: [dashboardsMixin],
  data() {
    return {
      defaultPeriod: 'THIS_WEEK',
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
