<template>
  <v-row>
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
      <CardWonDealsEarningValuePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardWonDealsEarningValuePreview>
    </v-col>
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
      <BarActivityTypeByStagePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></BarActivityTypeByStagePreview>
    </v-col>
    <v-col cols="4">
      <LineSalesGrowthMonthlyPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></LineSalesGrowthMonthlyPreview>
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
      <TableRebookedActivitiesPreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></TableRebookedActivitiesPreview>
    </v-col>
    <v-col cols="4">
      <CardAverageDaysInPipelinePreview
        :defaultPeriod="defaultPeriod"
        :filtersGlobal="filtersChartsGlobal"
      ></CardAverageDaysInPipelinePreview>
    </v-col>
  </v-row>
</template>

<script>
import { dashboardsMixin } from '@/mixins/charts/dashboardsMixin';

// Cards
import CardConvertionRatePreview from '@/components/charts/cards/CardConvertionRatePreview.vue';
import CardOpportunitySalePreview from '@/components/charts/cards/CardOpportunitySalePreview.vue';
import CardAverageDaysInPipelinePreview from '@/components/charts/cards/CardAverageDaysInPipelinePreview.vue';
import CardWonDealsEarningValuePreview from '@/components/charts/cards/CardWonDealsEarningValuePreview.vue';
import CardLostDealsPreview from '@/components/charts/cards/CardLostDealsPreview.vue';

// Lines
import LineThroughTimeConvertionRatePreview from '@/components/charts/lines/LineThroughTimeConvertionRatePreview.vue';
import LineOpportunitySalesPreview from '@/components/charts/lines/LineOpportunitySalesPreview.vue';
import LineSalesGrowthMonthlyPreview from '@/components/charts/lines/LineSalesGrowthMonthlyPreview.vue';

// Bars
import BarStageConvertionRatePreview from '@/components/charts/bars/BarStageConvertionRatePreview.vue';
import BarOpportunitySalesPreview from '@/components/charts/bars/BarOpportunitySalesPreview.vue';
import BarActivityTypeByStagePreview from '@/components/charts/bars/BarActivityTypeByStagePreview.vue';

// Donuts
import DonutLostReasonPreview from '@/components/charts/donuts/DonutLostReasonPreview.vue';

// Tables
import TableRebookedActivitiesPreview from '@/components/charts/tables/TableRebookedActivitiesPreview.vue';

export default {
  name: 'DashboardGeneralV2',
  components: {
    CardConvertionRatePreview,
    CardOpportunitySalePreview,
    CardAverageDaysInPipelinePreview,
    CardWonDealsEarningValuePreview,
    CardLostDealsPreview,
    LineThroughTimeConvertionRatePreview,
    LineOpportunitySalesPreview,
    BarStageConvertionRatePreview,
    BarOpportunitySalesPreview,
    LineSalesGrowthMonthlyPreview,
    BarActivityTypeByStagePreview,
    DonutLostReasonPreview,
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
