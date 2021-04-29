<template>
  <router-link :to="'/product/' + productInfo.id"  class="sliderItem col-md-10" tag="div">
    <img :src="productInfo.image" alt="product image" class="sliderItem__image">
    <div class="sliderItem-price">
      <p v-if="productInfo.discountPrice" class="sliderItem-price__price">{{productInfo.discountPrice}}₽</p>
      <p :class="{'sliderItem-price__sale': productInfo.discountPrice}">{{productInfo.price}}₽</p>
    </div>
    <p class="sliderItem__model">{{productInfo.brand}} / <span class="sliderItem__model_model">{{ productInfo.model }}</span></p>
  </router-link>
</template>

<script>
  export default {
    name: 'SliderItem',
    props: {
      productInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  .sliderItem {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 25px;
    transition: .3s;
    margin-right: 20px;
    &__image {
      width: 100%;
    }
    &__model {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-size: 20px;
      font-weight: bold;
      margin-top: 10px;
      text-align: left;
      &_model {
        font-weight: normal;
      }
    }
    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      border-radius: 5px;
    }
    &-price {
      display: flex;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-weight: bold;
      font-size: 25px;
      &__price {
        margin-right: 15px;
      }
      &__sale {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 20px;
        text-decoration: line-through;
        color: red;
      }
    }

    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      border-radius: 7px;
      transition: .3s;
      cursor: pointer;
    }
  }
</style>
