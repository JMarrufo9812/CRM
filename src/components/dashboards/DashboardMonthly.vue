<template>
  <v-row>
    <v-col cols="4">
      <CardOpportunitySalePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardOpportunitySalePreview>
    </v-col>
    <v-col cols="4">
      <LineOpportunitySalesByWeekPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineOpportunitySalesByWeekPreview>
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
      <LineTotalIncomeGoalPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineTotalIncomeGoalPreview>
    </v-col>
    <v-col cols="4">
      <LineSalesGrowthMonthlyPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineSalesGrowthMonthlyPreview>
    </v-col>
    <v-col cols="4">
      <CardAverageDaysInPipelinePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardAverageDaysInPipelinePreview>
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
      <CardTotalOpenDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardTotalOpenDealsPreview>
    </v-col>
    <v-col cols="4">
      <CardRottenDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardRottenDealsPreview>
    </v-col>
    <v-col cols="4">
      <CardLostDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardLostDealsPreview>
    </v-col>
    <v-col cols="4">
      <DonutLostReasonPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></DonutLostReasonPreview>
    </v-col>
    <v-col cols="4">
      <CardIncomeLostDealsPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardIncomeLostDealsPreview>
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
import CardTotalIncomeGoalPreview from '@/components/charts/cards/CardTotalIncomeGoalPreview.vue';
import CardAverageDaysInPipelinePreview from '@/components/charts/cards/CardAverageDaysInPipelinePreview.vue';
import CardTotalOpenDealsPreview from '@/components/charts/cards/CardTotalOpenDealsPreview.vue';
import CardRottenDealsPreview from '@/components/charts/cards/CardRottenDealsPreview.vue';
import CardLostDealsPreview from '@/components/charts/cards/CardLostDealsPreview.vue';
import CardIncomeLostDealsPreview from '@/components/charts/cards/CardIncomeLostDealsPreview.vue';

// Lines
import LineThroughTimeConvertionRatePreview from '@/components/charts/lines/LineThroughTimeConvertionRatePreview.vue';
import LineOpportunitySalesByWeekPreview from '@/components/charts/lines/LineOpportunitySalesByWeekPreview.vue';
import LineTotalIncomeGoalPreview from '@/components/charts/lines/LineTotalIncomeGoalPreview.vue';
import LineSalesGrowthMonthlyPreview from '@/components/charts/lines/LineSalesGrowthMonthlyPreview.vue';
import LineSalesCycleByMonthPreview from '@/components/charts/lines/LineSalesCycleByMonthPreview.vue';

// Bars
import BarStageConvertionRatePreview from '@/components/charts/bars/BarStageConvertionRatePreview.vue';
import BarOpportunitySalesPreview from '@/components/charts/bars/BarOpportunitySalesPreview.vue';
import BarSalesCycleByStagePreview from '@/components/charts/bars/BarSalesCycleByStagePreview.vue';
import BarLostDealsByStagePreview from '@/components/charts/bars/BarLostDealsByStagePreview.vue';

// Donuts
import DonutLostReasonPreview from '@/components/charts/donuts/DonutLostReasonPreview.vue';

export default {
  name: 'DashboardMonthly',
  components: {
    CardConvertionRatePreview,
    CardOpportunitySalePreview,
    CardTotalIncomeGoalPreview,
    CardAverageDaysInPipelinePreview,
    CardTotalOpenDealsPreview,
    CardRottenDealsPreview,
    CardLostDealsPreview,
    CardIncomeLostDealsPreview,
    LineThroughTimeConvertionRatePreview,
    LineOpportunitySalesByWeekPreview,
    LineTotalIncomeGoalPreview,
    LineSalesGrowthMonthlyPreview,
    LineSalesCycleByMonthPreview,
    BarStageConvertionRatePreview,
    BarOpportunitySalesPreview,
    BarSalesCycleByStagePreview,
    BarLostDealsByStagePreview,
    DonutLostReasonPreview,
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
