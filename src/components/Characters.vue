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

            localStorage.clear();

            // pull out object of categories from local storage
            let data = JSON.parse(localStorage.getItem('pokemon'));
            console.log("data: ", data);

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

            } else if (data === null){

                // create three default pokemon to populate page
                const defaultMonUrls = [
                    'https://pokeapi.co/api/v2/pokemon/1',
                    'https://pokeapi.co/api/v2/pokemon/4',
                    'https://pokeapi.co/api/v2/pokemon/7'
                ];

                // using the fetched data, generate pokemon

                    // load in default pokemon from api
                    Promise.all(defaultMonUrls.map( url =>
                        fetch(url)
                            .then( (data) => data.json())               
                    ))
                    .then( (pokemon) => generateDefault(pokemon) ) 

                    // generate default pokemon on the page
                    const pokemonHtml = document.querySelector(".pokemon");
                    const generateDefault = (data) => {

                        let htmlTemplate = ``;
                        for (let i = 0; i < 3; i++){
                            htmlTemplate = `
                                <img src="${data[i].sprites.front_default}" alt="${data[i].name}" class="single-mon">
                                <p>Testing...</p>
                            `
                            console.log("html: ", htmlTemplate);
                            pokemonHtml.insertAdjacentHTML = ('beforeend', htmlTemplate);

                            // set local storage
                            localStorage.setItem('pokemon', JSON.stringify(data));
                        }
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

    .pokemon {
        display: flex;
        flex-direction: row;
    }

    .single-mon {
        display: inline-block;
        width: 150px;
        height: 150px;
        padding: 1rem;
        border: 1px solid grey;
        border-radius: 50%;
    }

    p {
        color: red;
        font-size: 2.4rem;
    }

</style>