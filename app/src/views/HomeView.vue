<template>
  <div class="text-center">
    <v-btn
      class="mx-2"
      fab
      dark
      color="indigo"
      @click="createCard('')"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
    <ul>
        <list-card v-for="item in items.slice().reverse()" :key="item.id" :item="item" @parentMethod="getListCards" />
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ListCard from '../components/ListCard.vue';
import axios from 'axios';

export default Vue.extend({
  name: 'HomeView',

  components: {
    ListCard,
  },

  data() {
    return {
      items: []
    }
  },

  methods: {
    async getListCards() {
      await this.$store.dispatch('fetch_items');
      this.items = this.$store.getters.items;
    },

    async createCard(title: string) {
      // await this.$store.dispatch('post_item', "");
      await axios
      .post("http://localhost:8000/tasks", {
      title: title,
      })
      .then(
          (res) => res.data,
          () => ''
      );
      this.getListCards();
    }
  },

  async created() {
    await this.getListCards();
    this.items = this.$store.getters.items;
  },

});
</script>
