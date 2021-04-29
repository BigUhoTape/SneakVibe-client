<template>
    <div>
        <Navbar />
        <div class="defaultLayout">
          <router-view />
        </div>
    </div>
</template>

<script>
  import Navbar from "./Navbar";

  export default {
    name: "DefaultLayout",
    components: {Navbar},
  }
</script>

<style lang="less" scoped>
  .defaultLayout {
    padding-top: 110px;
  }
</style>
