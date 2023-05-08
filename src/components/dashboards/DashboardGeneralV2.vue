<template>
  <v-row>
    <v-col cols="4">
      <CardConvertionRatePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardConvertionRatePreview>
    </v-col>
    <v-col cols="4">
      <CardOpportunitySalePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardOpportunitySalePreview>
    </v-col>
    <v-col cols="4">
      <CardClosedDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardClosedDealsPreview>
    </v-col>
    <v-col cols="4">
      <CardClosedDealsBySalesmanPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardClosedDealsBySalesmanPreview>
    </v-col>
    <v-col cols="4">
      <CardAverageDaysInPipelinePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardAverageDaysInPipelinePreview>
    </v-col>
    <v-col cols="4">
      <CardWonDealsEarningValuePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardWonDealsEarningValuePreview>
    </v-col>
    <v-col cols="4">
      <CardTotalIncomeGoalPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardTotalIncomeGoalPreview>
    </v-col>
    <v-col cols="4">
      <CardSentEmailsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardSentEmailsPreview>
    </v-col>
    <v-col cols="4">
      <CardLostDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardLostDealsPreview>
    </v-col>
    <v-col cols="4">
      <CardConvertionRatioPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardConvertionRatioPreview>
    </v-col>
    <v-col cols="4">
      <LineThroughTimeConvertionRatePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineThroughTimeConvertionRatePreview>
    </v-col>
    <v-col cols="4">
      <LineOpportunitySalesPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineOpportunitySalesPreview>
    </v-col>
    <v-col cols="4">
      <LineTotalIncomeGoalPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineTotalIncomeGoalPreview>
    </v-col>
    <v-col cols="4">
      <BarStageConvertionRatePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarStageConvertionRatePreview>
    </v-col>
    <v-col cols="4">
      <BarWonDealsEarningValuePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarWonDealsEarningValuePreview>
    </v-col>
    <v-col cols="4">
      <BarOpportunitySalesPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarOpportunitySalesPreview>
    </v-col>
    <v-col cols="4">
      <LineSalesGrowthMonthlyPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineSalesGrowthMonthlyPreview>
    </v-col>
    <v-col cols="4">
      <BarActivityTypeByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarActivityTypeByStagePreview>
    </v-col>
    <v-col cols="4">
      <BarDealDurationByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarDealDurationByStagePreview>
    </v-col>
    <v-col cols="4">
      <BarActivitiesBySalesmanPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarActivitiesBySalesmanPreview>
    </v-col>
    <v-col cols="4">
      <LineSentEmailsByWeekPreview
        defaultPeriod="THIS_WEEK"
        :filtersGlobal="filtersChartsGlobal"
      ></LineSentEmailsByWeekPreview>
    </v-col>
    <v-col cols="4">
      <BarActivitiesByWeekPreview
        defaultPeriod="THIS_WEEK"
        :filtersGlobal="filtersChartsGlobal"
      ></BarActivitiesByWeekPreview>
    </v-col>

    <v-col cols="4">
      <DonutLostReasonPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></DonutLostReasonPreview>
    </v-col>
    <v-col cols="4">
      <TableActivityTypeByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></TableActivityTypeByStagePreview>
    </v-col>
    <v-col cols="4">
      <TableLostOpportunitiesByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></TableLostOpportunitiesByStagePreview>
    </v-col>
    <v-col cols="4">
      <TableRebookedActivitiesPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></TableRebookedActivitiesPreview>
    </v-col>
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
    <v-col cols="4">
      <CardRottenDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardRottenDealsPreview>
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
      <BarSalesCycleByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarSalesCycleByStagePreview>
    </v-col>
    <v-col cols="4">
      <LineOpportunitySalesByWeekPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineOpportunitySalesByWeekPreview>
    </v-col>
    <v-col cols="4">
      <LineSalesCycleByMonthPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineSalesCycleByMonthPreview>
    </v-col>
    <v-col cols="4">
      <LineThroughTimeLostRatePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineThroughTimeLostRatePreview>
    </v-col>
    <v-col cols="4">
      <BarLostDealsByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarLostDealsByStagePreview>
    </v-col>
  </v-row>
</template>

<script>
import { dashboardsMixin } from '@/mixins/charts/dashboardsMixin';

// Cards
import CardConvertionRatePreview from '@/components/charts/cards/CardConvertionRatePreview.vue';
import CardOpportunitySalePreview from '@/components/charts/cards/CardOpportunitySalePreview.vue';
import CardClosedDealsPreview from '@/components/charts/cards/CardClosedDealsPreview.vue';
import CardClosedDealsBySalesmanPreview from '@/components/charts/cards/CardClosedDealsBySalesmanPreview.vue';
import CardAverageDaysInPipelinePreview from '@/components/charts/cards/CardAverageDaysInPipelinePreview.vue';
import CardWonDealsEarningValuePreview from '@/components/charts/cards/CardWonDealsEarningValuePreview.vue';
import CardTotalIncomeGoalPreview from '@/components/charts/cards/CardTotalIncomeGoalPreview.vue';
import CardSentEmailsPreview from '@/components/charts/cards/CardSentEmailsPreview.vue';
import CardLostDealsPreview from '@/components/charts/cards/CardLostDealsPreview.vue';
import CardConvertionRatioPreview from '@/components/charts/cards/CardConvertionRatioPreview.vue';
import CardBookedActivitiesInDayPreview from '@/components/charts/cards/CardBookedActivitiesInDayPreview.vue';
import CardCompletedActivitiesPreview from '@/components/charts/cards/CardCompletedActivitiesPreview.vue';
import CardEffectiveActivitiesPreview from '@/components/charts/cards/CardEffectiveActivitiesPreview.vue';
import CardRebookedActivitiesPreview from '@/components/charts/cards/CardRebookedActivitiesPreview.vue';
import CardExpiredActivitiesPreview from '@/components/charts/cards/CardExpiredActivitiesPreview.vue';
import CardIneffectiveActivitiesPreview from '@/components/charts/cards/CardIneffectiveActivitiesPreview.vue';
import CardOpenEmailsPreview from '@/components/charts/cards/CardOpenEmailsPreview.vue';
import CardOpenRateEmailsPreview from '@/components/charts/cards/CardOpenRateEmailsPreview.vue';
import CardTotalOpenDealsPreview from '@/components/charts/cards/CardTotalOpenDealsPreview.vue';
import CardNewDealsPreview from '@/components/charts/cards/CardNewDealsPreview.vue';
import CardAdvancedDealsPreview from '@/components/charts/cards/CardAdvancedDealsPreview.vue';
import CardRottenDealsPreview from '@/components/charts/cards/CardRottenDealsPreview.vue';

// Lines
import LineThroughTimeConvertionRatePreview from '@/components/charts/lines/LineThroughTimeConvertionRatePreview.vue';
import LineOpportunitySalesPreview from '@/components/charts/lines/LineOpportunitySalesPreview.vue';
import LineTotalIncomeGoalPreview from '@/components/charts/lines/LineTotalIncomeGoalPreview.vue';
import LineSalesGrowthMonthlyPreview from '@/components/charts/lines/LineSalesGrowthMonthlyPreview.vue';
import LineSentEmailsByWeekPreview from '@/components/charts/lines/LineSentEmailsByWeekPreview.vue';
import LineOpportunitySalesByWeekPreview from '@/components/charts/lines/LineOpportunitySalesByWeekPreview.vue';
import LineSalesCycleByMonthPreview from '@/components/charts/lines/LineSalesCycleByMonthPreview.vue';
import LineThroughTimeLostRatePreview from '@/components/charts/lines/LineThroughTimeLostRatePreview.vue';

// Bars
import BarStageConvertionRatePreview from '@/components/charts/bars/BarStageConvertionRatePreview.vue';
import BarWonDealsEarningValuePreview from '@/components/charts/bars/BarWonDealsEarningValuePreview.vue';
import BarOpportunitySalesPreview from '@/components/charts/bars/BarOpportunitySalesPreview.vue';
import BarActivityTypeByStagePreview from '@/components/charts/bars/BarActivityTypeByStagePreview.vue';
import BarDealDurationByStagePreview from '@/components/charts/bars/BarDealDurationByStagePreview.vue';
import BarActivitiesBySalesmanPreview from '@/components/charts/bars/BarActivitiesBySalesmanPreview.vue';
import BarActivitiesByWeekPreview from '@/components/charts/bars/BarActivitiesByWeekPreview.vue';
import BarUncompletedActivitiesByStagePreview from '@/components/charts/bars/BarUncompletedActivitiesByStagePreview.vue';
import BarExpiredActivitiesByStagePreview from '@/components/charts/bars/BarExpiredActivitiesByStagePreview.vue';
import BarSalesCycleByStagePreview from '@/components/charts/bars/BarSalesCycleByStagePreview.vue';
import BarLostDealsByStagePreview from '@/components/charts/bars/BarLostDealsByStagePreview.vue';

// Donuts
import DonutLostReasonPreview from '@/components/charts/donuts/DonutLostReasonPreview.vue';

// Tables
import TableActivityTypeByStagePreview from '@/components/charts/tables/TableActivityTypeByStagePreview.vue';
import TableLostOpportunitiesByStagePreview from '@/components/charts/tables/TableLostOpportunitiesByStagePreview.vue';
import TableRebookedActivitiesPreview from '@/components/charts/tables/TableRebookedActivitiesPreview.vue';

export default {
  name: 'DashboardGeneralV2',
  components: {
    CardConvertionRatePreview,
    CardOpportunitySalePreview,
    CardClosedDealsPreview,
    CardClosedDealsBySalesmanPreview,
    CardAverageDaysInPipelinePreview,
    CardWonDealsEarningValuePreview,
    CardTotalIncomeGoalPreview,
    CardSentEmailsPreview,
    CardLostDealsPreview,
    CardConvertionRatioPreview,
    CardBookedActivitiesInDayPreview,
    CardCompletedActivitiesPreview,
    CardEffectiveActivitiesPreview,
    CardRebookedActivitiesPreview,
    CardExpiredActivitiesPreview,
    CardIneffectiveActivitiesPreview,
    CardOpenEmailsPreview,
    CardOpenRateEmailsPreview,
    CardTotalOpenDealsPreview,
    CardNewDealsPreview,
    CardAdvancedDealsPreview,
    CardRottenDealsPreview,
    LineThroughTimeConvertionRatePreview,
    LineOpportunitySalesPreview,
    LineTotalIncomeGoalPreview,
    LineSalesGrowthMonthlyPreview,
    LineSentEmailsByWeekPreview,
    LineOpportunitySalesByWeekPreview,
    LineSalesCycleByMonthPreview,
    LineThroughTimeLostRatePreview,
    BarStageConvertionRatePreview,
    BarWonDealsEarningValuePreview,
    BarOpportunitySalesPreview,
    BarActivityTypeByStagePreview,
    BarDealDurationByStagePreview,
    BarActivitiesBySalesmanPreview,
    BarActivitiesByWeekPreview,
    BarUncompletedActivitiesByStagePreview,
    BarExpiredActivitiesByStagePreview,
    BarSalesCycleByStagePreview,
    BarLostDealsByStagePreview,
    DonutLostReasonPreview,
    TableActivityTypeByStagePreview,
    TableLostOpportunitiesByStagePreview,
    TableRebookedActivitiesPreview,
  },
  mixins: [dashboardsMixin],
  data() {
    return {
      defaultPeriod: 'THIS_MONTH',
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
