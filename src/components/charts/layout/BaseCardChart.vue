<template>
  <v-card>
    <v-card-title class="text-uppercase title">
      <v-row>
        <v-col cols="6" md="8" class="position-relative">
          <div class="position-absolute flex-grow-1">
            <b class="mr-1">
              {{ title }}
            </b>
            {{ titleRegular }}
          </div>
        </v-col>
        <v-col cols="6" md="4" class="text-right">
          <div class="flex-grow-2">
            <slot name="modal"></slot>
            <v-menu bottom left offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon x-small v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item @click="update">
                  <v-list-item-title>
                    Actualizar
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <ListFilters :settings="settings" isPreview></ListFilters>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text :class="[{ 'd-flex': !isChart }, 'content']">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
import ListFilters from '@/components/charts/filters/ListFilters.vue';

export default {
  name: 'BaseCardChart',
  components: {
    ListFilters,
  },
  props: {
    title: {
      type: String,
      default: 'Sin Título',
    },
    titleRegular: {
      type: String,
      default: '',
    },
    isChart: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    update() {
      this.$emit('updateRefetch');
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 300px;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.title {
  font-size: 1.125rem !important;
  word-break: initial !important;
  line-height: 1.3rem !important;
}

.position-absolute {
  position: absolute;
  margin-top: 0.6rem;
}

.position-relative {
  position: relative;
}
</style>
