<template>
    <div>
        <h1>Characters</h1>
        <p>insert search here</p>
        <div class="pokemon">       
        </div>
    </div>
</template>


<script>
export default {
    name: 'Characters',
    methods: {
        createMon() {

            // pull out object of categories from local storage
            let data = JSON.parse(localStorage.getItem('pokemon'));
            console.log("data: ", data);
            console.log("data l: ", data.length); // !!TODO undefined


            if (data != null) {

                // use the already stored pokemon's id to fetch info from api
                const apiData = {
                    url: 'https://pokeapi.co/api/v2/',
                    type: 'pokemon', 
                    id: `${data.id}`,
                }

                // this line below is called 'deconstruction'
                const {url, type, id} = apiData;

                // construct the api url for fetching data
                const apiUrl = `${url}${type}/${id}`;

                // fetch the pokemon data from the api
                fetch(apiUrl)
                    .then( (data) => data.json())
                    .then( (pokemon) => generateMon(pokemon) )

                
                // using the fetched data, generate pokemon
                const generateMon = (data) => {
                    console.log("generatemon: ", data);

                }

                // for (let i = 0; data.length )

            } else if (data.length > 0){

                // load in default pokemon from api
                fetch('https://pokeapi.co/api/v2/pokemon/1')
                    .then( (data) => data.json())
                    .then( (pokemon) => generateDefault(pokemon) )

                
                // using the fetched data, generate pokemon
                const generateDefault = (data) => {
                    console.log("generatemon: ", data);

                    const htmlTemplate = `
                        <img src="${data.sprites.front_default}" alt="bulbsaur" width="150px" height="150px">
                    `

                    const pokemonHtml = document.querySelector(".pokemon");
                    console.log("html: ", pokemonHtml);
                    pokemonHtml.insertAdjacentHTML = ('beforeend', htmlTemplate);

                    // set local storage
                    localStorage.setItem('pokemon', JSON.stringify(data));
                }
            }
        }
    },
    mounted() {
        this.createMon();
    }
}
</script>


<style scoped>
    h1 {
        font-size: 2.4rem;
    }
</style>