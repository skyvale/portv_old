<template>
  <div id="app">
    <Home />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Home from './components/Home';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    Home,
    Footer
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');

#app {
  font-family: 'Prompt', sans-serif;
}
</style>
