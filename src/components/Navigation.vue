<template>
    <div class='nav'>
        <nav>
            <ul>
                <li><router-link to="/explore">Explore</router-link></li>
                <li><router-link to="/characters">Characters</router-link></li>
                <li><router-link to="/notes">Notes</router-link></li>
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
        font-size: 2rem;
        display: inline-block;
        padding: 1rem;
        text-align: center;
        outline: none;
    }
    
    li:hover {
        cursor: pointer;
        color: #fff;
        background-color: teal;
    }

    li:visited {
        text-decoration: none;
    }

</style>