<template>
  <v-app>
    <AppNavbar />
    <div class="divider-white"></div>
    <v-main class="background">
      <div v-show="!appControl.isLoading" style="height: 100%">
        <Errors></Errors>
        <Successes></Successes>
        <router-view></router-view>
      </div>
      <v-overlay v-show="appControl.isLoading">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from '@/components/layout/AppNavbar.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { GET_APP_CONTROL } from '@/graphql/local-state/queries';
import Errors from '@/components/errors/Errors.vue';
import Successes from '@/components/successes/Successes.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
    Errors,
    Successes,
  },
  apollo: {
    appControl: {
      query: GET_APP_CONTROL,
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

html,
body {
  font-family: 'Quicksand', sans-serif !important;
}

#app {
  font-family: 'Quicksand', sans-serif !important;
}

.background {
  background-color: #ebebeb;
}

::v-deep .required .v-label::after {
  content: ' *';
  color: red;
}

.divider-white {
  border-bottom: 1px outset #c4c4c4;
  max-height: 60%;
}
</style>
