<template>
  <v-card outlined>
    <v-card-title>
      Resumen
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Total a pagar mensual</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            {{ summary.totalMonthly | formatPrice }}
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Total a pagar al año</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            {{ summary.totalYearly | formatPrice }}
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <b class="title">Total a cobrar hoy</b>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <b class="title">
              {{ (summary.totalMonthly + summary.totalYearly) | formatPrice }}
            </b>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BillingSummary',
  props: {
    summary: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
