<template>
<div>
    <v-card class="mx-auto my-12" elevation="2" max-width="374">
        <v-card-title v-if="!isEditable" @click="openEditor()">{{  item.id }} : {{ item.title }}</v-card-title>
        <v-form v-if="isEditable">
            <v-card-title>
                <v-text-field
                    autofocus="true"
                    v-model="title"
                    label="title"
                    required
                    :append-icon="'mdi-send'"
                    @click:append="putTitle(item.id, title)"
                    v-on:keydown.enter="putTitle(item.id, title)"
                ></v-text-field>
            </v-card-title>
        </v-form>
        <v-img
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>
        <v-card-text>lorem ipsum hoge fuga foo bar</v-card-text>
        <v-row justify="center">
            <v-col>
                <v-btn color="error" @click="doneItem(item.id)" v-if="!item.done">未完了</v-btn>
                <v-btn color="primary" @click="undoneItem(item.id)" v-if="item.done">完了</v-btn>
            </v-col>
            <v-col>
                <v-btn
                @click="deleteListCard(item.id)"
                >delete</v-btn>
            </v-col>
        </v-row>
    </v-card>
</div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '../store/index'

@Component
export default class ListCard extends Vue {
    // data
    isEditable = false;
    title = "";
    // props
    @Prop({ type: Object })
    item = {
            id: '',
            title: '',
            done: false,
    };
    // methods
    openEditor() {
        this.isEditable = true;
    }

    async deleteListCard(id: number) {
        await store.dispatch('undone_item', id); // 
        await store.dispatch('delete_item', id);
        this.$emit('parentMethod');
    }

    async doneItem(id: string) {
        await store.dispatch('done_item', id);
        this.$emit('parentMethod');
    }

    async undoneItem(id: string) {
        await store.dispatch('undone_item', id);
        this.$emit('parentMethod');
    }

    async putTitle(id: string, title: string) {
        await store.dispatch('put_title', {id:id, title:title});
        this.isEditable = false;
        this.$emit('parentMethod');
    }
}
</script>