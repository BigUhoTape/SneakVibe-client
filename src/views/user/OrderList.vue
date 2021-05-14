<template>
  <div class="container orderList">
    <ProfileRouterLink />
    <div class="loader" v-if="IS_LOADING_ORDERS">
      <vue-loaders-pacman color="black" scale="1"/>
    </div>
    <div v-else>
      <p
        v-for="item in ORDERS"
        :key="'order-id-' + item.id"
      >
        {{ item.id }}
      </p>
      <Paginate v-model="page"
                :page-count="PAGE_COUNT"
                :click-handler="changePage"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page'"
                :page-link-class="'page-link'"
                :prev-class="'page'"
                :prev-link-class="'page-link opt'"
                :next-class="'page'"
                :next-link-class="'page-link opt'"
                active-class="activeClass"
      />
    </div>
  </div>
</template>

<script>
  import ProfileRouterLink from "../../components/user/ProfileRouterLink";
  import { mapActions, mapGetters } from 'vuex';
  import Paginate from 'vuejs-paginate';

  export default {
    name: "OrderList",
    components: {
      ProfileRouterLink,
      Paginate
    },
    data () {
      return {
        page: 1
      }
    },
    computed: {
      ...mapGetters([
        'accessToken',
        'ORDERS',
        'IS_LOADING_ORDERS',
        'PAGE_COUNT'
      ])
    },
    methods: {
      ...mapActions([
        'FETCH_ORDERS'
      ]),
      async changePage (pageNum) {
        this.page = pageNum;
        await this.FETCH_ORDERS(this.page);
      }
    },
    async created() {
      if (this.accessToken) {
        await this.FETCH_ORDERS(this.page);
      }
    }
  }
</script>

<style lang="less">
  .pagination {
    display: flex;
    justify-content: center;
    width: 0;
    margin: 30px auto 0 auto;
  }
  .page {
    margin-right: 5px;

    list-style: none;
    color: #bcbcbc;

    &-link {
      display: inline;
      font-family: 'Tahoma', serif;
      padding: 20px;
      border: 1px solid #000;
      border-radius: 5px;
      font-size: 20px;
      transition: .4s;
      &:focus {
        outline: none;
      }
      &:hover {
        background-color: #000000;
        color: #D2D2D2;
        transition: .4s;
      }
    }
  }
  .activeClass {
    color: black;
    font-weight: bold;
  }
  .opt {
    background-color: #343434;
    color: #D2D2D2;
  }
</style>
