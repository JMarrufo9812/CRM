<template>
  <v-dialog v-model="dialog" width="650" scrollable persistent>
    <v-card>
      <v-card-title class="primary white--text py-2">
        Subir archivo
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="mt-4">
        <vue-dropzone
          id="dropZone"
          ref="dropzone"
          :options="dropOptions"
          :useCustomSlot="true"
          :include-styling="false"
          @vdropzone-drag-over.stop="startDragging"
          @vdropzone-drag-leave="endDragging"
          @vdropzone-drop="endDragging"
          @vdropzone-success="dragUploadFile"
          @vdropzone-error="getError"
          @vdropzone-total-upload-progress="uploadProgress"
        >
          <v-card
            :disabled="isUploadProgress"
            color="#F0F0F0"
            outlined
            class="dropzone-custom-content pa-12"
            :class="[{ 'blur-drop-zone': dragging }]"
          >
            <v-col cols="12" align="center" class="pb-0">
              <v-progress-linear
                v-if="isUploadProgress"
                class="mb-4"
                color="green"
                height="2"
                :value="progress"
              ></v-progress-linear>
              <v-icon v-if="!isSuccessUpload" x-large>
                mdi-file-download-outline
              </v-icon>
              <v-icon v-else x-large>mdi-file-outline</v-icon>
            </v-col>
            <v-card-title class="dropzone-custom-title justify-center">
              <span v-if="!isSuccessUpload" class="text-center">
                Arrastra y suelta o elige un archivo para cargar
              </span>
              <span v-else>
                {{ file.name }}
              </span>
            </v-card-title>
            <v-card-subtitle class="subtitle text-center">
              <v-btn
                v-if="isSuccessUpload"
                @click="removeDocumentUpload"
                text
                small
                color="error"
              >
                Eliminar
              </v-btn>
            </v-card-subtitle>
          </v-card>
        </vue-dropzone>

        <v-form ref="formFile">
          <v-textarea
            v-model="description"
            class="pt-4"
            outlined
            label="Descripción"
            counter="140"
            maxlength="140"
          ></v-textarea>
        </v-form>

        <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn class="mr-8" large tile outlined color="primary" @click="close">
          Cancelar
        </v-btn>
        <v-btn
          large
          tile
          normal
          color="secondary"
          :loading="isLoading"
          :disabled="!isSuccessUpload"
          @click="uploadFile(typeItem, itemId, file, description)"
        >
          Agregar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import vueDropzone from 'vue2-dropzone';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { filesMixin } from '@/mixins/filesMixin';

const getTemplate = () => `
     <span></span>
`;

export default {
  name: 'ModalFile',
  components: {
    vueDropzone,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    itemId: {
      isRequired: true,
    },
    typeItem: {
      isRequired: true,
    },
  },
  mixins: [modalsAlertsMixin, filesMixin],
  data() {
    return {
      file: null,
      description: '',
      isSuccessUpload: false,
      dragging: false,
      isUploadProgress: false,
      progress: 0,
      dropOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 5, // MB
        maxFiles: 1,
        acceptedFiles:
          '.png, .jpeg, .jpg, .JPG, .svg, .webp, .pdf, .zip, .rar, .xml, .txt, .pdf, .xls, .xslx, .xlsx, .doc, .docx, .ods, .ppsx',
        addRemoveLinks: false,
        previewTemplate: getTemplate(),
      },
      // .....................
      isLoading: false,
    };
  },
  watch: {
    isSuccessUpload(value) {
      if (value) {
        this.$refs.dropzone.disable();
        this.isUploadProgress = false;
      } else {
        this.$refs.dropzone.enable();
      }
    },
  },
  methods: {
    startDragging() {
      this.dragging = true;
    },
    endDragging() {
      this.dragging = false;
    },
    dragUploadFile(file) {
      this.file = file;
      this.isSuccessUpload = true;
    },
    getError({ accepted }) {
      let error = '';
      if (!accepted) {
        error = 'El archivo que seleccionaste no es valido';
      } else {
        error =
          'Ocurrio un error al subir el archivo intentelo de nuevo o contacte a soporte';
      }
      this.modalHandlerError({ isOpen: true, error });
    },
    removeDocumentUpload() {
      if (this.isSuccessUpload) {
        this.$refs.dropzone.removeFile(this.file);
      }
      this.file = null;
      this.isSuccessUpload = false;
      this.isUploadProgress = false;
    },
    uploadProgress(totaluploadprogress) {
      this.isUploadProgress = true;
      this.progress = totaluploadprogress;
    },
    close() {
      this.$emit('update:dialog', false);
      this.resetValues();
    },
    resetValues() {
      this.$refs.formFile.reset();
      this.description = '';
      this.removeDocumentUpload();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .dropzone-custom-content  .blur-drop-zone .center-info } from ../../../../scss/components/modal.file';
</style>
