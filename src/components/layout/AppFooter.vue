<template>
  <v-footer v-if="!appControl.isLoading">
    <v-breadcrumbs
      v-if="!appControl.isLogged"
      class="ml-12 pa-1"
      :items="items"
      divider="|"
    ></v-breadcrumbs>
    <v-spacer></v-spacer>
    <div>Cervus Consulting &copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
import { GET_APP_CONTROL } from '@/graphql/local-state/queries';

export default {
  data() {
    return {
      items: [
        {
          text: 'Politicas de privacidad',
          disabled: false,
          href: 'privacy',
        },
        {
          text: 'Soporte',
          disabled: false,
          href: 'support',
        },
      ],
    };
  },
  apollo: {
    appControl: {
      query: GET_APP_CONTROL,
    },
  },
};
</script>
