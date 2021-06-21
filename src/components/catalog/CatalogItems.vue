<template>
  <div class="catalogItems">
    <div class="catalogItems__items">
      <CatalogItem
        v-for="product in itemsOnPage"
        :key="product.id"
        :product="product"
      />
    </div>
    <Paginate v-model="page"
              :page-count="pageCount"
              :click-handler="changePagePagination"
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
</template>

<script>
  import Paginate from 'vuejs-paginate';
  import paginationMixin from '../../mixins/pagination.mixin';
  import CatalogItem from "./CatalogItem";
  import { mapGetters } from 'vuex';

  export default {
    name: "CatalogItems",
    components: {
      Paginate,
      CatalogItem
    },
    props: {
      gender: {
        type: String,
        default () {
          return null;
        }
      },
      searchValue: {
        type: String,
        default() {
          return null;
        }
      }
    },
    data () {
      return {};
    },
    mixins: [paginationMixin],
    watch: {
      filteredData() {
        this.setupPagination(this.filteredData);
      }
    },
    computed: {
      ...mapGetters(['GENDER_PRODUCTS']),
      filteredData() {
        let products = this.GENDER_PRODUCTS(this.gender);
        if (this.searchValue) {
          products = products.filter(product => {
            return product.model.toLowerCase().includes(this.searchValue.toLowerCase()) ||
              product.brand.toLowerCase().includes(this.searchValue.toLowerCase());
          });
          return products;
        }
        return products;
      }
    },
    mounted() {
      this.setupPagination(this.filteredData);
    }
  }
</script>

<style lang="less">
  .catalogItems {
    display: flex;
    flex-direction: column;
    padding-right: 0;

    &__items {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
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
