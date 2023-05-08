<template>
  <v-row>
    <v-col cols="6" class="primary d-flex pl-12">
      <v-simple-checkbox
        v-model="checkAll"
        color="white"
        dense
        hide-details="auto"
        dark
        class="shrink mr-4"
      ></v-simple-checkbox>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-4"
            color="white"
            icon
            @click="updateListEmails"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-refresh
            </v-icon>
          </v-btn>
        </template>
        <span>Actualizar</span>
      </v-tooltip>

      <template v-if="selected.length">
        <v-tooltip bottom v-if="!isTrash">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mr-4"
              color="secondary"
              icon
              @click="sendToTrashEmail(true)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Enviar a la papelera</span>
        </v-tooltip>
        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mr-4"
              icon
              color="secondary"
              @click="deleteEmails"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Eliminar</span>
        </v-tooltip>
        <v-tooltip bottom v-if="isTrash">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mr-4"
              color="white"
              icon
              @click="sendToTrashEmail(false)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-folder-move</v-icon>
            </v-btn>
          </template>
          <span>Restaurar</span>
        </v-tooltip>
      </template>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-4"
            color="white"
            icon
            v-if="selected.length && hasRead"
            @click="markReadEmail(true)"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-email-open</v-icon>
          </v-btn>
        </template>
        <span>Marcar como leído</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-4"
            color="white"
            icon
            v-if="selected.length && hasUnRead"
            @click="markReadEmail(false)"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-email</v-icon>
          </v-btn>
        </template>
        <span>Marcar como no leído</span>
      </v-tooltip>
    </v-col>
    <v-col cols="6" class="primary">
      <v-text-field
        v-model="search"
        placeholder="Buscar..."
        hide-details="auto"
        outlined
        dense
        dark
        append-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
    <v-col cols="12" v-if="error">
      <v-alert outlined type="error">
        <v-row align="center">
          <v-col class="grow">
            Ocurrio un error inesperado
          </v-col>
          <v-col class="shrink">
            <v-btn>Volver a intentar</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-col>
    <v-col v-else cols="12" class="pt-0 pl-8">
      <v-divider></v-divider>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="listByPage"
        item-key="id"
        show-select
        hide-default-header
        class="mt-5"
        outlined
        @click:row="openEmail"
        :loading="$apollo.queries.inboxListGmail.loading"
        @update:items-per-page="updateItemsPerPage"
        :server-items-length="messagesTotal"
        :page="page"
        @update:page="updatePage"
        :footer-props="footerProps"
        hide-default-footer
      >
        <template #[`header.data-table-select`]="{ on, props }">
          <v-simple-checkbox
            color="secondary"
            v-bind="props"
            v-on="on"
          ></v-simple-checkbox>
        </template>
        <template #[`item.data-table-select`]="{ isSelected, select }">
          <v-simple-checkbox
            color="secondary"
            :value="isSelected"
            @input="select($event)"
          ></v-simple-checkbox>
        </template>
        <template #[`item.trackId`]="{ item }">
          <v-menu
            v-if="item.trackId"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
            :max-width="220"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                icon
                v-bind="attrs"
                v-on="on"
                @click.stop="showHistoryTracking(item.trackId)"
              >
                <v-icon small>
                  mdi-eye
                </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-text v-if="isLoadingTracking" class="text-center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-card-text>
              <div v-else>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Historial de seguimiento
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ getTextSeen(trackingHistory.count) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list dense v-if="trackingHistory.count > 0">
                  <v-list-item>
                    <v-list-item-content>
                      <span
                        v-for="(track, id) in trackingHistory.views"
                        :key="id"
                      >
                        {{ track.viewedAt | timeZoneFromNow }}
                      </span>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-card>
          </v-menu>
        </template>
        <template #[`item.name`]="{ item: { name, isRead } }">
          <span
            class="d-inline-block text-truncate"
            :class="{ 'font-weight-bold': isRead }"
            style="max-width: 150px;"
          >
            <v-icon v-if="isTrash">mdi-delete</v-icon>
            {{ name }}
          </span>
        </template>
        <template #[`item.subject`]="{ item: { subject, isRead } }">
          <span
            class="d-inline-block text-truncate"
            :class="{ 'font-weight-bold': isRead }"
            style="max-width: 500px;"
          >
            {{ subject }}
          </span>
        </template>
        <template #[`item.icon`]="{ item: { icon } }">
          <v-icon>
            {{ icon }}
          </v-icon>
        </template>
        <template #[`item.date`]="{ item: { date } }">
          {{ date | formatDate }}
        </template>
        <template v-slot:footer="{ props }">
          <v-divider></v-divider>
          <div
            v-if="!$apollo.queries.inboxListGmail.loading"
            class="d-flex justify-center mt-4 pb-6"
          >
            <v-btn @click="backPage()" outlined class="mr-6">
              <v-icon large>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn outlined>
              {{ props.pagination.page }} De {{ props.pagination.pageCount }}
            </v-btn>
            <v-btn
              outlined
              class="ml-6"
              @click="nextPage(props.pagination.pageCount)"
            >
              <v-icon large>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-col>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-row>
</template>

<script>
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import { GET_EMAILS, GET_TRACKING } from '@/graphql/querys/emailsQuery';
import {
  MARK_READ_EMAIL,
  SENT_TO_TRASH_EMAIL,
  DELETE_EMAIL,
} from '@/graphql/mutations/emailsMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  name: 'EmailList',
  mixins: [modalMethodsMixin, modalApolloMixin, modalsAlertsMixin],
  props: {
    labelId: {
      type: String,
      default: 'INBOX',
    },
    query: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isLoadingTracking: false,
      trackingHistory: {},
      search: '',
      error: false,
      pagination: [],
      page: 1,
      pageToken: '',
      itemsPerPage: 15,
      inboxListGmail: [],
      checkAll: false,
      selected: [],
      headers: [
        {
          text: '',
          value: 'trackId',
          align: 'start',
          sortable: false,
        },
        {
          text: 'Enviado por',
          value: 'name',
          align: 'start',
          sortable: false,
        },
        { text: 'Asunto', value: 'subject', align: 'start', sortable: false },
        { text: 'Icono', value: 'icon', align: 'end', sortable: false },
        { text: 'Fecha', value: 'date', align: 'end' },
      ],
      footerProps: {
        'items-per-page-options': [15, 30, 50, 100],
      },
    };
  },
  created() {
    this.updateListEmails();
  },
  watch: {
    checkAll(value) {
      if (value) {
        this.selectAll();
      } else {
        this.selected = [];
      }
    },
  },
  computed: {
    hasRead() {
      return this.selected.some((email) => email.isRead);
    },
    hasUnRead() {
      return this.selected.some((email) => !email.isRead);
    },
    messagesTotal() {
      if (!this.inboxListGmail.messages) return 0;
      if (this.search.length > 0) return this.inboxListGmail.resultSizeEstimate;
      return this.inboxListGmail.messagesTotal;
    },
    listEmails() {
      if (!this.inboxListGmail.messages) return [];
      return this.inboxListGmail.messages.map((email) => {
        const isRead = email.labelIds.some((item) => item === 'UNREAD');
        return {
          id: email.id,
          name: email.from.value[0].name || email.from.value[0].address,
          subject: email.subject,
          icon: email.attachments.length > 0 ? 'mdi-attachment' : '',
          date: email.date,
          isRead,
          trackId: email.trackId,
        };
      });
    },
    listByPage() {
      if (this.itemsPerPage > 0) {
        return this.listEmails.slice(
          (this.page - 1) * this.itemsPerPage,
          this.page * this.itemsPerPage,
        );
      }
      return [];
    },
    isTrash() {
      return this.labelId === 'TRASH';
    },
    queryMaster() {
      if (this.search.length > 0) {
        this.resetData();
        return `${this.query} ${this.search}`;
      }
      return this.query;
    },
  },
  methods: {
    nextPage(totalPages) {
      if (totalPages !== this.page) {
        const nextPage = this.page + 1;
        this.updatePage(nextPage);
      }
    },
    backPage() {
      if (this.page !== 1) {
        this.page -= 1;
      }
    },
    getTextSeen(countSeen) {
      if (countSeen === 1) {
        return 'Visto 1 vez';
      }
      return `Visto ${countSeen} veces`;
    },
    async showHistoryTracking(id) {
      this.isLoadingTracking = true;
      const {
        data: { getTrakingList },
      } = await this.$apollo.query({
        query: GET_TRACKING,
        client: 'email',
        fetchPolicy: 'no-cache',
        variables: {
          id,
        },
      });
      this.$nextTick(() => {
        this.trackingHistory = getTrakingList;
        this.isLoadingTracking = false;
      });
    },
    openEmail(email) {
      const label = this.labelId.toLowerCase();
      this.$router.push(`${label}/${email.id}`, () => {});
    },
    openModal() {
      this.changeModal({ id: 'sendEmail', status: true });
    },
    selectAll() {
      this.listByPage.forEach((element) => {
        this.selected.push(element);
      });
    },
    updateListEmails() {
      this.resetData();
      this.$apollo.queries.inboxListGmail.refetch();
    },
    resetData() {
      this.pagination = [];
      this.page = 1;
      this.pageToken = '';
      this.itemsPerPage = 15;
    },
    updateItemsPerPage(numberItems) {
      this.resetData();
      this.itemsPerPage = numberItems;
      this.getEmails();
    },
    updatePage(numberPage) {
      const pageBefore = this.page;
      // When page is 1, only push
      if (pageBefore === 1) {
        if (!this.existPagination(pageBefore)) {
          this.pagination.push({ page: pageBefore });
        }
      }
      // When page is 2 o more.
      // Push
      if (numberPage !== 1) {
        if (!this.existPagination(numberPage)) {
          if (numberPage > pageBefore) {
            this.pageToken = this.inboxListGmail.nextPageToken;
            this.getMoreEmails();
          }
          this.pagination.push({
            page: numberPage,
            pageToken: this.inboxListGmail.nextPageToken,
          });
        } else {
          this.pageToken = this.pagination.find(
            (item) => item.page === numberPage,
          ).pageToken;
        }
      }
      this.page = numberPage;
    },
    existPagination(page) {
      return this.pagination.some((item) => item.page === page);
    },
    getEmails() {
      this.$apollo.queries.inboxListGmail.refetch({
        filter: {
          labelId: this.labelId,
          maxResults: this.itemsPerPage,
          q: this.query,
          pageToken: this.pageToken,
        },
      });
    },
    getMoreEmails() {
      // Fetch more data and transform the original result
      this.$apollo.queries.inboxListGmail.fetchMore({
        // New variables
        variables: {
          filter: {
            labelId: this.labelId,
            maxResults: this.itemsPerPage,
            q: this.query,
            pageToken: this.pageToken,
          },
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const {
            messages,
            nextPageToken,
            messagesTotal,
            resultSizeEstimate,
          } = fetchMoreResult.inboxListGmail;

          return {
            inboxListGmail: {
              __typename: previousResult.inboxListGmail.__typename, // eslint-disable-line
              // Merging the tag list
              messages: [
                ...previousResult.inboxListGmail.messages,
                ...messages,
              ],
              nextPageToken,
              messagesTotal,
              resultSizeEstimate,
            },
          };
        },
      });
    },
    markReadEmail(isRead) {
      this.selected
        .filter((email) => email.isRead === isRead)
        .forEach((email) => {
          this.mutationMarkReadEmail({ id: email.id, isRead });
        });
      this.selected = [];
      this.checkAll = false;
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
            const data = store.readQuery({
              query: GET_EMAILS,
              variables: {
                filter: {
                  labelId: this.labelId,
                  maxResults: 15,
                  q: this.query,
                },
              },
            });
            // Add our tag from the mutation to the end
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
              data.inboxListGmail.messages[indexEmail].labelIds.push('UNREAD');
            }
            // Write our data back to the cache.
            store.writeQuery({ query: GET_EMAILS, data });
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
            'No se pudo marcar el correo como leído ,intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    sendToTrashEmail(isTrash) {
      this.selected.forEach((email) => {
        this.mutationSendToTrash({ id: email.id, isTrash });
      });
      this.selected = [];
      this.checkAll = false;
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
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          // eslint-disable-next-line
          update: (store) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: GET_EMAILS,
              variables: {
                filter: {
                  labelId: this.labelId,
                  maxResults: 15,
                  q: this.query,
                },
              },
            });
            // Add our tag from the mutation to the end
            const indexEmail = data.inboxListGmail.messages.findIndex(
              (email) => email.id === id,
            );
            data.inboxListGmail.messages.splice(indexEmail, 1);
            data.inboxListGmail.messagesTotal = this.messagesTotal - 1;
            // Write our data back to the cache.
            store.writeQuery({
              query: GET_EMAILS,
              variables: {
                filter: {
                  labelId: this.labelId,
                  maxResults: 15,
                  q: this.query,
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
            trashEmailGoogleGmail: true,
          },
        })
        .then(() => {
          // Result
          // console.log(data);
        })
        .catch(() => {
          // Error
          const error =
            'No se pudo eliminar el correo, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    deleteEmails() {
      this.selected.forEach((email) => {
        this.mutationDeleteEmail(email.id);
      });
      this.selected = [];
      this.checkAll = false;
    },
    mutationDeleteEmail(id) {
      this.$apollo
        .mutate({
          // Query
          mutation: DELETE_EMAIL,
          // Parameters
          variables: {
            id,
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          // eslint-disable-next-line
          update: (store, { data: { deleteEmailGoogleGmail } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: GET_EMAILS,
              variables: {
                filter: {
                  labelId: this.labelId,
                  maxResults: 15,
                  q: this.query,
                },
              },
            });
            // Add our tag from the mutation to the end
            const indexEmail = data.inboxListGmail.messages.findIndex(
              (email) => email.id === id,
            );
            data.inboxListGmail.messages.splice(indexEmail, 1);
            data.inboxListGmail.messagesTotal = this.messagesTotal - 1;
            // Write our data back to the cache.
            store.writeQuery({
              query: GET_EMAILS,
              variables: {
                filter: {
                  labelId: this.labelId,
                  maxResults: 15,
                  q: this.query,
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
            deleteEmailGoogleGmail: true,
          },
        })
        .then(() => {
          // Result
          // console.log(data);
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
    inboxListGmail: {
      query: GET_EMAILS,
      client: 'email',
      variables() {
        return {
          filter: {
            labelId: this.labelId,
            maxResults: 15,
            q: this.queryMaster,
          },
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
@import '{ .v-data-table } from ../../../../scss/components/email.list';
</style>
