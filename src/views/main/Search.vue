<template>
  <div class="search container">
    <CatalogMainWrapper title="Search" :isSearch="true"/>
  </div>
</template>

<script>
  import CatalogMainWrapper from "../../layouts/CatalogMainWrapper";

  export default {
    name: "Search",
    components: {
      CatalogMainWrapper
    }
  }
</script>

<style scoped>

</style>
