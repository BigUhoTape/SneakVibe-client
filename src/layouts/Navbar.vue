<template>
    <div class="navbar">
      <div class="container">
        <nav class="main-nav">
          <div class="main-nav__content">
            <ul class="left-nav">
              <router-link v-for="item in NavBarLeft"
                           :key="item.link"
                           tag="li"
                           :to="item.link"
                           class="left-nav__link"
                           active-class="active"
              >{{item.title}}</router-link>
            </ul>
            <div class="right-nav">
              <ul v-if="isLoggedIn">
                <router-link v-for="item in NavBarRight"
                             :key="item.link.name"
                             :to="item.link"
                             tag="i"
                             :class="item.class"
                ></router-link>
              </ul>
              <ul class="right-nav_main">
                <router-link v-for="item in NavBarRightDesired"
                             :key="item.link.name"
                             :to="item.link"
                             tag="i"
                             :class="item.class"
                ></router-link>
                <button class="right-nav__exit"
                        v-if="isLoggedIn"
                        @click="userExit"
                >Exit</button>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: "Navbar",
    data: () => ({
      NavBarLeft: [
        { title: 'sneakVibe', link: '/' },
        { title: 'man', link: '/man' },
        { title: 'woman', link: '/woman' },
        { title: 'sale', link: '/sale' }
      ],
      NavBarRight: [
        { class: 'fas fa-star right-nav__icon', link: {name: 'Favorite'}},
        { class: 'fas fa-shopping-basket right-nav__icon', link: {name: 'Cart'}},
      ],
      NavBarRightDesired: [
        { class: 'fas fa-search right-nav__icon', link: {name: 'Search'}},
        { class: 'fas fa-user right-nav__icon', link: {name: 'Profile'}},
      ]
    }),
    computed: {
      ...mapGetters(['isLoggedIn']),
    },
    methods: {
      userExit () {
        this.$store.dispatch('USER_EXIT');
        this.$router.push({name: 'home'})
      }
    },
  }
</script>

<style lang="less" scoped>
  .navbar {
    display: flex;
    background-color: #fff;
    position: fixed;
    width: 100%;
    z-index: 100;
  }
    .active {
        color: #000000 !important;
    }
    .main-nav {

      &__content {
        display: flex;
        justify-content: space-between;
        height: 110px;
      }
    }
    .left-nav {
        display: flex;
        align-items: center;
        list-style: none;
        padding-left: 0px;
    &__link {
       font-family: Avenir, Helvetica, Arial, sans-serif;
       text-decoration: none;
       text-transform: uppercase;
       font-size: 15px;
       color: #A8A8A8;
       margin-right: 46px;
       transition: 0.5s;
       cursor: pointer;
      font-weight: bold;
    &:first-child {
       text-transform: none;
       font-size: 30px;
       font-family: 'Bowlby', serif;
       color: #000;
     }
    &:hover{
       color: #000000;
       transition: 0.5s;
     }
    }
    }
    .right-nav {
      display: flex;
      align-items: center;
    &_main{
       display: flex;
      padding: 0;
     }
    &__exit {
       margin-left: 50px;
       border: none;
       padding: 0;
       color: red;
       font-size: 15px;
       background-color: rgba(#fff, .99);
      font-weight: bold;
       font-family: Avenir, Helvetica, Arial, sans-serif;
     }
    &__icon {
       color: #A8A8A8;
       font-size: 17px;
       margin-left: 50px;
       transition: .4s;
    &:hover {
       color: #000000;
       transition: .4s;
     }
    }
    }
</style>
