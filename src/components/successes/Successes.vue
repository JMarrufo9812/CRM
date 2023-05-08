<template>
  <div>
    <SnackbarSuccess
      v-for="success in successes"
      :key="success.id"
      :success="success"
    ></SnackbarSuccess>
  </div>
</template>

<script>
import SnackbarSuccess from '@/components/successes/SnackbarSuccess.vue';
import { GET_SUCCESSES } from '@/graphql/local-state/queries';

export default {
  name: 'Successes',
  components: {
    SnackbarSuccess,
  },
  data() {
    return {
      successes: [],
    };
  },
  apollo: {
    successes: {
      query: GET_SUCCESSES,
    },
  },
};
</script>

<style lang="scss" scoped></style>
