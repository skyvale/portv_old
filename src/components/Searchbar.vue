<template>
    <div class="wrapper"> 
        <input type="text" class="search-input">
        <button class="search-btn">&#128269;</button>
    </div>
</template>


<script>
export default {
    name: 'Searchbar'
}
</script>


<style scoped>

    .wrapper {
        display: inline-flex;
        font-size: 1.6rem;
    }   

    .search-input {
        font-size: inherit;
        color: #8B1717;
        background-color: #FFE5E5;
        border: 2px solid #FA5959;
        border-radius: 20px 0 0 20px;
        padding: 0.2rem 0.5rem;
        outline: none;
    }

    .search-btn {
        font-size: inherit;
        border: 2px solid #FA5959;
        background-color: #FA5959;
        padding-right: 10px; 
        border-radius: 0 20px 20px 0;
        border-left: 0;
        outline: none;
    }
    .search-btn:hover {
        cursor: pointer;
        background-color: #8B1717;
        border-color: #8B1717;
    }

</style>