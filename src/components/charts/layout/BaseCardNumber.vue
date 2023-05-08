<template>
  <div class="cardNumber text-center">
    <div>
      <span class="font-weight-bold d-block mb-7">
        {{ information.textMain }}
      </span>
      <span class="d-block mb-8">
        {{ information.valueMain }}
      </span>
      <span class="d-block number font-weight-bold mb-8">
        {{ information.numberMain }}
      </span>
      <div v-if="information.isCompare">
        <span class="d-block font-weight-bold my-8">
          <v-icon
            large
            :color="information.numberDifferenceCompare > 0 ? 'green' : 'error'"
          >
            {{
              information.numberDifferenceCompare > 0
                ? 'mdi-menu-up'
                : 'mdi-menu-down'
            }}
          </v-icon>
          {{ information.numberDifferenceCompare }}% VS
        </span>
        <span class="d-block number font-weight-bold mt-8">
          {{ information.numberCompare }}
        </span>
        <span class="font-weight-bold d-block mt-8">
          {{ information.textCompare }}
        </span>
        <span class="d-block">
          {{ information.valueCompare }}
        </span>
      </div>
    </div>
    <span class="d-block subtitle text-uppercase">
      {{ information.textMainType }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseCardNumber',
  props: {
    information: {
      type: Object,
      default: () => {
        return {
          numberMain: '',
          valueMain: '',
          textMain: '',
          textMainType: '',
          isCompare: false,
          numberCompare: '',
          textCompare: '',
          valueCompare: '',
          numberDifferenceCompare: 0,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.cardNumber {
  background-color: white;
  padding: 30px 0;
}
.number {
  font-size: 5rem;
  color: #2e2e2f;
}
.subtitle {
  font-size: 1.563rem;
  margin-top: 50px;
}
</style>
