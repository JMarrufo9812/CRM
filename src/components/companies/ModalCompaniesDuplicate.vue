<template>
  <v-row>
    <v-dialog v-model="modalHandler.isOpen" width="850" scrollable persistent>
      <v-card>
        <v-card-title
          class="d-flex justify-space-between primary white--text pb-4"
        >
          <span>
            Empresas duplicadas
          </span>
          <v-icon @click="close" class="white--text" left>
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card class="mx-12 my-4" flat>
          <div class="pb-2">
            <span class="font-weight-bold">
              Nota:
            </span>
            Se consideran empresas duplicadas cuando una o más empresas cuentan
            con
            <span class="font-weight-bold secondary--text">
              el mismo nombre
            </span>
          </div>
          <v-divider></v-divider>
          <div
            class="pt-4"
            v-if="companies.length >= 1 && !modalHandler.isLoading"
          >
            <span>
              A continuación
              <span class="font-weight-bold">
                selecciona
              </span>
              la empresa
              <span class="font-weight-bold secondary--text">principal</span>
              el cual será la que se conservara y las demás serán eliminadas:
            </span>
          </div>
        </v-card>
        <v-card-text class="text-center" v-if="modalHandler.isLoading">
          <v-sheet color="white" height="400" width="800" class="ml-7">
            <v-progress-circular
              style="margin-top:25%"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-sheet>
        </v-card-text>
        <v-card-text
          v-if="companies.length === 0 && !modalHandler.isLoading"
          class="pt-10"
        >
          <v-card
            height="300"
            flat
            class="d-flex justify-center align-center text-no-duplicate"
          >
            <v-icon large color="success" class="mr-2">
              mdi-check-circle-outline
            </v-icon>
            No existen empresas duplicados
          </v-card>
        </v-card-text>
        <v-card-text
          v-if="companies.length >= 1 && !modalHandler.isLoading"
          class="pa-12"
        >
          <v-card
            outlined
            v-for="(groupCompany, index) in companies"
            :key="index"
            class="mb-4 group-company"
            hover
          >
            <v-card-title class="py-2 primary white--text">
              {{ groupCompany.list[0].name }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-list
                v-for="(company, index) in groupCompany.list"
                :key="index"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small class="mr-2 mb-1">mdi-domain</v-icon>
                      <span>{{ company.name }}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="company.address" class="pt-2">
                      <span>{{ company.address }}</span>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="pt-2">
                      Propietario actual:
                      <span class="font-weight-bold">
                        <!-- {{ company.owner.user.name
                        }}{{ company.owner.user.lastName }} -->
                        <pre>
                              {{ company }}
                        </pre>
                      </span>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="py-2">
                      <span v-if="company.address">{{ company.address }}</span>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <span
                        v-if="company.contacts.length === 1"
                        class="cursorStyle font-weight-bold"
                      >
                        <v-icon x-small class="mb-1">
                          mdi-account
                        </v-icon>
                        {{ company.contacts[0].name }}
                      </span>
                      <v-menu allow-overflow>
                        <template v-slot:activator="{ on: menu, attrs }">
                          <v-tooltip top color="white">
                            <template v-slot:activator="{ on: tooltip }">
                              <v-chip
                                outlined
                                v-show="company.contacts.length > 1"
                                v-bind="attrs"
                                v-on="{ ...tooltip, ...menu }"
                                small
                              >
                                <v-icon x-small class="mr-1">
                                  mdi-account
                                </v-icon>
                                + {{ company.contacts.length }}
                              </v-chip>
                            </template>
                            <span class="black--text">
                              Este contacto cuenta con más de una empresa has
                              click para ver
                            </span>
                          </v-tooltip>
                        </template>
                        <v-list>
                          <v-list-item
                            v-for="(contact, index) in company.contacts"
                            :key="index"
                            dense
                          >
                            <v-icon class="mr-2" x-small>mdi-account</v-icon>
                            <span>
                              {{ contact.name }}
                            </span>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      <v-tooltip top color="white">
                        <template v-slot:activator="{ on: tooltip }">
                          <v-chip outlined class="ml-4" small v-on="tooltip">
                            <v-icon x-small class="mr-1">
                              mdi-handshake
                            </v-icon>
                            {{ company.counts ? company.counts.openDeals : 0 }}
                          </v-chip>
                        </template>
                        <span class="black--text">
                          Tratos
                        </span>
                      </v-tooltip>
                      <v-tooltip top color="white">
                        <template v-slot:activator="{ on: tooltip }">
                          <v-chip outlined class="ml-4" small v-on="tooltip">
                            <v-icon x-small class="mr-1">
                              mdi-calendar
                            </v-icon>
                            {{
                              company.counts
                                ? company.counts.totalActivities
                                : 0
                            }}
                          </v-chip>
                        </template>
                        <span class="black--text">
                          Actividades
                        </span>
                      </v-tooltip>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <span class="mb-2">
                        creado el {{ company.createdAt | timeZone('LL') }}
                        por
                      </span>
                      <span class="font-weight-bold secondary--text">
                        {{ company.createdBy.user.name }}
                        {{ company.createdBy.user.lastName }}
                      </span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="action">
                    <v-radio-group v-model="keepCompany.id">
                      <v-radio label="Principal" :value="company.id"></v-radio>
                    </v-radio-group>
                  </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
              </v-list>
            </v-card-text>
            <v-card-actions class="pa-5 justify-end">
              <v-btn
                :disabled="checkSelectCompany(groupCompany.list)"
                tile
                color="secondary"
                @click="formatCompanies(groupCompany.list)"
                :loading="isFuseLoading"
              >
                Fusionar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
        <v-card-actions class="pa-5 justify-end">
          <v-btn
            class="mr-8"
            large
            tile
            outlined
            color="primary"
            @click="close"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-row>
</template>

<script>
import { FUSE_COMPANIES } from '@/graphql/mutations/companiesMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  mixins: [modalsAlertsMixin],
  props: {
    companies: {
      required: false,
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false };
      },
    },
  },
  data() {
    return {
      isFuseLoading: false,
      keepCompany: { id: '' },
    };
  },
  methods: {
    checkSelectCompany(groupCompanies) {
      const checkExist = groupCompanies.some(
        ({ id }) => id === this.keepCompany.id,
      );
      return !checkExist;
    },
    formatCompanies(companies) {
      const deleteCompanies = companies
        .filter(({ id }) => id !== this.keepCompany.id)
        .map(({ id }) => {
          return { id };
        });
      this.fuseCompanies(this.keepCompany, deleteCompanies);
    },
    fuseCompanies(keep, deleteCompanies) {
      this.isFuseLoading = true;
      this.$apollo
        .mutate({
          mutation: FUSE_COMPANIES,
          variables: {
            input: {
              keep,
              delete: deleteCompanies,
            },
          },
        })
        .then(({ data: { fuseCompanies } }) => {
          this.isFuseLoading = false;
          this.$emit('correctDuplicate', 'COMPANY', fuseCompanies);
        })
        .catch(() => {
          this.isFuseLoading = false;
          const error =
            'No se ha podido fusionar la empresa, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    close() {
      this.$emit('close', { isOpen: false, isLoading: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .action .group-company .text-no-duplicate } from ../../../../scss/components/modal.companies.duplicate';
</style>
