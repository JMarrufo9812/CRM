<template>
  <v-snackbar v-model="success.isOpen" color="success">
    {{ success.message }}
    <template v-slot:action>
      <v-btn text @click="close">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { CHANGE_SUCCESS } from '@/graphql/local-state/mutations';

export default {
  name: 'SnackbarSuccess',
  props: {
    success: {
      type: Object,
      default: () => {
        return {
          success: {
            id: '',
            message: '',
            isOpen: '',
          },
        };
      },
    },
  },
  created() {
    setTimeout(() => {
      this.close();
    }, 5000);
  },
  methods: {
    close() {
      const { id } = this.success;
      // Here mutation to close
      this.$apollo.mutate({
        mutation: CHANGE_SUCCESS,
        variables: {
          success: {
            id,
          },
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
