<template>
  <div>
      <h1>This is posting page</h1>
    <div class="text-center">
      <v-chip
        v-if="chip"
        class="ma-2"
        color="green"
        @click="chip = false"
      >
        Success
      </v-chip>

    </div>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="title"
                        label="title"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-btn
            class="mr-4"
            @click="postListCards"
            >
            submit
            </v-btn>
        </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue'

export default Vue.extend({
  name: 'PostListView',

  components: {
  },
  
  methods: {
    postListCards() {
        axios
        .post("http://localhost:8000/tasks", {
        title: this.title,
        })
        .then(() => {
          this.chip = true;
          this.title = "";
        })
        .catch((err) => {
        console.log(err);
        });
    },
  },

  data() {
    return {
        title: "",
        id: "",
        chip: false,
    }
  },

  created() {
    // 
  },
});
</script>
