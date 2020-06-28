<template>
	<div class="characters-page">

		<h1>Characters</h1>
		<Searchbar class="searchbar" />
		
		<div>

			<div class="add-pokemon">
				<font-awesome-icon icon="plus-circle" id="add-icon" @click="openForm" />
				<p id="add-words" @click="openForm">Add members to your team!</p>
			</div>

			<div>
				<ul class="pokemon">
					<!-- Loops through pokemon in localStorage to display on page-->
					<li v-for="(pokemon, index) in pokemonData" :key="index">
						<img class="single-mon" :id="index" :src="pokemon.imgUrl" :alt="pokemon.species" @click="openDetails" >
					</li>
				</ul>
			</div>

		</div>

		<div class="modal">
			<form class="add-pokemon-form" v-show="formIsClosed" @submit.prevent="formSubmission">
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

		<div class="modal">
			<form class="pokemon-detail-form"  v-show="detailFormIsClosed">
				<div class="detail-form-header">
					<h2>Pokemon Details</h2>
					<font-awesome-icon icon="times-circle" id="close-detail-form-btn" @click="closeDetailForm"/>
					<font-awesome-icon icon="trash" id="delete-pokemon-btn" @click="deletePokemon" />
				</div>
				<h3>{{ savedNickname }}</h3>
				<p>{{ savedSpecies }}</p>
				<div class="types">
					<p id="type1">{{ savedType1 }}</p>
					<p id="type2">{{ savedType2 }}</p>
				</div>
				<p>{{ savedAbility }}</p>
				<p>{{ savedNature }}</p>
				<p>{{ savedTrait }}</p>
				<div>
					<h3>Moveset:</h3>
					<ul class="moveset">
						<div class="column">
							<li>
								<label for="move1">Move 1</label>
								<input id="move1" type="text" v-model="move1">
							</li>
							<li>
								<label for="move3">Move 3</label>
								<input id="move3" type="text" v-model="move2">
							</li>													
						</div>
						<div class="column">
							<li>
								<label for="move2">Move 2</label>
								<input id="move2" type="text" v-model="move3">
							</li>
							<li>
								<label for="move4">Move 4</label>
								<input id="move4" type="text" v-model="move4">
							</li> 						
						</div>                                               
					</ul>
				</div>			
			</form>
		</div>

	</div>
</template>


<script>
import Searchbar from './Searchbar';

export default {
	name: 'Characters',
	components: {
		Searchbar
	},
	data: () => {
		return {
			pokemonData: [],
			lastClicked: '',
			formIsClosed: false,
			formNickname: '',
			formSpecies: '',
			formNature: '',
			formTrait: '',

			// the following is for the detail form
			detailFormIsClosed: false,
			savedNickname: '',
			savedSpecies: '',
			savedType1: '',
			savedType2: '',
			savedAbility: '',
			savedNature: '',
			savedTrait: '',
			move1: '',
			move2: '',
			move3: '',
			move4: ''

		}
	},
	mounted() {

		// checks if there are any pokemon in localStorage
		if (localStorage.getItem('pokemon') != null) {
			this.pokemonData = JSON.parse(localStorage.pokemon);
		}

	},
	methods: {

		// when run, this function will open the form to add a pokemon by setting its display to block
		openForm() {

			// form is closed is set to false
			this.formIsClosed = false;

			// gets form html from document
			const addingForm = document.querySelector(".add-pokemon-form");

			// sets the display so the form is visible
			if (addingForm.style.display == 'none') {
				addingForm.style.display = 'block';
			}

		},

		// when run, this function will open the DETAILS form by setting its display to block
		openDetailForm() {

			// detail form is closed is set to false
			this.detailFormIsClosed = false;

			// gets form html from document
			const detailForm = document.querySelector(".pokemon-detail-form");

			// sets the display so the form is visible
			if (detailForm.style.display == 'none') {
				detailForm.style.display = 'block';
			}

		},

		// this function closes the adding pokemon form by setting its display to none
		// form is closed is set to true
		closeForm() {

			this.formIsClosed = true;

			const form = document.querySelector("form");

			if (form.style.display == 'block') {
				form.style.display = 'none';
			}

			this.formIsClosed = !this.formIsClosed // tbh not sure what this line means, but it works *shrug*
		},

		// this function closes the DETAILS form by setting its display to none
		closeDetailForm() {

			this.detailFormIsClosed = true;

			const detailForm = document.querySelector(".pokemon-detail-form");

			if (detailForm.style.display == 'block') {
				detailForm.style.display = 'none';
			}

			this.detailFormIsClosed = !this.detailFormIsClosed;
		},

		// this function is called when the user submits a new pokemon using the adding pokemon form
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

						// appends the new pokemon to the array of current pokemon
						storedMons.push(newPokemon);

						// shove all the pokemon back in local storage
						localStorage.setItem('pokemon', JSON.stringify(storedMons));					
					
					}

					// clear the inputs
					document.querySelector('form').reset();

					// close the form
					this.closeForm();

					// reloads window to update display
					window.location.reload();


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

					// if localStorage is empty, you cant .push to null, so...
					if (localStorage.getItem('pokemon') === null) {
					
						// put the new pokemon into an empty array
						let pokemonArray = [newPokemon];
						console.log('pokearray if empty: ', pokemonArray);

						// shove the pokemon back in local storage
						localStorage.setItem('pokemon', JSON.stringify(pokemonArray));						

					} else { // if localStorage not empty

						// pulls current pokemon from storage
						let storedMons = JSON.parse(localStorage.getItem('pokemon')) || [];

						// appends the new pokemon to the array of current pokemon
						storedMons.push(newPokemon);

						// shove all the pokemon back in local storage
						localStorage.setItem('pokemon', JSON.stringify(storedMons));					
					
					}

					// clear the inputs
					document.querySelector('form').reset();

					// close the form
					this.closeForm();
					
					// reloads window to update display
					window.location.reload();

				}

			}

		},

		// this will open the details form when a pokemon is clicked
		openDetails(e) {

			// open form
			this.openDetailForm();

			// get pokemon data from storage
			let storedPokemon = JSON.parse(localStorage.getItem('pokemon'));

			// using the specified pokemon, get and bind the correct data
			this.savedNickname = storedPokemon[e.target.id].nickname;
			this.savedSpecies = storedPokemon[e.target.id].species;
			this.savedAbility = storedPokemon[e.target.id].ability;
			this.savedNature = storedPokemon[e.target.id].nature;
			this.savedTrait = storedPokemon[e.target.id].trait;
			this.savedType1 = storedPokemon[e.target.id].type;

			// not all have pokemon have a second typing, so this checks if they do or not
			if (storedPokemon[e.target.id].type2 === undefined) {
				this.savedType2 = '---';
			} else {
				this.savedType2 = storedPokemon[e.target.id].type2;
			}

			// stores event data into last clicked
			this.lastClicked = e.target;
			
		},

		// this will delete the pokemon from localStorage and from the display
		deletePokemon() {
			
			// grab pokemon from localStorage
			let storedMons = JSON.parse(localStorage.getItem('pokemon'));

			// delete the lastClicked pokemon from the array
			storedMons.splice(this.lastClicked.id,1);

			// put the edited pokemon back into storage
			localStorage.setItem('pokemon', JSON.stringify(storedMons));

			// reloads window to update display
			window.location.reload();			

		}
	}
}
</script>


<style scoped>

	.characters-page {
		width: 1600px;
		margin: 0 auto;
	}

	/* Hide the h1, but not from screenreaders */
	h1 {
		font-size: 0;
		color: transparent;
	}

	/* Searchbar */
	.searchbar {
		display: flex;
		justify-content: center;
		margin: 1rem auto;
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
		margin: 2rem;
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
		margin: 1rem auto;
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

	/* ================================================= */
	/* FORMS*/

	/* Applies to both forms */
	.modal {
		position: fixed;
		z-index: 1000;
		top: 50%;
		left: 50%;
	}

	/* ------------------------------------------ */
	/* ADD POKEMON FORM */

	.add-pokemon-form {
		display: none;
		transform: translate(-50%, -50%); /* centers on page */
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

	.add-pokemon-form p {
		text-align: left;
		font-size: 1.4rem;
		display: block;
		padding: 1rem;
		margin-left: 1rem;
		margin-bottom: 0.5rem;
	}

	.add-pokemon-form input{
		display: block;
		color: #8B1717;
		background-color: #FFE5E5;
		border: none;
		margin-top: 10px;
		height: 35px;
		width: 500px;
	}

	/* submit button */
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

	/* exit button */
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

	/* ------------------------------------------ */
	/* POKEMON DETAIL FORM */

	.pokemon-detail-form {
		display: none;
		transform: translate(-50%, -50%);
		text-align: center;
		margin: 0 auto;
		width: 600px;
		border: 3px solid #FA5959;
		background-color: #fff;
		border-radius: 5px;
	}

	.detail-form-header {
		text-align: center;
		margin: 0 auto;
		height: 100px;
		width: 600px;
		border-top-left-radius: 1px;
		border-top-right-radius: 1px;
		background-color: #FA5959;
	}

	.pokemon-detail-form h2 {
		color: #fff;
		font-size: 2rem;
		padding-top: 2rem;
	}

	.pokemon-detail-form h3 {
		font-size: 1.8rem;
		margin-top: 2rem;
		color: #FA5959;
	}

	.pokemon-detail-form .types {
		display: flex;
		justify-content: center;
		color: #8B1717;

	}

	.pokemon-detail-form p {
		font-size: 1.2rem;
		margin: 1rem;
	}

	/* exit button */
	#close-detail-form-btn {
		display: block;
		position: absolute;
		right: 15px;
		top: 15px;
		color: #fff;
		height: 30px;
		width: 30px;
	}
	#close-detail-form-btn:hover {
		cursor: pointer;
		color: #8B1717;
	}

	/* delete pokemon trash can button */
	#delete-pokemon-btn {
		color: #fff;
		position: absolute;
		left: 15px;
		top: 15px;
		height: 30px;
		width: 30px;
	}
	#delete-pokemon-btn:hover {
		cursor: pointer;
		color: #8B1717;
	}

	/* ----------------------- */
	/* Moveset */

	/* Hide labels, but not from screenreaders */
	.pokemon-detail-form label {
		font-size: 0;
		color: transparent;
	}

	.pokemon-detail-form h3:nth-of-type(1) {
		font-size: 1.4rem;
		color: #FA5959;
	}
	.pokemon-detail-form .moveset {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: space-around;
		width: 600px;
	}
	.pokemon-detail-form .column {
		display: flex;
		margin: 1rem;
		align-content: space-around;
		flex-direction: column;
	}
	.pokemon-detail-form input {
		margin: 0.5rem;
		padding: 0.5rem;
		border-color: #FA5959;
		border-radius: 5px;
		outline: 0 none;
	}

</style>