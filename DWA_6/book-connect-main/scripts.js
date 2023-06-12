// importing data
import { BOOKS_PER_PAGE, authors, genres, books, html } from "./data.js";

/**
 * Opens and closes the search dialog and clears the elements after use.
 * @param {Event} event - The event object.
 */
const handleSearchToggle = (event) => {
    event.preventDefault();
    html.search.title.value = "";
    html.search.genres.value = "";
    html.search.authors.value = "";

    if (html.search.dialog.hasAttribute("open")) {
        html.search.dialog.removeAttribute("open");
        // Remove all genre options except the first one
        html.search.genres
            .querySelectorAll("option:not(:first-child)")
            .forEach((option) => option.remove());
        // Remove all author options except the first one
        html.search.authors
            .querySelectorAll("option:not(:first-child)")
            .forEach((option) => option.remove());
    } else {
        html.search.dialog.setAttribute("open", true);
    }
};


// event listener for the search and cancel buttons to open/close overlay
html.search.button.addEventListener("click", handleSearchToggle);
html.search.cancel.addEventListener("click", handleSearchToggle);

/**
 * Opens and closes the settings dialog.
 * @param {Event} event - The event object.
 */
const handleSettingsToggle = (event) => {
    event.preventDefault();
    if (html.settings.dialog.hasAttribute("open")) {
        html.settings.dialog.removeAttribute("open");
    } else {
        html.settings.dialog.setAttribute("open", true);
    }
};
// linking the function to its respective buttons using event lisners
html.settings.button.addEventListener("click", handleSettingsToggle);
html.settings.cancel.addEventListener("click", handleSettingsToggle);

//get the Day/Night option value and setting the CSS styling to dark/light respectivly
const handleSettingsSave = (event) => {
    event.preventDefault();
    if ((html.settings.theme.value = "night")) {
        document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
        document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
        document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
        document.documentElement.style.setProperty(
            "--color-light",
            "255, 255, 255"
        );
    }
    html.settings.dialog.removeAttribute("open");
};

html.settings.save.addEventListener("click", handleSettingsSave);

// this appends the Genre <options> to the search dropdownlist
const createGenreOptionsHtml = () => {
    const fragment = document.createDocumentFragment();

    for (const [key, value] of Object.entries(genres)) {
        const option = document.createElement("option");
        option.value = key;
        option.innerText = value;
        fragment.appendChild(option);
    }

    html.search.genres.appendChild(fragment);
};

// the fuction is called when the list is clicked
html.search.genres.addEventListener("click", createGenreOptionsHtml);

// the createAuthorOptionsHtml works in the same way as Genres. A future project will be to sort items
// so only relavant authors are shows after a genre is chosen or vice verca
const createAuthorOptionsHtml = () => {
    const fragment = document.createDocumentFragment();

    for (const [key, value] of Object.entries(authors)) {
        const option = document.createElement("option");
        option.value = key;
        option.innerText = value;
        fragment.appendChild(option);
    }
    html.search.authors.appendChild(fragment);
};
html.search.authors.addEventListener("click", createAuthorOptionsHtml);








// adding books to the webpage
let index = 0;
const fragment = document.createDocumentFragment();
const area = document.querySelector("[data-list-items]");

// a function that loads a certain amount of books to the webpage everytime it is called
const showBooks = (object) => {
    const extracted = books.slice(index, index + BOOKS_PER_PAGE);

    for (let i = index; i < index + BOOKS_PER_PAGE; i++) {
        const book = books[i];
        const image = book.image;
        const title = book.title;
        const authorId = book.author;
        const id = book.id;

        const element = document.createElement("button");
        element.classList = "preview";
        element.setAttribute("id", id);

        element.innerHTML = `<img class="preview__image" src=${image}>
                <div class="preview__info">
                    <h3 class="preview__title">${title}</h3>
                    <div class="preview__author">${authors[authorId]}</div>
                </div> `;
        fragment.appendChild(element);
    }

    index = index + extracted.length;
    area.appendChild(fragment);
    const booksLeft = Object.keys(books).length - index;
    //set books left for "show more" button
    html.list.button.innerHTML = `Show More (${booksLeft})`;
};

// sorting books
const sortBooks = (event) => {
    event.preventDefault();
    //extract search overlay values
    const search = {
        title: html.search.title.value,
        genre: html.search.genres.value,
        author: html.search.authors.value,
    };

    const found = [];
    for (let x in search) {
        if (
            search[x] === "" ||
            search[x] === "all authors" ||
            search[x] === "all genres"
        ) {
            continue;
        }
        let match = books.filter((book) => {
            if (x === "title") {
                return book.title.toLowerCase().includes(search[x].toLowerCase());
            } else if (x === "genre") {
                return book.genres.includes(search[x]);
            } else {
                return book[x] === search[x];
            }
        });
        if (match !== null && !found.includes(match)) {
            found.push(match);
        }
    }
    return showSearchResults(found[0]);
};

html.search.sumbit.addEventListener("click", sortBooks);

const showSearchResults = (object) => {

     if (typeof object == 'undefined'){
         html.search.dialog.removeAttribute('open')
         return
    } else if (object.length === 0){
         area.innerHTML= "no books match your description"
     }else {

        html.list.message.classList = 'list__mesage'
        area.innerHTML = "";
        const extracted = object.slice(index, index + BOOKS_PER_PAGE);

        for (let i = 0; i < object.length; i++) {
                const book = object[i];
                const image = book.image;
        const title = book.title;
        const authorId = book.author;
        const id = book.id;

        const element = document.createElement("button");
        element.classList = "preview";
        element.setAttribute("id", id);

        element.innerHTML = `<img class="preview__image" src=${image}>
                <div class="preview__info">
                    <h3 class="preview__title">${title}</h3>
                    <div class="preview__author">${authors[authorId]}</div>
                </div> `;
        fragment.appendChild(element);
    }

    index = index + extracted.length;
    area.appendChild(fragment);
    const booksLeft = Object.keys(books).length - index;
    //set books left for "show more" button
    html.list.button.innerHTML = `Show More (${booksLeft})`;
    html.search.dialog.removeAttribute("open");
}};




//"show more" List button with number of remaining books
//const booksStillToShow = Object.keys(books).length - index;
html.list.button.addEventListener("click", showBooks);
window.addEventListener("load", showBooks(books));

//closes the book popup
const closePreview = (event) => {
    event.preventDefault;
    html.list.active.removeAttribute("open");
};
//Preview gets the id and opens the popup with the correct book data added to the html
const preview = (id) => {
    const book = books.find((book) => book.id === id);
    const blurImage = html.list.blur;
    blurImage.src = book.image;
    const image = html.list.image;
    image.src = book.image;
    const title = html.list.title;
    title.innerHTML = book.title;
    const subtitle = html.list.subtitle;
    const date = new Date(book.published);
    const year = date.getFullYear();
    subtitle.innerHTML = `${authors[book.author]} (${year})`;
    const description = html.list.description;
    description.innerHTML = book.description;

    if (html.list.active.hasAttribute("open")) {
        html.list.active.removeAttribute("open");
    } else {
        html.list.active.setAttribute("open", true);
    }
};

// this listens for click events and returns the id of a book for preview()
document.addEventListener("click", (event) => {
    if (event.target.closest(".preview") == null) {
        return;
    } else {
        const bookElement = event.target.closest(".preview");
        if (bookElement.hasAttribute("id")) {
            const previewId = bookElement.id;
            if (typeof previewId !== "string") {
                return;
            }
            preview(previewId);
        }
    }
});

html.list.close.addEventListener("click", closePreview);
