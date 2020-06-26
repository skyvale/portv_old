<template>
    <div>
        <h1>Notes</h1>
        <font-awesome-icon icon="coffee" />
        <button @click="createNote" class="create-new-btn">New Note</button>
        <div class="notes">
            <nav>
                <!-- this p will render if there are no notes in array -->
                <p v-if="!notes.length">No notes saved.</p>
                <ul v-if="notes.length">
                    <li v-for="note in notes" :key="note.index"> 
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
    methods: {

        createNote() {

            const newNote = {title: 'New Note', contents: 'Write content here...'};

            // adds blank note to the array
            this.notes.push(newNote);

            // the currentNote will be set to the new note, activating and displaying it
            this.currentNote = newNote;

            // this will focus in on the new note title - for ux
            // use $nextTick to give vue time to render the new note
            this.$nextTick(() => {
                this.$refs.noteTitle.focus; //$refs is bound to ref= on input field
            });

        }
    }
}
</script>


<style scoped>

    h1 {
        display: inline-block;
        font-size: 2.4rem;
        text-transform: uppercase;
        color: rgba(223, 42, 223, 0.993);
        margin: 2rem;
    }

    p {
        margin: 2rem;
        font-size: 1.4rem;
    }

    .create-new-btn {
        color: #fff;
        padding: 1rem;
        background-color: rgba(182, 117, 207);
        border-radius: 5px;
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
        background-color:rgba(97, 59, 139, 0.993)
    }
    button.active {
        background: rgba(182, 117, 207);
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
    }

    .current-note {
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
        background: lavender;
    }
    .current-note input {
        font-size: 3.6rem;
        line-height: 1.25;
        font-weight: 300;
        letter-spacing: -.1rem;
        margin-bottom: 2.0rem;
        margin-top: 0;
    }
    .current-note textarea {
        font-size: 18px;
        color: #606c76;
    }

</style>