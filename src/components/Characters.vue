<template>
    <div class="characters-page">
        <h1>Characters</h1>
        <div class="pokemon">
            <div class="add-pokemon">
                <font-awesome-icon icon="plus-circle" class="add-icon" />
                <p class="add-words">Add members to your team!</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="bulbasaur" class="single-mon" width="150px" height="150px">
            </div>
        </div>
        <div>
            <form action="#">
                <div class="form-header">
                    <h2 id="form-title">Add a Pokemon</h2>
                    <font-awesome-icon icon="plus-circle" class="add-icon" />
                </div>
                <p>
                    <label for="nickname">Nickname</label>
                    <input type="text" id="nickname" name="nickname">
                </p>
                <p>
                    <label for="species">Species</label>
                    <input type="text" id="species" name="species" placeholder="ex. pikachu">
                </p>
                <p>
                    <label for="nature">Nature</label>
                    <input type="text" id="nature" name="nature" placeholder="ex. rash">
                </p>
                <p>
                    <label for="trait">Trait</label>
                    <input type="text" id="trait" name="trait" placeholder="ex. likes to fight">
                </p>
                <button id="submit-btn" type="submit">Submit</button>                               
            </form>
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

            } else if (data === null) {

                console.log("Within null.");

                /*
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

                    // select the <div> where the pokemon will be inserted
                    const pokemonHtml = document.querySelector(".pokemon");

                    // generate default pokemon on the page
                    const generateDefault = (data) => {

                        let htmlTemplate = ``;
                        for (let i = 0; i < 3; i++){
                            htmlTemplate = `
                                <img src="${data[i].sprites.front_default}" alt="${data[i].name}" class="single-mon" width="150px" height="150px">
                                <p>Testing...</p>
                            `
                            console.log("html: ", htmlTemplate);
                            pokemonHtml.insertAdjacentHTML = ('beforeend', htmlTemplate);

                            // set local storage
                            localStorage.setItem('pokemon', JSON.stringify(data));
                        }
                    }
                */              
            }
        }
    },
    mounted() {
        this.createMon();
    }
}
</script>


<style scoped> 

    .characters-page {
        width: 1600px;
        margin: 0 auto;
    }

    h1 {
        color: transparent;
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

    /* Add members to your team button*/
    .add-pokemon {
        width: 1600px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        padding: 1rem;
    }
    .add-words {
        padding-left: 10px;
        display: inline-block;
        color: #FA5959;
        font-size: 1.8rem;
    }
    .add-words:hover {
        cursor: pointer;
    }
    .add-icon {
        display: inline-block;
        color: #FA5959;
        height: 30px;
        width: 30px;
    }
    .add-icon:hover {
        cursor: pointer;
    }

    /* FORM */

    form {
        text-align: center;
        margin: 0 auto;
        width: 600px;
        border: 3px solid #FA5959;
        border-radius: 5px;
    }

    #form-title {
        font-size: 1.8rem;
        color: #fff;
        padding-top: 2rem;
    }

    .form-header {
        text-align: center;
        margin: 0 auto;
        height: 100px;
        width: 600px;
        border-top-left-radius: 1px;
        border-top-right-radius: 1px;
        background-color: #FA5959;
    }

    form p {
        text-align: left;
        font-size: 1.4rem;
        display: block;
        padding: 1rem;
        margin-bottom: 0.5rem;
    }

    form input {
        display: block;
        color: #8B1717;
        background-color: #FFE5E5;
        border: none;
        margin-top: 10px;
        height: 35px;
        width: 500px;
    }

    #submit-btn {
        font-family: 'Prompt', sans-serif;
        font-size: 1.6rem;
        color: #fff;
        background-color: #FA5959;
        margin: 2rem 0 1rem 0;
        width: 200px;
        height: 50px;
        text-align: center;
        border: none;
        border-radius: 5px;
    }
    #submit-btn:hover {
        cursor: pointer;
        background-color: #8B1717;
    }

</style>