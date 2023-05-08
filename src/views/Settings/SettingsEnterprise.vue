<template>
  <div class="d-flex flex-column align-center">
    <v-card tile width="34.8em" class="mb-2">
      <v-tabs
        fixed-tabs
        icons-and-text
        show-arrows
        v-if="dynamicComponent !== 'Page404'"
      >
        <v-tab
          v-if="$can(ENTERPRISE_MANAGEMENT, PERMISSIONS_ADMIN)"
          to="/settings/enterprise/general"
        >
          General
          <v-icon small>
            mdi-home-city-outline
          </v-icon>
        </v-tab>
        <v-tab
          v-if="$can(LOST_REASONS_MANAGEMENT, PERMISSIONS_SETTINGS)"
          to="/settings/enterprise/lost-reasons"
        >
          Razones de pérdida
          <v-icon small>
            mdi-handshake-outline
          </v-icon>
        </v-tab>
        <v-tab
          v-if="$can(CUSTOM_FIELDS_MANAGEMENT, PERMISSIONS_SETTINGS)"
          to="/settings/enterprise/custom-fields/contacts"
        >
          Campos personalizados
          <v-icon small>
            mdi-clipboard-edit-outline
          </v-icon>
        </v-tab>
        <v-tab
          v-if="$can(CUSTOM_TAGS_MANAGEMENT, PERMISSIONS_SETTINGS)"
          to="/settings/enterprise/tags/contacts"
        >
          Etiquetas
          <v-icon small>
            mdi-tag-multiple-outline
          </v-icon>
        </v-tab>
        <v-tab
          v-if="$can(ACT_TYPES_MANAGEMENT, PERMISSIONS_SETTINGS)"
          to="/settings/enterprise/activities"
        >
          Tipos de actividades
          <v-icon small>
            mdi-tag-multiple-outline
          </v-icon>
        </v-tab>
      </v-tabs>
    </v-card>

    <component
      :is="dynamicComponent"
      @success="snackbarHandler"
      @error="modalHandlerError"
    ></component>

    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    <v-snackbar
      v-model="snackbar.isOpen"
      :color="snackbar.color"
      :timeout="7000"
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
  </div>
</template>

<script>
import ability from '@/services/ability';
import {
  PERMISSIONS_ADMIN,
  PERMISSIONS_USERS,
  PERMISSIONS_SETTINGS,
} from '@/constants/permissions';
import {
  ENTERPRISE_MANAGEMENT,
  CREATE,
  CUSTOM_TAGS_MANAGEMENT,
  LOST_REASONS_MANAGEMENT,
  ACT_TYPES_MANAGEMENT,
  CUSTOM_FIELDS_MANAGEMENT,
} from '@/constants/methods';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { snackbarMixin } from '@/mixins/alerts/snackbarMixin';

export default {
  components: {
    GeneralSettings: () =>
      import('@/components/settingsEnterprise/GeneralSettings.vue'),
    LostReasonsSettings: () =>
      import('@/components/settingsEnterprise/LostReasonsSettings.vue'),
    CustomFieldsSettings: () =>
      import('@/components/settingsEnterprise/CustomFieldsSettings.vue'),
    TagsSettings: () =>
      import('@/components/settingsEnterprise/TagsSettings.vue'),
    ActivitiesSettings: () =>
      import('@/components/activities/TypeActivities.vue'),
    BaseLoading: () => import('@/components/ui/BaseLoading.vue'),
    Page404: () => import('@/views/Page404.vue'),
  },
  mixins: [modalsAlertsMixin, snackbarMixin],
  data() {
    return {
      PERMISSIONS_ADMIN,
      PERMISSIONS_USERS,
      ENTERPRISE_MANAGEMENT,
      CREATE,
      PERMISSIONS_SETTINGS,
      CUSTOM_TAGS_MANAGEMENT,
      LOST_REASONS_MANAGEMENT,
      ACT_TYPES_MANAGEMENT,
      CUSTOM_FIELDS_MANAGEMENT,
    };
  },
  computed: {
    dynamicComponent() {
      const page = this.$route.params.subconfig;

      switch (page) {
        case 'general':
          if (!this.isValidPage(page)) {
            this.getPage(page);
            return 'BaseLoading';
          }
          return 'GeneralSettings';
        case 'lost-reasons':
          if (!this.isValidPage(page)) {
            return 'BaseLoading';
          }
          return 'LostReasonsSettings';
        case 'custom-fields':
          if (!this.isValidPage(page)) {
            return 'BaseLoading';
          }
          return 'CustomFieldsSettings';
        case 'tags':
          if (!this.isValidPage(page)) {
            return 'BaseLoading';
          }
          return 'TagsSettings';
        case 'activities':
          if (!this.isValidPage(page)) {
            return 'BaseLoading';
          }
          return 'ActivitiesSettings';
        case '404':
          return 'Page404';
        default:
          return 'BaseLoading';
      }
    },
  },
  created() {
    const page = this.$route.params.subconfig;
    this.getPage(page);
  },
  methods: {
    getPage(page) {
      if (!page || !this.isValidPage(page)) {
        const pageNext = this.getPageAvailable();
        this.$router.push(`/settings/enterprise/${pageNext}`, () => {});
      }
    },
    findPage(page) {
      switch (page) {
        case 'general':
          return 'GeneralSettings';
        case 'lost-reasons':
          return 'LostReasonsSettings';
        case 'custom-fields':
          return 'CustomFieldsSettings';
        case 'tags':
          return 'TagsSettings';
        case 'activities':
          return 'ActivitiesSettings';
        default:
          return 'BaseLoading';
      }
    },
    isValidPage(page) {
      if (
        page === 'general' &&
        ability.can(ENTERPRISE_MANAGEMENT, PERMISSIONS_ADMIN)
      ) {
        return true;
      }

      if (
        page === 'lost-reasons' &&
        ability.can(LOST_REASONS_MANAGEMENT, PERMISSIONS_SETTINGS)
      ) {
        return true;
      }

      if (
        page === 'custom-fields' &&
        ability.can(CUSTOM_FIELDS_MANAGEMENT, PERMISSIONS_SETTINGS)
      ) {
        return true;
      }

      if (
        page === 'tags' &&
        ability.can(CUSTOM_TAGS_MANAGEMENT, PERMISSIONS_SETTINGS)
      ) {
        return true;
      }

      if (
        page === 'activities' &&
        ability.can(ACT_TYPES_MANAGEMENT, PERMISSIONS_SETTINGS)
      ) {
        return true;
      }

      return false;
    },
    getPageAvailable() {
      if (ability.can(ENTERPRISE_MANAGEMENT, PERMISSIONS_ADMIN)) {
        return 'general';
      }

      if (ability.can(LOST_REASONS_MANAGEMENT, PERMISSIONS_SETTINGS)) {
        return 'lost-reasons';
      }

      if (ability.can(CUSTOM_FIELDS_MANAGEMENT, PERMISSIONS_SETTINGS)) {
        return 'custom-fields';
      }

      if (ability.can(CUSTOM_TAGS_MANAGEMENT, PERMISSIONS_SETTINGS)) {
        return 'tags/contacts';
      }

      if (ability.can(ACT_TYPES_MANAGEMENT, PERMISSIONS_SETTINGS)) {
        return 'activities';
      }

      return '404';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .v-tab  } from ../../../../scss/views/settings.enterprise';
</style>
