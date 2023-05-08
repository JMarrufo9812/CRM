<template>
  <div>
    <div class="d-flex pb-4" v-for="(company, index) in companies" :key="index">
      <FieldSelectCompanySimple
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
        class="my-3 ml-2"
        :disabled="companies.length >= 3"
      >
        <v-icon>
          mdi-domain-plus
        </v-icon>
      </v-btn>
      <v-btn
        v-else
        @click="deleteCompany(index)"
        small
        class="my-3 ml-3"
        outlined
        tile
        color="error"
      >
        <v-icon>mdi-domain-remove</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldSelectContactMultiple',
  components: {
    FieldSelectCompanySimple: () =>
      import('@/components/fields/FieldSelectCompanySimple.vue'),
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
      companies: [1],
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
      this.companies.push(+1);
    },
    deleteCompany(index) {
      this.companies.splice(index, 1);
      if (this.field.value) this.field.value.splice(index, 1);
    },
    updateValue(index, value) {
      this.field.value[index] = value;
    },
    deleteValue(index) {
      this.field.value.splice(index, 1);
    },
    resetValues() {
      this.companies = [1];
    },
  },
};
</script>
