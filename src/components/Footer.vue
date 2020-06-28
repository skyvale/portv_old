<template>
    <div class="footer">
        <p>Copyright 2020  © Pokémon and Pokémon character names are trademarks of Nintendo.
</p>
    </div>
</template>


<script>
export default {
    name: 'Footer'
}
</script>


<style scoped>

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
        background-color: #FA5959;
        padding: 2rem;
    }

    p {
        margin-top: 1rem;
        font-size: 1.4rem;
        text-align: center;
        color: #fff;
    }

</style>