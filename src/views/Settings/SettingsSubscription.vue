<template>
  <div>
    <div
      v-if="$apollo.queries.userEnterprise.loading"
      class="d-flex justify-center mt-5"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else-if="error">
      <v-alert dense type="error" class="text-center">
        Ha ocurrido un error, vuelve a recargar la página
      </v-alert>
    </div>
    <div v-else>
      <v-row>
        <v-col><h1 class="title">Resumen de facturación</h1></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined>
            <v-card-title class="justify-center">
              Usuarios
            </v-card-title>
            <v-card-text class="text-center">
              <h2>{{ this.userEnterprise.enterprise.users.length }}</h2>
            </v-card-text>
            <v-card-actions class="justify-center pb-3">
              <v-btn outlined color="primary" to="/users">
                Administrar usuarios
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined height="100%">
            <v-card-title class="justify-center">
              Pago
              {{ formatPeriod(userEnterprise.suscription.period) }}
            </v-card-title>
            <v-card-text class="text-center">
              <h2>{{ userEnterprise.suscription.price | formatPrice }}</h2>
            </v-card-text>
            <v-card-actions class="justify-center pb-3">
              <h3>Próximo cobro el {{ userEnterprise.suscription.dateEnd }}</h3>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined>
            <v-card-title class="justify-center">
              Plan
            </v-card-title>
            <v-card-text class="text-center">
              <h2>{{ userEnterprise.plan.name }}</h2>
            </v-card-text>
            <v-card-actions class="justify-center pb-3">
              <v-btn outlined color="primary" to="/users">
                Gestionar suscripción
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="$apollo.queries.customerStripe.loading">
        <v-col class="d-flex justify-center mt-5">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row v-else-if="!customerStripe.sources.length">
        <v-col>
          <v-card outlined>
            <v-card-title class="justify-center">
              Añade tus datos de facturación
            </v-card-title>
            <v-card-text class="text-center">
              Todavía falta agregar tu información de facturación
            </v-card-text>
            <v-card-actions class="justify-center pb-3">
              <v-btn color="primary" to="/settings/billing">
                Añadir datos de facturación
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" md="6">
          <v-card outlined>
            <v-card-title>
              Último pago
              <v-spacer></v-spacer>
              <v-btn text color="primary">Nº 232324</v-btn>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <b>Cantidad</b>
                </v-col>
                <v-col>
                  $4500.00
                </v-col>
              </v-row>
              <v-row>
                <v-col><b>Fecha de pago</b></v-col>
                <v-col>
                  27 de Mayo de 2020
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="mb-2">
              <v-btn color="primary" small to="/settings/invoices">
                Ver pagos
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <DetailsBilling />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined height="100%">
            <v-card-title>
              Consigue crédito para cuentas gratuitas
            </v-card-title>
            <v-card-text>
              Invita a tus amigos a usar nuestra CRM y gana dinero o créditos
            </v-card-text>
            <v-card-actions class="pl-3 pb-3">
              <v-btn color="primary">Invitar amigos</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined>
            <v-card-title>
              Cupones de descuentos
            </v-card-title>
            <v-card-text>
              ¿Tiénes un cupón? Usalos aquí
            </v-card-text>
            <v-card-actions class="pl-3 pb-3">
              <v-text-field
                outlined
                label="Ingresa el cupón"
                dense
                hide-details="auto"
              ></v-text-field>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import DetailsBilling from '@/components/subscriptions/DetailsBilling.vue';
import { GET_USER_CURRENT } from '@/graphql/querys/usersQuery';
import { GET_CUSTOMER } from '@/graphql/querys/customersQuery';

export default {
  name: 'Subscription',
  components: {
    DetailsBilling,
  },
  data() {
    return {
      userCurrent: {},
      userEnterpriseId: this.userCurrent.enterprise.id || '',
      userEnterprise: {},
      error: false,
    };
  },
  methods: {
    formatPeriod(period) {
      if (!period) {
        return '';
      }
      return period === 'MONTHLY' ? 'mensual' : 'anual';
    },
  },
  apollo: {
    userEnterprise: {
      query: GET_USER_CURRENT,
      error() {
        this.error = true;
      },
    },
    customerStripe: {
      query: GET_CUSTOMER,
    },
    userCurrent: {
      query: GET_USER_CURRENT,
    },
  },
};
</script>

<style lang="scss" scoped></style>
