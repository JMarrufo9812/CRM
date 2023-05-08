<template>
  <div>
    <div class="d-flex flex-row pb-10">
      <slot name="top" />
    </div>
    <div class="data-table-container">
      <v-card outlined class="mx-12">
        <v-data-table
          v-model="contactsSelected"
          :headers="totalContacts !== 0 ? headers : []"
          :items="listContacts"
          item-key="id"
          :options.sync="options"
          :server-items-length="totalContacts"
          :loading="loading"
          loading-text="Cargando contactos..."
          class="contacts-data-table"
          show-select
          @click:row="clickRow"
          hide-default-header
          hide-default-footer
        >
          <template v-slot:no-data>
            <BaseErrorComponent :info="infoError" />
          </template>
          <template v-slot:header="{ props, on }">
            <thead v-if="totalContacts !== 0">
              <draggable
                v-model="props.headers"
                :group="{ name: 'headers', put: true }"
                :animation="200"
                tag="tr"
                @change="ChangeHeaderOrder(props.headers)"
                draggable=".item"
              >
                <th
                  v-for="(header, index) in props.headers"
                  :key="header.value"
                  class="table-headers-interactive"
                  :style="
                    index !== 0 ? 'min-width: 160px;' : 'min-width: 40px;'
                  "
                  :class="index === 0 ? 'first' : 'item'"
                >
                  <v-simple-checkbox
                    v-if="index === 0"
                    v-model="props.everyItem"
                    :indeterminate="props.someItems && !props.everyItem"
                    @input="on['toggle-select-all']"
                    class="my-4"
                    dark
                    hide-details="auto"
                    color="secondary"
                  ></v-simple-checkbox>
                  <div class="d-flex justify-center">
                    <div>
                      {{ header.text }}
                    </div>
                    <div class="ml-2">
                      <v-icon
                        v-if="index !== 0 && validateSort(header.value)"
                        x-small
                        class="white--text"
                        @click="on['sort'](header.value)"
                      >
                        {{
                          props.options.sortBy[0] === header.value
                            ? typeof props.options.sortDesc[0] === 'boolean'
                              ? props.options.sortDesc[0]
                                ? 'mdi-sort-ascending'
                                : 'mdi-sort-descending'
                              : 'mdi-sort'
                            : 'mdi-sort'
                        }}
                      </v-icon>
                    </div>
                  </div>
                </th>
              </draggable>
            </thead>
          </template>
          <template
            #[`item.companies`]="{ item: { companies: [company, ...companies] } }"
          >
            <span
              class="select-text-underline"
              @click.stop="goToProfile('company', company.id)"
            >
              <v-icon small class="mr-1">
                {{ company ? 'mdi-domain' : '' }}
              </v-icon>
              {{ company ? company.name : '' }}
            </span>
            <v-menu allow-overflow>
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip top color="white">
                  <template v-slot:activator="{ on: tooltip }">
                    <v-chip
                      outlined
                      class="ml-1 pa-1"
                      v-show="companies.length > 0"
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu }"
                      x-small
                    >
                      <v-icon x-small class="mr-1">
                        mdi-domain
                      </v-icon>
                      + {{ companies.length }}
                    </v-chip>
                  </template>
                  <span class="black--text">
                    Este contacto cuenta con más de una empresa has click para
                    ver
                  </span>
                </v-tooltip>
              </template>
              <v-list>
                <v-list-item
                  v-for="(company, index) in companies"
                  :key="index"
                  dense
                  @click.stop="goToProfile('company', company.id)"
                >
                  <v-icon class="mr-2" small>mdi-domain</v-icon>
                  <v-list-item-title>{{ company.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template #[`item.name`]="{ item }">
            <span
              class="select-text-underline"
              @click.stop="goToProfile('contact', item.id)"
            >
              {{ item.name }}
            </span>
          </template>
          <template #[`item.phones`]="{ item: { phones: [phone, ...phones] } }">
            <span>
              <v-icon small class="mr-1">
                {{ phone ? 'mdi-phone' : '' }}
              </v-icon>
              {{ phone ? phone.number : '' }}

              <v-tooltip right color="white">
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    class="ml-1 pa-1"
                    outlined
                    v-show="phones.length > 0"
                    x-small
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon x-small>
                      mdi-phone
                    </v-icon>
                    + {{ phones.length }}
                  </v-chip>
                </template>
                <ul class="pl-2">
                  <li
                    v-for="phone in phones"
                    :key="phone.number"
                    class="black--text"
                  >
                    <v-icon x-small>
                      mdi-phone
                    </v-icon>
                    {{ phone.number }}
                  </li>
                </ul>
              </v-tooltip>
            </span>
          </template>
          <template #[`item.tags`]="{ item: { tags: [tag, ...tags] } }">
            <v-chip
              :outlined="tag ? false : true"
              small
              :color="tag ? tag.color : 'grey'"
              :text-color="tag ? getBestColor(tag.color) : ''"
            >
              <v-icon small class="mr-1">
                {{ tag ? 'mdi-tag' : 'mdi-tag-off' }}
              </v-icon>
              {{ tag ? tag.name : 'Sin etiqueta' }}
            </v-chip>
            <v-tooltip color="white" right>
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  outlined
                  v-show="tags.length > 0"
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  class="ml-1 pa-1"
                >
                  <v-icon small>mdi-tag-multiple</v-icon>
                  + {{ tags.length }}
                </v-chip>
              </template>
              <ul class="pa-0">
                <li v-for="tag in tags" :key="tag.id">
                  <v-chip
                    class="mb-2"
                    :text-color="getBestColor(tag.color)"
                    :color="tag.color"
                    small
                  >
                    <v-icon x-small class="mr-1">
                      mdi-tag
                    </v-icon>
                    {{ tag.name }}
                  </v-chip>
                </li>
              </ul>
            </v-tooltip>
          </template>
          <template #[`item.owner`]="{ item }">
            <span :class="item.owner ? '' : 'red--text'">
              <v-icon :class="item.owner ? '' : 'red--text'" small>
                {{ item.owner ? 'mdi-account' : 'mdi-alert' }}
              </v-icon>
              {{ item.owner ? item.owner.user.name : 'Sin Propietario' }}
            </span>
          </template>
          <template #[`item.isClient`]="{ item }">
            <span>
              {{ item.isClient ? 'Antiguo' : 'Nuevo' }}
            </span>
          </template>
          <template #[`item.socialMedias`]="{ item: { socialMedias } }">
            <FieldsValueSocialMedias
              v-for="(socialMedia, index) in socialMedias"
              :key="index"
              :social="socialMedia"
            />
          </template>
          <template #[`item.createdAt`]="{ item }">
            <span>{{ item.createdAt | timeZone('lll') }}</span>
          </template>
          <template #[`item.updatedAt`]="{ item }">
            <span>{{ item.updatedAt | timeZone('lll') }}</span>
          </template>
          <template #[`item.createdBy`]="{ item }">
            <span>
              <v-icon small>mdi-account</v-icon>
              {{ item.createdBy.user.name + item.createdBy.user.lastName }}
            </span>
          </template>
        </v-data-table>
        <v-data-footer
          v-if="totalContacts > 10"
          :options.sync="options"
          :pagination="{
            page: options.page,
            pageStart:
              options.page * options.itemsPerPage - options.itemsPerPage,
            pageStop: options.itemsPerPage * options.page,
            itemsPerPage: options.itemsPerPage,
            itemsLength: totalContacts,
          }"
          :items-per-page-options="[10, 20, 30, 40, 50]"
        ></v-data-footer>
      </v-card>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { GET_CONTACTS } from '@/graphql/querys/contactsQuery';
import { tagsMixin } from '@/mixins/tagsMixin';

export default {
  name: 'ContactsDataTable',
  mixins: [tagsMixin],
  components: {
    BaseErrorComponent: () => import('@/components/ui/BaseErrorComponent.vue'),
    FieldsValueSocialMedias: () =>
      import('@/components/fields/FieldsValueSocialMedias.vue'),
    draggable,
  },
  data() {
    return {
      infoError: {
        icon: 'mdi-account-search-outline',
        title: '',
        message: 'No se encontraron contactos',
      },
      loading: false,
      contactsSelected: [],
      // searchContact: '',
      options: {},
      listContacts: [],
      totalContacts: 0,
      filters: {
        search: '',
        orderBy: 'desc',
        skip: 0,
        take: 0,
        sortBy: [],
        sortDesc: [],
        isDelete: false,
      },
    };
  },
  props: {
    headers: {
      type: [Object, Array],
    },
    updateData: {
      type: Boolean,
      default: false,
    },
    searchContact: {
      type: String,
    },
  },
  watch: {
    options: {
      handler(value) {
        this.filters.sortBy = value.sortBy;
        this.filters.sortDesc = value.sortDesc;
        if (value.itemsPerPage === -1) {
          this.filters.take = this.totalContacts;
        } else {
          this.filters.take = value.itemsPerPage;
        }
        this.filters.skip = (value.page - 1) * value.itemsPerPage;
        this.getContacts();
      },
      deep: true,
    },
    searchContact() {
      if (Object.keys(this.searchContact).length >= 2) {
        this.filters.search = this.searchContact;
        this.getContacts();
      }
      if (Object.keys(this.searchContact).length === 0) {
        this.filters.search = this.searchContact;
        this.getContacts();
      }
    },
    contactsSelected() {
      this.$emit('selectContacts', this.contactsSelected);
    },
    // variable que avisa de un cambio en la query de contacts
    updateData(value) {
      // ejecuta la funcion de actualizar el query
      if (value) this.getContacts();
      else this.contactsSelected = [];
    },
    $route: {
      handler(to) {
        this.contactsSelected = [];
        if (to.query.filterId) this.getContacts();
        if (to.query.recyclebin) {
          this.filters.isDelete = true;
          this.getContacts();
        } else {
          this.filters.isDelete = false;
          this.getContacts();
        }
      },
      immediate: true,
    },
  },
  methods: {
    validateSort(keyInput) {
      // console.log(keyInput);
      if (
        keyInput === 'name' ||
        keyInput === 'email' ||
        keyInput === 'isClient' ||
        keyInput === 'createdAt' ||
        keyInput === 'updatedAt' ||
        keyInput === 'birthday'
      )
        return true;
      return false;
    },
    clickRow({ id }) {
      this.$router.push(`contact/${id}`, () => {});
    },
    goToProfile(type, id) {
      this.$router.push(`${type}/${id}`, () => {});
    },
    getContacts() {
      this.loading = true;
      this.$apollo
        .query({
          query: GET_CONTACTS,
          fetchPolicy: 'no-cache',
          variables: {
            filters: this.filters,
            importId: this.$route.query.filterId,
          },
        })
        .then(({ data: { contacts } }) => {
          this.$emit('contacts', contacts.list);
          this.$emit('informationBar', contacts.informationBar);
          this.listContacts = contacts.list.map((contact) => {
            if (contact.customForms) {
              contact.customForms.forEach(({ id, value }) => {
                // eslint-disable-next-line
                contact[id] = value;
              });
            }
            return contact;
          });
          this.totalContacts = contacts.count;
          this.loading = false;
          this.$emit('endUpdateData');
        })
        .catch(() => {
          this.loading = false;
          this.$emit('endUpdateData');
          this.listContacts = [];
          this.totalContacts = 0;
          this.infoError = {
            icon: 'mdi-alert-outline',
            title: 'Error',
            message: 'No se ha podido cargar ningún contacto',
          };
        });
    },
    ChangeHeaderOrder(listHeaders) {
      listHeaders.splice(0, 1);
      const formatToHeaders = listHeaders.map((header) => {
        return { key: header.value, label: header.text, type: header.type };
      });
      this.$emit('changeHeaderOrder', formatToHeaders);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{  .table-headers-interactive .data-table-container } from ../../../../scss/components/contacts.data.table';
@import '{  .select-text-underline } from ../../../../scss/components/text';
</style>
