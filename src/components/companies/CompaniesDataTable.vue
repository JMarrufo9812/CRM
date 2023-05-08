<template>
  <div>
    <div class="d-flex flex-row pb-10">
      <slot name="top" />
    </div>
    <div class="data-table-container">
      <v-card outlined class="mx-12">
        <v-data-table
          v-model="companiesSelected"
          :headers="totalCompanies !== 0 ? headers : []"
          :items="listCompanies"
          item-key="id"
          :options.sync="options"
          :server-items-length="totalCompanies"
          :loading="loading"
          loading-text="Cargando empresas..."
          class="companies-data-table"
          show-select
          hide-default-header
          hide-default-footer
          @click:row="clickRow"
        >
          <template v-slot:no-data>
            <BaseErrorComponent :info="infoError" />
          </template>
          <template v-slot:header="{ props, on }">
            <thead v-if="totalCompanies !== 0">
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
                    index !== 0 ? 'min-width: 150px;' : 'min-width: 40px;'
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
          <template #[`item.name`]="{ item }">
            <span
              class="select-text-underline"
              @click.stop="goToProfile('company', item.id)"
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
          <template #[`item.owner`]="{ item }">
            <span :class="item.owner ? '' : 'red--text'">
              <v-icon :class="item.owner ? '' : 'red--text'" small>
                {{ item.owner ? 'mdi-account' : 'mdi-alert' }}
              </v-icon>
              {{ item.owner ? item.owner.user.name : 'Sin Propietario' }}
            </span>
          </template>
          <template
            #[`item.contacts`]="{item: { contacts:[contact, ...contacts]}}"
          >
            <span
              class="select-text-underline"
              @click.stop="goToProfile('contact', contact.id)"
            >
              <v-icon small class="mr-1">
                {{ contact ? 'mdi-account-tie' : '' }}
              </v-icon>
              {{ contact ? contact.name : '' }}
            </span>
            <v-menu allow-overflow>
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip top color="white">
                  <template v-slot:activator="{ on: tooltip }">
                    <v-chip
                      outlined
                      class="ml-1 pa-1"
                      v-show="contacts.length > 0"
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu }"
                      x-small
                    >
                      <v-icon x-small class="mr-1">
                        mdi-account-tie
                      </v-icon>
                      + {{ contacts.length }}
                    </v-chip>
                  </template>
                  <span class="black--text">
                    Esta empresa cuenta con más de un contacto has click para
                    ver
                  </span>
                </v-tooltip>
              </template>
              <v-list>
                <v-list-item
                  v-for="(contact, index) in contacts"
                  :key="index"
                  dense
                  @click.stop="goToProfile('contact', contact.id)"
                >
                  <v-icon class="mr-2" small>mdi-account-tie</v-icon>
                  <v-list-item-title>{{ contact.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
            <span v-if="item.createdBy">
              <v-icon small>mdi-account</v-icon>
              {{ item.createdBy.user.name + item.createdBy.user.lastName }}
            </span>
          </template>
        </v-data-table>
        <v-data-footer
          v-if="totalCompanies > 10"
          :options.sync="options"
          :pagination="{
            page: options.page,
            pageStart:
              options.page * options.itemsPerPage - options.itemsPerPage,
            pageStop: options.itemsPerPage * options.page,
            itemsPerPage: options.itemsPerPage,
            itemsLength: totalCompanies,
          }"
          :items-per-page-options="[10, 20, 30, 40, 50]"
        ></v-data-footer>
      </v-card>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { GET_COMPANIES } from '@/graphql/querys/companiesQuery';
import { tagsMixin } from '@/mixins/tagsMixin';

export default {
  name: 'CompaniesDataTable',
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
        icon: 'mdi-briefcase-search-outline',
        title: '',
        message: 'No se encontraron compañias',
      },
      loading: false,
      options: {},
      listCompanies: [],
      totalCompanies: 0,
      filters: {
        search: '',
        orderBy: 'desc',
        take: 0,
        skip: 0,
        sortBy: [],
        sortDesc: [],
        isDelete: false,
      },
      companiesSelected: [],
    };
  },
  props: {
    updateData: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: [Object, Array],
    },
    searchCompany: {
      type: String,
    },
  },
  watch: {
    options: {
      handler(value) {
        this.filters.sortBy = value.sortBy;
        this.filters.sortDesc = value.sortDesc;
        if (value.itemsPerPage === -1) {
          this.filters.take = this.totalCompanies;
        } else {
          this.filters.take = value.itemsPerPage;
        }
        this.filters.skip = (value.page - 1) * value.itemsPerPage;
        this.getCompanies();
      },
      deep: true,
    },
    searchCompany() {
      if (Object.keys(this.searchCompany).length >= 2) {
        this.filters.search = this.searchCompany;
        this.getCompanies();
      }
      if (Object.keys(this.searchCompany).length === 0) {
        this.filters.search = this.searchCompany;
        this.getCompanies();
      }
    },
    companiesSelected() {
      this.$emit('selectCompanies', this.companiesSelected);
    },
    updateData(value) {
      if (value) this.getCompanies();
      else this.companiesSelected = [];
    },
    $route: {
      handler(to) {
        this.companiesSelected = [];
        if (to.query.filterId) this.getCompanies();
        if (to.query.recyclebin) {
          this.filters.isDelete = true;
          this.getCompanies();
        } else {
          this.filters.isDelete = false;
          this.getCompanies();
        }
      },
      immediate: true,
    },
  },
  methods: {
    validateSort(keyInput) {
      if (
        keyInput === 'name' ||
        keyInput === 'adress' ||
        keyInput === 'website' ||
        keyInput === 'createdAt' ||
        keyInput === 'updatedAt'
      )
        return true;
      return false;
    },
    clickRow({ id }) {
      this.$router.push(`company/${id}`, () => {});
    },
    goToProfile(type, id) {
      this.$router.push(`${type}/${id}`, () => {});
    },
    getCompanies() {
      this.loading = true;
      this.$apollo
        .query({
          query: GET_COMPANIES,
          fetchPolicy: 'no-cache',
          variables: {
            filters: this.filters,
            importId: this.$route.query.filterId,
          },
        })
        .then(({ data: { companies } }) => {
          this.$emit('companies', companies.list);
          this.$emit('informationBar', companies.informationBar);
          this.listCompanies = companies.list.map((company) => {
            if (company.customForms) {
              company.customForms.forEach(({ id, value }) => {
                // eslint-disable-next-line
                company[id] = value;
              });
            }
            return company;
          });

          this.totalCompanies = companies.count;

          this.loading = false;
          this.$emit('endUpdateData');
        })
        .catch(({ graphQLErrors }) => {
          this.loading = false;
          this.$emit('endUpdateData');
          this.listCompanies = [];
          this.totalCompanies = 0;
          this.infoError = {
            icon: 'mdi-alert-outline',
            title: `Error ${graphQLErrors[0]?.statusCode}`,
            message: 'No se ha podido cargar ninguna empresa',
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
@import '{  .table-headers-interactive  .companies-data-table  .data-table-container } from ../../../../scss/components/companies.data.table';
@import '{  .select-text-underline } from ../../../../scss/components/text';
</style>
