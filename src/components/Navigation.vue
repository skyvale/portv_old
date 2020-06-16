<template>
    <div class='nav'>
        <nav>
            <ul>
                <li><router-link to="/characters">Characters</router-link></li>
                <li><router-link to="/notes">Notes</router-link></li>
                <li><router-link to="/gallery">Gallery</router-link></li>
            </ul>
        </nav>
    </div>
</template>


<script>
export default {
    name: 'Navigation'
}
</script>


<style scoped>
    li {
        float: right;
        display: inline-block;
        padding: 1rem 1.5rem;
    }
    li:hover {
        cursor: pointer;
        background-color: teal;
    }
</style>