<template>
  <v-dialog v-model="modal.status" scrollable max-width="330px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        Actividad completada
        <v-spacer />
        <v-btn icon color="white" @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <p class="text-center">¿Fué efectiva?</p>
        <v-row>
          <v-col class="text-center">
            <v-btn
              color="error"
              :outlined="effective.status !== false"
              @click="effective.status = false"
              :elevation="effective.status === false ? 10 : 0"
              class="mr-5"
            >
              <v-icon>mdi-close</v-icon>
              <span v-if="effective.status === false">No</span>
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn
              :outlined="effective.status !== true"
              color="success"
              @click="effective.status = true"
              :elevation="effective.status ? 10 : 0"
            >
              <v-icon>mdi-check</v-icon>
              <span v-if="effective.status === true">Si</span>
            </v-btn>
          </v-col>
        </v-row>
        <p v-if="!isValidateEffective" class="red--text">Elige una opción</p>
        <v-textarea
          v-model="effective.comments"
          class="mt-7"
          v-if="effective.status === false"
          outlined
          label="¿Por qué no fue efectiva?"
          rows="2"
          hide-details="auto"
        ></v-textarea>
        <p v-if="!isValidateComments" class="red--text">
          Escribe un comentario
        </p>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions class="pt-4">
        <v-btn outlined color="primary" @click="cancel">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="save" :loading="isLoading">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';

export default {
  name: 'ModalEffective',
  mixins: [modalMethodsMixin, modalApolloMixin],
  props: {
    modalIdDefault: {
      type: String,
      default: 'modalEffective',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    reset: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modalId: this.modalIdDefault,
      modal: {},
      effective: {
        status: null,
        comments: '',
      },
      isValidateEffective: true,
      isValidateComments: true,
    };
  },
  watch: {
    reset() {
      this.effective.status = null;
      this.effective.comments = '';
      this.isValidateEffective = true;
      this.isValidateComments = true;
    },
    'modal.status': {
      handler(newValue) {
        if (!newValue) {
          this.isValidateEffective = true;
          this.isValidateComments = true;
          this.effective = {
            status: null,
            comments: '',
          };
        }
      },
    },
    'effective.status': {
      handler(newValue) {
        if (newValue !== null) {
          this.isValidateEffective = true;
        }
      },
    },
    'effective.comments': {
      handler(newValue) {
        if (newValue !== '') {
          this.isValidateComments = true;
        }
      },
    },
  },
  methods: {
    close() {
      this.changeModal({
        id: this.modalId,
        status: false,
        isEdit: false,
        item: null,
      });
    },
    cancel() {
      this.$emit('cancel');
      this.close();
    },
    save() {
      this.validateFields();
      if (this.isValidateEffective && this.isValidateComments) {
        this.$emit('save', this.effective);
        this.close();
      }
    },
    validateFields() {
      if (this.effective.status === null) {
        this.isValidateEffective = false;
      }
      if (this.effective.status === false && this.effective.comments === '') {
        this.isValidateComments = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
