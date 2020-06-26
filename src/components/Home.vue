<template>
  <div class="header">
    <img class="logo" src="../assets/logo.png" alt="pokememo logo">
    <Navigation class="nav" />
  </div>
</template>


<script>
import Navigation from './Navigation';

export default {
    name: "home",
    components: {
        Navigation
    }
}
</script>

<style scoped>

    .header {
        display: block;
        height: 175px;
        border-bottom: 3px solid #FA5959;
    }

    .logo {
        height: 75px;
        width: 75px;
        margin: 1rem;
        border-radius: 50%;
    }

    .nav {
        text-align: center;
    }
    
</style>