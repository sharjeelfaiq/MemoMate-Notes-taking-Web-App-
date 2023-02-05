showNotes();

// Function to store user input to the localStorage
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  let addTxt = document.getElementById("addTxt");
  let notesStr = localStorage.getItem("notes");
  let notesObj;
  if (notesStr != null) {
    notesObj = JSON.parse(notesStr);
  } else {
    notesObj = [];
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  // Calling showNotes() fucntion defined ahead.
  showNotes();
  addTxt.value = "";
});

// Function to retrive and show the elements stored in the localStorage
function showNotes() {
  let notesStr = localStorage.getItem("notes");
  let notesObj;
  if (notesStr == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notesStr);
  }
  let html = "";
  notesObj.forEach((element, index) => {
    html += `
    <div class="card my-3 mx-3 noteCard" id="noteCard" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">Note ${index + 1}</h5>
      <p class="card-text">${element}</p>
      <button onclick="deleteNotes(this.id)" id=${index} class="btn btn-sm btn-danger">
        Delete
      </button>
    </div>
    </div>
  `;
  });
  let notesElm = document.getElementById("yourNotes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `No items to display. Please utilize the "Add a Note" section to include some notes.`;
  }
}

// Function to delete the notes
const deleteNotes = (index) => {
  let notesStr = localStorage.getItem("notes");
  let notesObj;
  if (notesStr == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notesStr);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
};

// Function to search notes
const search = document.getElementById("searchTxt");
search.addEventListener("input", () => {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach((element) => {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.toLowerCase().startsWith(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  })
});

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/
