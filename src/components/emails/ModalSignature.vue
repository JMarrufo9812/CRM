<template>
  <v-dialog v-model="isOpen" scrollable max-width="650px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        Agregar firma
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-2">
        <v-form>
          <v-row>
            <v-col>
              <EmailEditorSignature
                :signature.sync="signature"
                :signatureBefore="userEnterpriseSignature.signature"
                :reset="isOpen"
              ></EmailEditorSignature>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          color="success"
          :disabled="!hasChanges || !hasSignatured"
          @click="saveSignature"
        >
          Guardar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" outlined @click="close">
          Cancelar
        </v-btn>
        <v-btn color="secondary" :disabled="!hasSignatured" @click="addToEmail">
          Añadir al correo
        </v-btn>
      </v-card-actions>
      <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    </v-card>
  </v-dialog>
</template>

<script>
import { CREATE_SIGNATURE } from '@/graphql/mutations/emailsMutations';
import { GET_SIGNATURE } from '@/graphql/querys/emailsQuery';
import EmailEditorSignature from '@/components/emails/EmailEditorSignature.vue';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  name: 'ModalSignature',
  mixins: [modalsAlertsMixin],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    EmailEditorSignature,
  },
  data() {
    return {
      // starting editor's content
      isValidSignature: true,
      signature: '',
      isLoading: false,
      isLoadingRemove: false,
      userEnterpriseSignature: { signature: '' },
    };
  },
  computed: {
    hasChanges() {
      return this.userEnterpriseSignature.signature !== this.signature;
    },
    hasSignatured() {
      return (
        this.signature.length > 0 &&
        this.signature !== '' &&
        this.signature !== '<div></div>'
      );
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    addToEmail() {
      this.$emit('save', this.signature);
    },
    saveSignature() {
      this.isLoading = true;
      this.$apollo
        .mutate({
          // Query
          mutation: CREATE_SIGNATURE,
          // Parameters
          variables: {
            userEnterpriseInput: {
              signature: this.signature,
            },
          },
        })
        .then(() => {
          // console.log('result', result);
          this.userEnterpriseSignature.signature = this.signature;
          this.isLoading = false;
        })
        .catch(() => {
          const error =
            'No se pudo agregar la firma, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
          this.isLoading = false;
        });
    },
  },
  apollo: {
    userEnterpriseSignature: {
      query: GET_SIGNATURE,
    },
  },
};
</script>

<style lang="scss" scoped></style>
