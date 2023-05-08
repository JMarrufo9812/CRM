<template>
  <v-container fluid style="height:100%" class="pb-0">
    <v-row>
      <v-col cols="8" class="header-search">
        <p class="ml-6 my-4">
          {{ title }}
        </p>
      </v-col>
      <v-col cols="4" class="header-search">
        <v-combobox
          :search-input.sync="searchDeal"
          :menu-props="menuProps"
          outlined
          label="Buscar"
          append-icon="mdi-magnify"
          :items="resultSearchDeals"
          item-value="id"
          item-text="title"
          class="py-2 pr-8"
          :hide-no-data="loadingSearch"
          hide-details="auto"
          :loading="loadingSearch"
          dense
          :dark="true"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>Sin resultados</v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item
              @click="goToProfile(item.id)"
              class="vertical-line pr-0"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon small>mdi-handshake-outline</v-icon>
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle class="text--primary ml-4">
                  <v-icon x-small>mdi-view-column</v-icon>
                  {{ item.pipeline.name }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="ml-4">
                  <v-icon x-small>mdi-view-carousel-outline</v-icon>
                  {{ item.stage.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </v-col>
      <!-- menu butons-->
      <v-col cols="6" class="white py-6 pl-10">
        <!-- Boton de seleccionar pipeline -->
        <v-menu v-if="!$route.query.filterId && isPipelineMode" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="isPipelineMode"
              :disabled="isLoadingPage"
              outlined
              v-bind="attrs"
              v-on="on"
              max-width="50%"
              class="d-inline-block mr-4"
            >
              <span class="text-truncate">
                {{
                  isError
                    ? 'Error de embudo'
                    : isLoadingPage
                    ? 'Cargando embudo...'
                    : pipelineSelected.name
                }}
              </span>

              <v-icon class="ml-4">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="pipeline in pipelines"
              :key="pipeline.id"
              @click="selectPipeline(pipeline)"
              :disabled="pipelineSelected.id === pipeline.id"
            >
              <v-list-item-title class="mr-2">
                {{ pipeline.name }}
              </v-list-item-title>
              <v-icon small v-show="pipelineSelected.id === pipeline.id">
                mdi-check
              </v-icon>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- icono de alerta de tiempo real -->
        <v-tooltip v-if="!$route.query.filterId" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="isSuscriptionError.isShow"
              color="warning"
              icon
              class="mr-6"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon large>mdi-alert</v-icon>
            </v-btn>
          </template>
          <span>{{ isSuscriptionError.message }}</span>
        </v-tooltip>
        <!-- settings button -->
        <v-menu
          bottom
          offset-y
          v-if="!$route.query.recyclebin && !$route.query.filterId"
        >
          <template v-slot:activator="{ on: onMenu }">
            <v-tooltip bottom>
              <template #activator="{ on: onTooltip }">
                <v-btn
                  outlined
                  v-on="{ ...onMenu, ...onTooltip }"
                  :disabled="
                    isPipelineMode &&
                      !$can(UPDATE, PERMISSIONS_PIPELINES) &&
                      !$can(DELETE, PERMISSIONS_PIPELINES) &&
                      !$can(DUPLICATE, PERMISSIONS_PIPELINES)
                  "
                  class="mr-4"
                >
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </template>
              <span>Configuraciones</span>
            </v-tooltip>
          </template>
          <!-- settings pipeline mode -->
          <template v-if="isPipelineMode">
            <v-list
              dense
              v-if="
                $can(UPDATE, PERMISSIONS_PIPELINES) ||
                  $can(DELETE, PERMISSIONS_PIPELINES) ||
                  $can(DUPLICATE, PERMISSIONS_PIPELINES)
              "
            >
              <v-list-item
                class="text-list-menu"
                @click="editPipeline"
                v-if="$can(UPDATE, PERMISSIONS_PIPELINES)"
              >
                <v-icon color="primary" class="mr-2">
                  mdi-view-carousel-outline
                </v-icon>
                Editar Embudo
              </v-list-item>
              <v-list-item
                class="text-list-menu"
                v-if="
                  $can(DELETE, PERMISSIONS_PIPELINES) && pipelines.length !== 1
                "
                @click="
                  handlerDeleteDataConfirmation('PIPELINE', pipelineSelected)
                "
              >
                <v-icon color="primary" class="mr-2">
                  mdi-delete-sweep
                </v-icon>
                Eliminar Embudo
              </v-list-item>
              <v-list-item
                class="text-list-menu"
                @click="duplicatePipeline(pipelineSelected)"
                v-if="$can(DUPLICATE, PERMISSIONS_PIPELINES)"
              >
                <v-icon color="primary" class="mr-2">
                  mdi-content-duplicate
                </v-icon>
                Duplicar Embudo
              </v-list-item>
              <v-list-item
                class="text-list-menu"
                @click="
                  $router.push({
                    path: '/deals',
                    query: { recyclebin: true },
                  })
                "
              >
                <v-icon color="primary" class="mr-2">
                  mdi-delete-outline
                </v-icon>
                Papelera de reciclaje
              </v-list-item>
            </v-list>
          </template>
          <!-- settings deals mode -->
          <v-list dense v-else>
            <ListHeaders
              :type="viewInfo.type"
              :headers="headers"
              :form="getForm"
              @outData="updateHeaders"
            />
            <v-list-item
              class="text-list-menu"
              v-if="$can(EXPORT, PERMISSIONS_DEALS) && !isPipelineMode"
              @click="modalHandlerExport({ isOpen: true })"
            >
              <v-icon color="primary" left>
                mdi-clipboard-arrow-up-outline
              </v-icon>
              Exportar Tratos
            </v-list-item>
            <v-list-item
              class="text-list-menu"
              @click="
                $router.push({
                  path: '/deals',
                  query: { recyclebin: true },
                })
              "
            >
              <v-icon color="primary" class="mr-2">
                mdi-delete-outline
              </v-icon>
              Papelera de reciclaje
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- boton de eliminar -->
        <v-tooltip bottom v-show="$can(BULK_DELETE, PERMISSIONS_ADMIN)">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="dealsSelected.length >= 1 && !isPipelineMode"
              @click="handlerDeleteDataConfirmation('DEALS', dealsSelected)"
              class="mr-2"
              color="secondary"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>
            {{
              $route.query.recyclebin
                ? 'Eliminar Permanentemente'
                : 'Mover a papelera'
            }}
          </span>
        </v-tooltip>
        <!-- Boton de restaurar -->
        <v-tooltip
          bottom
          v-if="
            $can(BULK_DELETE, PERMISSIONS_ADMIN) &&
              $route.query.recyclebin &&
              !$route.query.filterId
          "
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="dealsSelected.length >= 1"
              @click="restoreDealsConfirmation"
              class="mr-2 white--text"
              color="success"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-restore</v-icon>
            </v-btn>
          </template>
          <span>Restaurar</span>
        </v-tooltip>
        <!-- Botón de cambiar propietario -->
        <ChangeOwner
          v-if="!$route.query.recyclebin"
          :isOpen.sync="isOpenMenuOwner"
          :isLoading="isLoading"
          :typeItem="typeItem"
          :itemsSelected="dealsSelected"
          @success="changeOwnerSuccess"
          @error="changeOwnerError"
        >
          <template #activator>
            <v-tooltip bottom v-if="$can(TO_ASSIGN, PERMISSIONS_ADMIN)">
              <template
                v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }"
              >
                <v-btn
                  v-show="dealsSelected.length >= 1 && !isPipelineMode"
                  color="primary"
                  class="mr-2"
                  v-bind="{ ...attrsTooltip }"
                  v-on="{ ...onTooltip }"
                  @click="isOpenMenuOwner = true"
                >
                  <v-icon>mdi-account-switch</v-icon>
                </v-btn>
              </template>
              <span>Cambiar propietario</span>
            </v-tooltip>
          </template>
        </ChangeOwner>
      </v-col>
      <v-col cols="6" class="d-flex justify-end white py-6 pr-12">
        <!-- menu de colores de deals -->
        <MenuDealsColor v-if="!$route.query.filterId" />
        <!-- boton de modo pipeline -->
        <v-tooltip
          bottom
          v-if="!$route.query.recyclebin && !$route.query.filterId"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="changePipelineMode(true)"
              :outlined="!isPipelineMode"
              :color="isPipelineMode ? 'primary' : ''"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </template>
          <span>Modo Embudo</span>
        </v-tooltip>
        <!-- boton de modo tabla -->
        <v-tooltip
          bottom
          v-if="!$route.query.recyclebin && !$route.query.filterId"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="changePipelineMode(false)"
              :outlined="isPipelineMode"
              :color="isPipelineMode ? '' : 'primary'"
              class="mr-4"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-table
              </v-icon>
            </v-btn>
          </template>
          <span>Modo Tabla</span>
        </v-tooltip>
        <!-- Menu de filtros -->
        <MenuFilters
          v-if="!$route.query.recyclebin && !$route.query.filterId"
          :filters="customFilters"
          @action="actionsHandler"
        >
          <template #text-button>
            <span>
              {{
                filterSelected.isFilterSelected
                  ? filterSelected.name
                  : 'Filtros'
              }}
            </span>
          </template>
        </MenuFilters>
        <!-- create button -->
        <v-menu
          v-if="!$route.query.recyclebin && !$route.query.filterId"
          offset-y
          left
          ransition="scale-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="white--text ml-8"
              color="secondary"
              fab
              small
              depressed
              v-on="on"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              class="text-list-menu"
              @click="queryGetForm('NEW_DEAL')"
            >
              <v-icon color="primary" left>mdi-handshake-outline</v-icon>
              Nuevo Trato
            </v-list-item>
            <v-list-item
              class="text-list-menu"
              @click="newPipeline"
              v-if="$can(CREATE, PERMISSIONS_PIPELINES) && isPipelineMode"
            >
              <v-icon color="primary" left>mdi-filter-variant</v-icon>
              Nuevo Embudo
            </v-list-item>

            <v-list-item
              class="text-list-menu"
              v-if="$can(IMPORT, PERMISSIONS_DEALS)"
              @click="modalHandlerImport({ isOpen: true })"
            >
              <v-icon color="primary" left>
                mdi-clipboard-arrow-down-outline
              </v-icon>
              Importar Tratos
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- ver todos los tratos -->
        <v-btn
          v-if="$route.query.filterId || $route.query.recyclebin"
          @click="goToAllDeals"
          class="mr-2"
          outlined
        >
          ver todos los tratos
        </v-btn>
      </v-col>
      <!-- loading -->
      <v-col cols="12" class="py-0">
        <v-progress-linear
          class="linear-progress"
          :active="isLoading"
          :indeterminate="isLoading"
          height="4"
          absolute
          color="primary"
        ></v-progress-linear>
      </v-col>
      <!-- Error view -->
      <v-col v-if="isError">
        <v-card height="800">
          <BaseErrorComponent :info="infoError" />
        </v-card>
      </v-col>
      <!-- Deals data table -->
      <v-col class="pt-12" v-else-if="!isPipelineMode && !isLoadingPage">
        <DealsDataTable
          :updateData="updateData"
          :headers="formatHeaders"
          @endUpdateData="updateData = false"
          @selectDeals="updateSelectDeals"
          @changeHeaderOrder="updateHeaders"
          @deals="updateDealsShow"
          @informationBar="updateInformationBar"
          @isLoadingDeals="updateLoadingDeals"
        />
      </v-col>
      <!-- skeleton loadings -->
      <v-col
        v-show="isLoadingPage"
        v-for="(item, index) in isPipelineMode ? 4 : 1"
        :key="index"
        class="pt-12 pl-10"
      >
        <v-skeleton-loader
          :type="isPipelineMode ? 'image' : 'table'"
        ></v-skeleton-loader>
      </v-col>
      <!-- Pipeline -->
      <v-col cols="12">
        <div
          v-if="isPipelineMode && !isLoadingPage && !isError"
          class="stages-container d-flex pt-12 pl-4"
        >
          <v-card
            v-for="stage in pipelineSelected.stages"
            :key="stage.id"
            class="stage mx-2"
            elevation="2"
            min-width="250"
            width="100%"
            tile
          >
            <v-card-title class="pb-0 pt-1 primary">
              <span class="title-stage">
                {{ stage.name }}
              </span>
            </v-card-title>
            <v-card-subtitle style="color:#EBEBEB;" class="py-2 primary">
              {{
                stage.deals.length > 1
                  ? `${stage.deals.length} Tratos`
                  : `${stage.deals.length} Trato`
              }}
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text
              @dragenter="onMove(stage.id)"
              :class="[
                {
                  'blur-stage':
                    futureStage === stage.id && $can(UPDATE, PERMISSIONS_DEALS),
                },
              ]"
            >
              <draggable-virtual-list
                v-model="stage.deals"
                :size="50"
                :keeps="6"
                :data-key="'id'"
                :data-sources="stage.deals"
                :data-component="itemComponent"
                :data-stage-list-id="stage.id"
                :sort="false"
                group="deal-list"
                item-class="deal my-4"
                item-class-add="dealShow"
                :extra-props="{
                  dealShow:
                    futureStage === stage.id && $can(UPDATE, PERMISSIONS_DEALS),
                  dealMoved: dealMoved.dealId,
                  moveLoading: isLoading,
                }"
                class="draggable_zone"
                @start="dragging = true"
                @end="end"
                @clone="clone"
                page-mode
                :options="{
                  disabled: isLoading || !$can(UPDATE, PERMISSIONS_DEALS),
                }"
              ></draggable-virtual-list>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <!-- footer info -->
      <v-col
        v-if="!isLoadingDeals && !isLoading && !isLoadingPage && !isError"
        cols="12"
        class="d-inline-flex white mt-10 pl-12 pt-8"
      >
        <div class="d-inline-flex mr-12">
          <p class="mr-4 footer-title">
            Oportunidades abiertas
          </p>
          <p class="footer-info" v-if="isPipelineMode">
            {{
              pipelineSelected.informationBar
                ? pipelineSelected.informationBar.openDeals
                : 0
            }}
          </p>
          <p class="footer-info" v-if="!isPipelineMode">
            {{ informationBarDeals.openDeals }}
          </p>
        </div>
        <div class="d-inline-flex mr-12">
          <p class="footer-title-info mr-4" v-if="isPipelineMode">
            Ingresos en el embudo
          </p>
          <p class="footer-title-info mr-4" v-if="!isPipelineMode">
            Ingresos de oportunidades ganadas
          </p>
          <p class="footer-info" v-if="isPipelineMode">
            {{
              pipelineSelected.informationBar
                ? Math.round(pipelineSelected.informationBar.wonDealsSum)
                : 0
            }}
          </p>
          <p class="footer-info" v-if="!isPipelineMode">
            {{ Math.round(informationBarDeals.wonDealsSum) }}
          </p>
          <span class="footer-info ml-1">MXN</span>
        </div>
        <div class="d-inline-flex mr-12">
          <p class="footer-title-info mr-4">
            Pronóstico de ventas
          </p>
          <p class="footer-info" v-if="isPipelineMode">
            {{
              pipelineSelected.informationBar
                ? pipelineSelected.informationBar.predictionSales
                : 0
            }}
          </p>
          <p class="footer-info" v-if="!isPipelineMode">
            {{ informationBarDeals.predictionSales }}
          </p>
          <span class="footer-info ml-1">MXN</span>
        </div>
        <div class="d-inline-flex mr-12">
          <p class="footer-title-info mr-4">
            Pronóstico de ingresos
          </p>
          <p class="footer-info" v-if="isPipelineMode">
            {{
              pipelineSelected.informationBar
                ? Math.round(pipelineSelected.informationBar.predictionIncome)
                : 0
            }}
          </p>
          <p class="footer-info" v-if="!isPipelineMode">
            {{ Math.round(informationBarDeals.predictionIncome) }}
          </p>
        </div>
      </v-col>
    </v-row>
    <!-- Modales -->
    <BaseModalError :modalHandler="modalError" @close="acceptedError" />
    <BaseModalDelete
      :modalHandler="modalDelete"
      @confirm="handlerDeleteData"
      @cancel="modalHandlerDelete"
    />
    <BaseModalRestore
      :modalHandler="modalRestore"
      @confirm="restoreDeals"
      @cancel="modalHandlerRestore"
    />
    <ModalFilter
      :modalHandler="modalFilter"
      :type="viewInfo"
      @outData="outDataFilterHandler"
      @close="modalHandlerFilter"
    />
    <ModalDeal
      :inputs="inputsForm"
      :modalHandler="modalDeal"
      @close="modalHandlerDeal"
      @outData="createDeal"
    />
    <ModalDeletePipeline
      :modalHandler="modalDeletePipeline"
      :pipelines="pipelinesOptionsToMove"
      @confirm="deletePipelineWithDeals"
      @cancel="modalHandlerDeletePipeline"
    />
    <ModalExportData
      :typeItems="viewInfo"
      :items="deals"
      :headers="formatHeaders"
      :modalHandler="modalExport"
      @close="modalHandlerExport"
    />
    <ModalImportData
      :typeItems="viewInfo"
      :modalHandler="modalImport"
      :form="getForm"
      @close="modalHandlerImport"
    />
    <v-snackbar
      v-model="snackbar.isOpen"
      :color="snackbar.color"
      :timeout="5000"
    >
      {{ snackbar.text }}
      <template v-slot:action>
        <v-btn
          text
          @click="snackbarHandler({ isOpen: false, color: '', text: '' })"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
// packages
import DraggableVirtualList from 'vue-draggable-virtual-scroll-list';
import ChangeOwner from '@/components/deals/ChangeOwner.vue';
// Ability
import ability from '@/services/ability';
import {
  CREATE,
  UPDATE,
  UPDATE_OTHERS,
  DELETE,
  BULK_DELETE,
  DUPLICATE,
  IMPORT,
  EXPORT,
  TO_ASSIGN,
} from '@/constants/methods';
import {
  PERMISSIONS_DEALS,
  PERMISSIONS_PIPELINES,
  PERMISSIONS_ADMIN,
} from '@/constants/permissions';
// graphql
// querys
import { GET_HEADERS } from '@/graphql/querys/headersQuery';
import {
  GET_PIPELINES,
  GET_PIPELINE,
  // PIPELINE_INFORMATION_BAR,
} from '@/graphql/querys/pipelinesQuery';
import { GET_FORM } from '@/graphql/querys/formsQuery';
// mutations
import { CHANGE_DEAL_STAGE } from '@/graphql/mutations/dealsMutations';
import { DUPLICATE_PIPELINE } from '@/graphql/mutations/pipelinesMutations';
import { UPDATE_LOADING_CONTROL } from '@/graphql/local-state/mutations';
// subscriptions
import { PIPELINE_SUBSCRIPTION } from '@/graphql/subscriptions/pipelineSubscriptions';
// helpers
import { UTIL_ORDER } from '@/helpers/utils';
import { dealsMixin } from '@/mixins/dealsMixin';
// mixins
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { snackbarMixin } from '@/mixins/alerts/snackbarMixin';
import { filtersMixin } from '@/mixins/filtersMixin';
import { headersMixin } from '@/mixins/headersMixin';
import { exportsMixin } from '@/mixins/exportsMixin';
import { importMixin } from '@/mixins/importMixin';
import { pipelinesMixin } from '@/mixins/pipelinesMixin';
import DealCard from '@/components/pipelines/DealCard.vue';
// texts
import {
  TITLE_ALL_DEALS,
  TITLE_PIPELINES,
  TITLE_RECYCLEBIN_DEALS,
} from '@/assets/text/spanish';

export default {
  name: 'Pipelines',
  components: {
    DraggableVirtualList,
    BaseErrorComponent: () => import('@/components/ui/BaseErrorComponent.vue'),
    ModalDeal: () => import('@/components/deals/ModalDeals.vue'),
    ModalDeletePipeline: () =>
      import('@/components/pipelines/ModalDeletePipeline.vue'),
    ModalFilter: () => import('@/components/filters/ModalFilter.vue'),
    DealsDataTable: () => import('@/components/deals/DealsDataTable.vue'),
    MenuFilters: () => import('@/components/filters/MenuFilters.vue'),
    MenuDealsColor: () => import('@/components/pipelines/MenuDealsColor.vue'),
    ListHeaders: () => import('@/components/headers/ListHeaders.vue'),
    ChangeOwner,
  },
  mixins: [
    dealsMixin,
    modalsAlertsMixin,
    snackbarMixin,
    filtersMixin,
    headersMixin,
    exportsMixin,
    importMixin,
    pipelinesMixin,
  ],
  data() {
    return {
      typeItem: 'DEAL',
      isOpenMenuOwner: false,
      // ability
      CREATE,
      UPDATE,
      UPDATE_OTHERS,
      DELETE,
      BULK_DELETE,
      TO_ASSIGN,
      DUPLICATE,
      IMPORT,
      EXPORT,
      PERMISSIONS_DEALS,
      PERMISSIONS_PIPELINES,
      PERMISSIONS_ADMIN,
      // handler view
      viewInfo: { type: 'DEAL', name: 'Tratos' },
      pipelines: [],
      pipelineSelected: { id: '' },
      isPipelineMode: true,
      isLoading: false,
      isLoadingPage: true,
      // hanlder errors
      isError: false,
      infoError: {
        icon: 'mdi-alert',
        title: 'error',
        message: 'No se ha podido cargar el embudo, contacte con el soporte',
      },
      isSuscriptionError: {
        isShow: false,
        message: '',
      },
      pipelinesOptionsToMove: [],
      modalDeletePipeline: { isOpen: false, isLoading: false, infoDelete: {} },
      stageSelected: {},
      deals: [],
      dealsMoving: [],
      dealsToDelete: [],
      updateData: false,
      // handler draggable deals
      itemComponent: DealCard,
      dealMoved: {
        oldStageId: '',
        newStageId: '',
        dealId: '',
      },
      dragging: false,
      futureStage: '',
      dealOnMove: '',
    };
  },
  mounted() {
    this.$apollo.mutate({
      mutation: UPDATE_LOADING_CONTROL,
      variables: { isLoading: false },
    });
  },
  computed: {
    sizeDeals() {
      return this.pipelineSelected.stages;
    },
    skipHeaders() {
      return this.$route.path !== '/deals';
    },
    title() {
      if (this.isPipelineMode) {
        return TITLE_PIPELINES;
      }
      if (this.$route.query.recyclebin) {
        return TITLE_RECYCLEBIN_DEALS;
      }
      return TITLE_ALL_DEALS;
    },
  },
  watch: {
    pipelineSelected(value) {
      if (value) this.$apollo.subscriptions.refreshPipeline.refresh();
    },
    $route: {
      async handler(to) {
        this.queryGetForm('DEAL_SHOW');
        if (to.name === 'deals') {
          this.isPipelineMode = false;
          this.isLoadingPage = false;
          this.dealsSelected = [];
          this.pipelineSelected = { id: this.pipelineSelected.id };
        }
        if (to.name === 'pipeline' && !to.params.id) {
          this.isPipelineMode = true;
          const {
            data: { pipelines },
          } = await this.getPipelines();

          this.pipelines = pipelines;
          const [pipeline] = pipelines;
          this.selectPipeline(pipeline);
        }
        if (to.name === 'pipeline-id') {
          this.isPipelineMode = true;
          this.getPipeline();
          const {
            data: { pipelines },
          } = await this.getPipelines();
          this.pipelines = pipelines;
        }
      },
      immediate: true,
    },
  },
  methods: {
    changeOwnerSuccess(message) {
      this.snackbarHandler({ isOpen: true, color: 'success', text: message });
      this.dealsSelected = [];
      this.updateData = true;
    },
    changeOwnerError(message) {
      this.modalHandlerError({
        isOpen: true,
        error: message,
      });
    },
    acceptedError({ isOpen }) {
      this.modalHandlerError({ isOpen });
      this.updateViewPipeline(this.$route.params.id);
    },
    updateLoadingDeals(value) {
      this.isLoadingDeals = value;
    },
    changePipelineMode(value) {
      if (value) {
        if (this.pipelineSelected.id) {
          this.selectPipeline(this.pipelineSelected);
        } else {
          this.$router.push('/pipeline').catch(() => {});
        }
      } else {
        this.isError = false;
        this.$router.push('/deals').catch(() => {});
      }
    },
    selectPipeline({ id }) {
      if (this.$route.path !== `/pipeline/${id}`) {
        this.$router.push(`/pipeline/${id}`).catch(() => {});
      }
    },
    async getPipelines() {
      return this.$apollo.query({
        query: GET_PIPELINES,
        fetchPolicy: 'no-cache',
      });
    },
    getPipeline() {
      this.isLoadingPage = true;
      this.isError = false;
      this.infoError = {};
      this.$apollo
        .query({
          query: GET_PIPELINE,
          fetchPolicy: 'no-cache',
          variables: {
            pipelineId: this.$route.params.id,
          },
        })
        .then(({ data: { pipeline } }) => {
          // eslint-disable-next-line
          pipeline.stages = UTIL_ORDER({
            listItems: pipeline.stages,
            orderBy: 'ASC',
            nextElement: 'order',
          });
          this.pipelineSelected = pipeline;
          this.isError = false;
          this.isLoadingPage = false;
        })
        .catch(() => {
          this.isLoadingPage = false;
          this.isError = true;
          this.infoError = {
            icon: 'mdi-alert-outline',
            title: 'Error',
            message: 'No se ha podido cargar el embudo, contacte con soporte',
          };
        });
    },
    // actualiza la vista sin activar el loading
    updateViewPipeline(pipelineId) {
      this.$apollo
        .query({
          query: GET_PIPELINE,
          fetchPolicy: 'no-cache',
          variables: {
            pipelineId,
          },
        })
        .then(({ data: { pipeline } }) => {
          // eslint-disable-next-line
          pipeline.stages = UTIL_ORDER({
            listItems: pipeline.stages,
            orderBy: 'ASC',
            nextElement: 'order',
          });
          this.pipelineSelected = pipeline;
        })
        .catch(() => {
          this.isError = true;
          this.infoError = {
            icon: 'mdi-alert-outline',
            title: 'Error',
            message: 'No se ha podido cargar el embudo, contacte con soporte',
          };
        });
    },
    newPipeline() {
      this.$router.push(`/pipeline/new`);
    },
    editPipeline() {
      const { id } = this.pipelineSelected;
      this.$router.push(`edit/${id}`);
    },
    duplicatePipeline(pipeline) {
      if (ability.can(DUPLICATE, PERMISSIONS_PIPELINES)) {
        this.$apollo
          .mutate({
            mutation: DUPLICATE_PIPELINE,
            variables: {
              pipelineId: pipeline.id,
            },
          })
          .then(({ data: { duplicatePipeline } }) => {
            this.selectPipeline(duplicatePipeline);
            this.pipelines.unshift(duplicatePipeline);
          })
          .catch(() => {
            this.modalHandlerError({
              isOpen: true,
              error: 'Error no se pudo duplicar el embudo',
            });
          });
      }
    },
    // handler delete Data
    handlerDeleteDataConfirmation(type, data) {
      // controla los modales de confirmacion de eliminacion de deals y pipelines
      if (type === 'PIPELINE') this.deletePipelineConfirmation(type, data);
      if (type === 'DEALS') {
        if (this.$route.query.recyclebin) {
          this.trashDealsConfirmation(type, data);
        } else {
          this.deleteDealConfirmation(type, data);
        }
      }
    },
    handlerDeleteData({ isOpen, isLoading, message, infoDelete }) {
      // controla las acciones de eliminacion de deals y pipelines
      if (infoDelete.type === 'PIPELINE')
        this.deletePipelineWithoutDeals({
          isOpen,
          isLoading,
          message,
          infoDelete,
        });
      if (infoDelete.type === 'DEALS') {
        if (this.$route.query.recyclebin) {
          this.trashDeals({ isOpen, isLoading, message, infoDelete });
        } else {
          this.deleteDeal({ isOpen, isLoading, message, infoDelete });
        }
      }
    },
    queryGetForm(type) {
      this.$apollo
        .query({
          query: GET_FORM,
          fetchPolicy: 'no-cache',
          variables: {
            type: 'DEAL',
          },
        })
        .then(
          ({
            data: {
              getForm: { customForm, defaultForm, headers },
            },
          }) => {
            // evita que se habra el modal de crear trato al cambiar a la vista de deals
            if (type === 'NEW_DEAL' && this.isPipelineMode)
              this.assignDefaultInputsValues(customForm, defaultForm);
            if (type === 'NEW_DEAL' && !this.isPipelineMode) {
              const inputs = customForm.inputs
                ? defaultForm.inputs.concat(customForm.inputs)
                : defaultForm.inputs;
              const orderInputs = UTIL_ORDER({
                listItems: inputs,
                orderBy: 'ASC',
                nextElement: 'order',
              });
              this.inputsForm = orderInputs;
              this.modalHandlerDeal({ isOpen: true, isLoading: false });
            }
            if (type === 'DEAL_SHOW')
              this.getForm = { customForm, defaultForm, headers };
          },
        )
        .catch(() => {
          const error = `Error no se ha podido cargar el formulario, contacte con el soporte`;
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    assignDefaultInputsValues(customForm, defaultForm) {
      const [id] = this.pipelineSelected.stages;
      const stage =
        Object.keys(this.stageSelected).length !== 0 ? this.stageSelected : id;
      const assignDefaultValue = defaultForm.inputs.map((input) => {
        if (input.keyInput === 'pipeline') {
          // eslint-disable-next-line no-param-reassign
          input.defaultValue = {
            pipeline: this.pipelineSelected,
            stage,
          };
        }
        return input;
      });
      const inputs = customForm.inputs
        ? assignDefaultValue.concat(customForm.inputs)
        : assignDefaultValue;
      const orderInputs = UTIL_ORDER({
        listItems: inputs,
        orderBy: 'ASC',
        nextElement: 'order',
      });
      this.inputsForm = orderInputs;
      this.modalHandlerDeal({ isOpen: true, isLoading: false });
    },
    onMove(futureStage) {
      this.futureStage = futureStage;
    },
    clone(value) {
      const getDealElement = value.clone.childNodes[0];
      this.dealMoved.dealId = getDealElement.dataset.dealId;
      this.dealMoved.oldStageId = getDealElement.dataset.stageId;
    },
    // se ejecuta al soltar un deal
    end(event) {
      // obtengo el stageId entrante
      const newStageId = event.to.dataset.stageListId;
      // // reviso si el deal que se movio se quedo en el mismo stage o cambio de stage
      const { stages } = this.pipelineSelected;
      const isSameStage = this.dealMoved.oldStageId === newStageId;
      if (isSameStage) {
        this.dealsMoving.forEach((deal) => {
          this.pipelineSelected.stages = this.updateViewPipelines({
            stages,
            deal,
          });
        });
        this.dealMoved = {
          oldStageId: '',
          newStageId: '',
          dealId: '',
        };
        this.futureStage = '';
        this.isLoading = false;
        this.dragging = false;
      }
      if (!isSameStage) {
        this.updateDeal({
          dealId: this.dealMoved.dealId,
          oldStageId: this.dealMoved.oldStageId,
          newStageId,
        });
      }
    },
    // mutacion de actualizarDeal
    updateDeal({ dealId, newStageId, oldStageId }) {
      if (ability.can(UPDATE, PERMISSIONS_DEALS)) {
        this.isLoading = true;
        this.$apollo
          .mutate({
            mutation: CHANGE_DEAL_STAGE,
            fetchPolicy: 'no-cache',
            variables: {
              input: {
                dealId,
                newStageId,
                oldStageId,
              },
            },
          })
          .then(({ data: { changeDealStage } }) => {
            this.pipelineSelected.stages = this.updateViewPipelines({
              stages: this.pipelineSelected.stages,
              deal: changeDealStage,
            });
            const { stages } = this.pipelineSelected;
            if (this.dealsMoving.length > 0) {
              this.dealsMoving.forEach((deal) => {
                this.pipelineSelected.stages = this.updateViewPipelines({
                  stages,
                  deal,
                });
              });
            }
            this.dealMoved = {
              oldStageId: '',
              newStageId: '',
              dealId: '',
            };
            this.futureStage = '';
            this.isLoading = false;
            this.dragging = false;
          })
          .catch(() => {
            const error = `Error No se ha podido mover el trato, es posible que ya no se encuentre en el embudo o se haya eliminado`;
            this.dealMoved = {
              oldStageId: '',
              newStageId: '',
              dealId: '',
            };
            this.isLoading = false;
            this.futureStage = '';
            this.dragging = false;
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    // rellena la variable que se usa a la hora de exportar deals
    updateDealsShow(deals) {
      this.deals = deals;
    },
    updateInformationBar(information) {
      this.informationBarDeals = information;
    },
    updateSelectDeals(deals) {
      this.dealsSelected = deals.map(({ id }) => {
        return { id };
      });
    },
    async goToAllDeals() {
      await this.$router.push({ name: 'deals' });
      this.updateData = true;
    },
  },
  apollo: {
    headers: {
      query: GET_HEADERS,
      skip() {
        return this.skipHeaders;
      },
      variables: {
        type: 'DEALS',
      },
    },
    $subscribe: {
      // se activa al mover un deal de un stage a otro
      refreshPipeline: {
        query: PIPELINE_SUBSCRIPTION,
        fetchPolicy: 'no-cache',
        variables() {
          return {
            input: this.pipelineSelected.id,
          };
        },
        skip() {
          return !this.isPipelineMode;
        },
        result() {
          this.updateViewPipeline(this.$route.params.id);
        },
        error() {
          this.isSuscriptionError.message = `Error es posible que los cambios no se vean reflejado en tiempo real`;
          this.isSuscriptionError.isShow = true;
        },
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .header-search } from ../../../scss/components/header.search';
@import '{ .stages-container .stage, .blur-stage .deal .vetical-line .v-skeleton-loader__image .v-select .v-card__text .draggable_zone .text-list-menu} from ../../../scss/views/pipelines';
@import '{ .footer-title, .footer-title-info, .footer-info .title-stage } from ../../../scss/components/footer.data.table';
</style>
