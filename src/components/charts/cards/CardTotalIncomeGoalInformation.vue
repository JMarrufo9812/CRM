<template>
  <v-card flat class="mt-5">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="3">
          <template v-for="(user, index) in information.userTotalIncome">
            <span :key="index" class="d-block">
              <b>{{ user.name }}</b>
              :
              {{
                filterBy === 'sum'
                  ? `$${user[filterBy].toFixed(2)}`
                  : user[filterBy]
              }}
            </span>
          </template>
        </v-col>
        <v-col cols="9">
          <v-row>
            <v-col>
              <span
                class="d-block"
                v-for="(item, index) in getInfo.firstColumn"
                :key="index"
              >
                <b>{{ columnOne[index] }}</b>
                : {{ item }}
              </span>
            </v-col>
            <v-col>
              <span
                class="d-block"
                v-for="(item, index) in getInfo.secondColumn"
                :key="index"
              >
                <b>{{ columnTwo[index] }}</b>
                : ${{ item }}
              </span>
            </v-col>
            <v-col>
              <span
                class="d-block"
                v-for="(item, index) in getInfo.thirdColumn"
                :key="index"
              >
                <b>{{ columnThree[index] }}</b>
                : ${{ item }}
              </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: 'CardTotalIncomeGoalInformation',
  props: {
    information: {
      type: Object,
      default: () => {
        return {
          userTotalIncome: [],
          periodsTotalIncome: [],
        };
      },
    },
    filterBy: {
      type: String,
      default: 'count',
    },
  },
  data() {
    return {
      columnOne: [
        'Este período',
        'Período pasado',
        'Mismo período el mes anterior',
      ],
      columnTwo: [
        'Ingresos este período',
        'Ingresos período pasado',
        'Ingresos mismo período el mes anterior',
      ],
      columnThree: [
        'Ingresos totales este período',
        'Ingresos totales período pasado',
        'Ingresos totales mismo período el mes anterior',
      ],
    };
  },
  computed: {
    getInfo() {
      const firstColumn = this.information.periodsTotalIncome.map((item) => {
        return item.count;
      });

      const secondColumn = this.information.periodsTotalIncome.map((item) => {
        return item.sum;
      });

      const thirdColumn = this.information.periodsTotalIncome.map((item) => {
        return item.totalSum;
      });

      return { firstColumn, secondColumn, thirdColumn };
    },
  },
};
</script>

<style></style>
