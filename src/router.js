import Vue from 'vue';
import VueRouter from 'vue-router';
import Notes from './components/Notes';
import Characters from './components/Characters';

Vue.use(VueRouter)

export default new VueRouter({
    routes: [       
        {
            path: '/characters',
            name: 'Characters',
            component: Characters
        },
        {
            path: '/notes',
            name: 'Notes',
            component: Notes
        }
    ]
});