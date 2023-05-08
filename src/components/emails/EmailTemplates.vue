<template>
  <v-row>
    <v-col cols="12" class="d-flex align-center justify-space-between primary">
      <span class="white--text ml-4">Plantillas</span>

      <v-btn
        small
        fab
        color="secondary"
        @click="changeModal({ id: 'createTemplateEmail', status: true })"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-card flat tile>
        <v-data-table
          :items="listTemplates"
          :loading="$apollo.queries.emailTemplates.loading"
          :page="page"
          hide-default-footer
        >
          <template v-slot:body="{ items }">
            <tr v-if="!items || items.length === 0">
              <td scope="row" colspan="3" class="text-center py-3">
                No hay plantillas disponibles
              </td>
            </tr>
            <draggable
              v-else
              v-model="listTemplates"
              tag="tbody"
              @change="changeOrder"
            >
              <tr v-for="item in items" :key="item.id">
                <td scope="row">
                  {{ item.name }}
                </td>
                <td>
                  <v-tooltip bottom v-if="!item.shared">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on">
                        mdi-email-lock
                      </v-icon>
                    </template>
                    <span>Solo yo</span>
                  </v-tooltip>
                  <v-tooltip bottom v-else>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on">
                        mdi-account-group
                      </v-icon>
                    </template>
                    <span>Compártido</span>
                  </v-tooltip>
                </td>
                <td class="text-right">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        @click="useTemplate(item)"
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon small>
                          mdi-email-send
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Enviar correo</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-if="item.myTemplate"
                        icon
                        @click="editItem(item)"
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon small>
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Editar</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-if="item.myTemplate"
                        icon
                        @click="remove(item)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon small>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Eliminar</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon>
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-menu
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Mover</span>
                  </v-tooltip>
                </td>
              </tr>
            </draggable>
          </template>
          <template v-slot:footer="{ props }">
            <div v-if="props.pagination.pageCount > 0">
              <v-divider></v-divider>
              <div class="d-flex justify-center mt-4 pb-6">
                <v-btn outlined class="mr-6" @click="backPage()">
                  <v-icon large>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn outlined>
                  {{ props.pagination.page }} De
                  {{ props.pagination.pageCount }}
                </v-btn>
                <v-btn
                  outlined
                  class="ml-6"
                  @click="nextPage(props.pagination.pageCount)"
                >
                  <v-icon large>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <BaseModalDeleteItem
      :dialog.sync="isOpenDelete"
      :config="configModalDelete"
      :isLoading="isLoadingDelete"
      :item="itemSelected"
      @remove="removeTemplate"
    ></BaseModalDeleteItem>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-row>
</template>

<script>
// Libraries
import draggable from 'vuedraggable';
// Local state
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
// Queries
import { GET_TEMPLATES_EMAIL } from '@/graphql/querys/templateEmailsQuery';
// Mutations
import {
  UPDATE_TEMPLATE_EMAIL,
  DELETE_TEMPLATE_EMAIL,
} from '@/graphql/mutations/templateEmailsMutations';
// Templates
import BaseModalDeleteItem from '@/components/ui/BaseModalDeleteItem.vue';
// Mixins
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  name: 'EmailTemplates',
  components: {
    BaseModalDeleteItem,
    draggable,
  },
  mixins: [modalMethodsMixin, modalApolloMixin, modalsAlertsMixin],
  data() {
    return {
      isLoading: false,
      emailTemplatesOrder: [],
      isEdit: false,
      editedItem: {},
      page: 1,
      isLoadingDelete: false,
      configModalDelete: {
        title: 'Eliminar plantilla',
        subtitle: 'Estas por eliminar una plantilla',
        description: 'Se eliminara la plantilla de tu cuenta, ¿estás seguro?',
      },
      itemSelected: {},
      isOpenDelete: false,
      emailTemplates: [],
      headers: [
        {
          text: 'Nombre de plantilla',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { align: 'center', value: 'shared', sortable: false },
        { align: 'end', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    listTemplates: {
      // Get list with order
      get() {
        const listOrder = this.emailTemplates.filter((template) =>
          this.emailTemplatesOrder.includes(template.id),
        );
        const listWithoutOrder = this.emailTemplates.filter(
          (template) => !this.emailTemplatesOrder.includes(template.id),
        );
        return listOrder
          .slice(0)
          .sort((a, b) => {
            return (
              this.emailTemplatesOrder.indexOf(a.id) -
              this.emailTemplatesOrder.indexOf(b.id)
            );
          })
          .concat(...listWithoutOrder);
      },
      // Set new list ordered
      set(newListOrdered) {
        this.emailTemplatesOrder = newListOrdered.map(
          (template) => template.id,
        );
      },
    },
  },
  methods: {
    nextPage(totalPages) {
      if (totalPages !== this.page) {
        // eslint-disable-next-line no-unused-expressions
        this.page += 1;
        // this.updatePage(nextPage);
      }
    },
    backPage() {
      if (this.page !== 1) {
        this.page -= 1;
      }
    },
    useTemplate(template) {
      const newTemplate = JSON.parse(JSON.stringify(template));
      this.changeModal({
        id: 'sendEmail',
        status: true,
        isEdit: true,
        item: newTemplate,
      });
    },
    changeOrder({
      moved: {
        element: { id, name, shared },
      },
    }) {
      const template = { id, name, shared, order: this.emailTemplatesOrder };
      this.updateOrderTemplate(template);
    },
    updateOrderTemplate({ id, name, shared, order }) {
      this.$apollo
        .mutate({
          mutation: UPDATE_TEMPLATE_EMAIL,
          variables: {
            emailTemplateInput: {
              id,
              order,
            },
          },
          update: (store, { data: { updateEmailTemplate } }) => {
            // Update template
            const data = store.readQuery({ query: GET_TEMPLATES_EMAIL });
            // Find the template and update
            const indexTemplate = data.emailTemplates.findIndex(
              (template) => template.id === updateEmailTemplate.id,
            );
            data.emailTemplates[indexTemplate] = {
              ...updateEmailTemplate,
              myTemplate: true,
            };
            // Write our data back to the cache.
            store.writeQuery({ query: GET_TEMPLATES_EMAIL, data });

            // Update userCurrent
            const dataOrder = store.readQuery({ query: GET_USER_LOGGED });
            dataOrder.userCurrent.emailTemplatesOrder = order;
            store.writeQuery({ query: GET_USER_LOGGED, data: dataOrder });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateEmailTemplate: {
              __typename: 'EmailTemplate',
              id,
              shared,
              myTemplate: true,
              name,
            },
          },
        })
        .then(() => {
          // console.log(data);
          this.isLoading = false;
        })
        .catch(() => {
          const error =
            'No se pudo actualizar la plantilla, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
          this.isLoading = false;
        });
    },
    editItem(item) {
      this.changeModal({
        id: 'createTemplateEmail',
        status: true,
        isEdit: true,
        item,
      });
    },
    closeModalRemove() {
      this.changeModal({ id: 'deleteTemplateEmail', status: false });
    },
    remove(item) {
      this.itemSelected = item;
      this.changeModal({ id: 'deleteTemplateEmail', status: true });
    },
    removeTemplate(id) {
      this.isLoadingDelete = true;
      this.$apollo
        .mutate({
          mutation: DELETE_TEMPLATE_EMAIL,
          variables: {
            emailTemplateId: id,
          },
          update: (store, { data: { deleteEmailTemplate } }) => {
            const data = store.readQuery({ query: GET_TEMPLATES_EMAIL });

            const indexTemplate = data.emailTemplates.findIndex(
              (template) => template.id === deleteEmailTemplate.id,
            );
            data.emailTemplates.splice(indexTemplate, 1);
            store.writeQuery({ query: GET_TEMPLATES_EMAIL, data });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteEmailTemplate: {
              __typename: 'EmailTemplate',
              id,
            },
          },
        })
        .then(() => {
          // console.log(data);
          this.closeModalRemove();
          this.isLoadingDelete = false;
        })
        .catch(() => {
          const error =
            'No se pudo eliminar la plantilla, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
          this.closeModalRemove();
          this.isLoadingDelete = false;
        });
    },
  },
  apollo: {
    emailTemplates: {
      query: GET_TEMPLATES_EMAIL,
    },
    emailTemplatesOrder: {
      query: GET_USER_LOGGED,
      update({ userCurrent }) {
        return userCurrent.emailTemplatesOrder;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .v-data-table } from ../../../../scss/components/email.templates';
</style>
