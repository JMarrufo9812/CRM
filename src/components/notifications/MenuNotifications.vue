<template>
  <v-card>
    <v-card-title class="title-notifications justify-center">
      Notificaciones
    </v-card-title>
    <v-divider></v-divider>
    <v-card
      v-if="notifications.flow && notifications.flow.length"
      class="ma-0 pa-2 scroll"
      max-height="600"
    >
      <v-card
        v-for="notification in notificationsOrdered"
        :key="notification.id"
        class="mb-6"
        hover
        tile
        @click="goToSection(notification)"
      >
        <v-card-title class="title-notifications pb-0 d-flex">
          <p class="text-truncate ma-0 d-inline">
            <v-icon class="pr-1">
              {{ getIcon(notification.type) }}
            </v-icon>
            {{ getTittle(notification) }}
          </p>
        </v-card-title>
        <v-card-text class="description-notification py-0 pl-12">
          {{ getContent(notification) }}
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between py-0">
          <div class="ml-2">
            <span class="time-notification">
              {{ notification.createdAt | timeZoneFromNow }}
            </span>
          </div>
          <div>
            <v-btn
              icon
              @click.stop="deleteNotificationConfirmation(notification.id)"
            >
              <v-icon color="secondary">mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
      <slot name="moreButton"></slot>
    </v-card>
    <v-card-text v-else>
      <v-card outlined>
        <v-card-title class="title-notificationsjustify-center">
          <v-avatar>
            <v-icon>mdi-bell-off</v-icon>
          </v-avatar>
          Sin notificaciones
        </v-card-title>
      </v-card>
    </v-card-text>

    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="deleteNotification"
    />
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-card>
</template>

<script>
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { DELETE_NOTIFICATION } from '@/graphql/mutations/notificationsMutations';

export default {
  props: {
    notifications: {
      isRequired: true,
      type: Object,
      default: () => {
        return { flow: [] };
      },
    },
  },
  mixins: [modalsAlertsMixin],
  computed: {
    notificationsOrdered() {
      return this.notifications.flow
        .slice(0)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    getActivity(id) {
      const isExist = this.notifications.activities.some(
        (activity) => id === activity.id,
      );
      if (isExist) {
        const { title } = this.notifications.activities.find(
          (activity) => id === activity.id,
        );
        return title;
      }
      return 'actividad eliminada';
    },
    getUser(id) {
      const isExist = this.notifications.users.some((user) => user.id === id);
      if (isExist) {
        const { user } = this.notifications.users.find(
          ({ id: userId }) => userId === id,
        );

        return `${user.name}  ${user.lastName}`;
      }
      return 'usuario eliminado';
    },
    getIcon(type) {
      if (type === 'IMPORT') {
        return 'mdi-file-import-outline';
      }
      if (type === 'ACTIVITY') {
        return 'mdi-calendar';
      }
      if (type === 'SISTEM') {
        return 'mdi-robot-happy-outline ';
      }
      if (type === 'TAG_COMMENT') {
        return 'mdi-chat-processing-outline ';
      }
      if (type === 'TAG_NOTE') {
        return 'mdi-note-outline';
      }
      if (type === 'ASSING') {
        return 'mdi-account-switch';
      }
      return 'mdi-bell-ring';
    },
    getTypeImport(id) {
      const getType = this.notifications.imports.find((not) => not.id === id);
      if (getType.table === 'CONTACT') {
        return 'contactos';
      }
      if (getType.table === 'COMPANY') {
        return 'empresas';
      }
      if (getType.table === 'DEAL') {
        return 'tratos';
      }
      return 'datos';
    },
    getTittle({ type, status = null, to, by, from }) {
      if (type === 'IMPORT') {
        if (status === 'PENDING') {
          return `Se inició la importación de ${this.getTypeImport(to)}`;
        }
        if (status === 'COMPLETE') {
          return `Se terminó la importación de ${this.getTypeImport(to)}`;
        }
      }
      if (type === 'TAG_COMMENT') {
        return `${this.getUser(by)} te etiquetó en un comentario`;
      }
      if (type === 'TAG_NOTE') {
        return `${this.getUser(by)} te etiquetó en una nota`;
      }
      if (type === 'ACTIVITY') {
        if (status === 'START') {
          return `Actividad ${this.getActivity(to)} comienza ahora`;
        }
        if (status === 'PREVIUS') {
          return `Actividad ${this.getActivity(to)} comienza en 10 minutos`;
        }
      }
      if (type === 'SISTEM') {
        if (status === 'WELCOME') {
          return 'Bienvenido a la beta del producto cervus';
        }
      }
      if (type === 'ASSING') {
        let item = '';
        if (from === 'DEALS') item = 'Tratos';
        if (from === 'CONTACTS') item = 'Contactos';
        if (from === 'COMPANIES') item = 'Empresas';
        return `Se ha finalizado el cambio de propietario en ${item}. Recargue la página para visualizar los cambios.`;
      }
      return '';
    },
    getTo(type, id) {
      if (type === 'CONTACT') {
        const isExist = this.notifications.contacts.some(
          ({ id: contactId }) => contactId === id,
        );
        if (isExist) {
          const { name } = this.notifications.contacts.find(
            ({ id: contactId }) => contactId === id,
          );
          return `en el contacto ${name}`;
        }
        return 'en un contacto eliminado';
      }
      if (type === 'COMPANY') {
        const isExist = this.notifications.companies.some(
          ({ id: companyId }) => companyId === id,
        );
        if (isExist) {
          const { name } = this.notifications.companies.find(
            ({ id: companyId }) => companyId === id,
          );
          return `en la empresa ${name}`;
        }
        return 'en una empresa eliminada';
      }
      if (type === 'DEAL') {
        const isExist = this.notifications.deals.some(
          ({ id: dealId }) => dealId === id,
        );
        if (isExist) {
          const { title } = this.notifications.deals.find(
            ({ id: dealId }) => dealId === id,
          );
          return `en el trato ${title}`;
        }
        return 'en un trato eliminado';
      }
      return 'en un elemento eliminado';
    },
    getContent({ type, status, to, from }) {
      if (type === 'IMPORT') {
        if (status === 'PENDING') {
          return `Tus ${this.getTypeImport(
            to,
          )} se estan importando, te avisaremos cuando se complete la importación`;
        }
        if (status === 'COMPLETE') {
          return `Tus ${this.getTypeImport(
            to,
          )} se han importado, accede al historial para ver más detalles`;
        }
      }
      if (type === 'TAG_COMMENT') {
        return `Se te mencionó en un comentario de una nota ${this.getTo(
          from,
          to,
        )}`;
      }
      if (type === 'TAG_NOTE') {
        return `Se te mencionó en una nota  ${this.getTo(from, to)}`;
      }
      if (type === 'ACTIVITY') {
        if (status === 'START') {
          return 'Tienes una actividad programada para esta hora';
        }
        if (status === 'PREVIUS') {
          return `La actividad ${this.getActivity(to)} comenzará en 10 minutos`;
        }
      }
      if (type === 'SISTEM') {
        if (status === 'WELCOME') {
          return 'Hey bienvenido a la beta, aquì podràs probar las funciones en su version mas basica, recuerda informarle a los programadores sobre los bugs o errores que encuentres en tu recorrido';
        }
      }
      return '';
    },
    goToSection(notification) {
      this.$emit('goToSection', notification);
    },
    deleteNotificationConfirmation(id) {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: { nameItem: 'La notificacion', text: 'será eliminada' },
        infoDelete: {
          id,
        },
      });
    },
    deleteNotification({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      this.$apollo
        .mutate({
          mutation: DELETE_NOTIFICATION,
          variables: {
            notificationId: infoDelete.id,
          },
        })
        .then(() => {
          this.$emit('updateNotifications');
          this.modalHandlerDelete({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
        })
        .catch(() => {
          const error =
            'No se pudo eliminar la notificacion, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
</script>

<style lang="scss" scope>
@import '{ .time-notification, .title-notifications, .description-notification .scroll} from ../../../../scss/components/menu.notifications';
</style>
