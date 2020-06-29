<template>
  <div id="home">
    <CardLayout :feeds="feeds"/>
    <Pagination :numberOfPages="numberOfPages"/>
  </div>
</template>

<script>
import CardLayout from './CardLayout.vue'
import Pagination from './Pagination.vue'
import service from '@/service';


export default {
  components: {
    CardLayout,
    Pagination
  },
  data() {
    return {
      feeds: [],
      numberOfPages: 1
    }
  },
  computed: {
    page() {
      return this.$route.query.page || 1
    }
  },
  mounted() {
    this.fetch(this.page)
  },
  methods: {
    fetch(currentPage) {
      service.fetchDocs(currentPage)
      .then(result => {
        this.feeds = result.docs
        this.numberOfPages = result.totalPages
      })
      .catch(error => {
        alert(error.response.data)
      })
    }
  },
  watch: {
    page: function (currentPage) {
      this.fetch(currentPage)
    }
  }
}
</script>