import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import Vue from 'vue';
import vuetify from './vuetify';
// don't forget to import styles
import 'tiptap-vuetify/dist/main.css';

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'mdi',
});
