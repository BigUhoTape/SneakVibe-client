<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'App',
    methods: {
      ...mapActions(['SET_ACCESS_TOKEN_ACTION', 'FETCH_USER_DATA'])
    },
    async created() {
      if (localStorage.getItem('ACCESS_TOKEN')) {
        await this.SET_ACCESS_TOKEN_ACTION(localStorage.getItem('ACCESS_TOKEN'));
        this.FETCH_USER_DATA();
      }
    }
  }
</script>

<style lang="less">
  @font-face {
    font-family: 'Bowlby';
    src: data-uri("assets/fonts/Bowlby.ttf");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Tahoma';
    src: data-uri("assets/fonts/Tahoma.ttf");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'TahomaBold';
    src: data-uri("assets/fonts/TahomaBold.ttf");
    font-weight: normal;
    font-style: normal;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

  @import '~bootstrap/dist/css/bootstrap-grid.min.css';
</style>
