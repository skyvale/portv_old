<template>
    <div class="header">
        <a href="/"><img src="https://pngimg.com/uploads/pokeball/pokeball_PNG8.png" alt="Nuzlocke Planner Logo"></a>
        <Navigation />
        <button>logout</button>
    </div>
</template>


<script>
import Navigation from './Navigation';

export default {
    name: 'Header',
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
    }

    button {
        position: absolute;
        top: 0;
        right: 0;
        padding: 1rem;
        border: none;
        background-color: transparent;
    }
    button:hover {
        cursor: pointer;
        background-color: teal;
    }
</style>