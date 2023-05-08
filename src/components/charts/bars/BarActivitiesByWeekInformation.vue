<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="3">
          <span>
            <b>Actividades reagendadas:</b>
            {{
              information.bookedActivities && information.bookedActivities.count
            }}
          </span>
        </v-col>
        <v-col cols="3">
          <b>Actividades completadas:</b>
          {{
            information.completedActivities &&
              information.completedActivities.count
          }}
        </v-col>
        <v-col cols="3">
          <b>Actividades efectivas:</b>
          {{
            information.effectiveActivities &&
              information.effectiveActivities.count
          }}
        </v-col>
        <v-col cols="3">
          <b>Actividades inefectivas:</b>
          {{
            information.ineffectiveActivities &&
              information.ineffectiveActivities.count
          }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'BarActivitiesByWeekInformation',
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
