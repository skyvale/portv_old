<template>
    <div class='nav'>
        <nav>
            <ul>
                <li><router-link class="link" to="/characters">Characters</router-link></li>
                <li><router-link class="link" to="/notes">Notes</router-link></li>
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
        color: #FA5959;
        font-size: 2rem;
        display: inline-block;
        text-align: center;
        outline: none;
    }
    
    .link:first-of-type {
        margin-right: 20px;
    }
    .link {
        padding: 1rem;
        color: #FA5959;
        text-decoration: none;
    }
    .link:hover {
        cursor: pointer;
        color: #fff;
        background-color: #FA5959;
    }

</style>