<template>
  <v-overlay>
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'Loading',
};
</script>
