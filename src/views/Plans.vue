<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="tittle-plans display-1 text-center">
          El mejor plan para tu empresa
        </p>
      </v-col>
    </v-row>
    <v-row v-if="$apollo.queries.plansToChoose.loading">
      <v-col
        :cols="isResponsive ? '12' : '4'"
        v-for="element in skeletonPlans"
        :key="element"
      >
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else align-content="center" cols="12">
      <v-col
        :cols="isResponsive ? '12' : '4'"
        v-for="plan in plansToChoose"
        :key="plan.id"
      >
        <v-hover v-slot:default="{ hover }" open-delay="100">
          <v-card
            tile
            :elevation="hover ? 16 : 2"
            class="mx-auto"
            width="350"
            height="450"
          >
            <v-alert
              :class="plan.isRecommended ? 'text-center mb-0 pb-0' : ''"
              dense
              text
              :color="plan.isRecommended ? 'green' : 'white'"
            >
              <strong>{{ plan.isRecommended ? 'Recomendado' : '' }}</strong>
            </v-alert>
            <v-card-title class="justify-center display-1 font-weight-black">
              {{ plan.name }}
            </v-card-title>
            <v-card-text>
              <v-row cols="12">
                <v-col cols="6" align="center">
                  <p class="font-weight-bold title">
                    {{
                      isPriceYearly
                        ? `$${plan.priceYear} MXN Anuales`
                        : `$${plan.priceMonth} MXN Mensuales`
                    }}
                  </p>
                </v-col>
                <v-col cols="6" align="right">
                  <v-switch
                    inset
                    v-model="isPriceYearly"
                    :class="
                      isResponsive ? 'ml-12 pl-10' : 'ml-12 pl-12 mt-0 pt-0'
                    "
                  />
                  <p
                    :class="
                      isResponsive
                        ? 'mr-8 font-weight-medium'
                        : 'mr-4 font-weight-medium'
                    "
                  >
                    Mensual/Anual
                  </p>
                </v-col>
              </v-row>
              <v-col cols="12" height="20">
                <p class="ml-2 mb-3">
                  {{ plan.description }}
                </p>
              </v-col>
            </v-card-text>
            <v-card-actions class="justify-center align-self-end">
              <v-btn @click="selectPlan(plan)" color="secondary" tile x-large>
                Comprar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">
        <p class="tittle-plans display-1 text-center">
          Compara los planes
        </p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col :cols="isResponsive ? '12' : '10'">
        <v-skeleton-loader
          v-if="$apollo.queries.plansToChoose.loading"
          type="table"
        ></v-skeleton-loader>
        <PlansDataTable
          v-else
          :groupModules="groupModules"
          :modules="modules"
          :plans="plansToChoose"
        />
      </v-col>
    </v-row>
    <ModalSignUp
      @dataSignUp="signUp"
      :industries="industries"
      :questions="questions"
      :plan="plan"
      @close="modalHandlerAlert"
      :modalHandler="modalSignUp"
    />
    <BaseModalAlert
      :modalHandler="modalAlert"
      @confirm="alertConfirmation"
      @close="modalHandlerAlert"
    ></BaseModalAlert>
    <BaseModalError @close="modalHandlerError" :modalHandler="modalError" />
  </v-container>
</template>
<script>
import { GET_PLANS_TO_CHOSE } from '@/graphql/querys/plansQuery';
import { GET_INDUSTRIES } from '@/graphql/querys/industriesQuery';
import { GET_QUESTIONS } from '@/graphql/querys/questionsQuery';
import { SIGN_UP } from '@/graphql/mutations/authMutations';
import { GET_MODULES, GET_GROUP_MODULES } from '@/graphql/querys/modulesQuery';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  mixins: [modalsAlertsMixin],
  components: {
    PlansDataTable: () => import('@/components/plans/PlansDataTable.vue'),
    ModalSignUp: () => import('@/components/signUp/ModalSignUp.vue'),
  },
  data() {
    return {
      skeletonPlans: [1, 2, 3],
      plan: {},
      // cambia el período de pago y el precio
      isPriceYearly: false,
      modalSignUp: {
        isOpen: false,
        isLoading: false,
      },
    };
  },
  computed: {
    isResponsive() {
      return (
        this.$vuetify.breakpoint.xs ||
        this.$vuetify.breakpoint.sm ||
        this.$vuetify.breakpoint.md
      );
    },
  },
  methods: {
    // mutacion de registrar usuario
    signUp({ jobTitle, user, enterprise, answers }) {
      this.modalHandlerSignUp({ isOpen: true, isLoading: true });
      this.$apollo
        .mutate({
          mutation: SIGN_UP,
          variables: {
            input: {
              jobTitle,
              user,
              enterprise,
              answers,
              plan: {
                id: this.plan.id,
              },
              suscription: {
                period: this.plan.period,
                price: this.plan.price,
              },
            },
          },
        })
        .then(() => {
          this.modalHandlerSignUp({ isOpen: false, isLoading: false });
          if (this.$router.name !== 'login') {
            this.$router.push('login');
          }
        })
        .catch((error) => {
          this.modalHandlerError({ isOpen: true, error });
          this.modalHandlerSignUp({ isOpen: true, isLoading: false });
        });
    },
    // recibe el plan y lo guarda en la variable plan
    selectPlan({ id, priceMonth, priceYear }) {
      this.plan = {
        id,
        // validacion de precio anual o mensual
        period: this.isPriceYearly ? 'ANNUAL' : 'MONTHLY',
        price: this.isPriceYearly ? priceYear : priceMonth,
      };
      // abre el modal
      this.modalHandlerSignUp({ isOpen: true, isLoading: false });
    },
    alertConfirmation({ message, info }) {
      this.modalHandlerAlert({
        isOpen: false,
        isLoading: false,
        message,
        info,
      });
      this.modalHandlerSignUp({ isOpen: false, isLoading: false });
    },
    // manejador de modal
    modalHandlerSignUp({ isOpen, isLoading }) {
      this.modalSignUp = { isOpen, isLoading };
    },
  },
  apollo: {
    plansToChoose: {
      query: GET_PLANS_TO_CHOSE,
      fetchPolicy: 'no-cache',
    },
    questions: {
      query: GET_QUESTIONS,
      fetchPolicy: 'no-cache',
    },
    industries: {
      query: GET_INDUSTRIES,
      fetchPolicy: 'no-cache',
    },
    modules: {
      query: GET_MODULES,
      fetchPolicy: 'no-cache',
    },
    groupModules: {
      query: GET_GROUP_MODULES,
      fetchPolicy: 'no-cache',
    },
  },
};
</script>

<style lang="scss" scoped>
.tittle-plans {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
