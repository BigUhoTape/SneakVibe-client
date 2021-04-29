<template>
  <swiper class="swiper" ref="swiper" :options="swiperOption">
    <swiper-slide v-for="product in products"
                  :key="product._id">
      <SliderItem :productInfo="product"/>
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
  import SliderItem from "./SliderItem";
  import 'swiper/swiper-bundle.css';

  export default {
    name: 'swiper-example-change-direction',
    title: 'Change direction',
    components: {
      Swiper,
      SwiperSlide,
      SliderItem
    },
    props: {
      products: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 30,
          direction: 'horizontal',
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            resize: () => {
              this.$refs.swiper.$swiper.changeDirection(
                window.innerWidth <= 960
                  ? 'vertical'
                  : 'horizontal'
              )
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .swiper {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
  }
  .swiper-button-next {
    right: -3px;
  }
</style>
