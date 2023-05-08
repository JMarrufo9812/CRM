<template>
  <div class="pa-12 text-center">
    <v-icon x-large :color="info.colorIcon">{{ info.icon }}</v-icon>
    <p class="text-h5 mt-2">
      {{ info.title }}
    </p>
    <p>{{ info.message }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseErrorComponent',
  props: {
    info: {
      required: true,
      type: Object,
    },
  },
};
</script>
