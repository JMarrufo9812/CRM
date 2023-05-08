<template>
  <div>
    <v-card
      height="4em"
      class="mt-1 mb-2 d-flex align-center justify-space-between primary"
    >
      <span class="white--text pl-8 title-tags">
        Configuración de etiquetas
      </span>
      <v-menu offset-y ransition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn
            class="mr-10"
            :disabled="customTags.length >= 10"
            small
            color="secondary"
            fab
            depressed
            v-on="on"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="
              modalHandlerTag({
                isOpen: true,
                isEdit: false,
                isLoading: false,
                info: {},
              })
            "
          >
            <v-icon left>mdi-tag-outline</v-icon>
            Añadir etiqueta
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card>

    <div class="d-flex">
      <v-card tile width="11.5em" class="mr-1" outlined>
        <div class="d-flex justify-center header-tags-box py-1">
          <span>Etiquetas</span>
        </div>
        <v-divider></v-divider>
        <v-list flat>
          <v-list-item-group color="secondary">
            <v-list-item exact to="/settings/enterprise/tags/contacts">
              <v-list-item-icon>
                <v-icon>mdi-account-tie</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Contactos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item exact to="/settings/enterprise/tags/companies">
              <v-list-item-icon>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Empresas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item exact to="/settings/enterprise/tags/deals">
              <v-list-item-icon>
                <v-icon>mdi-handshake-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Tratos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-card tile width="23em" outlined height="25em">
        <div class="d-flex justify-center py-1 header-tags-box">
          <span class="mr-12">Etiquetas de {{ sectionSelected.name }}</span>
          <span>{{ customTags.length }}/10</span>
        </div>
        <v-divider></v-divider>
        <v-progress-linear
          :active="$apollo.queries.customTags.loading"
          :indeterminate="$apollo.queries.customTags.loading"
          height="6"
          absolute
          color="primary"
        ></v-progress-linear>
        <BaseErrorComponent v-if="isErrorGetTags" :info="infoError" />
        <v-card
          flat
          class="scroll"
          height="90%"
          :disabled="$apollo.queries.customTags.loading"
        >
          <v-list>
            <div
              class="d-flex justify-space-between pa-4"
              v-for="(tag, index) in customTags"
              :key="index"
            >
              <div>
                <v-chip
                  small
                  :color="tag.color"
                  :text-color="getBestColor(tag.color)"
                >
                  <v-avatar left>
                    <v-icon small>mdi-tag</v-icon>
                  </v-avatar>
                  {{ tag.name }}
                </v-chip>
              </div>
              <div class="d-flex mt-1">
                <v-btn
                  class="mr-1"
                  @click.stop="
                    modalHandlerTag({
                      isOpen: true,
                      isLoading: false,
                      isEdit: true,
                      info: tag,
                    })
                  "
                  x-small
                  color="secondary"
                >
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  @click.stop="deleteTagConfirmation(tag.id)"
                  class="align-right"
                  x-small
                  outlined
                >
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </v-list>
        </v-card>
      </v-card>
    </div>
    <ModalTag
      :modalHandler="modalTag"
      @close="modalHandlerTag"
      @outData="createOrEditTag"
    />
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="deleteTag"
    />
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    <v-snackbar
      v-model="snackbar.isOpen"
      :color="snackbar.color"
      :timeout="5000"
    >
      {{ snackbar.text }}
      <template v-slot:action>
        <v-btn
          text
          @click="snackbarHandler({ isOpen: false, color: '', text: '' })"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { tagsMixin } from '@/mixins/tagsMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { GET_TAGS } from '@/graphql/querys/tagsQuery';
import {
  CREATE_TAG,
  DELETE_TAG,
  UPDATE_TAG,
} from '@/graphql/mutations/tagsMutations';
import { UTIL_ORDER } from '@/helpers/utils';
import { snackbarMixin } from '@/mixins/alerts/snackbarMixin';

export default {
  mixins: [tagsMixin, modalsAlertsMixin, snackbarMixin],
  components: {
    ModalTag: () => import('@/components/tags/ModalTag.vue'),
  },
  data() {
    return {
      customTags: [],
      modalTag: { isOpen: false, isEdit: false, isLoading: false, info: {} },
      sectionSelected: { name: 'Contacto', type: 'CONTACT' },
      isErrorGetTags: false,
      infoError: {
        icon: '',
        title: '',
        message: '',
      },
    };
  },
  computed: {
    isResponsive() {
      return this.$vuetify.breakpoint.md;
    },
  },
  watch: {
    $route: {
      handler(to) {
        if (to.params.section === 'contacts') {
          this.sectionSelected = { type: 'CONTACT', name: 'contactos' };
        }
        if (to.params.section === 'companies') {
          this.sectionSelected = { type: 'COMPANY', name: 'empresas' };
        }
        if (to.params.section === 'deals') {
          this.sectionSelected = { type: 'DEAL', name: 'tratos' };
        }
      },
      immediate: true,
    },
  },
  methods: {
    deleteTagConfirmation(id) {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          nameItem: 'La etiqueta',
          text: 'será eliminada de forma permanente',
        },
        infoDelete: {
          id,
        },
      });
    },
    modalHandlerTag({ isOpen, isEdit, isLoading, info }) {
      this.modalTag = { isOpen, isEdit, isLoading, info };
    },
    formatTags(tags) {
      const orderedTags = UTIL_ORDER({
        listItems: tags,
        orderBy: 'ASC',
        nextElement: 'order',
      });
      return orderedTags;
    },
    deleteTag({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      this.$apollo
        .mutate({
          mutation: DELETE_TAG,
          variables: {
            customTagId: infoDelete.id,
          },
          update: (store, { data: { deleteCustomTag } }) => {
            const data = store.readQuery({
              query: GET_TAGS,
              variables: {
                filters: {
                  type: this.sectionSelected.type,
                },
              },
            });
            data.customTags = data.customTags.filter(
              ({ id }) => id !== deleteCustomTag.id,
            );
            store.writeQuery({
              query: GET_TAGS,
              variables: {
                filters: {
                  type: this.sectionSelected.type,
                },
              },
              data,
            });
          },
        })
        .then(() => {
          this.modalHandlerDelete({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'La etiqueta se eliminó correctamente',
          });
        })
        .catch(() => {
          const error =
            'No se pudo eliminar la etiqueta, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    countTags() {
      return this.customTags.length;
    },
    createOrEditTag({ isOpen, isLoading, isEdit, info }) {
      this.modalHandlerTag({
        isOpen,
        isLoading,
        isEdit,
        info,
      });
      if (!isEdit) {
        this.$apollo
          .mutate({
            // Query
            mutation: CREATE_TAG,
            // Parameters
            variables: {
              customTagInput: {
                name: info.name,
                color: info.color,
                // Order default is the last number more one
                order: this.countTags() + 1,
                type: this.sectionSelected.type,
              },
            },
            // Update the cache with the result
            // The query will be updated with the optimistic response
            // and then with the real result of the mutation
            update: (store, { data: { createCustomTag } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: GET_TAGS,
                variables: {
                  filters: {
                    type: this.sectionSelected.type,
                  },
                },
              });
              // Add our tag from the mutation to the end
              data.customTags.push(createCustomTag);
              // Write our data back to the cache.
              store.writeQuery({
                query: GET_TAGS,
                variables: {
                  filters: {
                    type: this.sectionSelected.type,
                  },
                },
                data,
              });
            },
          })
          .then(() => {
            this.modalHandlerTag({
              isOpen: false,
              isLoading: false,
              isEdit: false,
              info: {},
            });
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'La etiqueta se creó correctamente',
            });
          })
          .catch(() => {
            const error =
              'No se pudo crear la etiqueta, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      } else {
        this.$apollo
          .mutate({
            // Query
            mutation: UPDATE_TAG,
            // Parameters
            variables: {
              customTagInput: {
                id: info.id,
                name: info.name,
                color: info.color,
                // Order default is the last number more one
                order: info.order,
                type: this.sectionSelected.type,
              },
            },
          })
          .then(() => {
            this.modalHandlerTag({
              isOpen: false,
              isLoading: false,
              isEdit: false,
              info: {},
            });
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'La etiqueta se actualizó correctamente',
            });
          })
          .catch(() => {
            const error =
              'No se pudo actualizar la etiqueta, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
  },
  apollo: {
    customTags: {
      query: GET_TAGS,
      variables() {
        return {
          filters: {
            type: this.sectionSelected.type,
          },
        };
      },
      error({ graphQLErrors }) {
        this.isErrorGetTags = true;
        this.infoError = {
          icon: 'mdi-alert-outline',
          title: `Error ${graphQLErrors[0]?.statusCode}`,
          message: 'No se logró cargar las etiquetas, contacte con soporte',
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .title-tags .header-tags-box .scroll} from ../../../../scss/components/tags.settings';
</style>
