<template>
  <div>
    <TagForm :tag="tag" :isLoading="isLoading" @save="saveTag" @close="close">
      <template #title>
        Crear una etiqueta
      </template>
    </TagForm>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </div>
</template>

<script>
import ability from '@/services/ability';
import { CREATE } from '@/constants/methods';
import { PERMISSIONS_TAGS } from '@/constants/permissions';
// Components
import TagForm from '@/components/tags/TagForm.vue';
// Querys
import { GET_TAGS } from '@/graphql/querys/tagsQuery';
// Mutations
import { CREATE_TAG } from '@/graphql/mutations/tagsMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  name: 'TagCreate',
  mixins: [modalsAlertsMixin],
  components: {
    TagForm,
  },
  props: {
    type: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
  },
  data() {
    return {
      PERMISSIONS_TAGS,
      tag: {
        name: '',
        color: '',
      },
      customTags: [],
      isLoading: false,
    };
  },
  methods: {
    // Close section create
    close() {
      this.$emit('close', true);
    },
    // Count the number tags in the list
    getCountTags() {
      return this.customTags.length;
    },
    saveTag({ name, color }) {
      if (ability.can(CREATE, PERMISSIONS_TAGS)) {
        this.isLoading = true;
        this.$apollo
          .mutate({
            // Query
            mutation: CREATE_TAG,
            // Parameters
            variables: {
              customTagInput: {
                name,
                color,
                // Order default is the last number more one
                order: this.getCountTags() + 1,
                type: this.type,
              },
            },
            // Update the cache with the result
            // The query will be updated with the optimistic response
            // and then with the real result of the mutation
            update: (store, { data: { createCustomTag } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: GET_TAGS,
                variables: {
                  filters: {
                    type: this.type,
                  },
                },
              });
              // Add our tag from the mutation to the end
              data.customTags.push(createCustomTag);
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
              createCustomTag: {
                __typename: 'CustomTag',
                id: 0,
                name,
                color,
                order: this.getCountTags() + 1,
              },
            },
          })
          .then(() => {
            // Close section create
            this.close();
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;

            const error =
              'No se pudo crear la etiqueta, intente de nuevo o contacte a soporte';
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
          filters: { type: this.type },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
