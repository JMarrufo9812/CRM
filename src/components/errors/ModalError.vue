<template>
  <v-dialog width="550" v-model="error.isOpen" persistent>
    <v-card>
      <v-alert class="mb-0" outlined type="error">
        <v-col cols="9">
          <strong>{{ error.message }}</strong>
        </v-col>
        <v-col cols="3">
          <v-btn
            class="white--text"
            right
            absolute
            bottom
            tile
            color="secondary"
            @click="close"
          >
            Aceptar
          </v-btn>
        </v-col>
      </v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
import { CHANGE_ERROR } from '@/graphql/local-state/mutations';

export default {
  name: 'ModalError',
  props: {
    error: {
      type: Object,
      default: () => {
        return {
          error: {
            id: '',
            code: '',
            message: '',
            isOpen: '',
          },
        };
      },
    },
  },
  methods: {
    close() {
      const { id } = this.error;
      // Here mutation to close
      this.$apollo.mutate({
        mutation: CHANGE_ERROR,
        variables: {
          error: {
            id,
          },
        },
      });
    },
  },
};
</script>
