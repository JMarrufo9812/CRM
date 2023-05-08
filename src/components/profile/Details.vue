<template>
  <v-card tile flat>
    <v-card-title class="details-title py-1">
      <v-icon color="primary" class="mr-4">mdi-crosshairs</v-icon>
      Detalles
    </v-card-title>
    <v-card-text class="pa-0">
      <v-divider></v-divider>
      <v-card
        flat
        :max-height="typeItem === 'DEAL' ? '55em' : '25em'"
        class="details-container"
      >
        <div
          class="pa-2 text-center"
          v-if="this.$apollo.queries.getForm.loading || isLoading"
        >
          <v-progress-circular
            indeterminate
            class="mx-auto"
            color="primary"
          ></v-progress-circular>
        </div>
        <p v-else-if="this.error" class="text-center py-2">
          Error no se pudo cargar
        </p>
        <FieldsEdit
          v-else
          :item="item"
          :typeItem="typeItem"
          :inputsDefault="listInputsDefault"
          :inputsCustom="listInputsCustom"
          @updateHistory="updateHistory"
          @updateItem="updateItem"
        />
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
// Querys
import { GET_FORM } from '@/graphql/querys/formsQuery';

export default {
  name: 'Details',
  components: {
    FieldsEdit: () => import('@/components/profile/FieldsEdit.vue'),
  },
  mounted() {
    this.$apollo.queries.getForm.refetch();
  },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    typeItem: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    listInputsDefault() {
      if (this.getForm.defaultForm) {
        const result = this.getForm.defaultForm.inputs.filter(
          (input) =>
            input.keyInput !== 'tags' &&
            input.keyInput !== 'owner' &&
            input.keyInput !== 'contacts' &&
            input.keyInput !== 'contact' &&
            input.keyInput !== 'company' &&
            input.keyInput !== 'companies' &&
            input.keyInput !== 'dealValue' &&
            input.keyInput !== 'expectedCloseDate' &&
            input.keyInput !== 'pipeline',
        );
        return result || [];
      }
      return [];
    },
    listInputsCustom() {
      if (this.getForm.customForm) {
        return this.getForm.customForm.inputs || [];
      }
      return [];
    },
  },
  data() {
    return {
      error: false,
      getForm: [],
    };
  },
  methods: {
    updateHistory() {
      this.$emit('updateHistory');
    },
    updateItem(itemUpdated) {
      this.$emit('updateItem', itemUpdated);
    },
  },
  apollo: {
    getForm: {
      query: GET_FORM,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          type: this.typeItem,
        };
      },
      error() {
        this.error = true;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .profile__input .details-title .details-container  } from ../../../../scss/components/details';
</style>
