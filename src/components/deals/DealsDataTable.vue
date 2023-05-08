<template>
  <div class="data-table-container">
    <v-card outlined class="mx-12">
      <v-data-table
        v-model="dealsSelected"
        :headers="totalDeals !== 0 ? headers : []"
        :items="listDeals"
        item-key="id"
        :options.sync="options"
        :server-items-length="totalDeals"
        :loading="isLoadingDeals"
        loading-text="Cargando tratos..."
        class="deals-data-table"
        hide-default-footer
        show-select
        disable-sort
        hide-default-header
        @click:row="clickRow"
      >
        <template v-slot:no-data>
          <BaseErrorComponent :info="infoError" />
        </template>
        <template v-slot:header="{ props, on }">
          <thead v-if="totalDeals !== 0">
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
                :style="index !== 0 ? 'min-width: 150px;' : 'min-width: 40px;'"
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
                <div class="d-flex  justify-center">
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
        <template #[`item.title`]="{ item }">
          <span
            class="select-text-underline"
            @click.stop="goToProfile('deal', item.id)"
          >
            {{ item.title }}
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
        <template #[`item.contact`]="{ item }">
          <span
            v-if="item.contact"
            @click.stop="goToProfile('contact', item.contact.id)"
            class="select-text-underline"
          >
            <v-icon small>
              mdi-account-tie
            </v-icon>
            {{ item.contact.name }}
          </span>
        </template>
        <template #[`item.company`]="{ item }">
          <span
            v-if="item.company"
            @click.stop="goToProfile('company', item.company.id)"
            class="select-text-underline"
          >
            <v-icon small>
              mdi-domain
            </v-icon>
            {{ item.company.name }}
          </span>
        </template>
        <template #[`item.pipeline`]="{ item }">
          <span v-if="item.pipeline">
            <v-icon small>
              mdi-view-column
            </v-icon>
            {{ item.pipeline.name }}
          </span>
        </template>
        <template #[`item.value`]="{ item }">
          <span v-if="item.value">{{ item.value }} MXN</span>
          <span v-else>0 MXN</span>
        </template>
        <template #[`item.stage`]="{ item }">
          <span v-if="item.stage">
            <v-icon small>
              mdi-view-carousel-outline
            </v-icon>
            {{ item.stage.name }}
          </span>
        </template>
        <template #[`item.status`]="{ item }">
          <span>
            {{ formatStatus(item.status) }}
          </span>
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
        v-if="totalDeals > 10"
        :options.sync="options"
        :pagination="{
          page: options.page,
          pageStart: options.page * options.itemsPerPage - options.itemsPerPage,
          pageStop: options.itemsPerPage * options.page,
          itemsPerPage: options.itemsPerPage,
          itemsLength: totalDeals,
        }"
        :items-per-page-options="[10, 20, 30, 40, 50]"
      ></v-data-footer>
    </v-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { tagsMixin } from '@/mixins/tagsMixin';
import { dealsMixin } from '@/mixins/dealsMixin';

export default {
  name: 'DealsDataTable',
  mixins: [tagsMixin, dealsMixin],
  components: {
    BaseErrorComponent: () => import('@/components/ui/BaseErrorComponent.vue'),
    draggable,
  },
  data() {
    return {
      options: {},
      dealsSelected: [],
      isErrorDeals: false,
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
    importId: {
      type: String,
    },
  },
  watch: {
    options: {
      handler(value) {
        this.filters.sortBy = value.sortBy;
        this.filters.sortDesc = value.sortDesc;
        if (value.itemsPerPage === -1) {
          this.filters.take = this.totalDeals;
        } else {
          this.filters.take = value.itemsPerPage;
        }
        this.filters.skip = (value.page - 1) * value.itemsPerPage;
        this.getDeals();
      },
      deep: true,
    },
    // llama a ala query cuando ocurre una actualizacion
    updateData(value) {
      if (value) this.getDeals();
      else this.dealsSelected = [];
    },
    // emite el array de deals cada que se selecciona uno
    dealsSelected() {
      this.$emit('selectDeals', this.dealsSelected);
    },
    $route: {
      handler(to) {
        this.dealsSelected = [];
        if (to.query.filterId) this.getDeals();
        if (to.query.recyclebin) {
          this.filters.isDelete = true;
          this.getDeals();
        } else {
          this.filters.isDelete = false;
          this.getDeals();
        }
      },
      immediate: true,
    },
  },
  methods: {
    validateSort(keyInput) {
      if (
        keyInput === 'title' ||
        keyInput === 'value' ||
        keyInput === 'expectedCloseDate' ||
        keyInput === 'createdAt' ||
        keyInput === 'updatedAt' ||
        keyInput === 'status' ||
        keyInput === 'lostTime' ||
        keyInput === 'closeTime' ||
        keyInput === 'wonTime'
      )
        return true;
      return false;
    },
    clickRow({ id }) {
      this.$router.push(`deal/${id}`, () => {});
    },
    goToProfile(type, id) {
      this.$router.push(`${type}/${id}`, () => {});
    },
    formatStatus(status) {
      if (status === 'OPEN') {
        return 'Abierto';
      }
      if (status === 'WON') {
        return 'Ganado';
      }
      if (status === 'LOST') {
        return 'Perdido';
      }
      return '';
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
@import '{  .table-headers-interactive .deals-data-table .data-table-container } from ../../../../scss/components/deals.data.table';
@import '{  .select-text-underline } from ../../../../scss/components/text';
</style>
