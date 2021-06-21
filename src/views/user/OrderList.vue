<template>
  <div class="container orderList">
    <ProfileRouterLink />
    <div class="loader" v-if="IS_LOADING_ORDERS">
      <vue-loaders-pacman color="black" scale="1"/>
    </div>
    <div v-else>
      <table>
        <tr>
          <th>ID</th>
          <th>Card Number</th>
          <th>Created At</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
        <tr v-for="item in ORDERS">
          <td>{{ item.id }}</td>
          <td>{{ item.card_number }}</td>
          <td>{{ item.created_at }}</td>
          <td>{{ item.amount }}₽</td>
          <td>
            <div v-if="item.status === 'active'">
              <span class="mr-2">{{ item.status }}</span>
              <button class="cancelBtn" @click="cancelOrder(item.id)">Cancel</button>
            </div>
            <div v-else-if="item.status === 'canceled'">
              <span style="color: red">{{ item.status }}</span>
            </div>
            <div v-else>
              <span style="color: green">{{ item.status }}</span>
            </div>
          </td>
        </tr>
      </table>
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
        'FETCH_ORDERS',
        'CANCEL_ORDER'
      ]),
      async changePage (pageNum) {
        this.page = pageNum;
        await this.FETCH_ORDERS(this.page);
      },
      async cancelOrder (id) {
        await this.CANCEL_ORDER(id);
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
  .cancelBtn {
    color: red;
    border: none;
    background-color: #f2cabf;
    transition: .4s;
    padding: 10px 20px 10px 20px;
    font-weight: bold;

    &:hover {
      color: white;
      background-color: red;
      cursor: pointer;
      transition: .4s;
    }
  }
  .loader {
    position: absolute;
    left: 46%;
    top: 46%;
  }
  table {
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px;

    tr {
      &:hover {
        background-color: #ebece6;
        cursor: pointer;
      }
    }

    th {
      padding-bottom: 40px;
    }

    td {
      text-align: center;
      padding-bottom: 40px;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-weight: bold;
    }
  }
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
