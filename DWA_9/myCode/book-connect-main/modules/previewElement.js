import {books, html, authors } from "./data.js"


const template = document.createElement("template")
template.innerHTML = 
    `
    <dialog class="overlay" data-list-active>
    <div class="overlay__preview">
    <img class="overlay__blur" data-list-blur src=""/>
    <img class="overlay__image" data-list-image src=""/></div>
    <div class="overlay__content">
    <h3 class="overlay__title" data-list-title></h3>
    <div class="overlay__data" data-list-subtitle></div>
    <p class="overlay__data overlay__data_secondary" data-list-description></p>
    </div>

    <div class="overlay__row">
    <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
    </div>
    </dialog>`
   

export class CreatePreviewClass extends HTMLElement{
    constructor() {
        super()
        //const shadow =this.attachShadow({mode: "open"})
        //shadow.append(template.content.cloneNode(true))
        const templateContent = template.content
        
        // Clone the template content and append it to the custom element
        const clone = document.importNode(templateContent, true);
        this.appendChild(clone);
        
     }
    
     open(id) {
        const book = books.find((book) => book.id === id);
        this.querySelector('[data-list-blur]').src = book.image;
        this.querySelector('[data-list-image]').src = book.image;
        this.querySelector('[data-list-title]').innerText = book.title;
        this.querySelector('[data-list-subtitle]').innerText = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
        this.querySelector('[data-list-description]').innerText = book.description;
        this.querySelector('[data-list-active]').open = true;
        
    }
          
    //closes the book preview popup
    close(event) {
        //console.log( "prvie.close has been called")
        const thisElement  = this.querySelector('[data-list-active]')
        thisElement.removeAttribute("open")
        //this.removeAttribute("open");
    }
    
}

customElements.define("book-preview", CreatePreviewClass)
