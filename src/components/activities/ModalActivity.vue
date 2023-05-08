<template>
  <v-dialog v-model="modal.status" scrollable max-width="800px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        {{ formatTitle }}
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-12">
        <!-- <v-row> -->
        <div class="d-flex justify-center py-10">
          <v-chip-group
            v-model="activity.typeActivity"
            center-active
            mandatory
            :show-arrows="listActivityTypes.length > 3"
          >
            <v-chip
              v-for="activityType in listActivityTypes"
              :key="activityType.id"
              :color="activityType.color"
              :text-color="getBestColor(activityType.color)"
              small
              filter
            >
              {{ activityType.name }}
            </v-chip>
          </v-chip-group>
        </div>
        <div v-if="modal.item && modal.item.isReschedule">
          <v-row>
            <v-col cols="12">
              <v-list-item dense>
                <v-list-item-icon>
                  <v-icon>mdi-square-rounded</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ activity.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <span class="ml-4">Fecha actual</span>
              <v-list-item dense>
                <v-list-item-icon>
                  <v-icon>mdi-calendar</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                      activity.isAllDay
                        ? `${formatDate(
                            activityBefore.dateStart,
                          )} - Todo el día`
                        : formatTime(
                            activityBefore.dateStart,
                            activityBefore.timeStart,
                            activityBefore.timeEnd,
                          )
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" class="mb-2 ml-4">
              <span>
                Asigna una nueva fecha
              </span>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="activity.dateStart"
                class="dateCalendar required"
                dense
                outlined
                type="date"
                placeholder="dd/mm/yyyy"
                :min="today"
                max="2100-12-31"
                hide-details="auto"
                @change="isFreeBusy"
              ></v-text-field>
            </v-col>
            <v-col cols="7" class="d-flex justify-end align-center pl-1">
              <v-select
                label="Hora inicio"
                v-model="activity.timeStart"
                :items="listTimeStart"
                dense
                outlined
                hide-details="auto"
                class="time-calendar"
                menu-props="auto"
                append-outer-icon="mdi-minus"
              ></v-select>
              <v-select
                label="Hora final"
                v-model="activity.timeEnd"
                :items="listTimeEnd"
                dense
                outlined
                hide-details="auto"
                class="time-calendar"
                menu-props="auto"
              ></v-select>
            </v-col>
          </v-row>
          <v-row v-if="isFreeTime" no-gutters>
            <v-col>
              <p class="red--text">
                Tienes una actividad en ese mismo horario.
              </p>
            </v-col>
          </v-row>
        </div>
        <v-form ref="formActivity" v-model="isValidateFormActivity" v-else>
          <v-row no-gutters class="pb-4">
            <v-col cols="12">
              <v-text-field
                v-model="activity.title"
                label="Nombre de la actividad"
                outlined
                dense
                hide-details="auto"
                :rules="rules.general"
                required
                class="required"
                counter="80"
                maxlength="80"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
            v-if="
              modal.isEdit && !modal.item.isReschedule && !isActiveReschedule
            "
            class="no-gutters"
          >
            <v-col>
              <v-icon class="mr-2">mdi-calendar</v-icon>
              <span>
                {{
                  activity.isAllDay
                    ? `${formatDate(activityBefore.dateStart)} - Todo el día`
                    : formatTime(
                        activityBefore.dateStart,
                        activityBefore.timeStart,
                        activityBefore.timeEnd,
                      )
                }}
              </span>
              <v-btn color="success" small @click="isActiveReschedule = true">
                Reagendar
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-else no-gutters justify="space-between">
            <v-col cols="5" class="pr-6">
              <v-text-field
                v-model="activity.dateStart"
                class="dateCalendar required"
                dense
                outlined
                type="date"
                placeholder="dd/mm/yyyy"
                :min="today"
                max="2100-12-31"
                hide-details="auto"
                @change="isFreeBusy"
              ></v-text-field>
            </v-col>
            <v-col cols="7" class="d-flex justify-end align-center">
              <v-select
                label="Hora inicio"
                v-model="activity.timeStart"
                :items="listTimeStart"
                dense
                outlined
                hide-details="auto"
                class="time-calendar pr-4"
                menu-props="auto"
                @click="setHourNow"
                clearable
              ></v-select>
              <v-icon>mdi-minus</v-icon>
              <v-select
                label="Hora final"
                v-model="activity.timeEnd"
                :items="listTimeEnd"
                dense
                outlined
                hide-details="auto"
                class="time-calendar pl-4"
                menu-props="auto"
                clearable
              ></v-select>
            </v-col>
          </v-row>
          <v-row v-if="isFreeTime" no-gutters>
            <v-col>
              <p class="red--text">
                Tienes una actividad en ese mismo horario.
              </p>
            </v-col>
          </v-row>
          <v-row
            v-show="
              !isActiveInvites ||
                !isActiveLocation ||
                !isActiveDescription ||
                !isActiveContact ||
                !isActiveCompany ||
                !isActiveDeal
            "
          >
            <v-col cols="4" class="d-flex justify-center">
              <v-btn
                v-if="!isActiveInvites"
                text
                small
                @click="isActiveInvites = true"
              >
                <v-icon class="mr-1">
                  mdi-account-multiple-plus-outline
                </v-icon>
                Invitados
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center">
              <v-btn
                v-if="!isActiveLocation"
                text
                small
                @click="isActiveLocation = true"
              >
                <v-icon>
                  mdi-map-marker-plus-outline
                </v-icon>
                Lugar
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center">
              <v-btn
                v-if="!isActiveDescription"
                text
                small
                @click="isActiveDescription = true"
              >
                <v-icon>
                  mdi-text-box-plus-outline
                </v-icon>
                Descripción
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center">
              <v-btn
                v-if="!isActiveContact"
                text
                small
                @click="isActiveContact = true"
              >
                <v-icon>
                  mdi-account-plus-outline
                </v-icon>
                Contactos
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center">
              <v-btn
                v-if="!isActiveCompany"
                text
                small
                @click="isActiveCompany = true"
              >
                <v-icon>
                  mdi-office-building
                </v-icon>
                Empresa
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-center">
              <v-btn
                v-if="!isActiveDeal"
                text
                small
                @click="isActiveDeal = true"
              >
                <v-icon>
                  mdi-currency-usd-circle-outline
                </v-icon>
                Tratos
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="isActiveLocation" dense>
            <v-col class="d-flex">
              <vuetify-google-autocomplete
                id="map"
                v-model="activity.location"
                placeholder="Agregar lugar"
                country="mx"
                prepend-icon="mdi-map-marker-outline"
                outlined
                dense
                :hide-details="true"
                clearable
                classname="form-control"
              ></vuetify-google-autocomplete>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="primary"
                    @click="isActiveLocation = false"
                  >
                    <v-icon>mdi-minus-circle</v-icon>
                  </v-btn>
                </template>
                <span>Quitar</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row v-if="isActiveInvites" dense>
            <v-col class="d-flex">
              <ActivityInvites
                :isEdit="modal.isEdit"
                :defaultInvites="activity.invites"
                :reset="!modal.status"
                @listInvites="listInvites"
              ></ActivityInvites>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="primary"
                    @click="isActiveInvites = false"
                  >
                    <v-icon>mdi-minus-circle</v-icon>
                  </v-btn>
                </template>
                <span>Quitar</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row v-if="isActiveDescription" dense>
            <v-col class="d-flex justify-space-between">
              <v-icon class="mx-1 align-start">
                mdi-text
              </v-icon>
              <NoteEditorDescription
                class="note flex-grow-1"
                placeholder="Escribe la descripción de la actividad"
                :defaultContent="activity.description"
                :isEdit="modal.isEdit"
                :reset="!modal.status"
                @updateContent="updateContent"
              ></NoteEditorDescription>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="primary"
                    @click="isActiveDescription = false"
                  >
                    <v-icon>mdi-minus-circle</v-icon>
                  </v-btn>
                </template>
                <span>Quitar</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row v-if="isActiveContact" dense>
            <v-col class="d-flex">
              <ActivityContacts
                :defaultContacts="activity.contacts"
                :isEdit="modal.isEdit || isActiveContact"
                :reset="!modal.status || !isActiveContact"
                @listContacts="listContacts"
                :disabled="
                  modal.status && !modal.isEdit && this.typeItem === 'CONTACT'
                "
              ></ActivityContacts>
              <v-tooltip top v-if="this.typeItem !== 'CONTACT'">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="primary"
                    @click="isActiveContact = false"
                  >
                    <v-icon>mdi-minus-circle</v-icon>
                  </v-btn>
                </template>
                <span>Quitar</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row v-if="isActiveCompany" dense>
            <v-col class="d-flex">
              <ActivityCompanies
                :defaultCompanies="activity.companies"
                :isEdit="modal.isEdit || isActiveCompany"
                :reset="!modal.status || !isActiveCompany"
                @listCompanies="listCompanies"
                :disabled="
                  modal.status && !modal.isEdit && this.typeItem === 'COMPANY'
                "
              ></ActivityCompanies>
              <v-tooltip top v-if="this.typeItem !== 'COMPANY'">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="primary"
                    @click="isActiveCompany = false"
                  >
                    <v-icon>mdi-minus-circle</v-icon>
                  </v-btn>
                </template>
                <span>Quitar</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row v-if="isActiveDeal" dense>
            <v-col class="d-flex">
              <ActivityDeal
                :defaultDeal="activity.deal"
                :isEdit="modal.isEdit || isActiveDeal"
                :reset="!modal.status || !isActiveDeal"
                @listDeal="listDeal"
                :disabled="modal.status && this.typeItem === 'DEAL'"
              ></ActivityDeal>
              <v-tooltip top v-if="this.typeItem !== 'DEAL'">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="primary"
                    @click="isActiveDeal = false"
                  >
                    <v-icon>mdi-minus-circle</v-icon>
                  </v-btn>
                </template>
                <span>Quitar</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-form>
        <ModalEffective
          modalIdDefault="modalEffectiveActivity"
          :reset="!isLoadingComplete"
          @cancel="cancelComplete"
          @save="saveComplete"
        ></ModalEffective>
        <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <MenuOwner
          :ownerDefaultId="activity.owner.id"
          @updateOwner="updateOwner"
        ></MenuOwner>
        <v-spacer></v-spacer>
        <v-checkbox
          v-model="activity.isComplete"
          label="Completado"
          class="mt-0 mr-5"
          hide-details="auto"
        ></v-checkbox>
        <v-btn
          :loading="isLoading"
          color="secondary"
          @click="modal.isEdit ? updateActivity() : createActivity()"
        >
          {{ modal.isEdit ? 'Actualizar' : 'Crear' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';
import ModalEffective from '@/components/activities/ModalEffective.vue';
import { rulesMixin } from '@/mixins/rulesMixin';
import {
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY,
} from '@/graphql/mutations/activitiesMutations';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import MenuOwner from '@/components/activities/MenuOwner.vue';
import NoteEditorDescription from '@/components/activities/NoteEditorDescription.vue';
import {
  GET_ACTIVITIES_TYPES,
  GET_ACTIVITIES,
  FREE_BUSY,
} from '@/graphql/querys/activitiesQuery';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import { tagsMixin } from '@/mixins/tagsMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { listTime } from '@/constants/listTime';
import ActivityInvites from '@/components/activities/ActivityInvites.vue';
import ActivityContacts from '@/components/activities/ActivityContacts.vue';
import ActivityCompanies from '@/components/activities/ActivityCompanies.vue';
import ActivityDeal from '@/components/activities/ActivityDeal.vue';
import { successesMixin } from '@/mixins/successes';

export default {
  name: 'ModalActivity',
  mixins: [
    modalMethodsMixin,
    modalApolloMixin,
    tagsMixin,
    modalsAlertsMixin,
    rulesMixin,
    successesMixin,
  ],
  components: {
    NoteEditorDescription,
    MenuOwner,
    ActivityInvites,
    ActivityContacts,
    ActivityCompanies,
    ActivityDeal,
    ModalEffective,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    typeItem: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tags: [
        'Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing',
      ],
      isLoadingComplete: false,
      isValidateFormActivity: true,
      flagActivity: false,
      isLoading: false,
      isFreeTime: false,
      userCurrent: {},
      timeNow: moment().hour(Number),
      modalId: 'createActivity',
      modal: {},
      activityTypes: [],
      listTime,
      today: moment().format('YYYY-MM-DD'),
      isActiveReschedule: false,
      isActiveDescription: false,
      isActiveLocation: false,
      isActiveCompany: false,
      isActiveDeal: false,
      isActiveInvites: false,
      isActiveContact: false,
      typeActivity: '',
      activityBefore: {
        dateStart: moment().format('YYYY-MM-DD'),
        timeStart: '',
        timeEnd: '',
      },
      activityBeforeEdit: {
        id: '',
        title: '',
        typeActivity: null,
        dateStart: '',
        timeStart: '',
        timeEnd: '',
        invites: [],
        location: '',
        description: '',
        createdAt: '',
        companies: [],
        contacts: [],
        deal: {},
        isComplete: false,
        owner: { id: '', user: { id: '', name: '', lastName: '' } },
        status: '',
        comments: '',
      },
      activity: {
        id: '',
        title: '',
        typeActivity: null,
        dateStart: moment().format('YYYY-MM-DD'),
        timeStart: '',
        timeEnd: '',
        invites: [],
        location: '',
        description: '',
        createdAt: '',
        companies: [],
        contacts: [],
        deal: {},
        isComplete: false,
        owner: { id: '', user: { id: '', name: '', lastName: '' } },
        status: 'PENDING',
        comments: '',
        isAllDay: false,
      },
    };
  },
  watch: {
    'modal.isEdit': {
      handler(value) {
        if (value) {
          const {
            id,
            title,
            type,
            start,
            end,
            guests,
            location,
            description,
            createdAt,
            companies,
            contacts,
            deal,
            owner,
            status,
            isAllDay,
          } = this.modal.item;

          const newType = this.getActivityTypeIndex(type.id);
          const newDateStart = start.split(' ')[0];
          const splitTimeStart = start ? start.split(' ') : [];
          const splitTimeEnd = end ? end.split(' ') : [];
          const newTimeStart =
            splitTimeStart.length > 1
              ? moment(splitTimeStart[1], ['h:mm:ss'])
              : null;
          const newTimeEnd =
            splitTimeEnd.length > 1
              ? moment(splitTimeEnd[1], ['h:mm:ss'])
              : null;

          let invites = [];
          if (guests) {
            invites = guests.map((guest, index) => {
              return { id: index, name: guest.displayName, email: guest.email };
            });
          }
          const isComplete = status !== 'PENDING';

          if (invites && invites.length) this.isActiveInvites = true;
          if (location && location.length) this.isActiveLocation = true;
          if (description && description.length)
            this.isActiveDescription = true;
          if (contacts && contacts.length) this.isActiveContact = true;
          if (companies && companies.length) this.isActiveCompany = true;
          if (deal) this.isActiveDeal = true;

          this.flagActivity = !isComplete;

          this.activity = {
            id,
            title,
            typeActivity: newType,
            dateStart: newDateStart,
            timeStart:
              newTimeStart && newTimeStart !== null
                ? newTimeStart.format('hh:mma')
                : null,
            timeEnd: newTimeEnd ? newTimeEnd.format('hh:mma') : null,
            invites,
            location,
            description,
            createdAt,
            companies,
            contacts,
            deal,
            isComplete,
            owner,
            status,
            comments: '',
            isAllDay,
          };

          this.activityBeforeEdit = {
            id,
            title,
            typeActivity: newType,
            dateStart: newDateStart,
            timeStart: newTimeStart ? newTimeStart.format('hh:mma') : null,
            timeEnd: newTimeEnd ? newTimeEnd.format('hh:mma') : null,
            invites,
            location,
            description,
            createdAt,
            companies,
            contacts,
            deal,
            isComplete,
            owner,
            status,
            comments: '',
            isAllDay,
          };

          this.activityBefore = {
            dateStart: newDateStart,
            timeStart: newTimeStart ? newTimeStart.format('hh:mma') : null,
            timeEnd: newTimeEnd ? newTimeEnd.format('hh:mma') : '',
          };
        }
      },
    },
    'modal.status': {
      handler(isOpen) {
        if (isOpen) {
          this.isFreeBusy();
        }
        if (isOpen && !this.modal.isEdit) {
          if (this.typeItem === 'DEAL') {
            this.activity.deal = {
              __typename: 'Deal',
              id: this.item.id,
              title: this.item.title,
            };
            this.isActiveDeal = true;

            if (this.item.contact?.id) {
              this.activity.contacts = [
                {
                  __typename: 'Contact',
                  id: this.item.contact.id,
                  email: this.item.contact.email,
                  name: this.item.contact.name,
                },
              ];
              this.isActiveContact = true;
            }
            if (this.item.company?.id) {
              this.activity.companies = [
                {
                  __typename: 'Company',
                  id: this.item.company.id,
                  name: this.item.company.name,
                },
              ];
              this.isActiveCompany = true;
            }
          } else if (this.typeItem === 'CONTACT') {
            this.activity.contacts = [
              {
                __typename: 'Contact',
                id: this.item.id,
                email: this.item.email,
                name: this.item.name,
              },
            ];
            this.isActiveContact = true;
          } else if (this.typeItem === 'COMPANY') {
            this.activity.companies = [
              {
                __typename: 'Company',
                id: this.item.id,
                name: this.item.name,
              },
            ];
            this.isActiveCompany = true;
            if (this.item.contacts && this.item.contacts.length) {
              this.activity.contacts = this.item.contacts;
              this.isActiveContact = true;
            }
          }
        }
        if (!isOpen) {
          this.reset();
        }
      },
      immediate: true,
    },
    'userCurrent.id': {
      handler() {
        const { id, user } = this.userCurrent;
        if (id && user) {
          this.activity.owner = {
            id,
            user,
          };
        }
      },
      immediate: true,
    },
    'activity.owner': {
      handler() {
        this.isFreeBusy();
      },
    },
    'activity.dateStart': {
      handler() {
        this.isFreeBusy();
      },
    },
    'activity.timeEnd': {
      handler() {
        this.isFreeBusy();
      },
    },
    'activity.timeStart': {
      handler(newValue) {
        const limit = moment('10:45pm', ['hh:mma']);
        if (this.modal.isEdit && this.isAllDayEdit) {
          if (newValue !== '') {
            if (moment(newValue, ['hh:mma']).isSameOrAfter(limit, 'hour')) {
              this.activity.timeEnd = '11:45pm';
            } else {
              this.activity.timeEnd = moment(newValue, ['hh:mma'])
                .add(1, 'h')
                .format('hh:mma');
            }
          }
        }
        if (!this.modal.isEdit) {
          if (newValue !== '') {
            if (moment(newValue, ['hh:mma']).isSameOrAfter(limit, 'hour')) {
              this.activity.timeEnd = '11:45pm';
            } else {
              this.activity.timeEnd = moment(newValue, ['hh:mma'])
                .add(1, 'h')
                .format('hh:mma');
            }
          }
        } else if (newValue !== '' && !this.isAllDayEdit) {
          if (moment(newValue, ['hh:mma']).isSameOrAfter(limit, 'hour')) {
            this.activity.timeEnd = '11:45pm';
          } else {
            this.activity.timeEnd = moment(newValue, ['hh:mma'])
              .add(1, 'h')
              .format('hh:mma');
          }
        }
        this.isFreeBusy();
      },
      immediate: true,
    },
    'activity.isComplete': {
      handler(isComplete) {
        if (isComplete) {
          if (!this.modal.isEdit) {
            this.openModalEffective();
          } else if (this.modal.isEdit) {
            if (this.flagActivity) {
              this.openModalEffective();
            }
          }
        }
        if (!isComplete && this.modal.isEdit) {
          this.saveEventIncomplete();
        } else if (!isComplete) {
          this.activity.comments = '';
          this.activity.status = 'PENDING';
        }
        this.flagActivity = true;
      },
    },
    isActiveLocation(isActive) {
      if (!isActive) this.activity.location = '';
    },
    isActiveCompany(isActive) {
      if (!isActive) this.activity.companies = [];
    },
    isActiveContact(isActive) {
      if (!isActive) this.activity.contacts = [];
    },
    isActiveDeal(isActive) {
      if (!isActive) this.activity.deal = {};
    },
  },
  computed: {
    isAllDayEdit() {
      return this.modal.isEdit && this.modal.item.isAllDay;
    },
    listActivityTypes() {
      const list = [...this.activityTypes];
      return this.sortList(list);
    },
    deals() {
      return this.item.deals.map((deal) => {
        return {
          __typename: 'Deal',
          id: deal.id,
          title: deal.title,
        };
      });
    },
    listTimeStart() {
      const limit = this.getTime('11:45pm');
      return this.listTime.filter((time) => {
        return this.getTime(time) < limit;
      });
    },
    listTimeEnd() {
      const timeStart = this.getTime(this.activity.timeStart);
      return this.listTime.filter((time) => {
        return this.getTime(time) > timeStart;
      });
    },
    event() {
      let timeStart = '';
      let timeEnd = '';
      const { color } = this.getActivityType(this.activity.typeActivity) || '';
      if (this.activity.timeStart) {
        timeStart = this.getTime(this.activity.timeStart);
      }

      if (this.activity.timeEnd) {
        timeEnd = this.getTime(this.activity.timeEnd);
      }
      return {
        id: this.modal.isEdit ? this.modal.item.id : '',
        name: this.activity.title || 'Nombre de la actividad',
        start: `${this.activity.dateStart}${timeStart}`,
        end: `${this.activity.dateStart}${timeEnd}`,
        color,
      };
    },
    formatTitle() {
      if (
        this.modal.isEdit &&
        this.modal.item &&
        this.modal.item.isReschedule
      ) {
        return 'Reagendar actividad';
      }
      return this.modal.isEdit ? 'Editar actividad' : 'Crear actividad';
    },
  },
  methods: {
    sortList(list) {
      return list.sort((a, b) => {
        return a.order > b.order ? 1 : -1;
      });
    },
    isFreeBusy() {
      if (this.modal.isEdit) {
        const { start, end } = this.modal.item;
        const newDateStart = start.split(' ')[0];
        const newTimeStart = moment(start.split(' ')[1], ['h:mm:ss']);
        const newTimeEnd = end ? moment(end.split(' ')[1], ['h:mm:ss']) : null;

        const hourStart = moment(this.activity.timeStart, ['h:mma']);
        const hourEnd = moment(this.activity.timeEnd, ['h:mma']);
        if (this.activity.dateStart === newDateStart) {
          // Fisrt case, not its into the event before
          if (
            (hourStart < newTimeStart || hourStart >= newTimeEnd) &&
            (hourEnd <= newTimeStart || hourEnd > newTimeEnd)
          ) {
            this.mutationIsFreeBusy();
          } else if (
            // Second case, only timeEnd is into the event before
            hourStart < newTimeStart &&
            hourEnd > newTimeStart &&
            hourEnd < newTimeEnd
          ) {
            this.mutationIsFreeBusy(
              hourStart.format('hh:mma'),
              newTimeStart.format('hh:mma'),
            );
          } else if (
            // Third case, only timeEnd is into the event before
            hourStart === newTimeStart &&
            hourEnd > newTimeStart &&
            hourEnd < newTimeEnd
          ) {
            this.isFreeTime = false;
          } else if (
            // Four case, activity is equal to the event before
            hourStart === newTimeStart &&
            hourEnd === newTimeEnd
          ) {
            this.isFreeTime = false;
          } else if (
            // Fifth case, activity is check into the event before but not is equal.
            hourStart > newTimeStart &&
            hourStart < newTimeEnd &&
            hourEnd > newTimeStart &&
            hourEnd < newTimeEnd
          ) {
            this.isFreeTime = false;
          } else if (
            // Six case, only the timeStart is into the event before.
            hourStart > newTimeStart &&
            hourStart < newTimeEnd &&
            hourEnd > newTimeEnd
          ) {
            this.mutationIsFreeBusy(
              hourEnd.format('hh:mma'),
              newTimeEnd.format('hh:mma'),
            );
          } else if (
            // Seven case, only the timeStart is into the event before.
            hourStart > newTimeStart &&
            hourStart < newTimeEnd &&
            hourEnd === newTimeEnd
          ) {
            this.isFreeTime = false;
          }
        }
      } else {
        this.mutationIsFreeBusy();
      }
    },
    async mutationIsFreeBusy(newStart, newEnd) {
      const start = newStart || this.activity.timeStart;
      const end = newEnd || this.activity.timeEnd;

      if (this.activity.dateStart && start && end && this.activity.owner?.id) {
        const dateStart = this.createADateComplete(
          this.activity.dateStart,
          start,
        );
        const dateEnd = this.createADateComplete(this.activity.dateStart, end);

        this.$apollo
          .query({
            query: FREE_BUSY,
            fetchPolicy: 'no-cache',
            variables: {
              activityInput: {
                userEnterpriseId: this.activity.owner.id,
                dateStart,
                dateEnd,
              },
            },
          })
          .then(({ data: { activitiesFreeBusy } }) => {
            this.isFreeTime = activitiesFreeBusy;
          });
      }
    },
    formatTime(dateStart, timeStart, timeEnd) {
      if (dateStart && timeStart && timeEnd) {
        const newDateStart = moment(dateStart);
        const newTimeStart = moment(timeStart, ['h:mm:ss']);
        const newTimeEnd = moment(timeEnd, ['h:mm:ss']);
        return `${newDateStart.format('LL')} ⋅ ${newTimeStart.format(
          'h:mma',
        )} - ${newTimeEnd.format('h:mma')}`;
      }
      return '';
    },
    formatDate(date) {
      return moment(date).format('LL');
    },
    getTime(time) {
      return ` ${this.convertHour24(time)}`;
    },
    convertHour24(time) {
      const newHour = moment(time, 'HH:mmA');
      return newHour.format('HH:mm');
    },
    cancelComplete() {
      this.activity.isComplete = false;
      this.activity.status = 'PENDING';
      this.activity.comments = '';
    },
    saveComplete({ status, comments }) {
      if (this.modal.isEdit) {
        this.isLoadingComplete = true;
        const { id } = this.modal.item;

        if (status) {
          this.saveCompleteMutation({ id, status: 'EFFECTIVE' });
        } else {
          this.saveCompleteMutation({
            id,
            status: 'INEFFECTIVE',
            comments,
          });
        }
      } else {
        this.activity.isComplete = true;
        if (status) {
          this.activity.status = 'EFFECTIVE';
        } else {
          this.activity.status = 'INEFFECTIVE';
          this.activity.comments = comments;
        }
      }
    },
    saveEventIncomplete() {
      const { id } = this.modal.item;
      this.isLoadingIncomplete = true;
      this.saveCompleteMutation({ id, status: 'PENDING' });
    },
    saveCompleteMutation({ id, status, comments }) {
      this.$apollo
        .mutate({
          mutation: UPDATE_ACTIVITY,
          variables: {
            activityInput: {
              id,
              status,
              comments,
            },
          },
        })
        .then(({ data: { updateActivity } }) => {
          // Result
          if (updateActivity.status !== 'PENDING') {
            this.addSuccess('Se completó la actividad.');
          } else {
            this.addSuccess('Marcaste como incompleta la actividad.');
          }
        })
        .catch(() => {
          const error =
            'No se pudo actualizar el estado de la actividad, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    openModalEffective() {
      this.changeModal({
        id: 'modalEffectiveActivity',
        status: true,
      });
    },
    updateOwner(owner) {
      this.activity.owner = owner;
    },
    updateContent(content) {
      this.activity.description = content;
    },
    listContacts(contacts) {
      this.activity.contacts = contacts;
    },
    listInvites(invites) {
      this.activity.invites = invites;
    },
    listCompanies(companies) {
      this.activity.companies = companies;
    },
    listDeal(deal) {
      this.activity.deal = deal;
    },
    close() {
      this.changeModal({
        id: this.modalId,
        status: false,
        isEdit: false,
        item: null,
      });
    },
    getActivityType(index) {
      return this.listActivityTypes[index];
    },
    getActivityTypeIndex(id) {
      return this.listActivityTypes.findIndex((type) => type.id === id);
    },
    createADateComplete(date, time) {
      if (date && time) {
        return moment(`${date} ${time}`, 'YYYY-MM-DD HH:mmA').format();
      }

      return null;
    },
    formatElement(listElements) {
      return listElements.map((element) => {
        if (element === Object(element)) {
          return {
            id: element.id,
          };
        }
        return { name: element };
      });
    },
    formatGuests(invites) {
      if (invites && invites.length > 0) {
        return invites.map((invite) => {
          if (invite === Object(invite)) {
            return { displayName: invite.name, email: invite.email };
          }
          const displayName = invite.slice(0, invite.indexOf('@'));
          return { displayName, email: invite };
        });
      }
      return [];
    },
    isValidHour(hour) {
      return moment(hour, 'hh:mma', true).isValid();
    },
    isValidDateTime(dateTime) {
      if (dateTime) {
        return moment(dateTime).isValid();
      }
      return false;
    },
    createActivity() {
      this.$refs.formActivity.validate();

      if (
        this.isValidateFormActivity &&
        this.activity.title !== '' &&
        !this.isFreeTime
      ) {
        this.isLoading = true;
        const {
          title,
          typeActivity,
          dateStart,
          timeStart,
          timeEnd,
          invites,
          location,
          description,
          contacts,
          companies,
          deal,
          owner,
          status,
          comments,
        } = this.activity;

        const type = this.getActivityType(typeActivity);

        const start = this.createADateComplete(
          dateStart,
          timeStart || '12:00am',
        );
        const end = this.createADateComplete(dateStart, timeEnd || '12:00am');
        const guests = this.formatGuests(invites);

        const activity = {
          title,
          status,
          description,
          location,
          owner: {
            id: owner.id,
          },
          type: {
            id: type.id,
          },
          start,
          end,
          contacts: this.formatElement(contacts),
          companies: this.formatElement(companies),
          deal: deal?.id ? { id: deal.id } : undefined,
          comments,
          guests,
        };

        const cleanActivity = this.deleteEmptyProperties(activity);

        const isAllDay = !(
          this.isValidHour(timeStart) && this.isValidHour(timeEnd)
        );

        this.$apollo
          .mutate({
            mutation: CREATE_ACTIVITY,
            variables: {
              activityInput: {
                ...cleanActivity,
                isAllDay,
              },
            },
          })
          .then(() => {
            this.$emit('updateHistory');
            this.$emit('refetch');
            this.isLoading = false;
            this.close();
            this.addSuccess('Se creó la actividad.');
          })
          .catch(() => {
            // Error
            this.isLoading = false;
            const error =
              'No se pudo crear la actividad, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    justNewsElementsToCreate(listCurrent) {
      if (listCurrent && listCurrent.length > 0) {
        return listCurrent
          .filter((itemCurrent) => {
            return typeof itemCurrent === 'string';
          })
          .map((item) => {
            return { name: item };
          });
      }
      return [];
    },
    justNewsElementsToConnect(listCurrent, listBefore) {
      if (listCurrent && listCurrent.length > 0) {
        return listCurrent
          .filter((itemCurrent) => {
            return (
              !listBefore.includes(itemCurrent.id) &&
              typeof itemCurrent !== 'string'
            );
          })
          .map((item) => {
            return { id: item.id };
          });
      }
      return [];
    },
    justElementsToDisconnect(listCurrent, listBefore) {
      if (listCurrent && listCurrent.length) {
        return listBefore
          .filter((itemBeforeId) => {
            return !listCurrent.some(
              (itemCurrent) => itemCurrent.id === itemBeforeId,
            );
          })
          .map((id) => {
            return { disconnect: { id } };
          });
      }
      return [];
    },
    updateActivity() {
      this.isLoading = true;

      const hasEditActivity = { id: this.activity.id };

      if (this.activityBeforeEdit.title !== this.activity.title) {
        hasEditActivity.title = this.activity.title;
      }
      if (this.activityBeforeEdit.typeActivity !== this.activity.typeActivity) {
        hasEditActivity.typeActivity = this.activity.typeActivity;
      }
      const hasEditDatetime =
        this.activityBeforeEdit.dateStart !== this.activity.dateStart ||
        this.activityBeforeEdit.timeStart !== this.activity.timeStart ||
        this.activityBeforeEdit.timeEnd !== this.activity.timeEnd;

      if (hasEditDatetime) {
        hasEditActivity.dateStart = this.activity.dateStart;
        hasEditActivity.timeStart = this.activity.timeStart;
        hasEditActivity.timeEnd = this.activity.timeEnd;
      }
      if (this.activityBeforeEdit.invites !== this.activity.invites) {
        hasEditActivity.invites = this.activity.invites;
      }
      if (this.activityBeforeEdit.location !== this.activity.location) {
        hasEditActivity.location = this.activity.location;
      }
      if (this.activityBeforeEdit.description !== this.activity.description) {
        hasEditActivity.description = this.activity.description;
      }
      if (this.activityBeforeEdit.contacts !== this.activity.contacts) {
        hasEditActivity.contacts = this.activity.contacts;
      }
      if (this.activityBeforeEdit.companies !== this.activity.companies) {
        hasEditActivity.companies = this.activity.companies;
      }
      if (this.activityBeforeEdit.deal !== this.activity.deal) {
        hasEditActivity.deal = this.activity.deal;
      }
      if (this.activityBeforeEdit.owner !== this.activity.owner) {
        hasEditActivity.owner = this.activity.owner;
      }
      if (this.activityBeforeEdit.status !== this.activity.status) {
        hasEditActivity.status = this.activity.status;
      }

      const {
        id,
        title,
        typeActivity,
        dateStart,
        timeStart,
        timeEnd,
        invites,
        location,
        description,
        contacts,
        companies,
        deal,
        owner,
        status,
        comments,
      } = hasEditActivity;

      // Validations in edit an action
      // Contacts
      let newListContacts;

      if (this.modal.isEdit) {
        const newContacts = this.justNewsElementsToConnect(
          contacts,
          this.modal.item.contacts.map((contact) => contact.id),
        );

        const disconnectContacts = this.justElementsToDisconnect(
          contacts,
          this.modal.item.contacts.map((contact) => contact.id),
        );

        const createContacts =
          contacts && contacts.length > 0
            ? this.justNewsElementsToCreate(contacts)
            : [];

        newListContacts = newContacts.concat(
          createContacts,
          disconnectContacts,
        );
      } else {
        newListContacts = this.formatElement(contacts);
      }

      // Companies
      let newListCompanies;

      if (this.modal.isEdit) {
        const newCompanies =
          companies && companies.length > 0
            ? this.justNewsElementsToConnect(
                companies,
                this.modal.item.companies.map((company) => company.id),
              )
            : [];

        const disconnectCompanies = this.justElementsToDisconnect(
          companies,
          this.modal.item.companies.map((company) => company.id),
        );

        const createCompanies = this.justNewsElementsToCreate(companies);

        newListCompanies = newCompanies.concat(
          createCompanies,
          disconnectCompanies,
        );
      } else {
        newListCompanies = this.formatElement(companies);
      }

      const type = this.getActivityType(typeActivity);
      const typeOb = type && type.id ? { id: type.id } : null;

      const ownerObj = owner && owner.id ? { id: owner.id } : null;

      const start = dateStart
        ? this.createADateComplete(dateStart, timeStart)
        : null;

      const end = dateStart
        ? this.createADateComplete(dateStart, timeEnd)
        : null;

      const guests = this.formatGuests(invites);
      const newStatus = status !== this.modal.item.status ? status : undefined;
      const newComments =
        status !== this.modal.item.status ? comments : undefined;
      const newDeal = deal ? { id: deal.id } : undefined;

      const activityFormat = { id };

      if (title) {
        activityFormat.title = title;
      }
      if (newStatus) {
        activityFormat.status = newStatus;
      }
      if (description) {
        activityFormat.description = description;
      }
      if (location) {
        activityFormat.location = location;
      }
      if (ownerObj) {
        activityFormat.owner = ownerObj;
      }
      if (typeOb) {
        activityFormat.type = typeOb;
      }
      if (start) {
        activityFormat.start = start;
      }
      if (end) {
        activityFormat.end = end;
      }
      if (location) {
        activityFormat.location = location;
      }
      if (newListContacts && newListContacts.length > 0) {
        activityFormat.contacts = newListContacts;
      }
      if (newListCompanies && newListCompanies.length > 0) {
        activityFormat.companies = newListCompanies;
      }
      if (newDeal && newDeal.id) {
        activityFormat.deal = newDeal;
      }
      if (newComments) {
        activityFormat.comments = newComments;
      }
      if (guests && guests.length > 0) {
        activityFormat.guests = guests;
      }

      if (hasEditDatetime) {
        activityFormat.isAllDay = !(
          this.isValidDateTime(activityFormat.start) &&
          this.isValidDateTime(activityFormat.end)
        );
      }

      if (activityFormat.isAllDay && activityFormat.start) {
        activityFormat.end = activityFormat.start;
      }

      this.$apollo
        .mutate({
          mutation: UPDATE_ACTIVITY,
          variables: {
            activityInput: {
              ...activityFormat,
            },
          },
        })
        .then(() => {
          this.close();
          this.isLoading = false;
          this.$emit('updateHistory');
          this.$emit('refetch');
          this.addSuccess('Se actualizó la actividad.');
        })
        .catch(() => {
          // Error
          this.isLoading = false;
          const error =
            'No se pudo actualizar la actividad, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    reset() {
      const { id, user } = this.userCurrent;
      this.isActiveReschedule = false;
      this.isFreeTime = false;
      this.isActiveDescription = false;
      this.isActiveLocation = false;
      this.isActiveCompany = false;
      this.isActiveDeal = false;
      this.isActiveInvites = false;
      this.isActiveContact = false;
      this.activity = {
        id: '',
        title: '',
        typeActivity: 0,
        dateStart: moment().format('YYYY-MM-DD'),
        timeStart: '',
        timeEnd: '',
        invites: [],
        location: '',
        description: '',
        companies: [],
        contacts: [],
        deal: {},
        isComplete: false,
        owner: { id, user },
        status: 'PENDING',
        comments: '',
      };

      if (this.$refs.formActivity) this.$refs.formActivity.resetValidation();
      this.isValidateFormActivity = true;
    },
    deleteEmptyProperties(itemObject) {
      return Object.keys(itemObject)
        .filter((key) => {
          return (
            (!!itemObject[key] && itemObject[key].length > 0) ||
            (!!itemObject[key] &&
              itemObject[key].constructor === Object &&
              Object.entries(itemObject[key]).length > 0)
          );
        })
        .reduce((list, index) => {
          // eslint-disable-next-line
          list[index] = itemObject[index];
          return list;
        }, {});
    },
    setHourNow() {
      const getHourNow = moment().format('hh:mma');
      const getTime = this.listTime.find((time) => {
        return this.getTime(time) > this.getTime(getHourNow);
      });
      if (this.activity.timeStart === '') {
        this.activity.timeStart = getTime || '';
      }
    },
  },
  apollo: {
    activityTypes: {
      query: GET_ACTIVITIES_TYPES,
      fetchPolicy: 'no-cache',
    },
    userCurrent: {
      query: GET_USER_LOGGED,
    },
    activities: {
      query: GET_ACTIVITIES,
      fetchPolicy: 'no-cache',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .v-input__append-outer .time-calendar .v-text-field__slot} from ../../../../scss/components/modal.activity';
</style>
