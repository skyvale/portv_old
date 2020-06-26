import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Explore from './components/Explore';
import Characters from './components/Characters';
import Notes from './components/Notes';

Vue.config.productionTip = false

// import css reset
import "@/assets/reset.css";

// set up vue router
Vue.use(VueRouter);

// define route components
const explore = Explore;
const characters = Characters;
const notes = Notes;

// create the routes using components
const routes = [
  { path: '/explore', component: explore},
  { path: '/characters', component: characters},
  { path: '/notes', component: notes}
];

const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
