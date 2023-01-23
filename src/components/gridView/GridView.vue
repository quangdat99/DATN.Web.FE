<template>
  <easy-data-table
    :alternating="alternating"
    :buttons-pagination="buttonsPagination"
    :headers="headers"
    :items="items"
    @click-row="rowClick"
    v-model:items-selected="itemsSelected"
    :loading="loading"
    v-model:server-options="serverOptions"
    multi-sort
    :theme-color="'#C20000'"
    table-class-name="customize-table"
    header-text-direction="center"
    body-text-direction="left"
    border-cell
    :current-pagination-number="25"
    rowsOfPageSeparatorMessage="của"
    rowsPerPageMessage="Số dòng"
    :serverItemsLength="totalRecord"
  >
    <template #loading>
      <loading></loading>
    </template>

    <template #item-operation="item">
      <slot name="item-operation" :item="item"> </slot>
    </template>
  </easy-data-table>
</template>

<script>
import { ref, getCurrentInstance, computed, onMounted, watch } from "vue";
import Loading from "@/components/loading/Loading.vue";
export default {
  components: {
    Loading,
  },
  props: {
    borderCell: {
      type: Boolean,
      default: true,
    },
    alternating: {
      type: Boolean,
      default: false,
    },
    buttonsPagination: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    api: {
      type: Object,
      default: null,
    },
    headers: {
      type: Array,
      default: [],
    },
    fields: {
      type: Array,
      default: null,
    },
  },
  emits: ["rowClick", "hasSort"],

  setup(props, { emit, expose }) {
    const { proxy } = getCurrentInstance();
    const itemsSelected = ref(props.multiple ? [] : null);
    const loading = ref(true);
    const totalRecord = ref(0);
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 25,
      sortBy: [],
      sortType: [],
    });
    const items = ref([]);

    /**
     * Sự kiện click row
     */
    const rowClick = (item) => {
      emit("rowClick", item);
    };

    const getPayload = () => {
      let payload = serverOptions.value;
      return cloneDeep(payload);
    };

    onMounted(async () => {
      serverOptions.value.fields = props.fields;
      window.grid = proxy;
    });
    function cloneDeep(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    const loadData = async () => {
      loading.value = true;
      let api = props.api;
      if (api) {
        let payload = getPayload();
        payload.size = payload.rowsPerPage;
        payload.fields = props.fields;
        try {
          let res = await api.getDataTable(payload);
          if (res && res.status == 200) {
            items.value = res.data.data;
            totalRecord.value = res.data.totalRecord;
          }
        } catch (e) {
          console.log(e);
        } finally {
          loading.value = false;
        }
      }
    };
    expose({ loadData });

    watch(
      serverOptions,
      async () => {
        await loadData();
      },
      { deep: true }
    );

    watch(
      serverOptions.value.sortBy,
      (value) => {
        if (value.length > 0) {
          emit("hasSort", true);
        } else {
          emit("hasSort", false);
        }
      },
      { deep: true }
    );

    return {
      items,
      rowClick,
      itemsSelected,
      loading,
      serverOptions,
      totalRecord,
    };
  },
};
</script>
<style lang="scss">
@import "./GridView.scss";
</style>