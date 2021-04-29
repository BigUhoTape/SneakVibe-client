import _ from 'lodash';

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 15,
      pageCount: 0,
      allItems: [],
      itemsOnPage: []
    }
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.itemsOnPage = this.allItems[this.page - 1] || this.allItems[0];
    },
    changePagePagination(page) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.itemsOnPage = this.allItems[page - 1] || this.allItems[0];
    }
  }
}