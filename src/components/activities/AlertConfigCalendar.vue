<template>
  <v-alert
    dense
    color="secondary"
    type="info"
    v-if="!hasCalendarComplete"
    dismissible
  >
    <v-row align="center">
      <v-col class="grow" v-if="!hasCalendarIntegration">
        Para sincronizar tus actividades con Google Calendar es necesario que
        realices la integración.
      </v-col>
      <v-col class="grow" v-else>
        Para sincronizar tus actividades con Google Calendar es necesario que
        finalices la integración.
      </v-col>
      <v-col class="shrink">
        <v-btn small to="/settings/calendar">
          {{ !hasCalendarIntegration ? 'Configurar' : 'Finalizar' }}
          ahora
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';

export default {
  name: 'AlertConfigCalendar',
  data() {
    return {
      userCurrent: {},
    };
  },
  computed: {
    hasCalendarIntegration() {
      if (this.userCurrent.integrations) {
        return this.userCurrent.integrations.some(
          (integration) => integration.name === 'googleCalendar',
        );
      }
      return true;
    },
    hasCalendarComplete() {
      if (this.userCurrent.integrations) {
        const calendar = this.userCurrent.integrations.find(
          (integration) => integration.name === 'googleCalendar',
        );
        if (calendar && calendar.id && calendar.keyItem) {
          return true;
        }
        return false;
      }
      return false;
    },
  },
  apollo: {
    userCurrent: {
      query: GET_USER_LOGGED,
    },
  },
};
</script>

<style lang="scss" scoped></style>
