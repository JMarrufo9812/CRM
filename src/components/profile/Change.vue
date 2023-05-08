<template>
  <div>
    <v-card v-if="item.type === 'CREATE'" class="my-4" width="95%">
      <v-card-title class="title-change pt-1">
        {{ typeItem(item.object.type) }}
        {{ isImport ? 'se importó' : 'se creó' }}
      </v-card-title>
      <v-card-subtitle>
        {{ item.createdAt | timeZoneFromNow }} por
        <span class="text-bold">
          {{ getUser(item.createdBy.id) }}
        </span>
      </v-card-subtitle>
    </v-card>
    <v-card v-if="item.type === 'UPDATE'" class="my-4" width="95%">
      <v-card-title class="title-change pt-1">
        {{ getItem(item.item, item.object) }}
      </v-card-title>
      <v-card-subtitle class="pb-0">
        <span>{{ getStatusItem(item.item, item.itemBefore) }}</span>
        <v-icon small class="px-1 pb-1" color="primary">
          mdi-arrow-right-bold
        </v-icon>
        <span class="secondary--text">
          {{ getStatusItem(item.item, item.itemAfter) }}
        </span>
      </v-card-subtitle>
      <v-card-subtitle class="pt-0">
        {{ item.createdAt | timeZoneFromNow }} por
        <span class="text-bold">
          {{ getUser(item.createdBy.id) }}
        </span>
      </v-card-subtitle>
    </v-card>
    <v-card v-if="item.type === 'DELETE'" class="my-4" width="95%">
      <v-card-title class="title-change pt-1">
        {{ typeItem(item.object.type) }} se eliminó
      </v-card-title>
      <v-card-subtitle>
        {{ item.createdAt | timeZoneFromNow }} por
        <span class="text-bold">
          {{ getUser(item.createdBy.id) }}
        </span>
      </v-card-subtitle>
    </v-card>
    <v-card v-if="item.type === 'RESTORE'" class="my-4" width="95%">
      <v-card-title class="title-change pt-1">
        {{ typeItem(item.object.type) }} se restauró
      </v-card-title>
      <v-card-subtitle>
        {{ item.createdAt | timeZoneFromNow }} por
        <span class="text-bold">
          {{ getUser(item.createdBy.id) }}
        </span>
      </v-card-subtitle>
    </v-card>
    <v-card v-if="item.type === 'CONNECT'" class="my-4" width="95%">
      <v-card-title class="title-change pt-1">
        Se conectó con
        <span>
          <v-icon small class="mb-1 ml-1">
            {{ getIcon(item.object.type) }}
          </v-icon>
          {{ getTarget(item.object.type, item.object.by.id) }}
        </span>
      </v-card-title>
      <v-card-subtitle>
        {{ item.createdAt | timeZoneFromNow }} por
        <span class="text-bold">
          {{ getUser(item.createdBy.id) }}
        </span>
      </v-card-subtitle>
    </v-card>
    <v-card v-if="item.type === 'DISCONNECT'" class="my-4" width="95%">
      <v-card-title class="title-change pt-1">
        Se desconectó de
        <span>
          <v-icon small class="mb-1 ml-1">
            {{ getIcon(item.object.type) }}
          </v-icon>
          {{ getTarget(item.object.type, item.object.by.id) }}
        </span>
      </v-card-title>
      <v-card-subtitle>
        {{ item.createdAt | timeZoneFromNow }} por
        <span class="text-bold">
          {{ getUser(item.createdBy.id) }}
        </span>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Change',
  props: {
    item: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    targets: {
      type: Object,
      default: () => {
        return {
          contacts: [],
          companies: [],
          deals: [],
          pipelines: [],
          stages: [],
          customs: [],
        };
      },
    },
    isImport: {
      isRequired: true,
      type: Boolean,
    },
  },
  methods: {
    getUser(id) {
      const isExist = this.users.some((item) => item.id === id);
      if (isExist) {
        const { user } = this.users.find((item) => item.id === id);
        return `${user.name} ${user.lastName}`;
      }
      return 'Usuario eliminado';
    },
    getPipeline(id) {
      const isExist = this.targets.pipelines.some((item) => item.id === id);
      if (isExist) {
        const { name } = this.targets.pipelines.find((item) => item.id === id);
        return name;
      }
      return 'Embudo eliminado';
    },
    getStage(id) {
      const isExist = this.targets.stages.some((item) => item.id === id);
      if (isExist) {
        const { name } = this.targets.stages.find((item) => item.id === id);
        return name;
      }
      return 'Etapa eliminada';
    },
    typeItem(type) {
      if (type === 'CONTACT') {
        return 'El contacto';
      }
      if (type === 'COMPANY') {
        return 'La empresa';
      }
      if (type === 'DEAL') {
        return 'El trato';
      }
      return 'Dato';
    },
    getIcon(type) {
      if (type === 'CONTACT') {
        return 'mdi-account';
      }
      if (type === 'COMPANY') {
        return 'mdi-domain';
      }
      if (type === 'DEAL') {
        return 'mdi-handshake';
      }
      return '';
    },
    getTarget(type, id) {
      if (type === 'COMPANY') {
        const isExist = this.targets.companies.some((item) => item.id === id);
        if (isExist) {
          const company = this.targets.companies.find((item) => item.id === id);
          return `${company.name}`;
        }
        return 'empresa eliminada';
      }
      if (type === 'CONTACT') {
        const isExist = this.targets.contacts.some((item) => item.id === id);
        if (isExist) {
          const contact = this.targets.contacts.find((item) => item.id === id);
          return `${contact.name}`;
        }
        return 'contacto eliminado';
      }
      if (type === 'DEAL') {
        const isExist = this.targets.deals.some((item) => item.id === id);
        if (isExist) {
          const deal = this.targets.deals.find((item) => item.id === id);
          return `${deal.title}`;
        }
        return 'trato eliminado';
      }
      return '';
    },
    getItem(type, object) {
      if (type === 'PIPELINE') return 'El embudo se actualizó';

      if (type === 'EMAIL') return 'El correo se actualizó';

      if (type === 'OWNER') return 'El propietario se actualizó';

      if (type === 'NAME') return 'El nombre se actualizó';

      if (type === 'BIRTHDAY') return 'La fecha de cumpleaños se actualizó';

      if (type === 'PHONES') return 'Los teléfonos se actualizaron';

      if (type === 'SOCIALMEDIAS') return 'Redes sociales se actualizaron';

      if (type === 'WEBSITE') return 'El sitio web se actualizó';

      if (type === 'ADDRESS') return 'La dirección se actualizó';

      if (type === 'TAGS') return 'Las etiquetas se actualizaron';

      if (type === 'STAGE') return 'La etapa se actualizó';

      if (type === 'EXPECTED_CLOSE_DATE')
        return 'La fecha prevista de cierre se actualizó';

      if (type === 'VALUE') return 'El valor del trato se actualizó';

      if (type === 'TITLE') return 'El título se actualizó';

      if (type === 'STATUS') return 'El estado se actualizó';

      if (type === 'ISCLIENT') return 'El tipo de cliente se actualizó';

      if (type === 'CUSTOM') {
        const { id } = object.by;
        const isExist = this.targets.customs.some((custom) => id === custom.id);
        if (isExist) {
          const { label } = this.targets.customs.find(
            (custom) => id === custom.id,
          );
          return `${label} se actualizó`;
        }
        return 'Campo personalizado eliminado';
      }
      return `${type.toLowerCase()} se actualizó`;
    },
    getStatusItem(item, itemStatus) {
      if (item === 'EXPECTED_CLOSE_DATE') {
        const convertIso = moment(itemStatus, 'YYYY-MM-DD');
        if (moment(convertIso).isValid()) {
          return moment(convertIso).format('LL');
        }
        if (itemStatus === 'Fecha invalida') {
          return 'vacio';
        }
      }
      if (item === 'CUSTOM') {
        // eslint-disable-next-line
        let typeValue = typeof itemStatus;
        // eslint-disable-next-line
        typeValue = Array.isArray(itemStatus)
          ? 'array'
          : itemStatus
          ? 'object'
          : 'null';
        if (typeValue === 'array') {
          const values = itemStatus
            .map((value) => {
              return value;
            })
            .join('/');
          return values;
        }
      }
      if (item === 'PIPELINE') {
        return this.getPipeline(itemStatus);
      }
      if (item === 'STATUS') {
        if (itemStatus === 'WON') {
          return 'Ganado';
        }
        if (itemStatus === 'LOST') {
          return 'Perdido';
        }
        if (itemStatus === 'OPEN') {
          return 'Abierto';
        }
        return this.getStage(itemStatus);
      }
      if (item === 'STAGE') {
        return this.getStage(itemStatus);
      }
      if (item === 'OWNER') {
        return this.getUser(itemStatus);
      }
      if (item === 'TAGS') {
        if (itemStatus.length === 0) {
          return 'vacío';
        }
        const tags = itemStatus
          .map((tag) => {
            return tag.name;
          })
          .join('/');
        return tags;
      }
      if (item === 'SOCIALMEDIAS') {
        if (itemStatus.length === 0) {
          return 'vacío';
        }
        const socialMedias = itemStatus
          .filter(({ url }) => url.length !== 0)
          .map((sm) => {
            return sm.type;
          })
          .join('/');
        return socialMedias;
      }
      if (item === 'PHONES') {
        if (itemStatus.length === 0) {
          return 'vacío';
        }
        const phones = itemStatus
          .map(({ number }) => {
            return number;
          })
          .join('/');
        return phones;
      }
      if (item === 'ISCLIENT') {
        if (itemStatus === 'null') {
          return 'vacío';
        }
        if (itemStatus === 'false') {
          return 'cliente nuevo';
        }
        if (itemStatus === 'true') {
          return 'cliente antiguo';
        }
      }
      if (item === 'VALUE') {
        if (itemStatus) {
          return itemStatus.toFixed(2);
        }
      }
      if (itemStatus) {
        return itemStatus;
      }
      if (itemStatus === null) {
        return 'vacío';
      }
      return 'vacío';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .title-change .text-bold } from ../../../../scss/components/change.scss';
</style>
