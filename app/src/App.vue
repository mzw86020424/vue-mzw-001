<template>
  <v-app>
    <v-main>
      <v-col class="mb-5" cols="12">
        <title-logo></title-logo>
        <v-row justify="center">
          <v-breadcrumbs divider="/">
            <router-link to="/">home</router-link>
          </v-breadcrumbs>
          <v-breadcrumbs divider="/">
            <router-link to="/post">post</router-link>
          </v-breadcrumbs>
          <v-breadcrumbs divider="/">
            <router-link to="/about">about</router-link>
          </v-breadcrumbs>
        </v-row>
      </v-col>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TitleLogo from './components/TitleLogo.vue'


export default Vue.extend({
  name: 'App',
  components: {
    TitleLogo
  },
});
</script>
