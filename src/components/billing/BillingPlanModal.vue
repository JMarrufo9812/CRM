<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <v-card>
      <v-card-title class="primary white--text" primary-title>
        Cambiar plan de
        <b class="ml-1">{{ user.name }}</b>
      </v-card-title>
      <v-card-text>
        <v-select
          :items="plansToChoose"
          item-text="name"
          item-value="id"
          v-model="plan"
          label="Elige un plan"
          outlined
          hide-details="auto"
          class="mt-5"
          return-object
        ></v-select>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" text @click="choosePlan(false)">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="choosePlan(true)">
          Cambiar plan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// Query
import { GET_PLANS_TO_CHOOSE } from '@/graphql/querys/plansQuery';

export default {
  name: 'ModalChoosePlan',
  props: {
    user: {
      type: Object,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      plan: null,
      listPlans: [],
    };
  },
  watch: {
    user() {
      if (this.user) {
        this.plan = {
          ...this.user.plan,
        };
      }
    },
  },
  methods: {
    choosePlan(isSave) {
      // Save only if changed with other plan
      if (isSave && this.user.plan.id !== this.plan.id) {
        // Send info and Save
        this.$emit('save', {
          isSave: true,
          plan: this.plan,
        });
      } else {
        // No save
        this.$emit('save', { isSave: false });
      }
    },
  },
  apollo: {
    // Apollo Querys
    plansToChoose: {
      query: GET_PLANS_TO_CHOOSE,
    },
  },
};
</script>
