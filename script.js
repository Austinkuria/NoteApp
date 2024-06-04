// get notes from local storage and assign them to storedNotes
const storedNotes = localStorage.getItem('notes');

// create a separator to split the notes
const separator = '##endOfNote##'; 

//  split the notes using the separator and assign them to myNotes or assign an empty array if there are no notes
const myNotes =  storedNotes ? storedNotes.split(separator) : []; 

//  assign notesArray to the div element where notes will be displayed
const notesArray = document.getElementById('notes-list');

// variable to store the index of the note being edited
let editIndex = -1;

// function to display notes
function displayNotes(){
    // clear existing notes
    notesArray.innerHTML = '';
    // iterate over myNotes
    myNotes.forEach((note)=>{
        // create a div element for single note card
        const singleNoteCard = document.createElement('div');
        // add classes to the div
        singleNoteCard.classList.add('card', 'mb-3');
        // create a div element for the note card body
        const singleNoteCardBody = document.createElement('div');
        // add classes to the div
        singleNoteCardBody.classList.add('card-body','d-flex','justify-content-between');
        // create a paragraph element for the single note card content
        const singleNoteCardContent = document.createElement('p');
        // add classes to the paragraph
        singleNoteCardContent.classList.add('card-text','fs-5');
        // add note content to the paragraph 
        singleNoteCardContent.textContent = note;
        // append single note card body to the single note card
        singleNoteCard.appendChild(singleNoteCardBody);
        // append the single note card content to the single note card body
        singleNoteCardBody.appendChild(singleNoteCardContent);
        // append the single note card to the notesArray div
        notesArray.appendChild(singleNoteCard);
        // create a div element for the  single note card buttons
        const singleNoteCardBodyButtons = document.createElement('div');
        // add classes to the div
        singleNoteCardBodyButtons.classList.add('btns-group','mx-3');
        // append the single note card buttons to the single note card body
        singleNoteCardBody.appendChild(singleNoteCardBodyButtons);
        //create edit button
        const editButton = document.createElement('button');
        // add text content to the button
        editButton.textContent = 'Edit';
        // add classes to the button
        editButton.classList.add('btn', 'btn-primary','edit-button');
        // add event listener to the button
        editButton.addEventListener('click',()=>{
            // call the editSingleNoteCardContent function and pass the index of the note
            editSingleNoteCardContent(myNotes.indexOf(note));
        });
        singleNoteCardBodyButtons.appendChild(editButton);
        // create a delete button
        const deleteButton =  document.createElement('button');
        // add text content to the button
        deleteButton.textContent = 'Delete';
        // add classes to the button
        deleteButton.classList.add('btn', 'btn-danger', 'delete-button');
        // add event listener to the button
        deleteButton.addEventListener('click',()=>{
             // call the deleteSingleNoteCardContent function and pass the index of the note
            deleteSingleNoteCardContent(myNotes.indexOf(note));
        })
        // append the delete button to the single note card buttons
        singleNoteCardBodyButtons.appendChild(deleteButton);
    });
    // display the notesArray div
    notesArray.style.display = 'block';
}

//Function to save a new note
function saveNote(){
    // get the note content
    const noteContent = document.getElementById('note-content').value;
    // check if the note is not empty
    if(noteContent.trim() !== ''){
         // if index is not -1, it means we're editing an existing note
        if (editIndex !== -1) {
            // update the existing note
            myNotes[editIndex] = noteContent;
            // reset editIndex
            editIndex = -1;
        } else {
            // add the new note to the array
            myNotes.push(noteContent);
        }
        // save the note to local storage
        localStorage.setItem('notes', myNotes.join(separator));
        // alert('Note added successfully');
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
  // add event listener for the 'Enter' key press
document.addEventListener('keydown', function(event) {
    // check if the key pressed is 'Enter'
    if (event.key === 'Enter' && event.target.id !== 'note-content') {
        saveNote();
    }
});

// function to delete a note
function deleteSingleNoteCardContent(index) {
    // remove the note from the array using .splice(index,number of items to be rempved ) method-index is the position of the note in the array
    myNotes.splice(index, 1);
    // save the notes to local storage
    localStorage.setItem('notes', myNotes.join(separator));
    // display the notes
    displayNotes();
}

// function to edit a note
function editSingleNoteCardContent(index){
    // set the edit index
    editIndex = index;
    // get the note content
    document.getElementById('note-content').value = myNotes[index];
    // display the modal
    const modal = new bootstrap.Modal(document.getElementById('newNoteModal'));
    // show the modal
    modal.show();
}