let addButton = $('.add')
let container = $('.notesContainer')
let clearButton = $('.clear')

addButton.on('click', addNote);
clearButton.on('click', clear)

getNotes()


async function getNotes() {
    try {
        container.empty();
        let notes = await $.get('/notes');
        notes.forEach(note => {
            let noteDiv = $('<div>').addClass('notebox');
            let title = $('<h2>').text(note.title);
            let content = $('<p>').text(note.content);
            let deleteBtn = $('<button>').text('Delete').attr('id', 'delete');
            
            deleteBtn.on('click', async () => {
                try {
                    await $.ajax({
                        url: `/notes/${note.note_id}`,
                        type: 'DELETE',
                        success: function() {
                            noteDiv.remove()
                        },
                        error: function(err) {
                            console.error('Error deleting the note', err)
                        }
                    })
                } catch (err) {
                    console.error(err)
                }
            });

            noteDiv.append(title, content, deleteBtn);
            container.append(noteDiv);
        });
    } catch (err) {
        console.error(err);
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

async function clear() {
    try {
        await $.ajax({
            url: '/notes',
            type: 'DELETE',
            success: function() {
                container.empty()
            },
            error: function(error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error(error);
    }
}



