<template>
  <div>
    <tiptap-vuetify
      v-model="content"
      :extensions="extensions"
      :card-props="{ outlined: true }"
      placeholder="Write something …"
      :native-extensions="nativeExtensions"
      @init="onInit"
    >
      <template #toolbar="{ commands, isActive }">
        <div class="menubar">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text icon @click="commands.undo" v-bind="attrs" v-on="on">
                <v-icon>mdi-undo</v-icon>
              </v-btn>
            </template>
            <span>Deshacer</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text icon @click="commands.redo" v-bind="attrs" v-on="on">
                <v-icon>mdi-redo</v-icon>
              </v-btn>
            </template>
            <span>Rehacer</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })"
                v-bind="attrs"
                v-on="on"
              >
                <b>H1</b>
              </v-btn>
            </template>
            <span>Título H1</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                @click="commands.heading({ level: 2 })"
                v-bind="attrs"
                v-on="on"
              >
                <b>H2</b>
              </v-btn>
            </template>
            <span>Subtítulo H2</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                @click="commands.heading({ level: 3 })"
                v-bind="attrs"
                v-on="on"
              >
                <b>H3</b>
              </v-btn>
            </template>
            <span>Subtítulo H3</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-format-bold</v-icon>
              </v-btn>
            </template>
            <span>Negritas</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.italic() }"
                @click="commands.italic"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-format-italic</v-icon>
              </v-btn>
            </template>
            <span>Itálica</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-format-underline</v-icon>
              </v-btn>
            </template>
            <span>Subrayado</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-format-list-numbered</v-icon>
              </v-btn>
            </template>
            <span>Lista ordenada</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-btn>
            </template>
            <span>Lista desordenada</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                @click="openEditorLink"
                :disabled="!isSelected"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-link</v-icon>
              </v-btn>
            </template>
            <span>Añadir enlace</span>
          </v-tooltip>
          <v-tooltip top v-if="typeItem !== 'COMMENT'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                @click="openEditorImage"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-image</v-icon>
              </v-btn>
            </template>
            <span>Añadir imagen</span>
          </v-tooltip>
          <EmailEditorLink
            :isOpen="isOpenEditorLink"
            @close="closeEditorLink"
            @save="saveLink(commands.link, ...arguments)"
          ></EmailEditorLink>
          <EmailEditorImage
            :isBase64="true"
            :isOpen="isOpenEditorImage"
            :itemId="itemId"
            :typeItem="typeItem"
            @close="closeEditorImage"
            @save="saveImage(commands.image, ...arguments)"
          ></EmailEditorImage>
        </div>
      </template>
    </tiptap-vuetify>
    <p class="mb-0 text-right">{{ isMaxSize }}/{{ maxSize }}</p>
    <v-menu
      v-model="tooltipShow"
      :position-x="positionX"
      :position-y="positionY"
      offset-y
      nudge-bottom="30"
      absolute
      v-show="showSuggestions"
    >
      <v-list>
        <template v-if="hasResults">
          <v-list-item
            v-for="(itemUser, index) in filteredUsers"
            :key="itemUser.id"
            @click="selectUser(itemUser)"
            :class="{ 'is-selected': navigatedUserIndex === index }"
          >
            <v-list-item-title>
              {{ itemUser.user.name }} {{ itemUser.user.lastName }}
            </v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item v-else>
          <v-list-item-title>
            No hay usuarios
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import Fuse from 'fuse.js';
import {
  TiptapVuetify,
  History,
  Heading,
  Bold,
  Italic,
  Underline,
  BulletList,
  OrderedList,
  ListItem,
  HardBreak,
} from 'tiptap-vuetify';
import { Mention } from 'tiptap-extensions';
import TipTapCustomImage from '@/components/tiptap/TipTapImage';
import MaxSize from '@/components/tiptap/MaxSize';
import Span from '@/components/emails/Span';
import Paragraph from '@/components/emails/Paragraph';
import { CustomLink } from '@/components/notes/CustomLink';
// graphql
import { USERS_LIST } from '@/graphql/querys/usersQuery';
// mixins
import { modalMethodsMixin } from '@/mixins/modalsMixin';

export default {
  name: 'NoteEditor',
  components: {
    TiptapVuetify,
    EmailEditorImage: () => import('@/components/emails/EmailEditorImage.vue'),
    EmailEditorLink: () => import('@/components/emails/EmailEditorLink.vue'),
  },
  mixins: [modalMethodsMixin],
  props: {
    message: {
      type: String,
      default: '',
    },
    reset: {
      type: Boolean,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    itemId: {
      type: String,
      default: '',
      required: false,
    },
    typeItem: {
      type: String,
      required: false,
      default: '',
    },
    maxSize: {
      type: Number,
      required: false,
      default: 2000,
    },
  },
  data() {
    return {
      ownersList: [],
      positionX: 0,
      positionY: 0,
      // Query mentions
      query: '',
      // Position the range where is the mention
      suggestionRange: 0,
      // Users filter
      filteredUsers: [],
      // Move into menu users filter
      navigatedUserIndex: 0,
      // Inser mention into the note
      insertMention: () => {},
      // Show menu mention
      tooltipShow: false,
      emailTemplates: [],
      userEnterpriseSignature: { signature: '' },
      isSelected: false,
      editor: {},
      files: [],
      isOpenEditorImage: false,
      isOpenEditorLink: false,
      isOpenEditorAttach: false,
      isOpenModalSignature: false,
      isOpenModalTemplate: false,
      // declare extensions you want to use
      extensions: [
        Bold,
        History,
        Underline,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        [CustomLink, { options: { target: '_blank' } }],
        HardBreak,
      ],
      nativeExtensions: [
        new MaxSize({ maxSize: this.maxSize }),
        new Span(),
        new Paragraph(),
        new TipTapCustomImage(),
        new Mention({
          // a list of all suggested items
          items: async () => {
            return this.ownersList;
          },
          // is called when a suggestion starts
          onEnter: ({ items, query, range, command, virtualNode }) => {
            this.query = query;
            this.filteredUsers = items;
            this.suggestionRange = range;
            const virtual = virtualNode.getBoundingClientRect();
            this.positionX = virtual.x;
            this.positionY = virtual.y;
            // we save the command for inserting a selected mention
            // this allows us to call it inside of our custom popup
            // via keyboard navigation and on click
            this.insertMention = command;
          },
          // is called when a suggestion has changed
          onChange: ({ items, query, range, virtualNode }) => {
            this.query = query;
            if (query) {
              const formatUsers = items.map((user) => user.item);
              this.filteredUsers = formatUsers;
            } else {
              this.filteredUsers = items;
            }
            this.suggestionRange = range;
            this.navigatedUserIndex = 0;
            const virtual = virtualNode.getBoundingClientRect();
            this.positionX = virtual.x;
            this.positionY = virtual.y;
          },
          // is called when a suggestion is cancelled
          onExit: () => {
            // reset all saved values
            this.query = '';
            this.filteredUsers = [];
            this.suggestionRange = 0;
            this.navigatedUserIndex = 0;
            this.tooltipShow = false;
          },
          // is called on every keyDown event while a suggestion is active
          onKeyDown: ({ event }) => {
            if (event.key === 'ArrowUp') {
              this.upHandler();
              return true;
            }
            if (event.key === 'ArrowDown') {
              this.downHandler();
              return true;
            }
            if (event.key === 'Enter') {
              this.enterHandler();
              return true;
            }
            return false;
          },
          // is called when a suggestion has changed and search
          onFilter: (items, query) => {
            if (!query) {
              return items;
            }
            const fuse = new Fuse(items, {
              threshold: 0.2,
              keys: ['user.name', 'user.lastName'],
            });
            return fuse.search(query);
          },
        }),
      ],
      // starting editor's content
      content: '',
    };
  },
  watch: {
    // Show menu suggestions
    showSuggestions(queryAndResults) {
      // If has result and query show the menu
      this.tooltipShow = queryAndResults;
    },
    content(newValue) {
      this.$emit('updateMessage', newValue);
    },
    reset: {
      handler(value) {
        if (!value) {
          this.resetvalues();
        }
      },
      immediate: true,
    },
    'editor.selection': {
      handler() {
        const { selection, state } = this.editor;
        const { from, to } = selection;
        const text = state.doc.textBetween(from, to, ' ');
        if (text.length > 0) {
          this.isSelected = true;
        } else {
          this.isSelected = false;
        }
      },
    },
    message: {
      handler(newMessage) {
        this.content = newMessage;
      },
      immediate: true,
    },
  },
  computed: {
    isMaxSize() {
      const { state } = this.editor;
      return state?.doc?.textContent?.length || 0;
    },
    hasFiles() {
      return this.files.length > 0;
    },
    // Check if has results to show
    hasResults() {
      return this.filteredUsers.length;
    },
    // Return true if has query and results
    showSuggestions() {
      return this.query || this.hasResults;
    },
    hasSearch() {
      if (
        this.search !== null &&
        this.search !== undefined &&
        this.search !== ''
      ) {
        return this.search.length > 0;
      }
      return false;
    },
  },
  methods: {
    setValueContent(isEditing) {
      if (isEditing) {
        this.content = this.message;
      }
    },
    onInit({ editor }) {
      this.editor = editor;
    },
    truncateString(str, num) {
      if (str.length <= num) {
        return str;
      }
      return `${str.slice(0, num)} ...`;
    },
    removeFile(index) {
      this.files.splice(index, 1);
      this.$emit('saveFiles', this.files);
    },
    returnFileSize(number) {
      if (!number) return '';
      if (number < 1024) {
        return `${number} bytes`;
      }
      if (number >= 1024 && number < 1048576) {
        const num = (number / 1024).toFixed(1);
        return `${num} KB`;
      }
      if (number >= 1048576) {
        const num = (number / 1048576).toFixed(1);
        return `${num} MB`;
      }
      return '';
    },
    openEditorImage() {
      this.isOpenEditorImage = true;
    },
    closeEditorImage() {
      this.isOpenEditorImage = false;
    },
    saveImage(command, image) {
      if (image.src !== null) {
        command({
          src: image.src,
          alt: image.alt,
        });
        this.$emit('updateImage', image.alt);
      }
    },
    openEditorLink() {
      this.isOpenEditorLink = true;
    },
    closeEditorLink() {
      this.isOpenEditorLink = false;
    },
    saveLink(command, link) {
      if (link.href !== null) {
        command({ href: link.href });
      }
    },
    openEditorAttach() {
      this.isOpenEditorAttach = true;
    },
    closeEditorAttach() {
      this.isOpenEditorAttach = false;
    },
    saveFiles(files) {
      if (files.length > 0) {
        this.files = files;
        this.$emit('saveFiles', files);
        this.closeEditorAttach();
      }
    },
    // Navigate to the previous item
    // If it's the first item, navigate to the last one
    upHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + this.filteredUsers.length - 1) %
        this.filteredUsers.length;
    },
    // Navigate to the next item
    // If it's the last item, navigate to the first one
    downHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + 1) % this.filteredUsers.length;
    },
    // Select user when do enter
    enterHandler() {
      const user = this.filteredUsers[this.navigatedUserIndex];
      if (user) {
        this.selectUser(user);
      }
    },
    // We have to replace our suggestion text with a mention
    // So it's important to pass also the position of your suggestion text
    selectUser(userItem) {
      this.insertMention({
        range: this.suggestionRange,
        attrs: {
          id: userItem.id,
          label: `${userItem.user.name} ${userItem.user.lastName}`,
        },
      });
    },
    resetvalues() {
      this.content = '';
      this.files = [];
    },
  },
  apollo: {
    ownersList: {
      query: USERS_LIST,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .tiptap-vuetify-editor__content  img .tiptap-vuetify-editor .is-active .variable .mention .is-selected .menubar} from ../../../../scss/components/note.editor';
</style>
