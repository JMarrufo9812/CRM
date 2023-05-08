<template>
  <v-card tile width="98%">
    <v-tabs
      v-model="tabs"
      height="56"
      color="secondary"
      slider-color="secondary"
      background-color="primary"
    >
      <v-tab class="ml-6 tab-text" href="#all">Todos</v-tab>
      <v-tab class="tab-text" href="#activities">Actividades</v-tab>
      <v-tab class="tab-text" href="#notes">Notas</v-tab>
      <v-tab class="tab-text" v-if="typeItem === 'CONTACT'" href="#email">
        Correo
      </v-tab>
      <v-tab class="tab-text" href="#files">Archivos</v-tab>
      <v-tab class="tab-text" href="#changes">Cambios</v-tab>

      <ActivitiesProfile
        @updateHistory="updateHistory"
        :itemComplete="item"
        :item="itemProfile"
        :ownerId="ownerId"
        :typeItem="typeItem"
      />
      <!-- All History -->
      <v-tab-item value="all">
        <v-timeline dense>
          <DynamicScroller
            class="virtual-scroller"
            :items="allHistory"
            :min-item-size="54"
          >
            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :data-index="index"
              >
                <v-timeline-item
                  :icon="getIcon(item.template)"
                  fill-dot
                  color="primary"
                  icon-color="white"
                >
                  <AllHistory
                    :targets="{
                      ...itemProfile.activityStream,
                    }"
                    :users="users"
                    :isImport="itemProfile.import ? true : false"
                    :item="item"
                    :typeItem="typeItem"
                    :itemId="itemId"
                    :ownerId="ownerId"
                    @updateHistory="updateHistory"
                  />
                </v-timeline-item>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </v-timeline>
      </v-tab-item>
      <!-- Change history -->
      <v-tab-item value="changes" class="pt-8">
        <v-timeline dense align-top v-if="changes">
          <DynamicScroller
            :items="changes"
            :min-item-size="54"
            class="virtual-scroller"
          >
            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :data-index="index"
              >
                <v-timeline-item
                  :icon="getIcon('CHANGE')"
                  fill-dot
                  color="primary"
                  icon-color="white"
                >
                  <Change
                    :targets="{
                      ...itemProfile.activityStream,
                    }"
                    :users="
                      itemProfile.activityStream
                        ? itemProfile.activityStream.users
                        : []
                    "
                    :isImport="itemProfile.import ? true : false"
                    :item="item"
                  ></Change>
                </v-timeline-item>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </v-timeline>
      </v-tab-item>
      <!-- Notes History -->
      <v-tab-item value="notes" class="pt-8">
        <v-col
          v-if="notes.length === 0"
          cols="12"
          align="center"
          class="py-12 my-12"
        >
          <v-icon large>mdi-note-remove-outline</v-icon>
          <span>
            No hay notas todavía
          </span>
        </v-col>
        <v-timeline v-else dense align-top>
          <DynamicScroller
            :items="notes"
            :min-item-size="54"
            class="virtual-scroller"
          >
            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :data-index="index"
              >
                <v-timeline-item
                  icon="mdi-note-outline"
                  fill-dot
                  color="primary"
                  icon-color="white"
                >
                  <Note
                    :item="item"
                    :typeItem="typeItem"
                    :itemId="itemId"
                    @updateHistory="updateHistory"
                  ></Note>
                </v-timeline-item>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </v-timeline>
      </v-tab-item>
      <!-- Email History -->
      <v-tab-item value="email" class="pt-8">
        <v-col
          v-if="!itemProfile.activityEmailStream"
          cols="12"
          align="center"
          class="py-12 my-12"
        >
          <v-icon large>mdi-email-off-outline</v-icon>
          <span>
            No hay correos todavía
          </span>
        </v-col>
        <v-timeline v-else dense align-top>
          <DynamicScroller
            :items="emails"
            :min-item-size="54"
            class="virtual-scroller"
          >
            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :data-index="index"
              >
                <v-timeline-item
                  icon="mdi-email-outline"
                  fill-dot
                  color="primary"
                  icon-color="white"
                >
                  <Email
                    :item="item"
                    :users="
                      itemProfile.activityEmailStream
                        ? itemProfile.activityEmailStream.users
                        : []
                    "
                    :typeItem="typeItem"
                    :itemId="itemId"
                  ></Email>
                </v-timeline-item>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </v-timeline>
      </v-tab-item>
      <!-- Activities history -->
      <v-tab-item value="activities" class="pt-8">
        <AlertConfigCalendar></AlertConfigCalendar>
        <v-col
          v-if="activities.length === 0"
          cols="12"
          align="center"
          class="py-12 my-12"
        >
          <v-icon large>mdi-calendar-blank</v-icon>
          <span>
            No hay actividades todavía
          </span>
        </v-col>
        <v-timeline dense align-top v-else>
          <DynamicScroller
            :items="activities"
            :min-item-size="54"
            class="virtual-scroller"
          >
            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :data-index="index"
              >
                <v-timeline-item
                  icon=" mdi-calendar"
                  fill-dot
                  color="primary"
                  icon-color="white"
                >
                  <Action
                    :typeItem="typeItem"
                    :ownerId="ownerId"
                    :itemId="itemId"
                    :item="item"
                    @updateHistory="updateHistory"
                  ></Action>
                </v-timeline-item>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </v-timeline>
      </v-tab-item>
      <!-- Files history -->
      <v-tab-item value="files" class="pt-8">
        <v-col
          v-if="files.length === 0"
          cols="12"
          align="center"
          class="py-12 my-12"
        >
          <v-icon large>mdi-file-hidden</v-icon>
          <span>
            No hay archivos todavía
          </span>
        </v-col>
        <v-timeline v-else dense align-top>
          <DynamicScroller
            :items="files"
            :min-item-size="54"
            class="virtual-scroller"
          >
            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :data-index="index"
              >
                <v-timeline-item
                  icon="mdi-file"
                  fill-dot
                  color="primary"
                  icon-color="white"
                >
                  <File
                    :typeItem="typeItem"
                    :ownerId="ownerId"
                    :itemId="itemId"
                    :item="item"
                  ></File>
                </v-timeline-item>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </v-timeline>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import AlertConfigCalendar from '@/components/activities/AlertConfigCalendar.vue';

export default {
  name: 'History',
  components: {
    AllHistory: () => import('@/components/profile/AllHistory.vue'),
    Change: () => import('@/components/profile/Change.vue'),
    Note: () => import('@/components/notes/Note.vue'),
    File: () => import('@/components/profile/File.vue'),
    Action: () => import('@/components/activities/Action.vue'),
    Email: () => import('@/components/emails/Email.vue'),
    ActivitiesProfile: () =>
      import('@/components/profile/ActivitiesProfile.vue'),
    DynamicScroller,
    DynamicScrollerItem,
    AlertConfigCalendar,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemId: {
      type: String,
      default: '',
      required: true,
    },
    ownerId: {
      type: String,
      default: '',
    },
    typeItem: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
    itemProfile: {
      type: Object,
      required: true,
      default: () => {
        return {
          import: {},
          activities: [],
          notes: [],
          files: [],
          activityEmailStream: {
            flow: [],
          },
          activityStream: {
            flow: [],
          },
        };
      },
    },
  },
  computed: {
    allHistory() {
      const allHistory = [
        ...this.itemProfile.notes.map((note) => {
          return { template: 'NOTE', ...note, isDelete: this.item.isDelete };
        }),
        ...this.itemProfile.activities.map((activity) => {
          return {
            template: 'ACTIVITY',
            ...activity,
            isDelete: this.item.isDelete,
          };
        }),
        ...this.itemProfile.files.map((file) => {
          return { template: 'FILE', ...file, isDelete: this.item.isDelete };
        }),
      ];
      if (this.itemProfile.activityStream) {
        allHistory.push(
          ...this.itemProfile.activityStream.flow.map((change) => {
            return {
              template: 'CHANGE',
              ...change,
              isDelete: this.item.isDelete,
            };
          }),
        );
      }
      if (this.itemProfile.activityEmailStream) {
        allHistory.push(
          ...this.itemProfile.activityEmailStream.flow.map((email) => {
            return {
              template: 'EMAIL',
              ...email,
              isDelete: this.item.isDelete,
            };
          }),
        );
      }
      const orderedHistory = allHistory.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      return orderedHistory;
    },
    changes() {
      return this.itemProfile.activityStream?.flow
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    emails() {
      return this.itemProfile.activityEmailStream?.flow
        .slice()
        .map((email) => {
          return { ...email, isDelete: this.item.isDelete };
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    activities() {
      return this.itemProfile.activities
        .slice()
        .map((activity) => {
          return { ...activity, isDelete: this.item.isDelete };
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    files() {
      return this.itemProfile.files
        .slice()
        .map((file) => {
          return { ...file, isDelete: this.item.isDelete };
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    notes() {
      return this.itemProfile.notes
        .slice()
        .map((note) => {
          return { ...note, isDelete: this.item.isDelete };
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    users() {
      const users = [];
      if (this.itemProfile.activityStream) {
        this.itemProfile.activityStream.users.forEach((user) => {
          users.push(user);
        });
      }
      if (this.itemProfile.activityEmailStream) {
        this.itemProfile.activityEmailStream.users.forEach((user) => {
          users.push(user);
        });
      }
      return users;
    },
  },
  data() {
    return {
      tabs: 'all',
    };
  },
  methods: {
    getIcon(type) {
      if (type === 'CHANGE') {
        if (this.typeItem === 'CONTACT') return 'mdi-account';
        if (this.typeItem === 'COMPANY') return 'mdi-domain';
        if (this.typeItem === 'DEAL') return 'mdi-handshake';
      }
      if (type === 'ACTIVITY') {
        return 'mdi-calendar';
      }
      if (type === 'NOTE') {
        return 'mdi-note-outline';
      }
      if (type === 'FILE') {
        return 'mdi-file';
      }
      if (type === 'EMAIL') {
        return 'mdi-email-outline';
      }
      return '';
    },
    updateHistory() {
      this.$emit('updateHistory');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .v-item-group .tab-text .v-virtual-scroll } ../../../../scss/components/history';

.virtual-scroller {
  height: 60em;
}
</style>
