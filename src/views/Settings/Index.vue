<template>
  <v-container fluid style="height:100%">
    <v-row>
      <v-col cols="12" class="primary">
        <p class="ml-6 text-section">{{ this.section }}</p>
      </v-col>
      <v-col cols="3" class="pa-0">
        <v-list dense height="100%">
          <template v-for="item in items">
            <v-list-item
              v-if="!item.disabled"
              link
              :key="item.text"
              :to="item.url"
              color="secondary"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
      <v-col cols="9" class="d-flex justify-center pt-12">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
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

export default {
  name: 'Settings',
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
      items: [
        {
          icon: 'mdi-account',
          text: 'Perfil y preferencias',
          url: '/settings/profile',
          disabled: false,
        },
        {
          icon: 'mdi-account-lock-outline',
          text: 'Contraseña e inicio de sesión',
          url: '/settings/password',
          disabled: false,
        },
        {
          icon: 'mdi-email',
          text: 'Configuración de correo',
          url: '/settings/email',
          disabled: false,
        },
        {
          icon: 'mdi-calendar',
          text: 'Configuración de calendario',
          url: '/settings/calendar',
          disabled: false,
        },
        {
          icon: 'mdi-home-city-outline',
          text: 'Configuración de empresa',
          url: '/settings/enterprise',
          disabled: !(
            ability.can(ENTERPRISE_MANAGEMENT, PERMISSIONS_ADMIN) ||
            ability.can(CUSTOM_TAGS_MANAGEMENT, PERMISSIONS_SETTINGS) ||
            ability.can(LOST_REASONS_MANAGEMENT, PERMISSIONS_SETTINGS) ||
            ability.can(ACT_TYPES_MANAGEMENT, PERMISSIONS_SETTINGS) ||
            ability.can(CUSTOM_FIELDS_MANAGEMENT, PERMISSIONS_SETTINGS)
          ),
        },
        {
          icon: 'mdi-clipboard-arrow-down-outline',
          text: 'Importación de datos',
          url: '/settings/imports-data/contacts',
          disabled: false,
        },
        {
          icon: 'mdi-account-multiple',
          text: 'Mis cuentas',
          url: '/settings/enterprises',
          disabled: false,
        },
      ],
    };
  },
  computed: {
    section() {
      if (this.$route.path === '/settings/profile')
        return 'Perfil y preferencias';
      if (this.$route.path === '/settings/password')
        return 'Contraseña e inicio de sesión';
      if (this.$route.path === '/settings/email')
        return 'Configuración de correo';
      if (this.$route.path === '/settings/calendar')
        return 'Configuración de calendario';
      if (this.$route.path === '/settings/enterprise')
        return 'Configuración de empresa';
      if (this.$route.path === '/settings/imports-data/contacts')
        return 'Importación de datos';
      if (this.$route.path === '/settings/enterprises') return 'Mis cuentas';
      return 'Configuraciones';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .text-section } from ../../../../scss/views/settings';
</style>
