import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLoaders from 'vue-loaders';
import 'vue-loaders/dist/vue-loaders.css';
import { Swiper as SwiperClass, Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/swiper.esm';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
SwiperClass.use([Pagination, Mousewheel, Navigation, Autoplay]);
Vue.use(getAwesomeSwiper(SwiperClass));
const {Swiper, SwiperSlide} = getAwesomeSwiper(SwiperClass);

// import style
import 'swiper/swiper-bundle.min.css'

Vue.config.productionTip = false;

Vue.use(VueLoaders);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
