<template>
  <div>
    <div class="d-flex pb-4" v-for="(contact, index) in contacts" :key="index">
      <FieldSelectContactSimple
        :index="index"
        :isScrolled="isScrolled"
        @scrolled="scrolled"
        @outData="updateValue"
        @deleteData="deleteValue"
      />
      <v-btn
        v-if="index === 0"
        small
        tile
        @click="addContact"
        outlined
        class="my-3 ml-3"
        :disabled="contacts.length >= 3"
      >
        <v-icon>
          mdi-account-multiple-plus
        </v-icon>
      </v-btn>
      <v-btn
        v-else
        @click="deleteContacts(index)"
        small
        class="my-3 ml-3"
        outlined
        tile
        color="error"
      >
        <v-icon>mdi-account-minus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldSelectContactMultiple',
  components: {
    FieldSelectContactSimple: () =>
      import('@/components/fields/FieldSelectContactSimple.vue'),
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
    resetHandler: {
      type: Boolean,
      default: false,
    },
    isScrolled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      contacts: [1],
    };
  },
  watch: {
    resetHandler: {
      handler(value) {
        if (value) {
          this.field.value = [];
        } else {
          this.resetValues();
        }
      },
      immediate: true,
    },
  },
  methods: {
    scrolled() {
      this.$emit('scrolled', false);
    },
    addContact() {
      this.contacts.push(+1);
    },
    deleteContacts(index) {
      this.contacts.splice(index, 1);
      if (this.field.value) this.field.value.splice(index, 1);
    },
    updateValue(index, value) {
      this.field.value[index] = value;
    },
    deleteValue(index) {
      this.field.value.splice(index, 1);
    },
    resetValues() {
      this.contacts = [1];
    },
  },
};
</script>
