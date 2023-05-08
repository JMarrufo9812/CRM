<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row>
        <v-col cols="3">
          <span class="d-block">
            <b>Actividades reagendadas:</b>
            {{
              information.periodsActivities &&
                information.periodsActivities.bookedActivities
            }}
          </span>
          <span class="d-block">
            <b>Activitiades completadas:</b>
            {{
              information.periodsActivities &&
                information.periodsActivities.completedActivities
            }}
          </span>
          <span class="d-block">
            <b>Actividades cumplidas:</b>
            {{
              information.periodsActivities &&
                information.periodsActivities.compliedActivities
            }}
          </span>
        </v-col>
        <v-col cols="3">
          <span class="d-block">
            <b>Actividades efectivas:</b>
            {{
              information.periodsActivities &&
                information.periodsActivities.effectiveActivities
            }}
          </span>
          <span class="d-block">
            <b>Actividades vencidas:</b>
            {{
              information.periodsActivities &&
                information.periodsActivities.expiredActivities
            }}
          </span>
          <span class="d-block">
            <b>Actividades inefectivas:</b>
            {{
              information.periodsActivities &&
                information.periodsActivities.ineffectiveActivities
            }}
          </span>
        </v-col>
        <v-col cols="3">
          <span class="d-block">
            <b>Actividades reagendadas anterior:</b>
            {{
              information.pastPeriodsActivities &&
                information.pastPeriodsActivities.bookedActivities
            }}
          </span>
          <span class="d-block">
            <b>Activitiades completadas anterior:</b>
            {{
              information.pastPeriodsActivities &&
                information.pastPeriodsActivities.completedActivities
            }}
          </span>
          <span class="d-block">
            <b>Actividades cumplidas anterior:</b>
            {{
              information.pastPeriodsActivities &&
                information.pastPeriodsActivities.compliedActivities
            }}
          </span>
        </v-col>
        <v-col cols="3">
          <span class="d-block">
            <b>Actividades efectivas anterior:</b>
            {{
              information.pastPeriodsActivities &&
                information.pastPeriodsActivities.effectiveActivities
            }}
          </span>
          <span class="d-block">
            <b>Actividades vencidas anterior:</b>
            {{
              information.pastPeriodsActivities &&
                information.pastPeriodsActivities.expiredActivities
            }}
          </span>
          <span class="d-block">
            <b>Actividades inefectivas anterior:</b>
            {{
              information.pastPeriodsActivities &&
                information.pastPeriodsActivities.ineffectiveActivities
            }}
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'BarExpiredActivitiesByStageInformation',
  props: {
    information: {
      type: Object,
      default: () => {
        return {};
      },
    },
    filterBy: {
      type: String,
      default: 'count',
    },
  },
};
</script>

<style></style>
