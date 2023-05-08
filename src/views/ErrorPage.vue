<template>
  <BaseError :info="error" />
</template>

<script>
export default {
  components: {
    BaseError: () => import('@/components/ui/BaseError.vue'),
  },
  data() {
    return {
      error: {
        icon: 'mdi-magnify-close',
        tittle: 'Página no encontrada',
        message: 'La url no es válida',
      },
    };
  },
};
</script>
