<template>
  <div class="favorite container">
    <div class="loader" v-if="!FAVORITE">
      <vue-loaders-pacman color="black" scale="1"/>
    </div>
    <div
      class="noItems"
      v-else-if="!FAVORITE.length"
    >
      No Favorite Products
    </div>
    <div v-else>
      <div class="favoriteMain">
        <FavoriteItem
          v-for="favorite in FAVORITE"
          :key="favorite.id + 'favorite'"
          :favorite="favorite"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import FavoriteItem from "../../components/default/FavoriteItem";

  export default {
    name: "Favorite",
    components: {
      FavoriteItem
    },
    computed: {
      ...mapGetters(['FAVORITE'])
    },
    methods: {
      ...mapActions(['FETCH_FAVORITES'])
    },
    async created () {
      await this.FETCH_FAVORITES();
    }
  }
</script>

<style lang="less" scoped>
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .favoriteMain {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
  }
  .noItems {
    position: absolute;
    top: 45%;
    left: 35%;
    font-size: 50px;
  }
</style>
