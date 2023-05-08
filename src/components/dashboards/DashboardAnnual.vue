<template>
  <v-row>
    <v-col cols="4">
      <CardOpportunitySalePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardOpportunitySalePreview>
    </v-col>
    <v-col cols="4">
      <LineOpportunitySalesPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineOpportunitySalesPreview>
    </v-col>
    <v-col cols="4">
      <BarOpportunitySalesPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarOpportunitySalesPreview>
    </v-col>
    <v-col cols="4">
      <CardConvertionRatePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardConvertionRatePreview>
    </v-col>
    <v-col cols="4">
      <BarStageConvertionRatePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarStageConvertionRatePreview>
    </v-col>
    <v-col cols="4">
      <LineThroughTimeConvertionRatePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineThroughTimeConvertionRatePreview>
    </v-col>
    <v-col cols="4">
      <CardTotalIncomeGoalPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardTotalIncomeGoalPreview>
    </v-col>
    <v-col cols="4">
      <LineSalesGrowthMonthlyPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineSalesGrowthMonthlyPreview>
    </v-col>
    <v-col cols="4">
      <LineTotalIncomeGoalPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineTotalIncomeGoalPreview>
    </v-col>
    <v-col cols="4">
      <LineSalesCycleByMonthPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineSalesCycleByMonthPreview>
    </v-col>
    <v-col cols="4">
      <BarSalesCycleByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarSalesCycleByStagePreview>
    </v-col>
    <v-col cols="4">
      <CardAverageDaysInPipelinePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardAverageDaysInPipelinePreview>
    </v-col>
    <v-col cols="4">
      <CardLostDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardLostDealsPreview>
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
    <v-col cols="4">
      <DonutLostReasonPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></DonutLostReasonPreview>
    </v-col>
  </v-row>
</template>

<script>
import { dashboardsMixin } from '@/mixins/charts/dashboardsMixin';

// Cards
import CardConvertionRatePreview from '@/components/charts/cards/CardConvertionRatePreview.vue';
import CardOpportunitySalePreview from '@/components/charts/cards/CardOpportunitySalePreview.vue';
import CardAverageDaysInPipelinePreview from '@/components/charts/cards/CardAverageDaysInPipelinePreview.vue';
import CardTotalIncomeGoalPreview from '@/components/charts/cards/CardTotalIncomeGoalPreview.vue';
import CardLostDealsPreview from '@/components/charts/cards/CardLostDealsPreview.vue';

// Lines
import LineThroughTimeConvertionRatePreview from '@/components/charts/lines/LineThroughTimeConvertionRatePreview.vue';
import LineOpportunitySalesPreview from '@/components/charts/lines/LineOpportunitySalesPreview.vue';
import LineSalesGrowthMonthlyPreview from '@/components/charts/lines/LineSalesGrowthMonthlyPreview.vue';
import LineTotalIncomeGoalPreview from '@/components/charts/lines/LineTotalIncomeGoalPreview.vue';
import LineSalesCycleByMonthPreview from '@/components/charts/lines/LineSalesCycleByMonthPreview.vue';
import LineThroughTimeLostRatePreview from '@/components/charts/lines/LineThroughTimeLostRatePreview.vue';

// Bars
import BarStageConvertionRatePreview from '@/components/charts/bars/BarStageConvertionRatePreview.vue';
import BarOpportunitySalesPreview from '@/components/charts/bars/BarOpportunitySalesPreview.vue';
import BarSalesCycleByStagePreview from '@/components/charts/bars/BarSalesCycleByStagePreview.vue';
import BarLostDealsByStagePreview from '@/components/charts/bars/BarLostDealsByStagePreview.vue';

// Donuts
import DonutLostReasonPreview from '@/components/charts/donuts/DonutLostReasonPreview.vue';

export default {
  name: 'DashboardAnnual',
  components: {
    CardConvertionRatePreview,
    CardOpportunitySalePreview,
    CardAverageDaysInPipelinePreview,
    CardTotalIncomeGoalPreview,
    CardLostDealsPreview,
    LineThroughTimeConvertionRatePreview,
    LineOpportunitySalesPreview,
    LineTotalIncomeGoalPreview,
    LineSalesCycleByMonthPreview,
    LineThroughTimeLostRatePreview,
    BarStageConvertionRatePreview,
    BarOpportunitySalesPreview,
    BarSalesCycleByStagePreview,
    BarLostDealsByStagePreview,
    LineSalesGrowthMonthlyPreview,
    DonutLostReasonPreview,
  },
  mixins: [dashboardsMixin],
  data() {
    return {
      defaultPeriod: 'THIS_YEAR',
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
