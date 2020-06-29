<template>
	<div>
		<h1>Notes</h1>
		<button @click="createNote" class="create-new-btn">New Note</button>
		<div class="notes">
			<font-awesome-icon v-if="notes.length" icon="trash" class="delete-note-btn" @click="deleteNote" />	
			<nav>
				<!-- this p will render if there are no notes in array -->
				<p v-if="!notes.length">No notes saved.</p>
				<ul v-if="notes.length">
					<li v-for="(note, index) in notes" :key="index"> 
						<!-- if the note in the for loop matches the current note when clicked on, that note will highlight -->
						<button @click="currentNote = note" :class="{active: note === currentNote}" class="note-titles" >{{note.title}}</button>
					</li>
				</ul>
			</nav>
			<!-- Will only render currentNote if there are notes available --> 
			<div v-if="currentNote" class="current-note">
				<!-- two way data binding -->
				<input v-model="currentNote.title" type="text" ref="noteTitle">
				<textarea v-model="currentNote.contents"></textarea>
			</div>
		</div>
	</div>
</template>


<script>
export default {
	name: 'Notes',
	data: () => {
		return {
			notes: [],
			currentNote: null
		}
	},
	// lifecycle hook, happens before page load
	mounted() {

		// check if any notes are already stored in local storage
		if (localStorage.notes) {
			this.notes = JSON.parse(localStorage.notes); // if so, set the notes value
		}

	},
	watch: {
		notes: {
			handler(newNotes) {
				// this method will be called every time the notes data is updated

				// store the changes in local storage
				localStorage.notes = JSON.stringify(newNotes);                
			},
			deep: true // detects nested changes - content of the notes object
		}

	},
	methods: {

		createNote() {

			const newNote = {
				title: 'New Note', 
				contents: 'Write content here...'
				};

			// adds blank note to the array
			this.notes.push(newNote);

			// the currentNote will be set to the new note, activating and displaying it
			this.currentNote = newNote;

			// this will focus in on the new note title - for ux
			// use $nextTick to give vue time to render the new note
			this.$nextTick(() => {
				this.$refs.noteTitle.focus; //$refs is bound to ref= on input field
			});

		},

		// delete the selected note
		deleteNote() {
		
			// determine which note to remove and thanos snap it
			const removalIndex = this.notes.indexOf(this.currentNote);
            this.notes.splice(removalIndex, 1);

			// set the localStorage again
            localStorage.setItem('notes', JSON.stringify(this.notes));

			// refresh display
			window.location.reload();

		}
	}
}
</script>


<style scoped>

	h1 {
		display: inline-block;
		font-size: 2.4rem;
		text-transform: uppercase;
		color: #FA5959;
		margin: 2rem;
	}

	p {
		margin: 2rem;
		font-size: 1.4rem;
	}

	/* New Note button */
	.create-new-btn {
		color: #fff;
		padding: 1rem;
		background-color: #FA5959;
		border-radius: 5px;
	}

	/* New Note button */
	.delete-note-btn {
		position: absolute;
		top: 10px;
		right: 25%;
		color: #FA5959;
		height: 50px;
		width: 50px;
	}
	.delete-note-btn:hover {
		cursor: pointer;
		color: #8B1717;
	}

	button {
		display: inline-block;
		border: none;
		outline: none;
		margin-left: 1rem;
		padding: 1rem 0.5rem;
		font-size: 1.2rem;
		background-color: transparent;
	}
	button:hover {
		cursor: pointer;
		background-color: #8B1717;
	}
	button.active {
		background: #FA5959;
		color: white;
	}


	nav {
		flex: 0 0 calc(33% - 20px);
		margin-right: 20px;
	}  
	nav ul {
		list-style-type: none;
	}


	.notes {
		display: flex;
		position: relative;
		margin-left: 1rem;
	}

	.current-note {
		justify-content: left;
		flex: 1;
	}
	.current-note input, .current-note textarea {
		color: #606c76;
		border: none;
		border-radius: 0;
		padding: 5px;
	}
	.current-note input:hover, .current-note textarea:hover,
	.current-note input:focus, .current-note textarea:focus {
		background: #FFE5E5;
	}
	.current-note input {
		font-size: 3.6rem;
		line-height: 1.25;
		font-weight: 300;
		letter-spacing: -.1rem;
		margin-bottom: 2.0rem;
		margin-top: 0;
		color: #8B1717;
		background-color: #FFE5E5;
	}
	.current-note textarea {
		display: block;
		min-width: 800px;
		max-width: 1400px;
		min-height: 400px;
		font-size: 18px;
		color: #8B1717;
		background-color: #FFE5E5;
	}

</style>