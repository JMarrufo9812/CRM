import {
  UPLOAD_FILE,
  UPDATE_DESCRIPTION_FILE,
  DELETE_FILE,
} from '@/graphql/mutations/filesMutations';

export const filesMixin = {
  data() {
    return {
      modalFileEdit: {
        isOpen: false,
        isLoading: false,
        info: {},
      },
    };
  },
  methods: {
    modalFileEditHandler({ isOpen, isLoading, info }) {
      this.modalFileEdit = { isOpen, isLoading, info };
    },
    uploadFile(location, idSource, fileInfo, description) {
      this.isLoading = true;
      const { name, size } = fileInfo;
      this.$apollo
        .mutate({
          mutation: UPLOAD_FILE,
          client: 'files',
          variables: {
            input: {
              location,
              idSource,
              name,
              size,
              file: fileInfo,
            },
          },
        })
        .then(({ data: { uploadFile } }) => {
          if (description.length > 0) {
            const info = {
              item: { id: uploadFile.id, description },
              itemId: idSource,
              typeItem: location,
            };
            this.updateFile({ isOpen: false, isLoading: false, info });
          } else {
            this.$emit('updateHistory');
          }
          this.isLoading = false;
          this.close();
        })
        .catch(() => {
          this.isLoading = false;
          const error =
            'No se ha podido subir el archivo, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    updateFile({ isOpen, isLoading, info }) {
      this.modalFileEditHandler({ isOpen, isLoading, info });
      const input = {
        idSource: info.itemId,
        fileId: info.item.id,
        location: info.typeItem,
        description: info.item.description,
      };
      this.$apollo
        .mutate({
          mutation: UPDATE_DESCRIPTION_FILE,
          variables: {
            input,
          },
        })
        .then(() => {
          this.$emit('updateHistory');
          this.modalFileEditHandler({
            isOpen: false,
            isLoading: false,
            info: {},
          });
        })
        .catch(() => {
          this.modalFileEditHandler({
            isOpen: true,
            isLoading: false,
            info: {},
          });
          const error =
            'No se pudo agregar la descripcion al archivo, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    deleteFile({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({
        isOpen,
        isLoading,
        message,
        infoDelete,
      });
      this.$apollo
        .mutate({
          mutation: DELETE_FILE,
          client: 'files',
          variables: {
            input: {
              key: infoDelete.data.item.url.key,
              idSource: infoDelete.data.itemId,
              fileId: infoDelete.data.item.id,
              location: infoDelete.data.typeItem,
            },
          },
        })
        .then(() => {
          this.$emit('updateHistory');
          this.modalHandlerDelete({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
        })
        .catch(() => {
          const error =
            'No se pudo eliminar el archivo, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    deleteFileWhitOutModal(key) {
      const input = { key };
      this.$apollo
        .mutate({
          client: 'files',
          mutation: DELETE_FILE,
          variables: {
            input,
          },
        })
        .catch(() => {
          const error =
            'No se pudo eliminar el archivo, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
