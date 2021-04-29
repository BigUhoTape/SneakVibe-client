import httpClient from "../services/http.service";

const mapProductsToCatalogItem = (products) => {
  return products.map(({id, brand, model, price, discountPrice, productImages}) => {
    return {
      id,
      brand,
      model,
      price,
      discountPrice,
      image: productImages[productImages.length - 1]
    };
  });
};

const shuffle = array =>  {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export default {
  state: {
    products: null
  },
  mutations: {
    SET_PRODUCTS (state, data) {
      state.products = data;
    }
  },
  actions: {
    async FETCH_PRODUCTS ({ commit }) {
      try {
        const { status, data } = await httpClient('product/index');
        if (status === 200) {
          commit('SET_PRODUCTS', data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    PRODUCTS: state => {
      return state.products;
    },
    GENDER_PRODUCTS: state => gender => {
      if (!gender) {
        return mapProductsToCatalogItem(state.products);
      }
      if (gender === 'sale') {
        const saleProducts = state.products.filter((discountPrice) => discountPrice);
        return mapProductsToCatalogItem(saleProducts);
      }
      const genderProducts = state.products.filter(product => product.gender === gender);
      return mapProductsToCatalogItem(genderProducts);
    },
    PRODUCT_BY_ID: state => id => {
      if (!state.products) {
        return null;
      }
      return state.products.find(obj => obj.id == id);
    },
    SIMILAR_COLORS: state => product => {
      const similarProducts = state.products.filter(item => {
        if (item.id !== product.id && item.brand === product.brand && item.model === product.model) {
          return item
        }
      });
      if (similarProducts.length > 3) {
        return similarProducts.slice(2);
      }
      return similarProducts;
    },
    SIMILAR_PRODUCTS: state => product => {
      let similarProducts = state.products.filter(item => {
        if (item.id !== product.id && item.brand === product.brand) {
          return item;
        }
      });
      similarProducts = shuffle(similarProducts);
      if (similarProducts.length > 10) {
        similarProducts = similarProducts.slice(0, 9);
      }
      return mapProductsToCatalogItem(similarProducts);
    },
    SLIDER_SALE_PRODUCTS: state => {
      let saleProducts = state.products.filter(({discountPrice}) => discountPrice);
      saleProducts = saleProducts.slice(-12);
      return mapProductsToCatalogItem(saleProducts);
    },
    SLIDER_NEW_PRODUCTS: state => {
      const newProducts = state.products.slice(-12);
      return mapProductsToCatalogItem(newProducts);
    }
  }
}
