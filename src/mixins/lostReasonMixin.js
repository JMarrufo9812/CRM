import { GET_LOST_REASONS } from '@/graphql/querys/dealsQuery';

export const lostReasonMixin = {
  data() {
    return {
      isLoadingGet: true,
      isErrorGetReasons: false,
      infoError: {
        icon: '',
        title: '',
        message: '',
      },
    };
  },
  watch: {
    lostReasons(data) {
      if (data) this.isLoadingGet = false;
    },
  },
  apollo: {
    lostReasons: {
      query: GET_LOST_REASONS,
      fetchPolicy: 'no-cache',
      variables: {
        filters: {
          orderBy: 'desc',
        },
      },
      error() {
        this.isErrorGetReasons = true;
        this.infoError = {
          icon: 'mdi-alert-outline',
          title: 'Error',
          message:
            'No se ha podido cargar las razones de pérdida, contacte con soporte',
        };
      },
    },
  },
};
