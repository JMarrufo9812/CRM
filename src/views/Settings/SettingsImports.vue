<template>
  <div class="d-flex justify-center">
    <v-card outlined style="width: 12em;" height="30em">
      <p class="d-flex justify-center text-imports my-3">Importaciones</p>
      <v-divider></v-divider>
      <v-list flat>
        <v-list-item-group color="secondary">
          <v-list-item class="ml-4" exact to="/settings/imports-data/contacts">
            <v-icon class="mb-1 mr-2">mdi-account</v-icon>
            <v-list-item-title class="text-imports">
              Contactos
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="ml-4" exact to="/settings/imports-data/companies">
            <v-icon class="mb-1 mr-2">mdi-domain</v-icon>
            <v-list-item-title class="text-imports">Empresas</v-list-item-title>
          </v-list-item>
          <v-list-item class="ml-4" exact to="/settings/imports-data/deals">
            <v-icon class="mb-1 mr-2">mdi-handshake-outline</v-icon>
            <v-list-item-title class="text-imports">Tratos</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card outlined style="width: 27em;" height="30em">
      <p class="d-flex justify-center text-imports my-3">
        Historial de importaciones
      </p>
      <v-divider></v-divider>
      <v-card-text class="pa-0" style="max-height: 85%; overflow-y: auto;">
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
          height="6"
          absolute
          color="primary"
        ></v-progress-linear>

        <BaseErrorComponent v-if="isError" :info="infoError" />

        <p
          v-if="
            listImports && listImports.length === 0 && !isLoading && !isError
          "
          class="text-center pt-12"
        >
          No hay importaciones registradas
        </p>
        <div v-else>
          <v-card
            v-for="(ImportRegistration, index) in listImports"
            :key="index"
            class="ma-4"
          >
            <div class="d-flex">
              <v-icon class="ma-4" color="#9D9D9E">
                mdi-file-download-outline
              </v-icon>
              <div class="d-flex flex-column my-2">
                <span>
                  Importación
                  {{ ImportRegistration.createdAt | timeZone('lll') }}
                </span>
                <span class="quanty-imports">
                  <v-icon
                    color="warning"
                    x-small
                    v-if="ImportRegistration.status === 'PENDING'"
                    class="mb-1"
                  >
                    mdi-alert-circle
                  </v-icon>
                  <v-icon
                    color="success"
                    x-small
                    v-if="ImportRegistration.status === 'COMPLETE'"
                    class="mb-1"
                  >
                    mdi-checkbox-marked-circle
                  </v-icon>
                  {{ ImportRegistration.created }} subidos de
                  {{ ImportRegistration.total }}
                </span>
              </div>
              <div class="d-flex align-center mx-2">
                <v-btn
                  @click="goTo(ImportRegistration.filterId)"
                  small
                  color="secondary"
                  tile
                >
                  Ver lista importada
                </v-btn>
              </div>
            </div>
            <span class="quanty-imports ml-5">
              Importado por
              <span class="secondary--text font-weight-bold">
                {{ ImportRegistration.createdBy.user.name }}
                {{ ImportRegistration.createdBy.user.lastName }}
              </span>
            </span>
          </v-card>
        </div>

        <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { GET_IMPORTS } from '@/graphql/querys/importsQuery';

export default {
  name: 'SettingsImports',
  components: {
    BaseErrorComponent: () => import('@/components/ui/BaseErrorComponent.vue'),
  },
  mixins: [modalsAlertsMixin],
  data() {
    return {
      isLoading: true,
      isError: false,
      infoError: {
        icon: 'mdi-alert',
        title: 'error',
        message: 'No se ha podido cargar la lista de importaciones',
      },
      type: '',
    };
  },
  watch: {
    $route: {
      handler(to) {
        this.isLoading = true;
        if (to.params.section === 'contacts') {
          this.type = 'CONTACT';
        }
        if (to.params.section === 'companies') {
          this.type = 'COMPANY';
        }
        if (to.params.section === 'deals') {
          this.type = 'DEAL';
        }
      },
      immediate: true,
    },
    getListImports(data) {
      if (data) {
        this.isLoading = false;
      }
    },
  },
  computed: {
    listImports() {
      return this.getListImports
        ?.slice(0)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    goTo(filterId) {
      if (this.type === 'CONTACT')
        this.$router.push({ path: '/contacts', query: { filterId } });
      if (this.type === 'COMPANY')
        this.$router.push({ path: '/companies', query: { filterId } });
      if (this.type === 'DEAL')
        this.$router.push({ path: '/deals', query: { filterId } });
    },
  },
  apollo: {
    getListImports: {
      query: GET_IMPORTS,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          type: this.type,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .title-imports, .quanty-imports .by-imports } from ../../../../scss/views/settings.imports';
</style>
