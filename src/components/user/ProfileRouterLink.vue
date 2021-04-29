<template>
  <div class="profileRouterLink">
    <router-link
      :to="{name: 'Profile'}"
      tag="div"
      class="profileLink"
    >
      <input
        type="radio"
        id="profile"
        v-model="value"
        value="Profile"
        class="profileLink__input"
      >
      <label for="profile" class="profileLink__label">Profile</label>
    </router-link>
    <router-link
      :to="{name: 'Address'}"
      tag="div"
      class="profileLink"
    >
      <input
        type="radio"
        id="address"
        v-model="value"
        value="Address"
        class="profileLink__input"
      >
      <label for="profile" class="profileLink__label">Address</label>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "ProfileRouterLink",
    data () {
      return {
        value: null
      }
    },
    mounted() {
      this.value = this.$router.history.current.name;
    }
  }
</script>

<style lang="less" scoped>
  .profileRouterLink {
    display: flex;
    justify-content: center;
  }
  .profileLink {

    &__input {
      display: none;
    }

    &__label {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 40px;
      background-color: #e4e4e4;
      cursor: pointer;
      transition: .4s;
      font-size: 20px;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      letter-spacing: 1.2px;
      color: #434343;
    }

    &__input:checked + &__label {
      background-color: #343434;
      color: #e4e4e4;
    }
  }
</style>
