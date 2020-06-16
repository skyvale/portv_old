<template>
  <div id="app">
    <Header />
    <!-- <CurrentTeam /> -->
    <router-view />
  </div>
</template>


<script>
import Header from './components/Header';
//import CurrentTeam from './components/CurrentTeam.vue';

export default {
  name: 'App',
  components: {
    Header,
    //CurrentTeam
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family:'Courier New', Courier, monospace;
    line-height: 1.4;
  }
</style>
