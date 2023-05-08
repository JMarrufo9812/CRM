<template>
  <div>
    <v-card
      tile
      height="4em"
      class="mt-1 mb-2 d-flex align-center justify-space-between primary"
    >
      <span class="white--text pl-8 title-custom-fields">
        Configuración de formularios
      </span>

      <v-menu offset-y ransition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn small class="mr-10" color="secondary" fab depressed v-on="on">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="
              modalHandlerCustomFields({
                isOpen: true,
                isLoading: false,
                isEdit: false,
              })
            "
          >
            <v-icon left>mdi-domain-plus</v-icon>
            Agregar campo
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card>
    <div class="d-flex">
      <v-card tile width="11.5em" class="mr-1" outlined>
        <div class="d-flex justify-center py-1 header-custom-fields-box">
          <span>Formularios</span>
        </div>
        <v-divider></v-divider>
        <v-list flat>
          <v-list-item-group color="secondary">
            <v-list-item exact to="/settings/enterprise/custom-fields/contacts">
              <v-list-item-icon>
                <v-icon>mdi-account-tie</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Contactos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              exact
              to="/settings/enterprise/custom-fields/companies"
            >
              <v-list-item-icon>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Empresas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item exact to="/settings/enterprise/custom-fields/deals">
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
        <div class="d-flex justify-center py-1 header-custom-fields-box">
          <span>Formulario de {{ nameSection }}</span>
        </div>
        <v-divider></v-divider>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
          height="6"
          absolute
          color="primary"
        ></v-progress-linear>
        <v-card v-if="isError" height="800">
          <BaseErrorComponent :info="infoError" />
        </v-card>
        <v-card v-else class="scroll" height="90%" flat>
          <draggable
            v-model="formSelected.inputs"
            animation="200"
            @change="changeOrderInput"
          >
            <v-card
              v-for="input in formSelected.inputs"
              :key="input.order"
              :disabled="isLoading"
              class="py-2 my-4 mx-6 d-flex align-center justify-space-between"
              outlined
            >
              <div class="d-inline-block text-truncate">
                <v-icon small class="curso-style ml-4 mr-2">
                  mdi-menu
                </v-icon>
                <span class="label-fields">{{ input.label }}</span>
                <b v-show="input.isRequired" class="red--text">
                  *
                </b>
              </div>
              <div class="d-flex">
                <v-btn
                  v-if="!input.isDefault"
                  class="mr-1"
                  outlined
                  x-small
                  @click="deleteInputConfirmation(input.id)"
                >
                  <v-icon small>
                    mdi-delete
                  </v-icon>
                </v-btn>
                <v-btn
                  v-if="!input.isDefault"
                  class="mr-2"
                  x-small
                  @click="editInput(input)"
                  color="secondary"
                >
                  <v-icon small>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </div>
            </v-card>
          </draggable>
        </v-card>
      </v-card>
    </div>
    <ModalCustomField
      :forForm="formSelected.type"
      :modalHandler="modalCustomField"
      :editField="editField"
      @outData="createCustomField"
      @outDataEdit="updateInput"
      @close="modalHandlerCustomFields"
    />
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="deleteInput"
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
import draggable from 'vuedraggable';
import { UTIL_ORDER } from '@/helpers/utils';
import { GET_FORM } from '@/graphql/querys/formsQuery';
import {
  UPDATE_ORDER_INPUTS,
  UPDATE_INPUT,
  DELETE_INPUT,
} from '@/graphql/mutations/customFieldsMutations';
import { customFieldsMixin } from '@/mixins/customFieldsMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { snackbarMixin } from '@/mixins/alerts/snackbarMixin';

export default {
  components: {
    BaseErrorComponent: () => import('@/components/ui/BaseErrorComponent.vue'),
    ModalCustomField: () =>
      import('@/components/customFields/ModalCustomField.vue'),
    draggable,
  },
  mixins: [customFieldsMixin, modalsAlertsMixin, snackbarMixin],
  data() {
    return {
      isLoading: false,
      isError: false,
      infoError: {
        icon: 'mdi-alert',
        title: 'error',
        message: 'No se ha podido cargar el formulario',
      },
      type: this.$route.params.section,
      formSelected: { type: 'CONTACT' },
      editField: {},
    };
  },
  watch: {
    isUpdateInputs(value) {
      if (value) {
        this.getForm(this.formSelected.type);
        this.isUpdateInputs = false;
      }
    },
    $route: {
      handler(to) {
        if (to.params.section === 'contacts') {
          this.formSelected = { type: 'CONTACT' };
          this.getForm('CONTACT');
        }
        if (to.params.section === 'companies') {
          this.formSelected = { type: 'COMPANY' };
          this.getForm('COMPANY');
        }
        if (to.params.section === 'deals') {
          this.formSelected = { type: 'DEAL' };
          this.getForm('DEAL');
        }
        if (
          to.params.section === '' ||
          to.params.section === null ||
          to.params.section === undefined
        ) {
          this.$router.push({
            path: '/settings/enterprise/custom-fields/contacts',
          });
        }
      },
      immediate: true,
    },
  },
  computed: {
    nameSection() {
      if (this.$route.params.section === 'contacts') {
        return 'Contactos';
      }
      if (this.$route.params.section === 'companies') {
        return 'Empresas';
      }
      if (this.$route.params.section === 'deals') {
        return 'Tratos';
      }
      return '';
    },
  },
  methods: {
    getForm(type) {
      this.isLoading = true;
      this.$apollo
        .query({
          query: GET_FORM,
          fetchPolicy: 'no-cache',
          variables: {
            type,
          },
        })
        .then(
          ({
            data: {
              getForm: { forForm, customForm, defaultForm },
            },
          }) => {
            this.formSelected = this.formatInputs(
              forForm,
              customForm,
              defaultForm,
            );
            this.isLoading = false;
          },
        )
        .catch(() => {
          this.isError = true;
        });
    },
    editInput(input) {
      this.editField = input;
      this.modalHandlerCustomFields({
        isOpen: true,
        isLoading: false,
        isEdit: true,
      });
    },
    deleteInputConfirmation(id) {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: { nameItem: 'El campo', text: 'será eliminado' },
        infoDelete: {
          id,
        },
      });
    },
    deleteInput({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      const input = infoDelete.id;
      this.$apollo
        .mutate({
          mutation: DELETE_INPUT,
          variables: {
            input,
          },
          // update: (
          //   store,
          //   {
          //     data: {
          //       deleteCustomField: {
          //         customForm: { inputs },
          //       },
          //     },
          //   },
          // ) => {
          //   const data = store.readQuery({
          //     query: GET_FORM,
          //     variables: {
          //       type: this.formSelected.type,
          //     },
          //   });
          //   data.getForm.customForm.inputs = inputs;
          //   store.writeQuery({
          //     query: GET_FORM,
          //     variables: {
          //       type: this.formSelected.type,
          //     },
          //     data,
          //   });
          // },
        })
        .then(
          ({
            data: {
              deleteCustomField: { forForm, customForm, defaultForm },
            },
          }) => {
            this.modalHandlerDelete({
              isOpen: false,
              isLoading,
              message,
              infoDelete,
            });
            const { inputs } = this.formatInputs(
              forForm,
              customForm,
              defaultForm,
            );
            const orderInputs = inputs.map(({ id, isDefault }, index) => {
              return { id, order: index + 1, isDefault };
            });
            this.updateOrderForm(orderInputs);
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'Se eliminó el campo correctamente',
            });
          },
        )
        .catch(() => {
          const error =
            'No se pudo eliminar el campo, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    formatInputs(forForm, customForm, defaultForm) {
      const defaultInputs = defaultForm.inputs.map((input) => {
        input.isDefault = true; // eslint-disable-line
        return input;
      });

      const customInputs = customForm.inputs?.map((input) => {
        input.isDefault = false; // eslint-disable-line
        return input;
      });
      const inputs = customInputs
        ? defaultInputs.concat(customInputs)
        : defaultInputs;
      const orderInputs = UTIL_ORDER({
        listItems: inputs,
        orderBy: 'ASC',
        nextElement: 'order',
      });
      return { type: forForm, inputs: orderInputs };
    },
    changeOrderInput({ moved: { newIndex, oldIndex } }) {
      const copyArray = JSON.parse(JSON.stringify(this.formSelected.inputs));
      const oldObjectToEdit = copyArray.find(
        (item, index) => index === oldIndex,
      );
      const newObjectToEdit = copyArray.find(
        (item, index) => index === newIndex,
      );
      copyArray[oldIndex] = oldObjectToEdit;
      copyArray[newIndex] = newObjectToEdit;
      const inputs = copyArray.map((input, index) => {
        input.order = index + 1; // eslint-disable-line
        return {
          id: input.id,
          order: input.order,
          isDefault: input.isDefault,
        };
      });
      this.updateOrderForm(inputs);
    },
    updateOrderForm(inputs) {
      this.$apollo
        .mutate({
          mutation: UPDATE_ORDER_INPUTS,
          variables: {
            forForm: this.formSelected.type,
            inputs,
          },
        })
        .then(
          ({
            data: {
              updateOrderInputs: { forForm },
            },
          }) => {
            this.getForm(forForm);
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'Se actualizo el orden correctamente',
            });
          },
        )
        .catch(() => {
          const error =
            'No se pudo actualizar el orden, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    updateInput(forForm, { id, type, label, items, isRequired }) {
      this.isLoading = true;
      this.modalHandlerCustomFields({
        isOpen: true,
        isLoading: true,
        isEdit: false,
      });
      this.$apollo
        .mutate({
          mutation: UPDATE_INPUT,
          variables: {
            input: {
              id,
              type,
              label,
              items,
              isRequired,
              isMultiple: false,
            },
          },
          // update: (store, { data: { updateCustomField } }) => {
          //   const data = store.readQuery({
          //     query: GET_FORM,
          //     variables: {
          //       type: forForm,
          //     },
          //   });
          //   data.getForm.customForm.inputs = data.getForm.customForm.inputs.map(
          //     (input) => {
          //       if (input.id === updateCustomField.id) {
          //         // eslint-disable-next-line
          //         input = updateCustomField;
          //       }
          //       return input;
          //     },
          //   );
          //   store.writeQuery({
          //     query: GET_FORM,
          //     variables: {
          //       type: forForm,
          //     },
          //     data,
          //   });
          // },
        })
        .then(() => {
          this.getForm(forForm);
          this.isLoading = false;
          this.modalHandlerCustomFields({
            isOpen: false,
            isLoading: false,
            isEdit: false,
          });
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'El campo se actualizo correctamente',
          });
        })
        .catch(() => {
          const error =
            'No se pudo actualizar el campo intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .header-custom-fields-box .title-custom-fields .label-fields .cursor-style .scroll} from ../../../../scss/components/custom.fields.settings';
</style>
