import { UPDATE_CONTACT } from '@/graphql/mutations/contactsMutations';
// import { GET_CONTACT } from '@/graphql/querys/contactsQuery';

export const contactsMixin = {
  data() {
    return {
      isLoadingUpdateContact: false,
    };
  },
  methods: {
    updateContact({
      id,
      name,
      email,
      birthday,
      phones,
      isClient,
      socialMedias,
      customForm,
      company,
      owner,
      tags,
      deal,
    }) {
      this.isLoadingUpdateContact = true;
      const contactInput = {};
      contactInput.id = id;
      if (name) {
        contactInput.name = name;
      }
      if (email) {
        contactInput.email = email;
      }
      if (birthday) {
        contactInput.birthday = birthday;
      }
      if (phones) {
        contactInput.phones = phones;
      }
      if (isClient === true || isClient === false) {
        contactInput.isClient = isClient;
      }
      if (socialMedias) {
        contactInput.socialMedias = socialMedias;
      }
      if (customForm) {
        contactInput.customForm = customForm;
      }
      if (company) {
        contactInput.company = company;
      }
      if (owner) {
        contactInput.owner = owner;
      }
      if (tags) {
        contactInput.tags = tags;
      }
      if (deal) {
        contactInput.deal = deal;
      }
      this.$apollo
        .mutate({
          // Query
          mutation: UPDATE_CONTACT,
          // Parameters
          variables: {
            contactInput,
          },
        })
        .then(({ data: { updateContact } }) => {
          this.$emit('updateItem', updateContact);
          this.$emit('updateHistory');
          // Close edit field
          this.isLoadingUpdateContact = false;
        })
        .catch(() => {
          this.isLoadingUpdateContact = false;
          // this.isLoading = false;
          // Error
          const error =
            'No se pudo actualizar el contacto, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
