<template>
  <div class="catalogMainWrapper">
    <div v-if="!PRODUCTS" class="loader">
      <vue-loaders-pacman color="black" scale="1"/>
    </div>
    <div v-else>
      <div class="catalogMainWrapper-title">
        <h2 class="catalogMainWrapper-title__title">{{ title }}</h2>
        <div v-if="isSearch" class="catalogMainWrapper-search">
          <i class="fas fa-search catalogMainWrapper-search__icon"></i>
          <input type="text" v-model="searchValue" class="catalogMainWrapper-search__input">
          <i class="fas fa-times-circle catalogMainWrapper-search__exit"
             @click="clearSearchValue"
             v-if="searchValue"
          ></i>
        </div>
      </div>
      <div class="catalogMainWrapper-main">
        <div class="filter col-md-2"></div>
        <CatalogItems class="col-md-10" :gender='gender' :searchValue="searchValue"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import CatalogItems from "../components/catalog/CatalogItems";

  export default {
    name: "CatalogMainWrapper",
    components: {
      CatalogItems
    },
    props: {
      gender: {
        type: String
      },
      title: {
        type: String,
        required: true
      },
      isSearch: {
        type: Boolean,
        default () {
          return false;
        }
      }
    },
    data () {
      return {
        searchValue: ''
      }
    },
    computed: {
      ...mapGetters(['PRODUCTS'])
    },
    methods: {
      ...mapActions(['FETCH_PRODUCTS']),
      clearSearchValue () {
        this.searchValue = '';
      }
    },
    async created() {
      await this.FETCH_PRODUCTS();
    }
  }
</script>

<style lang="less" scoped>
  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
  }
  .catalogMainWrapper {
    display: flex;
    flex-direction: column;

    &-search {
      position: relative;

      &__input {
        height: 50px;
        padding-left: 50px;
        padding-right: 50px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 20px;
        border: none;
        border-bottom: 2px solid #c6c6c6;
        color: #A8A8A8;
        transition: .4s;
        &:focus {
          border: none;
          border-bottom: 2px solid #000000;
          color: #000;
          outline: none;
          transition: .4s;
        }
      }

      &__icon {
        font-size: 20px;
        position: absolute;
        top: 45%;
        left: 13px;
      }

      &__exit {
        font-size: 20px;
        position: absolute;
        top: 45%;
        right: 29px;
        cursor: pointer;
        transition: .3s;
        &:hover {
          color: #FF6347;
          transition: .3s;
        }
      }
    }

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Tahoma', serif;
      font-size: 50px;
      margin-bottom: 60px;

      &__title {
        font-size: 50px;
        font-family: Avenir, Helvetica, Arial, sans-serif;

        &-red {
          color: 	#FF6347;
          padding-left: 20px;
        }
      }
    }

    &-main {
      display: flex;
    }
  }

  .filter {
    height: 500px;
    background-color: #000;
  }
</style>
