<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">Resumen de compra</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2 class="title ml-4">Usuarios</h2>
        <template v-for="skeleton in [1, 2]">
          <v-skeleton-loader
            v-if="$apollo.queries.userEnterprises.loading"
            type="list-item-three-line"
            :key="`${skeleton}-ske`"
          ></v-skeleton-loader>
        </template>
        <template
          v-if="
            userEnterprises &&
              userEnterprises.length < 1 &&
              !$apollo.queries.userEnterprises.loading
          "
        >
          <p class="text-center">No hay usuarios</p>
        </template>
        <template v-else>
          <v-row>
            <v-col>
              <v-data-table
                :headers="headers"
                :items="users"
                :items-per-page="10"
                :footer-props="footerProps"
              >
                <template #[`item.plan.name`]="{ item }">
                  {{ item.plan.name }}
                  <v-btn icon @click="editPlan(item)">
                    <v-icon color="primary">
                      mdi-pencil-circle
                    </v-icon>
                  </v-btn>
                </template>
                <template #[`item.plan.isYearly`]="{ item }">
                  <v-switch
                    v-model="item.plan.isYearly"
                    inset
                    dense
                    class="mt-0 pt-0"
                    hide-details="auto"
                  >
                    <template v-slot:label>
                      <span
                        :class="{
                          'font-weight-bold': !item.plan.isYearly,
                        }"
                      >
                        Mensual
                      </span>
                      /
                      <span
                        :class="{
                          'font-weight-bold': item.plan.isYearly,
                        }"
                      >
                        Anual
                      </span>
                    </template>
                  </v-switch>
                </template>
                <template #[`item.plan.priceMonth`]="{ item }">
                  {{
                    item.plan.isYearly
                      ? item.plan.priceYear
                      : item.plan.priceMonth | formatPrice
                  }}
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </template>
        <template>
          <p v-if="error" class="text-center red--text">
            Error en el sistema
          </p>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BillingSummary :summary="summary"></BillingSummary>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn large color="primary" @click="pay">Guardar y pagar</v-btn>
      </v-col>
    </v-row>
    <BillingPlanModal
      :user="userEdit"
      :dialog="isOpenModal"
      @save="updatePlan"
    ></BillingPlanModal>
  </div>
</template>

<script>
// Querys
import { GET_PLANS_TO_CHOOSE } from '@/graphql/querys/plansQuery';
import { GET_USERS_ENTERPRISE } from '@/graphql/querys/usersQuery';

// Mutations
import { UPDATE_USER_ENTERPRISE } from '@/graphql/mutations/usersMutations';

// Components
import BillingPlanModal from '@/components/billing/BillingPlanModal.vue';
import BillingSummary from '@/components/billing/BillingSummary.vue';

export default {
  name: 'BillingReview',
  components: {
    BillingPlanModal,
    BillingSummary,
  },
  data() {
    return {
      // Get query
      plansToChoose: [],
      userEnterprises: [],
      // Error querys
      error: false,
      // List of users with format
      users: [],
      // Modal
      isOpenModal: false,
      // User to Edit plan
      userEdit: {
        id: -1,
        name: '',
        plan: {
          id: -1,
          name: '',
          priceMonth: 0,
          priceYear: 0,
          isYearly: false,
        },
      },
      // Purchase summary
      totalMonthly: 0,
      totalYearly: 0,
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Plan', value: 'plan.name' },
        { text: 'Período de pago', value: 'plan.isYearly' },
        { text: 'Total', value: 'plan.priceMonth' },
      ],
      footerProps: {
        itemsPerPageOptions: [5, 10, 25, { text: 'Todos', value: -1 }],
        itemsPerPageText: 'Filas por página',
      },
    };
  },
  watch: {
    // Format list of users to show
    userEnterprises() {
      // Check if plans get all data
      if (this.plansToChoose.length > 0) {
        // Assign a format for users
        this.users = this.formatListUser();
      }
    },
    // Format list of users to show
    plansToChoose() {
      // Check if userEnterprises get all data
      if (this.userEnterprises.length > 0) {
        // Assign a format for users
        this.users = this.formatListUser();
      }
    },
    // Review users and plans to generate totals
    users: {
      deep: true,
      handler() {
        this.totalMonthly = this.totalToPay(false);
        this.totalYearly = this.totalToPay(true);
      },
    },
  },
  computed: {
    summary() {
      return { totalMonthly: this.totalMonthly, totalYearly: this.totalYearly };
    },
  },
  methods: {
    // Calculate total price to pay by Month and Annual
    // byYear define true by Annual and false by Month
    totalToPay(byYear) {
      return (
        this.users
          // Filter only users by plan month or plan year
          .filter((user) => {
            return user.plan.isYearly === byYear;
          })
          // Return only price of user
          .map((user) => {
            return byYear ? user.plan.priceYear : user.plan.priceMonth;
          })
          // Sum of results
          .reduce((a, b) => a + b, 0)
      );
    },
    // Format list user
    formatListUser() {
      // Return the list with format
      return this.userEnterprises.map((user) => {
        // Search plan to get plan complete for each user
        const dataPlan = this.plansToChoose.find(
          (plan) => plan.id === user.plan.id,
        );
        // Return object with new format
        return {
          id: user.user.id,
          name: `${user.user.name} ${user.user.lastName}`,
          plan: {
            id: dataPlan.id,
            name: dataPlan.name,
            priceMonth: dataPlan.priceMonth,
            priceYear: dataPlan.priceYear,
            isYearly: user.suscription.period === 'ANNUAL',
          },
          userEnterpriseId: user.id,
        };
      });
    },
    // Select user to send to modal
    editPlan(user) {
      // Assign user select
      this.userEdit = JSON.parse(JSON.stringify(user));
      // Open modal to choose other plan
      this.isOpenModal = true;
    },
    // Update plan of user specific
    updatePlan({ isSave, plan }) {
      // Close modal
      this.isOpenModal = false;

      // Update plan
      if (isSave) {
        // Format user with new plan
        const formatUser = {
          id: this.userEdit.id,
          name: this.userEdit.name,
          plan: {
            id: plan.id,
            name: plan.name,
            priceMonth: plan.priceMonth,
            priceYear: plan.priceYear,
            isYearly: this.userEdit.plan.isYearly,
          },
        };
        // Search user to change plan and save
        this.users = this.users.map((user) => {
          if (user.id === this.userEdit.id) {
            return formatUser;
          }
          return user;
        });
      }
    },
    // Complete pay
    pay() {
      this.updatePlanListUsers(this.users);
      this.$emit('pay', this.users);
    },
    updatePlanListUsers(listUsers) {
      listUsers.forEach((user) => {
        const planId = user.plan.id;
        const id = user.userEnterpriseId;
        const period = user.plan.isYearly ? 'ANNUAL' : 'MONTHLY';
        this.updatePlanOther(id, planId, period);
      });
    },
    updatePlanOther(id, planId, period) {
      this.$apollo.mutate({
        mutation: UPDATE_USER_ENTERPRISE,
        variables: {
          input: {
            id,
            plan: {
              id: planId,
            },
            suscription: {
              period,
            },
          },
        },
      });
      // .then((data) => {
      //   console.log(data);
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    },
  },
  apollo: {
    // Apollo Querys
    plansToChoose: {
      query: GET_PLANS_TO_CHOOSE,
    },
    userEnterprises: {
      query: GET_USERS_ENTERPRISE,
      variables() {
        return {
          filters: { orderBy: 'desc', status: 'ACTIVE' },
        };
      },
      error() {
        this.error = true;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card__text {
  padding: 0 16px;
}
</style>
