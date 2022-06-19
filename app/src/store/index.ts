import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
state: {
    items: [
        {
            id: '',
            title: '',
            done: false,
        }
    ],
},
mutations: {
    set_items(state, payload) {
        state.items = payload.items
    },

    remove_item(state, id) {
        state.items = state.items.filter(item => item.id !== id)
    },

    done_item(state, id) {
        state.items.forEach(item => {
            if (item.id == id) {
                item.done = true
            }
        });

    }

},
actions: {
    async fetch_items(context) {
        const items = await axios
        .get('http://localhost:8000/tasks')
        .then(
            (res) => res.data,
            () => ''
        ); 
        const payload = {
            items: items,
        };
        context.commit('set_items', payload);
    },

    async delete_item(context, id) {
        await axios
        .delete('http://localhost:8000/tasks/' + id)
        .then(
            (res) => res.data,
            () => ''
        ); 
        context.commit('remove_item', id);
    },

    async done_item(context, id) {
        await axios
        .put(`http://localhost:8000/tasks/${id}/done`)
        .then(
            (res) => res.data,
            () => ''
        ); 
    },

    async undone_item(context, id) {
        await axios
        .delete(`http://localhost:8000/tasks/${id}/done`)
        .then(
            (res) => res.data,
            () => ''
        ); 
    },

    async put_title(context, {id, title}){
        await axios
        .put(`http://localhost:8000/tasks/${id}`, {title: title})
        .then(
            (res) => res.data,
            () => ''
        );
    }
},
getters: {
    items(state) {
        return state.items;
    }
},
modules: {},
})
