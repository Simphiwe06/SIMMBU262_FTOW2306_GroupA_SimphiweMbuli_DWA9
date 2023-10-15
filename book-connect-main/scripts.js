// Importing data and constants from the 'data.js' file
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

// Variables for current page and matching books
let page = 1;
let matches = books

// Object containing references to DOM elements
const selectors = {
    listItems : document.querySelector('[data-list-items]'),
    searchGenres : document.querySelector('[data-search-genres]'),
    searchAuthors : document.querySelector('[data-search-authors]'),
    settingsTheme : document.querySelector('[data-settings-theme]'),
    listButton : document.querySelector('[data-list-button]'),
    searchCancel : document.querySelector('[data-search-cancel]'),
    searchOverlay : document.querySelector('[data-search-overlay]'),
    headerSearch : document.querySelector('[data-header-search]'),
    headerSettings : document.querySelector('[data-header-settings]'),
    searchTitle : document.querySelector('[data-search-title]'),
    settingsOverlay : document.querySelector('[data-settings-overlay]'),
    listClose : document.querySelector('[data-list-close]'),
    listActive : document.querySelector('[data-list-active]'),
    searchForm : document.querySelector('[data-search-form]'),
    settingsForm : document.querySelector('[data-settings-form]'),
    settingsCancel: document.querySelector('[data-settings-cancel]'),
    listMessage : document.querySelector('[data-list-message]'),
    listDescription : document.querySelector('[data-list-description]'),
    listBlur : document.querySelector('[data-list-blur]'),
    listImage : document.querySelector('[data-list-image]'),
    listSubtitle : document.querySelector('[data-list-subtitle]'),
    listTitle : document.querySelector('[data-list-title]'),
    save : document.querySelector('[form="settings"]'),
}

/**
 * Create a book preview element, extract data from the book object,
 * and create a button element with the book's data.
 * @param {object} book 
 * @returns {element} 
 */ 

class BookPreview {
  constructor(book) {
    this.book = book;
    this.element = this.createPreviewElement();
  }

  createPreviewElement() {
    const { author, id, image, title } = this.book;
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

    return element;
  }

  getElement() {
    return this.element;
  }

  getBook() {
    return this.book;
  }

  updateBook(book) {
    this.book = book;
    this.updatePreviewContent();
  }

  updatePreviewContent() {
    const { author, image, title } = this.book;
    this.element.querySelector('.preview__image').src = image;
    this.element.querySelector('.preview__title').innerText = title;
    this.element.querySelector('.preview__author').innerText = authors[author];
  }
}

// Modify the createBookPreview function to use the BookPreview class
function createBookPreview(book) {
  return new BookPreview(book).getElement();
}

// Creating initial book previews and append them to the list
const starting = document.createDocumentFragment();

for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
  const previewElement = createBookPreview(book);
  starting.appendChild(previewElement);
}

selectors.listItems.appendChild(starting);

// Modifying the handleListButtonClicked function to use the BookPreview class
function handleListButtonClicked() {
  const fragment = document.createDocumentFragment();
  const start = page * BOOKS_PER_PAGE;
  const end = (page + 1) * BOOKS_PER_PAGE;

  const previews = matches.slice(start, end).map((book) => {
    const preview = new BookPreview(book);
    fragment.appendChild(preview.getElement());
    return preview;
  });

  appendItemsToList(fragment);
  page += 1;
}

for (const book of matches.slice(0, BOOKS_PER_PAGE)){
    const previewElement =createBookPreview(book);
    starting.appendChild(previewElement);
}

selectors.listItems.appendChild(starting)

/**
 * Function to create an option element for a dropdown
 * @param {string} value - The value of the option
 * @param {string} text - The text content of the option
 * @returns {Element} - The created option element
 */
function createOptionElement(value, text){
const element = document.createElement('option');
element.value = value;
element.innerText = text;
return element ;
}

// Creating option elements for genres and authors dropdowns
const genreHtml = document.createDocumentFragment();
const authorsHtml = document.createDocumentFragment();

genreHtml.appendChild(createOptionElement('any', 'All Genres'))
authorsHtml.appendChild(createOptionElement('any','All Authors'))

for (const [id, name] of Object.entries(genres)) {
    genreHtml.appendChild(createOptionElement(id, name))
}

for (const [id, name] of Object.entries(authors)) {
    authorsHtml.appendChild(createOptionElement(id, name))
}

selectors.searchGenres.appendChild(genreHtml)
selectors.searchAuthors.appendChild(authorsHtml)

// Checking the user's preferred color scheme and setting the theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    selectors.settingsTheme.value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    selectors.settingsTheme.value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}
 
// Updating the list button text  and disabling it if there are no more books
selectors.listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
selectors.listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 0

// Setting the inner HTML
selectors.listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`;

// Adding event listeners for search and settings overlays and hearder buttons
selectors.searchCancel.addEventListener('click', () => {
    selectors.searchOverlay.open = false
})

selectors.settingsCancel.addEventListener('click', () => {
    selectors.settingsOverlay.open = false
})

selectors.headerSearch.addEventListener('click', () => {
    selectors.searchOverlay.open = true 
    selectors.searchTitle.focus()
})

selectors.headerSettings.addEventListener('click', () => {
    selectors.settingsOverlay.open = true 
})

selectors.listClose.addEventListener('click', () => {
    selectors.listActive.open = false
})

// Adding an event listener to the settings form submit event
selectors.settingsForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    selectors.settingsOverlay.open = false
})

/**
 * Function to handle the search form submission
 * @param {event} event 
 */

function handleSearchFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = filterBooks(filters);

  page = 1;
  matches = result;
  toggleListMessage(result.length < 1);
  clearListItems();

  const newItems = createBookPreviews(result.slice(0, BOOKS_PER_PAGE));
  appendItemsToList(newItems);

  updateListButton();
  scrollToTop();
  closeSearchOverlay();
}

/**
 * Function to filter books
 * @param {Task} filters 
 * @returns 
 */

function filterBooks(filters) {
  return books.filter((book) => {
    let genreMatch = filters.genre === 'any';

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    return (
      (filters.title.trim() === '' ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === 'any' || book.author === filters.author) &&
      genreMatch
    );
  });
}

/**
 * Function to toggle the display of the list message based on the number of matches
 * @param {Task} show 
 */
function toggleListMessage(show) {
  selectors.listMessage.classList.toggle('list__message_show', show);
}

// Function to clear the list items
function clearListItems() {
  selectors.listItems.innerHTML = '';
}

/**
 * Function to create book previews for a given array of books
 * @param {object} books 
 * @returns {fragment}
 */
function createBookPreviews(books) {
  const fragment = document.createDocumentFragment();
  for (const book of books) {
    const previewElement = createBookPreview(book);
    fragment.appendChild(previewElement);
  }
  return fragment;
}

/**
 * Function to append items to the list
 * @param {*} items 
 */
function appendItemsToList(items) {
  selectors.listItems.appendChild(items);
}

// Function to append items to the list
function updateListButton() {
  selectors.listButton.disabled =
    matches.length - page * BOOKS_PER_PAGE < 1;

  const remaining = Math.max(matches.length - page * BOOKS_PER_PAGE, 0);
  selectors.listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
  `;
}

// Function to scroll to the top of the page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeSearchOverlay() {
  selectors.searchOverlay.open = false;
}

// Adding event listeners for the search form submit and list button click
selectors.searchForm.addEventListener('submit', handleSearchFormSubmit);
selectors.listButton.addEventListener('click', handleListButtonClicked);

// Adding event listeners for the search form submit and list button click
selectors.listButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for ( const book of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const previewElement2 = createBookPreview(book)
        fragment.appendChild(previewElement2)
    }

    selectors.listItems.appendChild(fragment)
    page += 1
})

// Adding event listener to show book details when a preview is clicked
selectors.listItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
// Updating the book details in the active book display
    if (active) {
        selectors.listActive.open = true
        selectors.listBlur.src = active.image
        selectors.listImage.src = active.image
        selectors.listTitle.innerText = active.title
        selectors.listSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        selectors.listDescription.innerText = active.description
    }
});