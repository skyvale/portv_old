<template>
  <div class="header">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8aQJqx1hPeGg9Ez23WMKkTGhEb4BnkvKL6w&usqp=CAU" alt="cute notepad">
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
        background-color: #add;
    }

    img {
        height: 75px;
        width: 75px;
        margin: 1rem;
        border-radius: 50%;
    }

    .nav {
        text-align: center;
    }
    
</style>