<template>
  <div>
    <AppNavbarUser v-if="appControl.isLogged && !appControl.isLoading" />
    <AppNavbarPublic v-else />
  </div>
</template>

<script>
import AppNavbarPublic from '@/components/layout/AppNavbarPublic.vue';
import AppNavbarUser from '@/components/layout/AppNavbarUser.vue';
import { GET_APP_CONTROL } from '@/graphql/local-state/queries';

export default {
  name: 'AppNavbar',
  components: {
    AppNavbarPublic,
    AppNavbarUser,
  },
  data() {
    return {
      appControl: {},
    };
  },
  apollo: {
    appControl: {
      query: GET_APP_CONTROL,
    },
  },
};
</script>
