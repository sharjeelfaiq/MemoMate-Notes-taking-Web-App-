showNotes();

// Function to store user input to the localStorage
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let titlesStr = localStorage.getItem("titles");
  let notesStr = localStorage.getItem("notes");
  let titlesObj;
  let notesObj;
  if (notesStr == null && titlesStr == null) {
    titlesObj = [];
    notesObj = [];
  } else {
    titlesObj = JSON.parse(titlesStr);
    notesObj = JSON.parse(notesStr);
  }
  titlesObj.push(addTitle.value);
  notesObj.push(addTxt.value);
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  localStorage.setItem("notes", JSON.stringify(notesObj));
  // Calling showNotes() fucntion defined ahead.
  showNotes();
  addTitle.value = "";
  addTxt.value = "";
});

// Function to retrive and show the elements stored in the localStorage
function showNotes() {
  let titlesStr = localStorage.getItem("titles");
  let notesStr = localStorage.getItem("notes");
  let titlesObj;
  let notesObj;
  if (notesStr == null && titlesStr == null) {
    titlesObj = [];
    notesObj = [];
  } else {
    titlesObj = JSON.parse(titlesStr);
    notesObj = JSON.parse(notesStr);
  }
  let title = "";
  let html = "";
  notesObj.forEach((element, index) => {
    title = titlesObj[index];
    html += `
    <div class="card my-3 mx-3 note-card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">${title ? title : `Note: ${index}`}</h5>
      <p class="card-text">${element}</p>
      <button onclick="deleteNotes(this.id)" id=${index} class="btn btn-sm btn-danger">
        Delete
      </button>
      <button class="btn btn-light mark-important-btn btn-sm">
        Mark as Important
      </button>
    </div>
    </div>
  `;
  });
  let notesElm = document.getElementById("yourNotes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
    let noteCards = document.querySelectorAll(".note-card");
    noteCards.forEach((noteCard) => {
      noteCard.classList.add("fade-in");
      setTimeout(() => {
        noteCard.style.opacity = 1;
      }, 100);
    });
  } else {
    notesElm.innerHTML = `No items to display. Please utilize the "Add a Note" section to include some notes.`;
  }
}

// Function to delete the notes
const deleteNotes = (index) => {
  let titlesStr = localStorage.getItem("titles");
  let notesStr = localStorage.getItem("notes");
  let titlesObj;
  let notesObj;
  if (notesStr == null && titlesStr == null) {
    titlesObj = [];
    notesObj = [];
  } else {
    titlesObj = JSON.parse(titlesStr);
    notesObj = JSON.parse(notesStr);
  }
  notesObj.splice(index, 1);
  titlesObj.splice(index, 1);
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  localStorage.setItem("notes", JSON.stringify(notesObj));

  const noteCard = document.getElementById(index).closest(".note-card");
  noteCard.classList.add("fade-out");

  setTimeout(() => {
    noteCard.remove();
    showNotes();
  }, 500);
};

// Function to search notes
const search = document.getElementById("searchTxt");
search.addEventListener("input", () => {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("note-card");
  Array.from(noteCards).forEach((element) => {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.toLowerCase().startsWith(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// MarkImportantButtons
const markImportantButtons = document.querySelectorAll(".mark-important-btn");
markImportantButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const noteCard = event.target.closest(".note-card");
    noteCard.classList.toggle("important");

    // Store the state of the important note card in local storage
    const noteId = noteCard.getAttribute("data-note-id");
    const isImportant = noteCard.classList.contains("important");
    localStorage.setItem(`note-${noteId}-important`, isImportant);
  });
});

/*
Further Features:
1. Add Title | DONE
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/
