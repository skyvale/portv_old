<template>
	<div class="characters-page">

		<h1>Characters</h1>

		<div>

			<div class="add-pokemon">
				<font-awesome-icon icon="plus-circle" id="add-icon" @click="openForm" />
				<p id="add-words" @click="openForm">Add members to your team!</p>
			</div>

			<div class="pokemon">
				<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="bulbasaur" class="single-mon" width="150px" height="150px">
			</div>

		</div>

		<div class="modal">
			<form v-show="formIsClosed" @submit.prevent="formSubmission">
				<div class="form-header">
					<h2 id="form-title">Add a Pokemon</h2>
					<font-awesome-icon icon="times-circle" id="close-form-btn" @click="closeForm" />
				</div>
				<p>
					<label for="nickname">Nickname</label>
					<input type="text" id="nickname" name="nickname" v-model="formNickname" required>
				</p>
				<p>
					<label for="species">Species</label>
					<input type="text" id="species" name="species" placeholder="ex. pikachu" v-model="formSpecies" required>
				</p>
				<p>
					<label for="nature">Nature</label>
					<input type="text" id="nature" name="nature" placeholder="ex. rash" v-model="formNature">
				</p>
				<p>
					<label for="trait">Trait</label>
					<input type="text" id="trait" name="trait" placeholder="ex. likes to fight" v-model="formTrait">
				</p>
				<button id="submit-btn" type="submit">Submit</button>
			</form>
		</div>

	</div>
</template>


<script>
export default {
	name: 'Characters',
	data: () => {
		return {
			formIsClosed: false,
			formNickname: '',
			formSpecies: '',
			formNature: '',
			formTrait: ''
		}
	},
	methods: {

		// loads pokemon
		loadPokemon() {

			// console.log("within loadPokemon");

			// pull out array of categories from local storage
			// let data = JSON.parse(localStorage.getItem('pokemon'));

			// console.log('data: ', data);
		},

		// when run, this function will open the form by setting its display to block
		openForm() {

			// form is closed is set to false
			this.formIsClosed = false;

			// gets form html from document
			const form = document.querySelector("form");

			// sets the display so the form is visible
			if (form.style.display == 'none') {
				form.style.display = 'block';
			}

		},

		// this function closes the form by setting its display to none
		// form is closed is set to true
		closeForm() {

			this.formIsClosed = true;

			const form = document.querySelector("form");

			if (form.style.display == 'block') {
				form.style.display = 'none';
			}

			this.formIsClosed = !this.formIsClosed // tbh not sure what this line means, but it works *shrug*
		},

		// this function is called when the user submits a new pokemon using the form
		formSubmission() {

			// check if data is all correct
			/*
			console.log({
				Nickname: this.formNickname,
				Species: this.formSpecies,
				Nature: this.formNature,
				Trait: this.formTrait
			});
			*/

			// make sure the user input is lowercase
			const newNickname = this.formNickname;
			const newSpecies = this.formSpecies;
			const newNature = this.formNature;
			const newTrait = this.formTrait;

			// create apiUrl based on the specified pokemon species
			const apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + `${this.formSpecies}`;

			// fetch the pokemon data from the api
			fetch(apiUrl)
				.then( (data) => data.json())
				.then( (pokemon) => createNewPokemon(pokemon) )
				.catch( (error) => {
					// API call failed, user likely didn't type in a valid pokemon species
					console.log(error);
					alert("Please type a valid pokemon species!");

				})

			// using the fetched data, generate pokemon
			const createNewPokemon = (data) => {

				console.log("New Pokemon: ", data);

				let newPokemon = {};

				// some pokemon have more than one type
				if ( data.types.length === 2 ) { // this will run if the pokemon IS duel type

					newPokemon = {
						nickname: newNickname,
						species: newSpecies,
						type: data.types[0].type.name,
						type2: data.types[1].type.name,
						ability: data.abilities[0].ability.name,
						nature: newNature,
						trait: newTrait,
						imgUrl: data.sprites.front_default
					}

					console.log("Created duel type: ", newPokemon);

					// if localStorage is empty, you cant .push to null, so...
					if (localStorage.length === 0) {
					
						// put the new pokemon into an empty array
						let pokemonArray = [newPokemon];
						console.log('pokearray: ', pokemonArray);

						// shove the pokemon back in local storage
						localStorage.setItem('pokemon', JSON.stringify(pokemonArray));						

					} else { // if localStorage not empty

						// pulls current pokemon from storage
						let storedMons = JSON.parse(localStorage.getItem('pokemon')) || [];
						console.log('localStorage: ', storedMons);

						// appends the new pokemon to the array of current pokemon
						storedMons.push(newPokemon);

						// shove all the pokemon back in local storage
						localStorage.setItem('pokemon', JSON.stringify(storedMons));					
					
					}

					// clear the inputs
					document.querySelector('form').reset();

					// close the form
					this.closeForm();

					// reloads the page so it can update to current
					// location.reload();

				} else { // this will run if the pokemon is monotype

					newPokemon = {
						nickname: newNickname,
						species: newSpecies,
						type: data.types[0].type.name,
						ability: data.abilities[0].ability.name,
						nature: newNature,
						trait: newTrait,
						imgUrl: data.sprites.front_default
					}

					console.log("Created mono type: ", newPokemon);


					// if localStorage is empty, you cant .push to null, so...
					if (localStorage.length === 0) {
					
						// put the new pokemon into an empty array
						let pokemonArray = [newPokemon];
						console.log('pokearray: ', pokemonArray);

						// shove the pokemon back in local storage
						localStorage.setItem('pokemon', JSON.stringify(pokemonArray));						

					} else { // if localStorage not empty

						// set an empty array to hold the pokemon
						let pokemonArray = [];

						// pulls current pokemon from storage
						let storedMons = JSON.parse(localStorage.getItem('pokemon')) || [];
						console.log('localStorage: ', storedMons);

						pokemonArray = [storedMons];

						// appends the new pokemon to the array of current pokemon
						pokemonArray.push(newPokemon);
						console.log('pokearray: ', pokemonArray);

						// shove all the pokemon back in local storage
						localStorage.setItem('pokemon', JSON.stringify(pokemonArray));					
					
					}

					// clear the inputs
					document.querySelector('form').reset();

					// close the form
					this.closeForm();

					// reloads the page so it can update to current
					// location.reload();

				}

			}

		}
	},
	mounted() {
		this.loadPokemon();
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
		border: 2px solid #FFE5E5;
		border-radius: 50%;
	}
	.single-mon:hover {
		cursor: pointer;
		background-color: #FFE5E5;
		transform: scale(1.2, 1.2);
	}

	/* Add members to your team button*/
	.add-pokemon {
		width: 1600px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		padding: 1rem;
	}
	#add-words {
		padding-left: 10px;
		display: inline-block;
		color: #FA5959;
		font-size: 1.8rem;
	}
	#add-words:hover {
		cursor: pointer;
	}
	#add-icon {
		display: inline-block;
		color: #FA5959;
		height: 30px;
		width: 30px;
	}
	#add-icon:hover {
		cursor: pointer;
	}

	/* FORM */

	.modal {
		position: fixed;
		z-index: 1000;
		top: 50%;
		left: 50%;
	}

	form {
		display: none;
		transform: translate(-50%, -50%);
		text-align: center;
		margin: 0 auto;
		width: 600px;
		border: 3px solid #FA5959;
		background-color: #fff;
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
		margin-left: 1rem;
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

	#close-form-btn {
		display: block;
		position: absolute;
		right: 15px;
		top: 15px;
		color: #fff;
		height: 30px;
		width: 30px;
	}
	#close-form-btn:hover {
		cursor: pointer;
		color: #8B1717;
	}

</style>