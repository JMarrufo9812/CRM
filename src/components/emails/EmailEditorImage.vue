<template>
  <v-dialog v-model="isOpen" scrollable max-width="430px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        Selecciona una imagen
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-2">
        <v-form ref="form">
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            :include-styling="true"
            :options="dropzoneOptions"
            @vdropzone-files-added="startProcessingFiles"
            @vdropzone-success-multiple="updateFiles"
            @vdropzone-error="getError"
          >
            <v-card>
              <v-card-text class="d-flex justify-center">
                <div>
                  <v-icon large>mdi-image-plus</v-icon>
                  Arrastra o sube una imagen
                </div>
              </v-card-text>
            </v-card>
          </vue-dropzone>
        </v-form>
        <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" outlined @click="close">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :loading="isLoading"
          :disabled="isDisabled || files.length === 0"
          color="secondary"
          @click="saveImages"
        >
          Insertar imagen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import vueDropzone from 'vue2-dropzone';
import { UPLOAD_IMAGE_NOTE } from '@/graphql/mutations/notesMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  name: 'EmailEditorImage',
  components: {
    vueDropzone,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    isBase64: {
      type: Boolean,
      default: false,
    },
    itemId: {
      type: String,
      default: '',
    },
    typeItem: {
      type: String,
      default: '',
    },
  },
  mixins: [modalsAlertsMixin],
  data() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 5,
        uploadMultiple: true,
        acceptedFiles: 'image/*',
        maxFiles: 5,
        addRemoveLinks: true,
        dictDefaultMessage: 'Haz clic aquí o arrastra una imagen para añadirla',
        dictCancelUpload: 'Cancelar',
        dictFileTooBig:
          'El archivo es demasiado grande ({{filesize}}MB). Máx:{{maxFilesize}}MB.',
        dictRemoveFile: 'Eliminar',
      },
      isLoading: false,
      isDisabled: false,
      files: [],
    };
  },
  methods: {
    startProcessingFiles() {
      this.isDisabled = true;
    },
    updateFiles(files) {
      this.isDisabled = false;
      this.files = files;
      this.$emit('files', files);
    },
    saveImages() {
      if (this.files.length > 0) {
        this.isLoading = true;
        if (this.isBase64) {
          this.files.forEach((file) => {
            const { size } = file;
            // const cleanName = name.replace(/ /g, '');
            const input = {
              file,
              // name: cleanName,
              size,
              location: this.typeItem,
              idSource: this.itemId,
            };

            this.$apollo
              .mutate({
                client: 'files',
                mutation: UPLOAD_IMAGE_NOTE,
                variables: {
                  input,
                },
              })
              .then(({ data: { uploadNoteFile } }) => {
                const { key, link } = uploadNoteFile;
                this.$emit('save', {
                  src: link,
                  alt: key,
                });
                this.isLoading = false;
                this.close();
              })
              .catch(() => {
                const error =
                  'No se pudo subir la imagen, intente de nuevo o contacte a soporte';
                this.modalHandlerError({ isOpen: true, error });
              });
          });
        } else {
          this.files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (event) => {
              let height;
              let width;
              const image = new Image();
              image.src = event.target.result;
              image.onload = () => {
                height = image.height;
                width = image.width;

                this.$emit('save', {
                  src: reader.result.toString(),
                  alt: file.name,
                  height,
                  width,
                });
              };
            };
          });
          this.isLoading = false;
          this.close();
        }
      }
    },
    getError({ accepted }) {
      let error = '';
      if (!accepted) {
        error = 'El archivo que seleccionaste no es valido';
      } else {
        error =
          'Ocurrio un error al subir el archivo intentelo de nuevo o contacte a soporte';
      }
      console.log('ERROR', error);
    },
    close() {
      this.$emit('close');
      this.files = [];
      this.$refs.myVueDropzone.removeAllFiles();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .vue-dropzone  } from ../../../../scss/components/email.editor.image';
</style>
