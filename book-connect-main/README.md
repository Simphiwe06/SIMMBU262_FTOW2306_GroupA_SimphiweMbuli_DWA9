# Book Preview Web Application

This web application allows users to browse and filter a list of books, view book details, and change the color theme. It provides an interactive and user-friendly experience for book enthusiasts.

## Features, 

### Feature 1: Book Listing

#### Scenario 1: Displaying Initial Book Previews

**Given** the user opens the application
**When** the application loads
**Then** it displays an initial list of book previews.

#### Scenario 2: Loading More Books

**Given** the user has initially loaded book previews
**When** the user clicks the "Show More" button
**Then** additional book previews are displayed.

### Feature 2: Filtering Books

#### Scenario 1: Filtering by Genre

**Given** the user wants to filter books by genre
**When** the user selects a specific genre from the dropdown
**Then** the application displays books matching the selected genre.

#### Scenario 2: Filtering by Author

**Given** the user wants to filter books by author
**When** the user selects a specific author from the dropdown
**Then** the application displays books by the selected author.

#### Scenario 3: Searching by Title

**Given** the user wants to search for books by title
**When** the user enters a title in the search bar and submits
**Then** the application displays books with titles matching the search query.

### Feature 3: Changing Color Theme

#### Scenario 1: Switching to Dark Theme

**Given** the user prefers a dark theme
**When** the application detects the preference or the user selects the dark theme
**Then** the application changes its color scheme to a dark theme.

#### Scenario 2: Switching to Light Theme

**Given** the user prefers a light theme
**When** the application detects the preference or the user selects the light theme
**Then** the application changes its color scheme to a light theme.

### Feature 4: Viewing Book Details

#### Scenario 1: Displaying Book Details

**Given** the user clicks on a book preview
**When** a book preview is clicked
**Then** the application displays detailed information about the selected book, including its title, author, description, and cover image.

## Usage

1. Open the application in a web browser.
2. Browse through the initial list of book previews.
3. Use filters to refine your book selection.
4. Search for specific books by title.
5. Change the color theme based on your preference.
6. Click on a book preview to view its details.

## Installation

To run the application locally, follow these steps:

1. Clone this repository to your local machine.
2. Open the project folder in your code editor.
3. Run a development server or open the HTML file in a web browser.

## Technologies Used

- HTML
- CSS
- JavaScript
