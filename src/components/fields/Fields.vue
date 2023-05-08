<template>
  <component
    :field="field"
    :is="dynamicComponent"
    :inputProps="inputProps"
    :resetHandler="resetHandler"
    :isScrolled="isScrolled"
    @scrolled="scrolled"
    @outValue="outValue"
  ></component>
</template>

<script>
export default {
  name: 'Fields',
  props: {
    field: {
      type: Object,
      required: true,
    },
    inputProps: {
      type: Object,
      required: false,
    },
    resetHandler: {
      type: Boolean,
      default: false,
    },
    isScrolled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    FieldText: () => import('@/components/fields/FieldText.vue'),
    FieldTextBox: () => import('@/components/fields/FieldTextBox.vue'),
    FieldNumber: () => import('@/components/fields/FieldNumber.vue'),
    FieldMonetaryValue: () =>
      import('@/components/fields/FieldMonetaryValue.vue'),
    FieldSelect: () => import('@/components/fields/FieldSelect.vue'),
    FieldDate: () => import('@/components/fields/FieldDate.vue'),
    FieldDateRelativeAndExact: () =>
      import('@/components/fields/FieldDateRelativeAndExact.vue'),
    FieldEmail: () => import('@/components/fields/FieldEmail.vue'),
    FieldSelectCompanyMultiple: () =>
      import('@/components/fields/FieldSelectCompanyMultiple.vue'),
    FieldSelectCompany: () =>
      import('@/components/fields/FieldSelectCompany.vue'),
    FieldSelectCompanyFilter: () =>
      import('@/components/fields/FieldSelectCompanyFilter.vue'),
    FieldSelectContact: () =>
      import('@/components/fields/FieldSelectContact.vue'),
    FieldSelectContactFilter: () =>
      import('@/components/fields/FieldSelectContactFilter.vue'),
    FieldSelectContactMultiple: () =>
      import('@/components/fields/FieldSelectContactMultiple.vue'),
    FieldSelectPipeline: () =>
      import('@/components/fields/FieldSelectPipeline.vue'),
    FieldSelectPipelineFilter: () =>
      import('@/components/fields/FieldSelectPipelineFilter.vue'),
    FieldSelectUser: () => import('@/components/fields/FieldSelectUser.vue'),
    FieldSelectUserFilter: () =>
      import('@/components/fields/FieldSelectUserFilter.vue'),
    FieldBirthday: () => import('@/components/fields/FieldBirthday.vue'),
    FieldPhone: () => import('@/components/fields/FieldPhone.vue'),
    FieldPhonesMultiple: () =>
      import('@/components/fields/FieldPhonesMultiple.vue'),
    FieldPhonesEdit: () => import('@/components/fields/FieldPhonesEdit.vue'),
    FieldPhoneEdit: () => import('@/components/fields/FieldPhoneEdit.vue'),
    FieldSelectRadio: () => import('@/components/fields/FieldSelectRadio.vue'),
    FieldCheckbox: () => import('@/components/fields/FieldCheckbox.vue'),
    FieldSocialMediasMultiple: () =>
      import('@/components/fields/FieldsSocialMediasMultiple.vue'),
    FieldSocialMediasEdit: () =>
      import('@/components/fields/FieldsSocialMediasEdit.vue'),
    FieldSelectTagsMultiple: () =>
      import('@/components/fields/FieldSelectTagsMultiple.vue'),
    FieldSelectTag: () => import('@/components/fields/FieldSelectTag.vue'),
    FieldSelectDealStatus: () =>
      import('@/components/fields/FieldSelectDealStatus.vue'),
    FieldSelectStage: () => import('@/components/fields/FieldSelectStage.vue'),
  },
  computed: {
    // determina el componenete que se mostrara
    dynamicComponent() {
      switch (this.field.type || this.field.typeField) {
        case 'TEXT':
          return 'FieldText';
        case 'TEXT_BOX':
          return 'FieldTextBox';
        case 'NUMBER':
          return 'FieldNumber';
        case 'SELECT':
          return 'FieldSelect';
        case 'EMAIL':
          return 'FieldEmail';
        case 'DATE':
          if (
            this.field.typeLabel === 'CREATED_AT' ||
            this.field.typeLabel === 'UPDATED' ||
            this.field.typeLabel === 'EXP_CLOSE' ||
            this.field.typeLabel === 'DATE_LOST' ||
            this.field.typeLabel === 'DATE_WIN' ||
            this.field.typeLabel === 'ACTIVITY'
          )
            return 'FieldDateRelativeAndExact';
          return 'FieldDate';
        case 'MONETARY_VALUE':
          return 'FieldMonetaryValue';
        case 'SELECT_CONTACT':
          return this.field.isMultiple
            ? 'FieldSelectContactMultiple'
            : 'FieldSelectContact';
        case 'SELECT_COMPANY':
          return this.field.isMultiple
            ? 'FieldSelectCompanyMultiple'
            : 'FieldSelectCompany';
        // cambiar por SELECT_OWNER
        case 'SELECT_USER':
          return 'FieldSelectUser';
        case 'USER':
          return 'FieldSelectUserFilter';
        case 'STAGE':
          return 'FieldSelectStage';
        case 'RELATION':
          // if (this.field.typeLabel) {
          if (this.field.typeLabel === 'TAGS') return 'FieldSelectTag';
          if (this.field.typeLabel === 'CONTACT')
            return 'FieldSelectContactFilter';
          if (this.field.typeLabel === 'COMPANY')
            return 'FieldSelectCompanyFilter';
          // }
          return 'TEXT';
        case 'SIMPLE':
          if (this.field.typeLabel === 'STATUS') return 'FieldSelectDealStatus';
          if (this.field.typeLabel === 'PIPELINE')
            return 'FieldSelectPipelineFilter';
          return 'TEXT';
        case 'SELECT_PIPELINE':
          return 'FieldSelectPipeline';
        case 'BIRTHDAY':
          // If field is edit into contact
          return 'FieldBirthday';
        case 'PHONE':
          if (this.field.edit && Array.isArray(this.field.value)) {
            return 'FieldPhonesEdit';
          }
          if (this.field.edit && typeof this.field.value === 'string') {
            return 'FieldPhoneEdit';
          }

          return this.field.isMultiple ? 'FieldPhonesMultiple' : 'FieldPhone';
        case 'RADIO':
          return 'FieldSelectRadio';
        case 'CHECKBOX':
          return 'FieldCheckbox';
        case 'SELECT_TAG_CONTACT':
        case 'SELECT_TAG_COMPANY':
        case 'SELECT_TAG_DEAL':
          return 'FieldSelectTagsMultiple';
        case 'SOCIAL_MEDIAS':
          // If field is edit into contact
          return this.field.edit
            ? 'FieldSocialMediasEdit'
            : 'FieldSocialMediasMultiple';
        default:
          return 'FieldText';
      }
    },
  },
  methods: {
    scrolled(value) {
      this.$emit('scrolled', value);
    },
    // saca los valores de los input
    outValue(value) {
      this.$emit('outValue', value);
    },
  },
};
</script>
