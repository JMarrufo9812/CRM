import { CHECK_ENTERPRISE_EXIST } from '@/graphql/querys/enterprisesQuery';

export const checkEnterpriseMixin = {
  data() {
    return {
      existEnterprise: false,
      isLoadingChecking: false,
    };
  },
  methods: {
    checkEnterprise(enterpriseName) {
      if (enterpriseName) {
        this.isLoadingChecking = true;
        this.$apollo
          .query({
            query: CHECK_ENTERPRISE_EXIST,
            variables: {
              userInput: {
                name: enterpriseName,
              },
            },
          })
          .then((data) => {
            this.existEnterprise = data.data.checkEnterpriseName;
            this.isLoadingChecking = false;
          });

        // .catch((error) => {
        //   console.log(error);
        //   this.isLoadingChecking = false;
        // });
      }
    },
  },
};
