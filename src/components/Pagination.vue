<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="getPage(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
        :class="{'active': page === pagination.current_page}">
          <a class="page-link" href="#" @click.prevent="getPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next"
          @click.prevent="getPage(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['pagination']),
  },
  methods: {
    getPage(page) {
      this.$emit('getPage', page);
    },
  },
};
</script>


<style scoped>

</style>
