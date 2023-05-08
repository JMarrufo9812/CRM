<template>
  <div>
    <v-card class="my-4" width="95%">
      <v-card-title class="d-flex justify-space-between file-name">
        <span
          style="max-width:90%"
          class="text-truncate"
          @click="previewFile(item)"
        >
          {{ item.name }}
        </span>
        <v-menu
          bottom
          offset-y
          left
          v-if="(canEdit || canEditOthers) && !item.isDelete && isMe"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              :disabled="
                !((canEdit || canEditOthers) && !item.isDelete) || !isMe
              "
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              @click="actionsHandler('UPDATE', { item, typeItem, itemId })"
            >
              <v-list-item-title>
                {{
                  item.description ? 'Editar descripción' : 'Añadir descripción'
                }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="downloadFile(item)">
              <v-list-item-title>
                Descargar
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="actionsHandler('DELETE', { item, typeItem, itemId })"
            >
              <v-list-item-title>Eliminar</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-subtitle v-if="item.description" class="mt-2">
        {{ item.description ? item.description : '' }}
      </v-card-subtitle>
      <v-card-text>
        subido por
        {{ item.createdBy.user.name }} {{ item.createdBy.user.lastName }}
        <span>
          {{ item.createdAt | timeZoneFromNow }}
        </span>
      </v-card-text>
    </v-card>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    <ModalFileEdit
      :modalHandler="modalFileEdit"
      @outData="updateFile"
      @close="modalFileEditHandler"
    ></ModalFileEdit>
    <ModalPreviewFile
      :modalHandler="modalPreviewFile"
      @close="modalHandlerPreviewFile"
    />
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="deleteFile"
    />
  </div>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { filesMixin } from '@/mixins/filesMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
// Permissions
import {
  PERMISSIONS_FILES,
  PERMISSIONS_CONTACTS,
  PERMISSIONS_COMPANIES,
  PERMISSIONS_DEALS,
} from '@/constants/permissions';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';

export default {
  name: 'File',
  mixins: [modalsAlertsMixin, filesMixin],
  components: {
    ModalFileEdit: () => import('@/components/activities/ModalFileEdit.vue'),
    ModalPreviewFile: () => import('@/components/profile/ModalPreviewFile.vue'),
  },
  props: {
    itemId: {
      type: String,
      default: '',
      required: true,
    },
    typeItem: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
    ownerId: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      subject,
      UPDATE,
      UPDATE_OTHERS,
      PERMISSIONS_FILES,
      PERMISSIONS_CONTACTS,
      PERMISSIONS_COMPANIES,
      PERMISSIONS_DEALS,
      modalPreviewFile: {
        isOpen: false,
        file: '',
      },
    };
  },
  computed: {
    isMe() {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_FILES, { authorId: this.item.createdBy.id || '' }),
      );
    },
    canEdit() {
      if (this.typeItem === 'CONTACT') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_CONTACTS, { authorId: this.ownerId || '' }),
        );
      }
      if (this.typeItem === 'COMPANY') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_COMPANIES, { authorId: this.ownerId || '' }),
        );
      }
      if (this.typeItem === 'DEAL') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_DEALS, { authorId: this.ownerId || '' }),
        );
      }
      return false;
    },
    canEditOthers() {
      if (this.typeItem === 'CONTACT') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_CONTACTS, {
                authorId: this.ownerId || '',
              }),
            )
          );
        }
        return ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS);
      }
      if (this.typeItem === 'COMPANY') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_COMPANIES, {
                authorId: this.ownerId || '',
              }),
            )
          );
        }
        return ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES);
      }
      if (this.typeItem === 'DEAL') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_DEALS, {
                authorId: this.ownerId || '',
              }),
            )
          );
        }
        return ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS);
      }
      return false;
    },
  },
  methods: {
    actionsHandler(type, data) {
      if (type === 'DELETE') {
        this.modalHandlerDelete({
          isOpen: true,
          isLoading: false,
          message: {
            text: 'será eliminado',
            nameItem: `El archivo ${data.item.name}`,
          },
          infoDelete: { data },
        });
      }
      if (type === 'UPDATE') {
        this.modalFileEditHandler({
          isOpen: true,
          isLoading: false,
          info: data,
        });
      }
    },
    modalHandlerPreviewFile({ isOpen, file }) {
      this.modalPreviewFile = { isOpen, file };
    },
    previewFile(file) {
      if (
        file.fileExtension === 'png' ||
        file.fileExtension === 'jpg' ||
        file.fileExtension === 'jpeg' ||
        file.fileExtension === 'jpg' ||
        file.fileExtension === 'JPG' ||
        file.fileExtension === 'svg'
      ) {
        this.modalHandlerPreviewFile({ isOpen: true, file });
      } else {
        window.open(file.url.link, '_blank');
      }
    },
    async downloadFile({ name, url: { link } }) {
      const response = await fetch(link);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .file-name } from ../../../../scss/components/file.scss';
</style>
