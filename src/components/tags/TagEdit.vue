<template>
  <div>
    <TagForm :tag="tag" :isLoading="isLoading" @save="editTag" @close="close">
      <template #title>
        Editar etiqueta
      </template>
      <template #actions="{tagSelect}">
        <v-btn
          v-if="$can('delete', PERMISSIONS_TAGS)"
          icon
          color="error"
          @click="deleteTag(tagSelect)"
          class="mr-auto"
          :loading="isLoadingDelete"
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </template>
    </TagForm>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </div>
</template>

<script>
import ability from '@/services/ability';
import { UPDATE } from '@/constants/methods';
import { PERMISSIONS_TAGS } from '@/constants/permissions';
// Components
import TagForm from '@/components/tags/TagForm.vue';
// Querys
import { GET_TAGS } from '@/graphql/querys/tagsQuery';
// Mutations
import { UPDATE_TAG, DELETE_TAG } from '@/graphql/mutations/tagsMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  name: 'TagEdit',
  mixins: [modalsAlertsMixin],
  components: {
    TagForm,
  },
  props: {
    tag: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
  },
  data() {
    return {
      PERMISSIONS_TAGS,
      isLoading: false,
      isLodingDelete: false,
    };
  },
  methods: {
    // Close section edit
    close() {
      this.$emit('close', true);
    },
    // Mutation edit tag
    editTag({ id, name, color }) {
      if (ability.can(UPDATE, PERMISSIONS_TAGS)) {
        this.isLoading = true;
        this.$apollo
          .mutate({
            // Query
            mutation: UPDATE_TAG,
            // Parameters
            variables: {
              customTagInput: {
                id,
                name,
                color,
                type: this.type,
              },
            },
            // Update the cache with the result
            // The query will be updated with the optimistic response
            // and then with the real result of the mutation
            update: (store, { data: { updateCustomTag } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: GET_TAGS,
                variables: {
                  filters: {
                    type: this.type,
                  },
                },
              });
              const tagIndex = data.customTags.findIndex(
                (customTag) => customTag.id === updateCustomTag.id,
              );
              data.customTags[tagIndex] = updateCustomTag;
              // Write our data back to the cache.
              store.writeQuery({
                query: GET_TAGS,
                variables: {
                  filters: {
                    type: this.type,
                  },
                },
                data,
              });
            },
            // Optimistic UI
            // Will be treated as a 'fake' result as soon as the request is made
            // so that the UI can react quickly and the user be happy
            optimisticResponse: {
              __typename: 'Mutation',
              updateCustomTag: {
                __typename: 'CustomTag',
                id: 0,
                name,
                color,
                order: 0,
              },
            },
          })
          .then(() => {
            // Result
            // console.log(data);
            this.close();
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
            // Error
            const error =
              'No se pudo actializar la etiqueta, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    // Mutation delete tag
    deleteTag({ id }) {
      if (ability.can(UPDATE, PERMISSIONS_TAGS)) {
        this.isLodingDelete = true;
        this.$apollo
          .mutate({
            // Query
            mutation: DELETE_TAG,
            // Parameters
            variables: {
              customTagId: id,
            },
            // Update the cache with the result
            // The query will be updated with the optimistic response
            // and then with the real result of the mutation
            update: (store, { data: { deleteCustomTag } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: GET_TAGS,
                variables: {
                  filters: {
                    type: this.type,
                  },
                },
              });
              const tagIndex = data.customTags.findIndex(
                (customTag) => customTag.id === deleteCustomTag.id,
              );
              data.customTags.splice(tagIndex, 1);
              // Write our data back to the cache.
              store.writeQuery({
                query: GET_TAGS,
                variables: {
                  filters: {
                    type: this.type,
                  },
                },
                data,
              });
            },
            // Optimistic UI
            // Will be treated as a 'fake' result as soon as the request is made
            // so that the UI can react quickly and the user be happy
            optimisticResponse: {
              __typename: 'Mutation',
              deleteCustomTag: {
                __typename: 'CustomTag',
                id,
              },
            },
          })
          .then(() => {
            this.isLodingDelete = false;

            // Result
            // console.log(data);
            // Close section edit
            this.close();
          })
          .catch(() => {
            this.isLodingDelete = false;

            // Error
            const error =
              'No se pudo eliminar la etiqueta, intente de nuevo o contacte a soporte';
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
            type: this.type,
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
