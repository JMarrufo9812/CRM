<template>
  <v-dialog v-model="isOpen" scrollable max-width="430px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        Agrega una URL
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-2">
        <v-form ref="formLink" v-model="valid" @submit.prevent>
          <v-text-field
            v-model="href"
            outlined
            dense
            hide-details="auto"
            hint="Por ejemplo: https://www.pagina.com"
            placeholder="URL"
            persistent-hint
            :rules="[...rules.isRequired, ...rules.website]"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="secondary" outlined @click="close">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="save">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'EmailEditorLink',
  mixins: [rulesMixin],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      href: '',
      valid: true,
    };
  },
  methods: {
    save() {
      this.$refs.formLink.validate();
      if (this.valid) {
        this.$emit('save', {
          href: this.href,
        });
        this.close();
      }
    },
    close() {
      this.$emit('close');
      this.$refs.formLink.reset();
    },
  },
};
</script>

<style lang="scss" scoped></style>
