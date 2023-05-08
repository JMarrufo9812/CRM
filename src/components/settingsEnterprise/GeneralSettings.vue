<template>
  <v-card width="35em" height="28em">
    <div class="d-flex justify-center pt-12 px-12 pb-6">
      <span class="text-center title-general-settings mx-12">
        Configuraciones generales de empresa
      </span>
    </div>
    <div class="d-flex justify-center">
      <v-avatar size="80" color="secondary">
        <v-icon class="white--text" x-large>mdi-domain</v-icon>
      </v-avatar>
    </div>
    <div class="d-flex justify-center">
      <div class="pt-12 d-flex" style="width:60%">
        <v-text-field
          v-model="enterprise.name"
          dense
          label="Nombre de la empresa"
          outlined
          hide-details="auto"
          maxlength="50"
          counter
        ></v-text-field>
      </div>
    </div>
    <div class="d-flex justify-center pt-6">
      <v-btn
        large
        :loading="isLoading"
        :disabled="nameVerification"
        @click="updateEnterprise"
        color="secondary"
      >
        Guardar
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import { UPDATE_ENTERPRISE } from '@/graphql/mutations/enterprisesMutations';

export default {
  watch: {
    userCurrent({ enterprise: { id, name } }) {
      this.enterprise = {
        id,
        name,
      };
    },
  },
  data() {
    return {
      isLoading: false,
      enterprise: {
        id: '',
        name: '',
      },
    };
  },
  computed: {
    nameVerification() {
      if (
        this.enterprise.name?.trim() !== this.userCurrent.enterprise.name &&
        this.enterprise.name?.trim().length >= 1
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    updateEnterprise() {
      this.isLoading = true;
      this.$apollo
        .mutate({
          mutation: UPDATE_ENTERPRISE,
          variables: {
            input: {
              name: this.enterprise.name,
            },
          },
        })
        .then(() => {
          this.isLoading = false;
          this.outData('SUCCESS', {
            isOpen: true,
            color: 'success',
            text: 'El nombre de tu empresa fué actualizado',
          });
        })
        .catch(() => {
          this.isLoading = false;
          const errorMessage =
            'No se pudo actualizar el nombre, intente de nuevo o contacte a soporte';
          this.outData('ERROR', {
            isOpen: true,
            error: errorMessage,
          });
        });
    },
    outData(type, info) {
      if (type === 'SUCCESS') this.$emit('success', info);
      if (type === 'ERROR') this.$emit('error', info);
    },
  },
  apollo: {
    userCurrent: {
      query: GET_USER_LOGGED,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .title-general-settings } from ../../../../scss/components/general.settings';
</style>
