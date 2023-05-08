<template>
  <v-card height="920" tile outlined scrollable>
    <v-card-title
      style="font-size:.9em"
      :class="isPermissionsMenu ? 'primary white--text' : ''"
      class="pa-2 d-flex justify-center font-weight-bold"
    >
      <slot name="title" />
    </v-card-title>
    <v-divider class="primary"></v-divider>
    <slot name="content" />
  </v-card>
</template>

<script>
export default {
  name: 'templateMenu',
  props: {
    isPermissionsMenu: {
      type: Boolean,
    },
  },
};
</script>
