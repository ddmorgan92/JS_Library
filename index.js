 let library = [];
 const titleField = document.querySelector("#title");
 const authorField = document.querySelector("#author");
 const pageField = document.querySelector("#pages");
 const readField = document.querySelector("#read");
 const submitBtn = document.getElementById("submit");
 submitBtn.addEventListener("click", addBookToLibrary);


 const bookContainer = document.querySelector("#book-container");
 
 function Book(title, author, pageCount, completed) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = completed ? "has been read" : "need to read"
    this.info = function(){
        console.log(`${title} by ${author}, ${pageCount} pages, ${this.read}`)
    }
};

function addBookToLibrary() {
    if(titleField.value && authorField.value && pageField.value) {
        library.push(new Book(titleField.value, authorField.value, pageField.value, readField.checked))
        console.log(library)
        updateLibraryUI();
    } else {
        console.log(
            `Error... title : ${titleField.value}, author : ${authorField.value}, pageField : ${pageField.value}, readField : ${readField.value}`
        )
    }

};

function updateLibraryUI() {
    bookContainer.innerHTML="";
    for(let i = 0; i < library.length; i++){
        bookContainer.innerHTML += `<div class = "book" id = "${i}">
            <h2 class = "title">${library[i].title}</h2>
            <h3 class = "author">${library[i].author}</h3>
            <h3 class = "pages">${library[i].pageCount}</h3>
            <h3 class = "read">${library[i].read}</h3>
            <button onClick = "deleteBook(this);">Delete</button>
            </div>
        `;
        
    }
    console.log(bookContainer.innerHTML)
}

function deleteBook(element){
    const index = element.parentElement.id;
    library.splice(index, 1)
    element.parentElement.remove();
}