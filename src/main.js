import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Characters from './components/Characters';
import Notes from './components/Notes';

// import stuff from FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// FontAwesome
library.add(faPlusCircle); // add icon
library.add(faTimesCircle); // exit icon
library.add(faTrash); // trash icon
Vue.component('font-awesome-icon', FontAwesomeIcon); //FontAwesomeIcon is Vue component

Vue.config.productionTip = false

// import css reset
import "@/assets/reset.css";

// set up vue router
Vue.use(VueRouter);

// define route components
const characters = Characters;
const notes = Notes;

// create the routes using components
const routes = [
  { path: '/characters', component: characters},
  { path: '/notes', component: notes}
];

const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
