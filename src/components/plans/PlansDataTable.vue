<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="groupsInPlan"
      item-key="group"
      :items-per-page="500"
      class="elevation-1"
      :expanded.sync="expanded"
      hide-default-footer
      light
    >
      <template v-slot:item="{ item, headers, expand, isExpanded }">
        <tr>
          <td
            v-for="(header, index) in headers"
            :key="index"
            @click="expand(!isExpanded)"
          >
            <div v-if="index === 0">
              <v-icon color="primary">
                mdi-chevron-double-down
              </v-icon>

              <span>
                {{ item.group }}
              </span>
            </div>
            <v-layout v-else justify-center>
              <v-icon
                small
                :color="
                  item[`plan${header.value}`] == 'mdi-checkbox-blank-circle'
                    ? 'green'
                    : 'primary'
                "
              >
                {{ item[`plan${header.value}`] }}
              </v-icon>
            </v-layout>
          </td>
        </tr>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td
          v-for="(header, index) in headers"
          :key="`header-${index}-${item.group.trim()}`"
        >
          <div v-if="index > 0">
            <v-list-item
              v-for="(mod, index) in item.groupModules"
              :key="`icons-${index}-${`plan${header.value}`}`"
            >
              <v-list-item-content>
                <v-layout justify-center>
                  <v-icon
                    small
                    :color="
                      item[`plan${header.value}`] == 'mdi-checkbox-blank-circle'
                        ? 'green'
                        : 'primary'
                    "
                  >
                    {{
                      item[`plan${header.value}`] == 'mdi-checkbox-blank-circle'
                        ? 'mdi-check-outline'
                        : 'mdi-close-outline'
                    }}
                  </v-icon>
                </v-layout>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-else>
            <v-list-item
              v-for="(mod, index) in item.groupModules"
              :key="`list-${index}-${item.group.trim()}`"
            >
              <v-list-item-content>
                {{ mod.name }}
              </v-list-item-content>
            </v-list-item>
          </div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    plans: {
      type: [Array, Object],
    },
    modules: {
      type: [Array, Object],
    },
    groupModules: {
      type: [Array, Object],
    },
  },
  data() {
    return {
      expanded: [],
    };
  },
  computed: {
    groupsInPlan: {
      cache: false,
      get() {
        if (this.plans && this.groupModules) {
          const items = [...Array(this.groupModules.length)].map(() => {
            return {};
          });
          items.forEach((item, index) => {
            item.group = this.groupModules[index].name;
            item.groupModules = this.groupModules[index].modules;
          });

          this.plans.forEach((plan) => {
            /* eslint no-param-reassign: "error" */
            const { modulesGroup } = plan;
            items.forEach((item, index) => {
              const groupId = this.groupModules[index].id;
              // console.log('groupId: ', groupId);
              modulesGroup.forEach((gp) => {
                const isExist = gp.id === groupId;
                // console.log('gp: ', item[`group${plan.id}`].group);
                item[`plan${plan.id}`] =
                  isExist ||
                  item[`plan${plan.id}`] === 'mdi-checkbox-blank-circle'
                    ? 'mdi-checkbox-blank-circle'
                    : 'mdi-circle-off-outline';
              });
            });
          });
          // console.log('PLANS');
          return items;
        }
        return [];
      },
    },
    headers() {
      const headers = [{ text: 'Grupo', value: 'group' }];
      if (this.plans) {
        this.plans.forEach((plan) => {
          headers.push({
            text: plan.name,
            value: plan.id,
            sortable: false,
            align: 'center',
            class: 'font-weight-black',
          });
        });
      }
      return headers;
    },
  },
  watch: {
    groupsInPlan(val) {
      this.expanded = val;
    },
  },
  mounted() {
    setTimeout(() => {
      this.expanded = this.groupsInPlan;
    }, 500);
  },
};
</script>
