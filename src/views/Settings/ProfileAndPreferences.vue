<template>
  <v-card outlined width="35em">
    <v-progress-linear
      :active="isLoadingImage"
      :indeterminate="isLoadingImage"
      height="6"
      absolute
      color="primary"
    ></v-progress-linear>
    <v-card-text>
      <v-form v-model="isValidate" ref="profileForm">
        <v-row class="justify-center">
          <!-- profile photo -->
          <v-col cols="12" align="center">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-avatar size="80" color="secondary">
                    <v-img
                      v-if="
                        userCurrent.profileUrl !== null &&
                          !$apollo.queries.userCurrent.loading &&
                          !errorImage
                      "
                      :src="userCurrent.profileUrl"
                      item.user.config.profileUrl
                      @error="catchErrorImage"
                    />
                    <span v-else class="white--text">
                      {{ user.name.charAt(0).toUpperCase() }}
                      {{ user.lastName.charAt(0).toUpperCase() }}
                    </span>
                    <ModalProfileImage
                      v-model="showUploadImage"
                      field="img"
                      :langExt="languageExtencion"
                      :width="300"
                      :height="300"
                      :noRotate="false"
                      url="https://httpbin.org/post"
                      @src-file-set="getImageSources"
                      @crop-success="upload"
                      @crop-upload-success="uploadSuccess"
                      @crop-upload-fail="cropUploadFail"
                    ></ModalProfileImage>
                    <v-btn
                      @click="showUploadImage = true"
                      class="hide-input"
                      x-small
                      icon
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-avatar>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <p class="red--text text-center" v-if="imageError.error">
              {{ imageError.message }}
            </p>
          </v-col>
          <!-- username -->
          <v-col cols="12" align="center" class="py-0">
            <v-list-item>
              <v-list-item-content class="pb-0">
                <v-list-item-title class="user-name-settings">
                  {{ user.name }} {{ user.lastName }}
                  <v-btn x-small icon @click="handlerEditName">
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-text-field
              v-model="user.name"
              v-if="isEditName"
              class="inputs-user-settings mb-2"
              outlined
              dense
              hide-details="auto"
              :rules="[...rules.general, ...rules.text]"
            ></v-text-field>
            <v-text-field
              v-model="user.lastName"
              v-if="isEditName"
              class="inputs-user-settings"
              :value="userCurrent.user.lastName"
              outlined
              dense
              hide-details="auto"
              :rules="[...rules.general, ...rules.text]"
            ></v-text-field>
          </v-col>
          <!-- email -->
          <v-col
            cols="12"
            align="center"
            class="py-0 d-flex align-center flex-column"
          >
            <v-list-item>
              <v-list-item-content class="pt-0">
                <v-list-item-title class="email-settings">
                  {{ user.email }}
                  <v-btn x-small icon @click="handlerEditEmail">
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-text-field
              v-model="user.email"
              v-if="isEditEmail"
              class="inputs-user-settings"
              :readonly="!isLockEmail"
              :value="userCurrent.user.email"
              :append-icon="isLockEmail ? 'mdi-lock-open-variant' : 'mdi-lock'"
              outlined
              dense
              hide-details="auto"
              @click:append="isLockEmail = !isLockEmail"
              :rules="rules.email"
            ></v-text-field>
          </v-col>
          <!-- preferences -->
          <div class="d-flex align-center flex-column pt-4">
            <v-text-field
              disabled
              :value="zoneTime"
              outlined
              dense
              hide-details="auto"
              class="mb-8 inputs-user-preferences"
              tile
            ></v-text-field>

            <v-select
              disabled
              dense
              outlined
              hide-details="auto"
              :items="listLanguages"
              value="Español"
              class="mb-8 inputs-user-preferences"
              tile
            ></v-select>

            <v-select
              disabled
              dense
              outlined
              hide-details="auto"
              :items="listMoney"
              value="MXN"
              class="inputs-user-preferences"
            ></v-select>
          </div>
        </v-row>
      </v-form>
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
    </v-card-text>
    <v-card-actions class="py-8">
      <v-row class="justify-center">
        <v-col sm="8" md="6" lg="4" class="d-flex justify-space-around">
          <v-btn
            :disabled="!hasChanges"
            outlined
            class="mr-2"
            :loading="isLoadingReset"
            tile
            large
            @click="reset"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="!hasChanges"
            color="secondary"
            tile
            large
            :loading="isLoading"
            @click="updateUser"
          >
            Guardar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import { UPLOAD_PROFILE_PHOTO } from '@/graphql/mutations/filesMutations';
import { UPDATE_USER } from '@/graphql/mutations/usersMutations';
import { UPDATE_USER_CURRENT } from '@/graphql/local-state/mutations';
import { rulesMixin } from '@/mixins/rulesMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { snackbarMixin } from '@/mixins/alerts/snackbarMixin';

export default {
  name: 'ProfileAndPreferences',
  mixins: [rulesMixin, modalsAlertsMixin, snackbarMixin],
  components: {
    // myUpload,
    ModalProfileImage: () =>
      import('@/components/profile/ModalProfileImage/ModalProfileImage.vue'),
  },
  data() {
    return {
      isValidate: true,
      isEditName: false,
      isEditEmail: false,
      isLockEmail: false,
      user: {
        name: '',
        lastName: '',
        email: '',
      },
      listMoney: ['MXN'],
      listLanguages: ['Español'],
      isLoading: false,
      isLoadingReset: false,
      // upload image handler
      isLoadingImage: false,
      errorImage: false,
      imageError: {
        error: false,
        message: '',
      },
      // libreria de imagen
      imgData: {},
      showUploadImage: false,
      params: {},
      headers: {},
      languageExtencion: {
        hint: 'Selecciona o arrastra una imagen',
        loading: 'Subiendo...',
        noSupported:
          'Tu navegador no es soportado, por favor usa IE10+ u otros navegadores más recientes',
        success: 'Subido exitosamente',
        fail: 'Sucedió un error',
        preview: 'Vista previa',
        btn: {
          off: 'Cancelar',
          close: 'Cerrar',
          back: 'Atrás',
          save: 'Guardar',
        },
        error: {
          onlyImg: 'Únicamente imágenes',
          outOfSize: 'La imagen excede el tamaño máximo:',
          lowestPx: 'La imagen es demasiado pequeña. Se espera por lo menos:',
        },
      },
    };
  },
  watch: {
    isEditName(value) {
      if (!value) {
        if (this.user.lastName !== this.userCurrent.lastName) {
          this.user.lastName = this.userCurrent.user.lastName;
        }
        if (this.user.name !== this.userCurrent.user.name) {
          this.user.name = this.userCurrent.user.name;
        }
      }
    },
    isEditEmail(value) {
      if (!value) {
        if (this.user.email !== this.userCurrent.email) {
          this.user.email = this.userCurrent.user.email;
        }
      }
    },
    'userCurrent.user.name': {
      handler(value) {
        this.user.name = value;
      },
    },
    'userCurrent.user.lastName': {
      handler(value) {
        this.user.lastName = value;
      },
    },
    'userCurrent.user.email': {
      handler(value) {
        this.user.email = value;
      },
    },
  },
  computed: {
    zoneTime() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    },
    hasChanges() {
      return (
        this.userCurrent.user.name !== this.user.name ||
        this.userCurrent.user.lastName !== this.user.lastName ||
        this.userCurrent.user.email !== this.user.email
      );
    },
  },
  methods: {
    catchErrorImage(error) {
      if (error) this.errorImage = true;
    },
    sendPhoto(file) {
      if (file) {
        this.isLoadingImage = true;
        const { name, size } = file;
        this.$apollo
          .mutate({
            client: 'files',
            mutation: UPLOAD_PROFILE_PHOTO,
            variables: {
              input: { name, size, file },
            },
          })
          .then(({ data: { uploadProfilePhoto } }) => {
            this.$apollo.mutate({
              mutation: UPDATE_USER_CURRENT,
              variables: {
                userCurrent: {
                  profileUrl: uploadProfilePhoto.link,
                },
              },
            });
            this.imgData = {};
            this.isLoadingImage = false;
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'La imagen de perfil se cambió con éxito',
            });
          })
          .catch(() => {
            this.isLoadingImage = false;
            const error =
              'No se pudo actualizar la imagen de perfil, intente de nuevo o contacte al soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    updateUser() {
      this.$refs.profileForm.validate();
      if (this.isValidate) {
        this.isLoading = true;
        const { name, lastName, email } = this.user;
        this.$apollo
          .mutate({
            // Query
            mutation: UPDATE_USER,
            // Parameters
            variables: {
              userInput: {
                name,
                lastName,
                email,
              },
            },
          })
          .then(() => {
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'Se actualizó correctamente',
            });
            this.isLoading = false;
            this.isEmailEdit = false;
          })
          .catch(() => {
            const error =
              'No se pudo actualizar el perfil, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
            this.isLoading = false;
            this.isEmailEdit = false;
          });
      }
    },
    handlerEditName() {
      this.isEditName = !this.isEditName;
    },
    handlerEditEmail() {
      this.isEditEmail = !this.isEditEmail;
      this.isLockEmail = false;
    },
    reset() {
      this.isLoadingReset = true;
      this.user.name = this.userCurrent.user.name;
      this.user.lastName = this.userCurrent.user.lastName;
      this.user.email = this.userCurrent.user.email;
      this.isLoadingReset = false;
      this.isEditName = false;
      this.isLockEmail = false;
    },
    // libreria de imagen
    getImageSources(file) {
      this.imgData = file;
    },
    async dataUrlToFile(dataUrl, fileName) {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      return new File([blob], fileName, { type: this.imgData.type });
    },
    upload(createImgUrl) {
      this.dataUrlToFile(createImgUrl, this.imgData.name).then((data) => {
        this.sendPhoto(data);
      });
    },
    uploadSuccess() {
      this.showUploadImage = false;
    },
    cropUploadFail() {
      this.imageError = {
        error: true,
        message: 'Ha ocurrido un error, intente de nuevo o contacte a soporte',
      };
      this.isLoadingImage = false;
      this.showUploadImage = false;
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
@import '{ .user-name-settings, .email-settings, .inputs-user-preferences, .inputs-user-settings .v-list-item__title .v-avatar } from ../../../../scss/views/profile.and.preferences';
</style>
