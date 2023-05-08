<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-space-between primary">
      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mr-3"
              icon
              @click="$router.go(-1)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>Atrás</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="updateEmail">
              <v-icon color="white">mdi-refresh</v-icon>
            </v-btn>
          </template>
          <span>Recargar</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click="
                mutationSendToTrash({ id: $route.params.id, isTrash: true })
              "
            >
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Eliminar</span>
        </v-tooltip>
      </div>
      <div style="width:35%">
        <v-text-field
          style=""
          outlined
          dense
          label="Buscar ..."
          dark
          hide-details="auto"
        ></v-text-field>
      </div>
    </v-col>
    <v-col cols="12" class="white mx-4">
      <h3 class="mb-2">
        {{ getMailGmail.subject }}
      </h3>
      <div class="d-flex justify-space-between align-center">
        <span class="d-block-inline">
          <v-avatar size="30" color="secondary">
            <span class="white--text">
              {{
                getMailGmail.from
                  ? getMailGmail.from.text.charAt(0).toUpperCase() +
                    getMailGmail.from.text.charAt(1).toUpperCase()
                  : ''
              }}
            </span>
          </v-avatar>
          {{ getMailGmail.from ? getMailGmail.from.text : '' }}
        </span>
        <div>
          <span class="mr-2 d-inline-block">
            {{ getMailGmail.date | timeZoneFromNow }}
          </span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="openModalSendEmail('RESPONSE')"
              >
                <v-icon color="secondary">mdi-reply</v-icon>
              </v-btn>
            </template>
            <span>Responder</span>
          </v-tooltip>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="py-4">
        <div class="text-center" v-if="$apollo.queries.getMailGmail.loading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div class="previewEmail" v-else v-html="content"></div>
        <div
          class="mt-5"
          v-if="
            getMailGmail &&
              getMailGmail.attachments &&
              getMailGmail.attachments.length > 0
          "
        >
          <h5>Adjuntos:</h5>
          <template v-for="(file, index) in getMailGmail.attachments">
            <v-btn :key="file.cid" @click="download(index)">
              {{ file.filename }}
            </v-btn>
          </template>
        </div>
      </div>
      <v-btn
        color="secondary"
        class="mr-4"
        @click="openModalSendEmail('RESPONSE')"
      >
        <v-icon class="mr-1">mdi-reply</v-icon>
        Responder
      </v-btn>
      <v-btn color="secondary" @click="openModalSendEmail('RESEND')">
        <v-icon class="mr-1">
          mdi-arrow-right-bold
        </v-icon>
        Reenviar
      </v-btn>
    </v-col>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-row>
</template>

<script>
import { GET_EMAIL, GET_EMAILS } from '@/graphql/querys/emailsQuery';
import {
  MARK_READ_EMAIL,
  SENT_TO_TRASH_EMAIL,
} from '@/graphql/mutations/emailsMutations';
import { modalMethodsMixin } from '@/mixins/modalsMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

// eslint-disable-next-line
const juice = require('juice');

export default {
  name: 'EmailContent',
  mixins: [modalMethodsMixin, modalsAlertsMixin],
  data() {
    return {
      message: '',
      getMailGmail: {},
    };
  },
  created() {
    if (this.$route.name === 'email-content-inbox') {
      this.mutationMarkReadEmail({ id: this.$route.params.id, isRead: true });
    }
  },
  computed: {
    content() {
      if (!this.getMailGmail.data) return '';
      const html = decodeURIComponent(
        escape(
          atob(this.getMailGmail.data.replace(/-/g, '+').replace(/_/g, '/')),
        ),
      );

      const content = juice(html, {
        preserveMediaQueries: false,
        preservePseudos: false,
        preserveFontFaces: false,
      });

      return content;
    },
  },
  methods: {
    download(index) {
      const getFile = this.getMailGmail.attachments[index];

      // Blob for saving.
      const blob = new Blob([new Uint8Array(getFile.content.data)], {
        type: getFile.contentType,
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = getFile.filename;
      a.click();
    },
    updateEmail() {
      this.$apollo.queries.getMailGmail.refetch();
    },
    mutationMarkReadEmail({ id, isRead }) {
      this.$apollo
        .mutate({
          // Query
          mutation: MARK_READ_EMAIL,
          // Parameters
          variables: {
            id,
            isRead,
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (store) => {
            // Read the data from our cache for this query.
            try {
              const data = store.readQuery({
                query: GET_EMAILS,
                variables: {
                  filter: {
                    labelId: 'INBOX',
                    maxResults: 15,
                    q: 'is:inbox',
                  },
                },
              });
              const indexEmail = data.inboxListGmail.messages.findIndex(
                (email) => email.id === id,
              );
              if (isRead) {
                const indexCache = data.inboxListGmail.messages[
                  indexEmail
                ].labelIds.findIndex((item) => item === 'UNREAD');
                data.inboxListGmail.messages[indexEmail].labelIds.splice(
                  indexCache,
                  1,
                );
              } else {
                data.inboxListGmail.messages[indexEmail].labelIds.push(
                  'UNREAD',
                );
              }
              // Write our data back to the cache.
              store.writeQuery({ query: GET_EMAILS, data });
            } catch {} // eslint-disable-line
          },
          // Optimistic UI
          // Will be treated as a 'fake' result as soon as the request is made
          // so that the UI can react quickly and the user be happy
          optimisticResponse: {
            __typename: 'Mutation',
            markEmailGoogleGmail: true,
          },
        })
        .then(() => {
          // Result
          // console.log(data);
        })
        .catch(() => {
          // Error
          const error =
            'No se pudo marcar el correo como leído, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    openModalSendEmail(type) {
      this.changeModal({
        id: 'sendEmail',
        status: true,
        item: { type, info: this.getMailGmail },
      });
    },
    mutationSendToTrash({ id, isTrash }) {
      this.$apollo
        .mutate({
          // Query
          mutation: SENT_TO_TRASH_EMAIL,
          // Parameters
          variables: {
            id,
            isTrash,
          },
        })
        .then(({ data }) => {
          if (data.trashEmailGoogleGmail) {
            this.$router.push({ name: 'inbox' }, () => {});
          }
        })
        .catch(() => {
          // Error
          const error =
            'No se pudo eliminar el correo, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
  apollo: {
    getMailGmail: {
      query: GET_EMAIL,
      client: 'email',
      variables() {
        return {
          // Get id from url params
          id: this.$route.params.id,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .previewEmail } from ../../../../scss/components/email.content';
</style>
