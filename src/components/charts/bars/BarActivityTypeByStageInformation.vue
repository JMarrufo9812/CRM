<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row>
        <v-col cols="3">
          <span>
            <b>Actividades reagendadas:</b>
            {{
              information.periodsActivities &&
                information.periodsActivities.bookedActivities
            }}
          </span>
        </v-col>
        <v-col cols="3">
          <b>Activitiades completadas:</b>
          {{
            information.periodsActivities &&
              information.periodsActivities.completedActivities
          }}
        </v-col>
        <v-col cols="3">
          <b>Actividades cumplidas:</b>
          {{
            information.periodsActivities &&
              information.periodsActivities.compliedActivities
          }}
        </v-col>
        <v-col cols="3">
          <b>Actividades efectivas:</b>
          {{
            information.periodsActivities &&
              information.periodsActivities.effectiveActivities
          }}
        </v-col>
        <v-col cols="3">
          <b>Actividades vencidas:</b>
          {{
            information.periodsActivities &&
              information.periodsActivities.expiredActivities
          }}
        </v-col>
        <v-col cols="3">
          <b>Actividades inefectivas:</b>
          {{
            information.periodsActivities &&
              information.periodsActivities.ineffectiveActivities
          }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <span>
            <b>Actividades reagendadas anterior:</b>
            {{
              information.pastPeriodsActivities &&
                information.pastPeriodsActivities.bookedActivities
            }}
          </span>
        </v-col>
        <v-col cols="3">
          <b>Activitiades completadas anterior:</b>
          {{
            information.pastPeriodsActivities &&
              information.pastPeriodsActivities.completedActivities
          }}
        </v-col>
        <v-col cols="3">
          <b>Actividades cumplidas anterior:</b>
          {{
            information.pastPeriodsActivities &&
              information.pastPeriodsActivities.compliedActivities
          }}
        </v-col>
        <v-col cols="3">
          <b>Actividades efectivas anterior:</b>
          {{
            information.pastPeriodsActivities &&
              information.pastPeriodsActivities.effectiveActivities
          }}
        </v-col>
        <v-col cols="3">
          <b>Actividades vencidas anterior:</b>
          {{
            information.pastPeriodsActivities &&
              information.pastPeriodsActivities.expiredActivities
          }}
        </v-col>
        <v-col cols="3">
          <b>Actividades inefectivas anterior:</b>
          {{
            information.pastPeriodsActivities &&
              information.pastPeriodsActivities.ineffectiveActivities
          }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'BarActivityTypeByStageInformation',
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
