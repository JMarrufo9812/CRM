<template>
  <div>
    <form id="payment-form">
      <slot name="card-element">
        <div id="card-element"></div>
      </slot>
      <slot name="card-errors">
        <div id="card-errors" role="alert"></div>
      </slot>
      <button ref="submitButtonRef" type="submit" class="hide"></button>
    </form>
  </div>
</template>

<script>
import { loadStripeCheckout } from './load-checkout';

export default {
  name: 'CreditCard',
  props: {
    pk: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: undefined,
    },
    stripeAccount: {
      type: String,
      default: undefined,
    },
    apiVersion: {
      type: String,
      default: undefined,
    },
    locale: {
      type: String,
      default: 'auto',
    },
  },
  data() {
    return {
      loading: false,
      stripe: null,
      elements: null,
      card: null,
    };
  },
  computed: {
    style() {
      return {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: 'rgba(0, 0, 0, 0.6)',
          },
        },
        invalid: {
          color: '#ff5252',
          iconColor: '#ff5252',
        },
      };
    },
    form() {
      return document.getElementById('payment-form');
    },
  },
  methods: {
    submit() {
      this.$refs.submitButtonRef.click();
    },
  },
  mounted() {
    loadStripeCheckout(this.pk, 'v3', () => {
      const options = {
        stripeAccount: this.stripeAccount,
        apiVersion: this.apiVersion,
        locale: this.locale,
      };
      this.stripe = window.Stripe(this.pk, options);
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card', { style: this.style });
      this.card.mount('#card-element');

      this.card.addEventListener('change', ({ error }) => {
        const displayError = document.getElementById('card-errors');
        if (error) {
          displayError.textContent = error.message;
        } else {
          displayError.textContent = '';
        }
      });

      this.form.addEventListener('submit', async (event) => {
        try {
          this.$emit('loading', true);
          event.preventDefault();
          const data = {
            ...this.card,
          };
          if (this.amount) data.amount = this.amount;
          const { token, error } = await this.stripe.createToken(data);
          if (error) {
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = error.message;
            this.$emit('error 1', error);
          } else {
            this.$emit('token', token);
          }
        } catch (error) {
          this.$emit('error', error);
        } finally {
          this.$emit('loading', false);
        }
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.StripeElement {
  box-sizing: border-box;
  height: 56px;

  padding: 18px 12px;

  border: 1px solid rgba(0, 0, 0, 0.38);
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
  border: 2px solid #1976d2;
  padding: 17px 11px;
}

.StripeElement--invalid {
  border-color: #ff5252;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

.hide {
  visibility: hidden;
}

#card-errors {
  color: #ff5252;
  margin-top: 5px;
  margin-left: 10px;
  font-size: 12px;
}
</style>
