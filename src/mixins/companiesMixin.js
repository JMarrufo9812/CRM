import { UPDATE_COMPANY } from '@/graphql/mutations/companiesMutations';
// import { GET_COMPANY } from '@/graphql/querys/companiesQuery';

export const companiesMixin = {
  data() {
    return {
      isLoadingUpdateCompany: false,
    };
  },
  methods: {
    updateCompany({
      id,
      name,
      address,
      website,
      socialMedias,
      phones,
      customForm,
      contact,
      tags,
      owner,
      deal,
    }) {
      this.isLoadingUpdateCompany = true;
      const companyInput = {};
      companyInput.id = id;
      if (name) {
        companyInput.name = name;
      }
      if (address) {
        companyInput.address = address;
      }
      if (website) {
        companyInput.website = website;
      }
      if (socialMedias) {
        companyInput.socialMedias = socialMedias;
      }
      if (phones) {
        companyInput.phones = phones;
      }
      if (customForm) {
        companyInput.customForm = customForm;
      }
      if (contact) {
        companyInput.contact = contact;
      }
      if (tags) {
        companyInput.tags = tags;
      }
      if (owner) {
        companyInput.owner = owner;
      }
      if (deal) {
        companyInput.deal = deal;
      }
      this.$apollo
        .mutate({
          // Query
          mutation: UPDATE_COMPANY,
          // Parameters
          variables: {
            companyInput,
          },
        })
        .then(({ data: { updateCompany } }) => {
          this.$emit('updateItem', updateCompany);
          this.$emit('updateHistory');
          // Close edit field
          this.isLoadingUpdateCompany = false;
        })
        .catch(() => {
          this.isLoadingUpdateCompany = false;
          // Error
          const error =
            'No se pudo actualizar la empresa, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
