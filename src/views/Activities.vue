<template>
  <v-container fluid class="px-0">
    <v-row>
      <v-col cols="8" class="primary header-search">
        <p class="ml-6 my-4">
          Actividades
        </p>
      </v-col>
      <v-col cols="4" class="primary"></v-col>
      <v-col cols="12" class="py-0">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'Activities',
};
</script>

<style lang="scss" scoped>
@import '{ .header-search } from ../../../scss/components/header.search';
@import '{ .v-select } from ../../../scss/views/activities';
</style>
