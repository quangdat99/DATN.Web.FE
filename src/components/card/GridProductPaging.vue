<template>
  <div class="paging-button d-flex">
    <base-button
      class="mr-3"
      leftIcon="previous-black mr-1px"
      classIcon="mr-1px"
      type="transparent"
      :disabled="pageNumber == 0"
      @click="updatePage(pageNumber - 1)"
    ></base-button>
    <div class="d-flex" v-if="totalPage < 10">
      <base-button
        v-for="(page, i) in totalPage"
        :key="i"
        class="mr-3"
        :text="page"
        :type="page == pageNumber + 1 ? 'primary' : 'transparent'"
        @click="updatePage(page - 1)"
      >
      </base-button>
    </div>
    <div class="d-flex" v-if="totalPage >= 10">
      <div class="d-flex">
        <base-button
          class="mr-3"
          :text="1"
          :type="0 == pageNumber ? 'primary' : 'transparent'"
          @click="updatePage(0)"
        >
        </base-button>
        <base-button
          class="mr-3"
          :text="2"
          :type="pageNumber == 1 ? 'primary' : 'transparent'"
          @click="updatePage(1)"
        >
        </base-button>
      </div>
      <base-button
        v-if="pageNumber <= 3"
        class="mr-3"
        :text="3"
        :type="2 == pageNumber ? 'primary' : 'transparent'"
        @click="updatePage(2)"
      >
      </base-button>
      <base-button
        v-if="pageNumber <= 3"
        class="mr-3"
        :text="4"
        :type="3 == pageNumber ? 'primary' : 'transparent'"
        @click="updatePage(3)"
      >
      </base-button>
      <base-button
        v-if="pageNumber <= 3"
        class="mr-3"
        :text="5"
        :type="4 == pageNumber ? 'primary' : 'transparent'"
        @click="updatePage(4)"
      >
      </base-button>
      <div v-if="pageNumber > 3" style="line-height: 32px">...</div>
      <div class="d-flex" v-if="pageNumber >= 4 && pageNumber <= totalPage - 5">
        <base-button
          v-for="(page, i) in 3"
          :key="i"
          class="mr-3"
          :text="pageNumber - 1 + page"
          :type="page == 2 ? 'primary' : 'transparent'"
          @click="updatePage(pageNumber + page - 2)"
        >
        </base-button>
      </div>

      <div v-if="pageNumber < totalPage - 4" style="line-height: 32px">...</div>

      <base-button
        v-if="pageNumber >= totalPage - 4"
        class="mr-3"
        :text="totalPage - 4"
        :type="totalPage - 5 == pageNumber ? 'primary' : 'transparent'"
        @click="updatePage(totalPage - 5)"
      >
      </base-button>
      <base-button
        v-if="pageNumber >= totalPage - 4"
        class="mr-3"
        :text="totalPage - 3"
        :type="totalPage - 4 == pageNumber ? 'primary' : 'transparent'"
        @click="updatePage(totalPage - 4)"
      >
      </base-button>
      <base-button
        v-if="pageNumber >= totalPage - 4"
        class="mr-3"
        :text="totalPage - 2"
        :type="totalPage - 3 == pageNumber ? 'primary' : 'transparent'"
        @click="updatePage(totalPage - 3)"
      >
      </base-button>
      <div class="d-flex">
        <base-button
          class="mr-3"
          :text="totalPage - 1"
          :type="totalPage - 2 == pageNumber ? 'primary' : 'transparent'"
          @click="updatePage(totalPage - 2)"
        >
        </base-button>
        <base-button
          class="mr-3"
          :text="totalPage"
          :type="totalPage - 1 == pageNumber ? 'primary' : 'transparent'"
          @click="updatePage(totalPage - 1)"
        >
        </base-button>
      </div>
    </div>
    <base-button
      leftIcon="next-black mr-1px"
      type="transparent"
      :disabled="pageNumber == totalPage - 1"
      @click="updatePage(pageNumber + 1)"
    ></base-button>
  </div>
</template>

<script>
import BaseButton from "@/components/button/BaseButton.vue";
export default {
  name: "GridProductPaging",
  components: {
    BaseButton,
  },
  props: {
    pageNumber: {
      default: 0,
      type: Number,
    },
    totalPage: {
      default: 0,
      type: Number,
    },
  },
  emits: ["updatePage"],
  setup(props, { emit }) {
    const updatePage = (page) => {
      emit("updatePage", page);
    };
    return {
      updatePage,
    };
  },
};
</script>

<style>
</style>