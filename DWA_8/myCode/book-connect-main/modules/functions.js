import {authors,genres,books, html}  from "../modules/data.js";



export class SearchBar {
    constructor(){
        this.title =  html.search.title.value
        this.genre =  html.search.genres.value
        this.author =  html.search.authors.value
    } ;

    open(){
        html.search.dialog.setAttribute("open", true);
    };
    close(){
        html.search.dialog.removeAttribute("open");
        // Remove all genre options except the first one
        html.search.genres
            .querySelectorAll("option:not(:first-child)")
            .forEach((option) => option.remove());
        // Remove all author options except the first one
        html.search.authors
            .querySelectorAll("option:not(:first-child)")
            .forEach((option) => option.remove());

    }
    addGenres() {
        // this appends the Genre <options> to the search dropdownlist
        const fragment = document.createDocumentFragment();
    
        for (const [key, value] of Object.entries(genres)) {
            const option = document.createElement("option");
            option.value = key;
            option.innerText = value;
            fragment.appendChild(option);
        }
    
        html.search.genres.appendChild(fragment);
    }
    addAuthors() {
        const fragment = document.createDocumentFragment();

        for (const [key, value] of Object.entries(authors)) {
            const option = document.createElement("option");
            option.value = key;
            option.innerText = value;
            fragment.appendChild(option);
            }
            html.search.authors.appendChild(fragment);
        };

    sortBooks()  {
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
            html.list.parent.innerHTML=''
            //return showSearchResults(found[0]);
            return createPreviewsFragment(found,0,found.length)
        
        }; 
    }

export class SettingsBar {
    
    open =(event) => {
        //event.preventDefault();
        html.settings.dialog.setAttribute("open", true)
    }
    close =(event) => {
        //event.preventDefault();
        html.settings.dialog.removeAttribute("open")
    }

    /**
     * Handles the saving of settings and updates the CSS styling 
     * based on the Day/Night option value.
     * @param {Event} event - The event object.
     */
    save = (event) => {
        event.preventDefault();
            if (html.settings.theme.value == "night") {
                document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
                document.documentElement.style.setProperty("--color-light", "10, 10, 20");
                this.close();
            } else {
                document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
                document.documentElement.style.setProperty("--color-light","255, 255, 255");
                this.close(); 
    }}}

/**
 * 
 * @param {object} props 
 * @returns {HTMLBodyElement}
 */
export const createPreview = (props) => {
    const { author, image, title, id } = props;

    const newElement = document.createElement('button');
    newElement.className = 'preview';
    newElement.setAttribute('data-preview', id);

    newElement.innerHTML =  /* HTML */`
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${author}</div>
            </div>
        `
    return newElement;
};


/**
 * this takes an array of books given by scripts.js (this can either be the full list of books
 * or a searched subsection) 
 * @param {array} array 
 * @param {number} start 
 * @param {number} end 
 * @returns {HTMLBodyElement}
 */
export const createPreviewsFragment = (array, start, end) => {
    const booksSlice = array.slice(start, end);

    let previewFragment = document.createDocumentFragment();

    for (let i = 0; i < booksSlice.length; i++) {

        let { author, image, title, id } = booksSlice[i];
        author = authors[author];

        const preview = {
            author,
            id,
            image,
            title,
        };
        previewFragment.appendChild(createPreview(preview));
    };
    return previewFragment;
    
};



export class Summary {
    open(id) {
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
      html.list.active.setAttribute("open", true);
    }
  
    //closes the book preview popup
    close(event) {
      html.list.active.removeAttribute("open");
    }
  }








