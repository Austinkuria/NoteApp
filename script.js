const myNotes = [
    "Hello,today is Thursday",
    "I'm having a good day"
]

//  assign notesArray to the div element where notes will be displayed
const notesArray = document.getElementById('notes-list');

// function to display notes
function displayNotes(){
    // clear existing notes
    notesArray.innerHTML = '';
    // iterate over myNotes
    myNotes.forEach((note)=>{
        // create a div to hold the note
        const singleNoteCard = document.createElement('div');
        // add classes to the div
        singleNoteCard.classList.add('card', 'mb-3');
        // create a div to hold the note content
        const singleNoteCardBody = document.createElement('div');
        // add classes to the div
        singleNoteCardBody.classList.add('card-body');
        // add the note content to the div
        singleNoteCardBody.textContent = note;
        // append the note content div to the note div
        singleNoteCard.appendChild(singleNoteCardBody);
        // append the note div to the notesArray div
        notesArray.appendChild(singleNoteCard);
    });
    // display the notesArray div
    notesArray.style.display = 'block';
}

//Function to save a new note
function saveNote(){
    const noteContent = document.getElementById('note-content').value;
    // check if the note is not empty
    if(noteContent.trim() !== ''){
        // add the note to the array
        myNotes.push(noteContent); 
        alert('Note added successfully');
        // clear the input field
        document.getElementById('note-content').value = '';
        // close the modal when cancel button is clicked
        document.getElementById('cancel-button').click();
        // display the new note
        displayNotes();
    }
    else{
    alert('Note cannot be empty');
    }
}
// display existing notes
displayNotes();
