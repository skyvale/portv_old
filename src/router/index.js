import Vue from 'vue';
import VueRouter from 'vue-router';
import Characters from '../Pages/Characters.vue';
import Notes from '../Pages/Notes.vue';
import Gallery from '../Pages/Gallery.vue';

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Characters',
            component: Characters
        },
        {
            path: '/notes',
            name: 'Notes',
            component: Notes
        },
        {
            path: '/gallery',
            name: 'Gallery',
            component: Gallery
        }
    ]
});