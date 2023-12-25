let addButton = $('.add');
let deleteButton = $('.delete');
let container = $('.notesContainer')

addButton.on('click', addNote);
deleteButton.on('click', function() {
    console.log('pls work');
});

getNotes()

async function getNotes() {
    try {
        container.empty()
        let notes = await $.get('/notes');
        notes.forEach(note => {
            let noteDiv = $('<div>').addClass('notebox')
            let title = $('<h2>').text(note.title)
            let content = $('<p>').text(note.content);
            let deleteBtn = $('<button>').text('Delete').addClass('delete')

            noteDiv.append(title, content, deleteBtn)
            container.append(noteDiv)
        });
    } catch (err) {
        console.error(err)
    }
}

async function addNote() {
    try {
        let titleInput = $(".titleInput").val()
        let textInput = $(".textInput").val()
        let requestBody = { title: titleInput, content: textInput}
        let newNote = await $.post('/notes', requestBody)
        getNotes()
    } catch (error) {
        console.error(error)
    }
}

async function deleteNote() {
    try {
        let deltedNote = await $.delete('/notes')
    } catch (error) {
        console.error(error)
    }
}



