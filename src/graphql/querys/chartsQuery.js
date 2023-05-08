import gql from 'graphql-tag';

export const GET_GENERAL_CONVERTION_RATE = gql`
  query generalConvertionRateCard($filters: commonNewCardInput!) {
    generalConvertionRateCard(filters: $filters) {
      mainConvertionRate {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondConvertionRate {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersConvertionRates {
          id
          name
          count
          sum
          start
          end
        }
        periodsConvertionRates {
          count
          sum
          start
          end
        }
        pastPeriodsConvertionRates {
          count
          sum
          start
          end
        }
      }
    }
  }
`;

export const GET_STAGE_CONVERTION_RATE = gql`
  query stageConvertionRateGraph($filters: commonNewCardInput!) {
    stageConvertionRateVerticalBarsGraph(filters: $filters) {
      mainConvertionRateByStage {
        count {
          count
          stageId
          stageName
        }
        sum {
          sum
          stageId
          stageName
        }
        wonCount
        wonSum
        start
        end
      }
      secondConvertionRateByStage {
        count {
          count
          stageId
          stageName
        }
        sum {
          sum
          stageId
          stageName
        }
        wonCount
        wonSum
        start
        end
      }
      informationBar {
        generalConvertionRate {
          count
          sum
        }
        wonDeals {
          count
          sum
        }
        lostDeals {
          count
          sum
        }
        openDeals {
          count
          sum
        }
      }
    }
  }
`;

export const GET_THROUGH_TIME_CONVERTION_RATE = gql`
  query throughTimeConvertionRateLinearGraph(
    $filters: commonNewTypePeriodAndDisplayInput!
  ) {
    throughTimeConvertionRateLinearGraph(filters: $filters) {
      mainDateList {
        start
        end
        dateString
      }
      secondDateList {
        start
        end
        dateString
      }
      mainConvertionRateThroughTime {
        convertionRatesThroughTime {
          id
          name
          convertionRateCountList
          convertionRateSumList
        }
        owners {
          id
        }
      }
      secondConvertionRateThroughTime {
        convertionRatesThroughTime {
          id
          name
          convertionRateCountList
          convertionRateSumList
        }
        owners {
          id
        }
      }
      mainAverageDateConvertionRateThroughTime {
        start
        end
        dateString
        avgCount
        avgSum
      }
      secondAverageDateConvertionRateThroughTime {
        start
        end
        dateString
        avgCount
        avgSum
      }
    }
  }
`;

export const GET_WON_DEALS_EARNING_VALUE = gql`
  query dealsStatusByStageHorizontalBarsGraph($filters: commonNewCardInput!) {
    dealsStatusByStageHorizontalBarsGraph(filters: $filters) {
      mainDealsByStage {
        openDealsCount {
          count
          stageId
          stageName
          start
          end
        }
        lostDealsCount {
          count
          stageId
          stageName
          start
          end
        }
        wonDealsCount {
          count
          stageId
          stageName
          start
          end
        }
        openDealsSum {
          sum
          stageId
          stageName
          start
          end
        }
        lostDealsSum {
          sum
          stageId
          stageName
          start
          end
        }
        wonDealsSum {
          sum
          stageId
          stageName
          start
          end
        }
        stages
        owners {
          id
        }
      }
      secondDealsByStage {
        openDealsCount {
          count
          stageId
          stageName
          start
          end
        }
        lostDealsCount {
          count
          stageId
          stageName
          start
          end
        }
        wonDealsCount {
          count
          stageId
          stageName
          start
          end
        }
        openDealsSum {
          sum
          stageId
          stageName
          start
          end
        }
        lostDealsSum {
          sum
          stageId
          stageName
          start
          end
        }
        wonDealsSum {
          sum
          stageId
          stageName
          start
          end
        }
        stages
        owners {
          id
        }
      }
      informationBar {
        periodsActivities {
          totalDeals {
            count
            sum
          }
          wonDeals {
            count
            sum
          }
          lostDeals {
            count
            sum
          }
          openDeals {
            count
            sum
          }
        }
        pastPeriodsActivities {
          totalDeals {
            count
            sum
          }
          wonDeals {
            count
            sum
          }
          lostDeals {
            count
            sum
          }
          openDeals {
            count
            sum
          }
        }
      }
    }
  }
`;

export const GET_WON_DEALS_EARNING_VALUE_CARD = gql`
  query wonDealsEarningValueCard($filters: commonNewCardInput!) {
    wonDealsEarningValueCard(filters: $filters) {
      mainDealsEarning {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondDealsEarning {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        userDealsEarning {
          id
          name
          count
          sum
          start
          end
        }
        periodsDealsEarning {
          count
          sum
          totalSum
          start
          end
        }
      }
    }
  }
`;

export const GET_OPPORTUNITY_SALE = gql`
  query opportunitiesSalesVerticalBarsGraph(
    $filters: commonNewGraphWithDateInput!
  ) {
    opportunitiesSalesVerticalBarsGraph(filters: $filters) {
      mainOpportunitiesSales {
        openDealsCount {
          count
          start
          end
        }
        lostDealsCount {
          count
          start
          end
        }
        wonDealsCount {
          count
          start
          end
        }
        openDealsSum {
          sum
          start
          end
        }
        lostDealsSum {
          sum
          start
          end
        }
        wonDealsSum {
          sum
          start
          end
        }
        dateString
        owners {
          id
        }
      }
      secondOpportunitiesSales {
        openDealsCount {
          count
          start
          end
        }
        lostDealsCount {
          count
          start
          end
        }
        wonDealsCount {
          count
          start
          end
        }
        openDealsSum {
          sum
          start
          end
        }
        lostDealsSum {
          sum
          start
          end
        }
        wonDealsSum {
          sum
          start
          end
        }
        dateString
        owners {
          id
        }
      }
      informationBar {
        totalDeals {
          count
          sum
        }
        wonDeals {
          count
          sum
        }
        lostDeals {
          count
          sum
        }
        openDeals {
          count
          sum
        }
      }
    }
  }
`;

export const GET_OPPORTUNITY_SALE_CARD = gql`
  query opportunitySaleCard($filters: commonNewCardInput!) {
    opportunitySaleCard(filters: $filters) {
      mainOpportunitySales {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondOpportunitySales {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersOpportunitySales {
          id
          name
          count
          sum
          start
          end
        }
        periodsOpportunitySales {
          count
          sum
          totalSum
          start
          end
        }
      }
    }
  }
`;

export const GET_OPPORTUNITY_SALE_BY_SALESMAN = gql`
  query opportunitySaleBySalesman($filters: salesOpportunityBySalesmanInput) {
    opportunitySaleBySalesman(filters: $filters) {
      openDealsCount
      lostDealsCount
      wonDealsCount
      openDealsSum
      lostDealsSum
      wonDealsSum
      dateString
    }
  }
`;

export const GET_COMPARE_OPPORTUNITY_SALES_BY_SALESMAN_AND_PERIOD = gql`
  query compareSalesBySalesmanLinearGraph(
    $filters: commonNewTypePeriodAndDisplayInput
  ) {
    compareSalesBySalesmanLinearGraph(filters: $filters) {
      mainDateList {
        start
        end
        dateString
      }
      secondDateList {
        start
        end
        dateString
      }
      mainCompareSalesBySalesman {
        compareSalesBySalesman {
          id
          name
          countList
          sumList
        }
        owners {
          id
        }
      }
      mainAverageDateCompareSalesBySalesman {
        start
        end
        dateString
        avgCount
        avgSum
      }
      secondCompareSalesBySalesman {
        compareSalesBySalesman {
          id
          name
          countList
          sumList
        }
        owners {
          id
        }
      }
      secondAverageDateCompareSalesBySalesman {
        start
        end
        dateString
        avgCount
        avgSum
      }
    }
  }
`;

export const GET_SALES_GROWTH_MONTH_BY_MONTH = gql`
  query salesGrowthMonthByMonthLinearGraph(
    $filters: commonNewTypeDisplayInput
  ) {
    salesGrowthMonthByMonthLinearGraph(filters: $filters) {
      mainDateList {
        start
        end
        dateString
      }
      secondDateList {
        start
        end
        dateString
      }
      mainGrowthMonthByMonth {
        growthMonthByMonth {
          id
          name
          countList
          sumList
        }
        owners {
          id
        }
      }
      mainAverageGrowthMonthByMonth {
        start
        end
        dateString
        avgCount
        avgSum
      }
      secondGrowthMonthByMonth {
        growthMonthByMonth {
          id
          name
          countList
          sumList
        }
        owners {
          id
        }
      }
      secondAverageGrowthMonthByMonth {
        start
        end
        dateString
        avgCount
        avgSum
      }
    }
  }
`;

export const GET_LOST_OPPORTUNITIES_BY_STAGE = gql`
  query lostDealsByStageTableGraph($filters: commonNewCardInput!) {
    lostDealsByStageTableGraph(filters: $filters) {
      stageList {
        stageId
        stageName
      }
      mainLostDealsByStage {
        lostDealsByStage {
          stageId
          stageName
          count
          sum
          start
          end
        }
        start
        end
        owners {
          id
        }
      }
      secondLostDealsByStage {
        lostDealsByStage {
          stageId
          stageName
          count
          sum
          start
          end
        }
        start
        end
        owners {
          id
        }
      }
    }
  }
`;

export const GET_LOST_OPPORTUNITIES_BY_CANCELLATION_REASON = gql`
  query lostDealsByLostReasonDonutGraph($filters: commonNewCardInput!) {
    lostDealsByLostReasonDonutGraph(filters: $filters) {
      mainLostDeals {
        countList
        sumList
        reasonsList
        start
        end
        owners {
          id
        }
      }
      secondLostDeals {
        countList
        sumList
        reasonsList
        start
        end
        owners {
          id
        }
      }
      informationBar {
        periodLostDeals {
          id
          reason
          count
          sum
        }
      }
    }
  }
`;

export const GET_ACTIVITIES_BY_SALESMAN = gql`
  query activitiesBySalesmenHorizontalBarsGraph(
    $filters: commonNewActivitiesBySalesmenInput!
  ) {
    activitiesBySalesmenHorizontalBarsGraph(filters: $filters) {
      activityTypes
      mainActivitiesBySalesmen {
        usersActivities {
          id
          name
          countList {
            typeId
            typeName
            count
            start
            end
          }
        }
        owners {
          id
        }
      }
      secondActivitiesBySalesmen {
        usersActivities {
          id
          name
          countList {
            typeId
            typeName
            count
            start
            end
          }
        }
        owners {
          id
        }
      }
      informationBar {
        periodsActivities {
          bookedActivities
          compliedActivities
          expiredActivities
          completedActivities
          effectiveActivities
          ineffectiveActivities
        }
        pastPeriodsActivities {
          bookedActivities
          compliedActivities
          expiredActivities
          completedActivities
          effectiveActivities
          ineffectiveActivities
        }
      }
    }
  }
`;

export const GET_CLOSED_DEALS_BY_SALESMAN = gql`
  query closedDealsBySalesmanCard($filters: commonNewCardInput!) {
    closedDealsBySalesmanCard(filters: $filters) {
      mainClosedDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondClosedDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        userClosedDeals {
          id
          name
          count
          sum
          start
          end
        }
        periodsClosedDeals {
          count
          sum
          totalSum
          start
          end
        }
      }
    }
  }
`;

export const GET_REBOOKED_ACTIVITIES = gql`
  query rebookedActivitiesTableGraph(
    $filters: commonNewActivitiesTypesWithStagesInput!
  ) {
    rebookedActivitiesTableGraph(filters: $filters) {
      mainRebookedActivities {
        rebookedActivities {
          dealTitle
          total
          stageId
          dealId
          start
          end
        }
        start
        end
        owners {
          id
        }
        count
      }
      secondRebookedActivities {
        rebookedActivities {
          dealTitle
          total
          stageId
          dealId
          start
          end
        }
        start
        end
        owners {
          id
        }
        count
      }
    }
  }
`;

export const GET_ACTIVITY_BY_STAGE = gql`
  query activitiesByStageHorizontalBarsAndTable(
    $filters: commonNewActivitiesByStageInput!
  ) {
    activitiesByStageHorizontalBarsAndTable(filters: $filters) {
      stages
      mainActivitiesByStage {
        typeId
        typeName
        countList {
          stageId
          stageName
          count
          start
          end
        }
      }
      secondActivitiesByStage {
        typeId
        typeName
        countList {
          stageId
          stageName
          count
          start
          end
        }
      }
      informationBar {
        periodsActivities {
          bookedActivities
          compliedActivities
          expiredActivities
          completedActivities
          effectiveActivities
          ineffectiveActivities
        }
        pastPeriodsActivities {
          bookedActivities
          compliedActivities
          expiredActivities
          completedActivities
          effectiveActivities
          ineffectiveActivities
        }
      }
    }
  }
`;

export const GET_AVERAGE_DAYS_IN_PIPELINE = gql`
  query averageDaysInPipelineCard($filters: commonNewCardInput!) {
    averageDaysInPipelineCard(filters: $filters) {
      mainPipelineAvg {
        avg
        start
        end
        owners {
          id
        }
      }
      secondPipelineAvg {
        avg
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersAvgDaysInPipeline {
          id
          name
          avg
          start
          end
        }
        periodsAvgDaysInPipeline {
          avg
          start
          end
        }
      }
    }
  }
`;

export const GET_DEAL_DURATION_BY_STAGE = gql`
  query averageDaysInPipelineVerticalBarsGraph($filters: commonNewCardInput!) {
    averageDaysInPipelineVerticalBarsGraph(filters: $filters) {
      stages {
        stageId
        stageName
      }
      mainAverageDaysInPipeline {
        averageDaysInPipeline {
          id
          name
          averageList {
            avg
            stageId
          }
          start
          end
        }
        owners {
          id
        }
      }
      secondAverageDaysInPipeline {
        averageDaysInPipeline {
          id
          name
          averageList {
            avg
            stageId
          }
          start
          end
        }
        owners {
          id
        }
      }
      informationBar {
        averageDaysInPipeline
        wonDeals {
          count
          sum
        }
        lostDeals {
          count
          sum
        }
        openDeals {
          count
          sum
        }
      }
    }
  }
`;

export const GET_ACTIVITIES_BY_WEEK = gql`
  query activitiesByWeekVerticalBarsGraph(
    $filters: commonNewActivitiesByWeekInput!
  ) {
    activitiesByWeekVerticalBarsGraph(filters: $filters) {
      mainActivitiesByWeek {
        activitiesByWeek {
          typeId
          typeName
          countList {
            count
            start
            end
          }
        }
        datesStringList
        owners {
          id
        }
      }
      secondActivitiesByWeek {
        activitiesByWeek {
          typeId
          typeName
          countList {
            count
            start
            end
          }
        }
        datesStringList
        owners {
          id
        }
      }
      informationBar {
        bookedActivities {
          count
        }
        completedActivities {
          count
        }
        effectiveActivities {
          count
        }
        ineffectiveActivities {
          count
        }
      }
    }
  }
`;

export const GET_CLOSED_DEALS = gql`
  query closedDealsCard($filters: commonNewCardInput!) {
    closedDealsCard(filters: $filters) {
      mainClosedDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondClosedDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        userClosedDeals {
          id
          name
          count
          sum
          start
          end
        }
        periodsClosedDeals {
          count
          sum
          totalSum
          start
          end
        }
      }
    }
  }
`;

export const GET_LOST_DEALS = gql`
  query lostDealsCard($filters: commonNewCardInput!) {
    lostDealsCard(filters: $filters) {
      mainLostDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondLostDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        userLostDeals {
          id
          name
          count
          sum
          start
          end
        }
        periodsLostDeals {
          count
          sum
          totalSum
          start
          end
        }
      }
    }
  }
`;

export const GET_CONVERTION_RATIO = gql`
  query convertionRatioCard($filters: commonNewCardInput!) {
    convertionRatioCard(filters: $filters) {
      mainConvetionRatio {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondConvetionRatio {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        userConverionRatios {
          id
          name
          count
          sum
          start
          end
        }
        periodsConvertionRatios {
          count
          sum
          totalRatio
          start
          end
        }
      }
    }
  }
`;

export const GET_SENT_EMAILS_IN_DAY = gql`
  query sentEmailsInDayCard($filters: commonNewCardInput!) {
    sentEmailsInDayCard(filters: $filters) {
      mainSentMails {
        count
        start
        end
        owners {
          id
        }
      }
      secondSentMails {
        count
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersSentEmails {
          id
          name
          count
          start
          end
        }
        periodsSentEmails {
          count
          start
          end
        }
      }
    }
  }
`;

export const GET_SENT_EMAILS_BY_WEEK = gql`
  query sentEmailsByWeekLinearGraph($filters: commonNewCardInput!) {
    sentEmailsByWeekLinearGraph(filters: $filters) {
      mainDateList {
        start
        end
        dateString
      }
      secondDateList {
        start
        end
        dateString
      }
      mainSentEmailsByWeek {
        sentEmailsByWeek {
          id
          name
          countList
        }
        owners {
          id
        }
      }
      mainAverageSentEmailsByWeek {
        start
        end
        dateString
        avgCount
      }
      secondSentEmailsByWeek {
        sentEmailsByWeek {
          id
          name
          countList
        }
        owners {
          id
        }
      }
      secondAverageSentEmailsByWeek {
        start
        end
        dateString
        avgCount
      }
    }
  }
`;

export const GET_TOTAL_INCOME_GOAL = gql`
  query totalIncomeGoalLinearGraph($filters: commonNewTypeDisplayInput!) {
    totalIncomeGoalLinearGraph(filters: $filters) {
      mainDateList {
        start
        end
        dateString
      }
      secondDateList {
        start
        end
        dateString
      }
      mainTotalIncomeGoal {
        totalIncomeGoals {
          id
          name
          countList
          sumList
        }
        owners {
          id
        }
      }
      mainAverageDateTotalIncomeGoal {
        start
        end
        dateString
        avgCount
        avgSum
      }
      secondTotalIncomeGoal {
        totalIncomeGoals {
          id
          name
          countList
          sumList
        }
        owners {
          id
        }
      }
      secondAverageDateTotalIncomeGoal {
        start
        end
        dateString
        avgCount
        avgSum
      }
    }
  }
`;

export const GET_TOTAL_INCOME_GOAL_CARD = gql`
  query totalIncomeGoalCard($filters: commonNewCardInput!) {
    totalIncomeGoalCard(filters: $filters) {
      mainTotalIncome {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondTotalIncome {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        userTotalIncome {
          id
          name
          count
          sum
          start
          end
        }
        periodsTotalIncome {
          count
          sum
          totalSum
          start
          end
        }
      }
    }
  }
`;

export const GET_REPORT_DEALS = gql`
  query subreportsDeals($filters: subreportsDealsInput!) {
    subreportsDeals(filters: $filters) {
      count
      list {
        id
        title
        value
        status
        owner {
          id
          user {
            id
            name
            lastName
          }
        }
      }
    }
  }
`;

export const GET_REPORT_EMAILS = gql`
  query subreportsEmails($filters: subreportsEmailsInput!) {
    subreportsEmails(filters: $filters) {
      count
      list {
        id
        subject
        address
        tracking
        openingTime
        contact {
          id
          name
        }
      }
    }
  }
`;

export const GET_REPORT_ACTIVITIES = gql`
  query subreportsActivities($filters: subreportsActivitiesInput!) {
    subreportsActivities(filters: $filters) {
      count
      list {
        id
        title
        start
        end
        status
      }
    }
  }
`;

export const GET_BOOKED_ACTIVITIES_CARD = gql`
  query bookedActivitiesInDayCard($filters: commonNewCardInput!) {
    bookedActivitiesInDayCard(filters: $filters) {
      mainBookedActivities {
        count
        start
        end
        owners {
          id
        }
      }
      secondBookedActivities {
        count
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersBookedActivities {
          id
          name
          count
          start
          end
        }
        periodsBookedActivities {
          count
          start
          end
        }
      }
    }
  }
`;

export const GET_COMPLETED_ACTIVITIES_CARD = gql`
  query completedActivitiesCard($filters: commonNewCardInput!) {
    completedActivitiesCard(filters: $filters) {
      mainCompletedActivities {
        count
        start
        end
        owners {
          id
        }
      }
      secondCompletedActivities {
        count
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersCompletedActivities {
          id
          name
          count
          start
          end
        }
        periodsCompletedActivities {
          count
          start
          end
        }
      }
    }
  }
`;

export const GET_EFFECTIVE_ACTIVITIES_CARD = gql`
  query effectiveActivitiesCard($filters: commonNewCardInput!) {
    effectiveActivitiesCard(filters: $filters) {
      mainEffectiveActivities {
        count
        start
        end
        owners {
          id
        }
      }
      secondEffectiveActivities {
        count
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersEffectiveActivities {
          id
          name
          count
          start
          end
        }
        periodsEffectiveActivities {
          count
          start
          end
        }
      }
    }
  }
`;

export const GET_INEFFECTIVE_ACTIVITIES_CARD = gql`
  query ineffectiveActivitiesCard($filters: commonNewCardInput!) {
    ineffectiveActivitiesCard(filters: $filters) {
      mainIneffectiveActivities {
        count
        start
        end
        owners {
          id
        }
      }
      secondIneffectiveActivities {
        count
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersIneffectiveActivities {
          id
          name
          count
          start
          end
        }
        periodsIneffectiveActivities {
          count
          start
          end
        }
      }
    }
  }
`;

export const GET_REBOOKED_ACTIVITIES_CARD = gql`
  query rebookedActivitiesCard($filters: commonNewCardInput!) {
    rebookedActivitiesCard(filters: $filters) {
      mainRebookedActivities {
        count
        start
        end
        owners {
          id
        }
      }
      secondRebookedActivities {
        count
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersRebookedActivities {
          id
          name
          count
          start
          end
        }
        periodsRebookedActivities {
          count
          start
          end
        }
      }
    }
  }
`;

export const GET_EXPIRED_ACTIVITIES_CARD = gql`
  query expiredActivitiesCard($filters: commonNewCardInput!) {
    expiredActivitiesCard(filters: $filters) {
      mainExpiredActivities {
        count
        start
        end
        owners {
          id
        }
      }
      secondExpiredActivities {
        count
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersExpiredActivities {
          id
          name
          count
          start
          end
        }
        periodsExpiredActivities {
          count
          start
          end
        }
      }
    }
  }
`;

export const GET_OPEN_EMAILS_CARD = gql`
  query openEmailsCard($filters: commonNewCardInput!) {
    openEmailsCard(filters: $filters) {
      mainOpenedEmails {
        count
        start
        end
        owners {
          id
        }
      }
      secondOpenedEmails {
        count
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersOpenedEmails {
          id
          name
          count
          start
          end
        }
        periodsOpenedEmails {
          count
          start
          end
        }
      }
    }
  }
`;

export const GET_OPEN_RATE_EMAILS_CARD = gql`
  query openedRateEmailsCard($filters: commonNewCardInput!) {
    openedRateEmailsCard(filters: $filters) {
      mainOpenedRate {
        count
        start
        end
        owners {
          id
        }
      }
      secondOpenedRate {
        count
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersOpenedRateEmails {
          id
          name
          count
          start
          end
        }
        periodsOpenedRateEmails {
          count
          start
          end
        }
        pastPeriodsOpenedRateEmails {
          count
          start
          end
        }
      }
    }
  }
`;

export const GET_TOTAL_OPEN_DEALS_CARD = gql`
  query totalOpenDealsCard($filters: commonNewCardInput!) {
    totalOpenDealsCard(filters: $filters) {
      mainOpenDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondOpenDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersOpenDeals {
          id
          name
          count
          sum
          start
          end
        }
        periodsOpenDeals {
          count
          sum
          totalSum
          start
          end
        }
      }
    }
  }
`;

export const GET_NEW_DEALS_CARD = gql`
  query newDealsCard($filters: commonNewCardInput!) {
    newDealsCard(filters: $filters) {
      mainNewDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondNewDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        userNewDeals {
          id
          name
          count
          sum
          start
          end
        }
        periodsNewDeals {
          count
          sum
          totalSum
          start
          end
        }
      }
    }
  }
`;

export const GET_ADVANCED_DEALS_CARD = gql`
  query advancedDealsCard($filters: commonNewCardInput!) {
    advancedDealsCard(filters: $filters) {
      mainAdvancedDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondAdvancedDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        usersAdvancedDeals {
          id
          name
          count
          sum
          start
          end
        }
        periodsAdvancedDeals {
          count
          sum
          totalSum
          start
          end
        }
      }
    }
  }
`;

export const GET_ROTTEN_DEALS_CARD = gql`
  query rottenDealsCard($filters: commonNewCardInput!) {
    rottenDealsCard(filters: $filters) {
      mainRottenDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      secondRottenDeals {
        count
        sum
        start
        end
        owners {
          id
        }
      }
      informationBar {
        userRottenDeals {
          id
          name
          count
          sum
          start
          end
        }
        periodsRottenDeals {
          count
          sum
          totalSum
          start
          end
        }
      }
    }
  }
`;

export const GET_UNCOMPLETED_ACTIVITIES_BY_STAGE_BARS = gql`
  query uncompletedActivitiesByStageHorizontalBarsAndTable(
    $filters: commonNewActivitiesByStageWithDealsInput!
  ) {
    uncompletedActivitiesByStageHorizontalBarsAndTable(filters: $filters) {
      stages
      mainUncompletedActivitiesByStage {
        typeId
        typeName
        countList {
          stageId
          stageName
          count
          start
          end
        }
      }
      secondUncompletedActivitiesByStage {
        typeId
        typeName
        countList {
          stageId
          stageName
          count
          start
          end
        }
      }
      informationBar {
        periodsActivities {
          bookedActivities
          compliedActivities
          expiredActivities
          completedActivities
          effectiveActivities
          ineffectiveActivities
        }
        pastPeriodsActivities {
          bookedActivities
          compliedActivities
          expiredActivities
          completedActivities
          effectiveActivities
          ineffectiveActivities
        }
      }
    }
  }
`;

export const GET_EXPIRED_ACTIVITIES_BY_STAGE_BARS = gql`
  query expiredActivitiesByStageHorizontalBarsAndTable(
    $filters: commonNewExpiredActivitiesByStageInput!
  ) {
    expiredActivitiesByStageHorizontalBarsAndTable(filters: $filters) {
      stages
      mainExpiredActivitiesByStage {
        typeId
        typeName
        countList {
          stageId
          stageName
          count
          start
          end
        }
      }
      secondExpiredActivitiesByStage {
        typeId
        typeName
        countList {
          stageId
          stageName
          count
          start
          end
        }
      }
      informationBar {
        periodsActivities {
          bookedActivities
          compliedActivities
          expiredActivities
          completedActivities
          effectiveActivities
          ineffectiveActivities
        }
        pastPeriodsActivities {
          bookedActivities
          compliedActivities
          expiredActivities
          completedActivities
          effectiveActivities
          ineffectiveActivities
        }
      }
    }
  }
`;

export const GET_SALES_CYCLE_BY_STAGE_BARS = gql`
  query salesCycleByStageVerticalBarsGraph($filters: commonNewCardInput!) {
    salesCycleByStageVerticalBarsGraph(filters: $filters) {
      stages {
        stageId
        stageName
      }
      mainSalesCycleAverageDays {
        salesCycleAverageDays {
          id
          name
          averageList {
            avg
            stageId
          }
          start
          end
        }
        owners {
          id
        }
      }
      secondSalesCycleAverageDays {
        salesCycleAverageDays {
          id
          name
          averageList {
            avg
            stageId
          }
          start
          end
        }
        owners {
          id
        }
      }
      informationBar {
        averageDaysInSalesCycle
        averageDaysInSalesCycleWonDeals
        averageDaysInSalesCycleLostDeals
        averageDaysInSalesCycleOpenDeals
      }
    }
  }
`;

export const GET_OPPORTUNITIES_BY_WEEK_BARS = gql`
  query dealsLinearGraph($filters: commonNewTypePeriodAndDisplayInput!) {
    dealsLinearGraph(filters: $filters) {
      mainDateList {
        start
        end
        dateString
      }
      secondDateList {
        start
        end
        dateString
      }
      mainDeals {
        usersDeals {
          id
          name
          countList
          sumList
        }
        owners {
          id
        }
      }
      mainAverageDateDeals {
        start
        end
        dateString
        avgCount
        avgSum
      }
      secondDeals {
        usersDeals {
          id
          name
          countList
          sumList
        }
        owners {
          id
        }
      }
      secondAverageDateDeals {
        start
        end
        dateString
        avgCount
        avgSum
      }
    }
  }
`;

export const GET_LOST_DEALS_BY_STATE_BARS = gql`
  query lostDealsByStageVerticalBarsGraph($filters: commonNewCardInput!) {
    lostDealsByStageVerticalBarsGraph(filters: $filters) {
      stages {
        stageId
        stageName
      }
      mainLostDealsByStage {
        count {
          stageId
          stageName
          count
        }
        sum {
          stageId
          stageName
          sum
        }
        start
        end
        owners {
          id
        }
      }
      secondLostDealsByStage {
        count {
          stageId
          stageName
          count
        }
        sum {
          stageId
          stageName
          sum
        }
        start
        end
        owners {
          id
        }
      }
      informationBar {
        createdDeals {
          count
          sum
        }
        wonDeals {
          count
          sum
        }
        lostDeals {
          count
          sum
        }
        openDeals {
          count
          sum
        }
      }
    }
  }
`;

export const GET_SALES_CYCLE_BARS = gql`
  query salesCycleLinearGraph($filters: commonNewTypePeriodAndDisplayInput!) {
    salesCycleLinearGraph(filters: $filters) {
      mainDateList {
        start
        end
        dateString
      }
      secondDateList {
        start
        end
        dateString
      }
      mainSalesCycle {
        salesCycle {
          id
          name
          daysList
        }
        owners {
          id
        }
      }
      secondSalesCycle {
        salesCycle {
          id
          name
          daysList
        }
        owners {
          id
        }
      }
      mainAverageDateSalesCycle {
        start
        end
        dateString
        avgCount
      }
      secondAverageDateSalesCycle {
        start
        end
        dateString
        avgCount
      }
    }
  }
`;

export const GET_THROUGH_TIME_LOST_RATE_BARS = gql`
  query throughTimeLostRateLinearGraph(
    $filters: commonNewTypePeriodAndDisplayInput!
  ) {
    throughTimeLostRateLinearGraph(filters: $filters) {
      mainDateList {
        start
        end
        dateString
      }
      secondDateList {
        start
        end
        dateString
      }
      mainLostRateThroughTime {
        lostRatesThroughTime {
          id
          name
          lostRateCountList
          lostRateSumList
        }
        owners {
          id
        }
      }
      secondLostRateThroughTime {
        lostRatesThroughTime {
          id
          name
          lostRateCountList
          lostRateSumList
        }
        owners {
          id
        }
      }
      mainAverageDateLostRateThroughTime {
        start
        end
        dateString
        avgCount
        avgSum
      }
      secondAverageDateLostRateThroughTime {
        start
        end
        dateString
        avgCount
        avgSum
      }
    }
  }
`;
