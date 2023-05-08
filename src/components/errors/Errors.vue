<template>
  <div>
    <ModalError
      v-for="error in errors"
      :key="error.id"
      :error="error"
    ></ModalError>
  </div>
</template>

<script>
import ModalError from '@/components/errors/ModalError.vue';
import { GET_ERRORS } from '@/graphql/local-state/queries';

export default {
  name: 'Errors',
  components: {
    ModalError,
  },
  data() {
    return {
      errors: [],
    };
  },
  apollo: {
    errors: {
      query: GET_ERRORS,
    },
  },
};
</script>

<style lang="scss" scoped></style>
