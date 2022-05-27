 let library = [];

 const inputContainer = document.getElementById("input-container");
 const titleField = document.querySelector("#title");
 const authorField = document.querySelector("#author");
 const pageField = document.querySelector("#pages");
 const readField = document.querySelector("#read");
 const submitBtn = document.getElementById("submit");
 submitBtn.addEventListener("click", addBookToLibrary);
 const addBookBtn = document.getElementById("addBook");
 addBookBtn.addEventListener("click", showInputForm);

 const bookContainer = document.querySelector("#book-container");

 loadLibraryLocally();
 
 function Book(title, author, pageCount, completed) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = completed ? "Has been read." : "Need to read."
    this.info = function(){
        console.log(`${title} by ${author}, ${pageCount} pages, ${this.read}`)
    }
};

function addBookToLibrary() {
    if(titleField.value && authorField.value && pageField.value) {
        library.push(new Book(titleField.value, authorField.value, pageField.value, readField.checked))
        console.log(library)
        updateLibraryUI();
        hideInputForm();
        saveLibraryLocally();
    } else {
        console.log(
            `Error... title : ${titleField.value}, author : ${authorField.value}, pageField : ${pageField.value}, readField : ${readField.value}`
        )
    }

};

function deleteBook(element){
    const index = element.parentElement.id;
    library.splice(index, 1)
    element.parentElement.remove();
    updateLibraryUI();
    saveLibraryLocally();
}

function updateReadStatus(element){
    const index = element.parentElement.id;
    library[index].read == "Need to read." ? library[index].read = "Has been read." : library[index].read = "Need to read.";
    updateLibraryUI();
}

function saveLibraryLocally() {
    localStorage.setItem("library", JSON.stringify(library));
}

function loadLibraryLocally() {
    library = JSON.parse(localStorage.getItem("library") || "[]");
    updateLibraryUI();
}

function updateLibraryUI() {
    bookContainer.innerHTML="";
    for(let i = 0; i < library.length; i++){
        bookContainer.innerHTML += `<div class = "book-card" id = "${i}">
            <img class="book-img" src="book.jpg" alt="book">
            <p class = "title">${library[i].title}</p>
            <p class = "author">by ${library[i].author}</p>
            <hr class = "solid">
            <p class = "pages"> <span class = "bold"> Page Count: </span> ${library[i].pageCount}</p>
            <p class = "read"> <span class = "bold"> Read Status: </span> ${library[i].read}</p>
            <button onClick = "deleteBook(this);">Delete</button>
            <button onClick = "updateReadStatus(this);">Toggle Read Status</button>
            </div>
        `;
        
    }
}

function showInputForm() {
    inputContainer.hidden = false;
    addBookBtn.hidden = true;
    titleField.value = "";
    authorField.value = "";
    pageField.value = "";
    readField.checked = true;
}

function hideInputForm() {
    inputContainer.hidden = true;
    addBookBtn.hidden = false;
}