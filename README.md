# Cat Grid UI

## Overview

This project implements a simple front-end application using React, TypeScript, and Vite. The application displays a grid of cat images that can be reordered via drag-and-drop. It also includes a mock server using MSW to handle API requests and store data in the browser's localStorage.

## Features

- Load and display static JSON data as cards.
- Drag-and-drop functionality for reordering cards.
- Display a spinner while images are loading.
- Show an overlay with the image when a card is clicked, and close it with the ESC key.
- Save data every five seconds if changes are made, showing a loading spinner and timestamp.

## Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/your-repo/cat-grid-ui.git
  cd cat-grid-ui
  ```

2. Install dependencies:
  ```sh
  npm install
  ```

3. Start the development server:
  ```sh
  npm run dev
  ```

4. To run the build:
  ```sh
  npm run build
  npm run preview
  ```

## Implementation Details

- **Static JSON Data Loading**: Loaded the static JSON data and displayed it as cards using React components.
- **Drag-and-Drop Functionality**: Implemented drag-and-drop using the `react-dnd` library.
- **Image Loading Spinner**: Used a loading state to display a spinner while images are loading.
- **Image Overlay**: Implemented an overlay to display the image when a card is clicked, and closed it with the ESC key.
- **Mock Service Worker**: Set up MSW to mock API calls and store data in `localStorage`.
- **Data Saving**: Implemented a mechanism to save data every five seconds if changes are made, showing a loading spinner and timestamp.

## Conclusion

This project demonstrates a robust implementation of a React-based front-end application with advanced features like drag-and-drop, image overlays, and data persistence. By leveraging TypeScript and Vite, the development process is streamlined and efficient. The use of MSW for mocking API requests ensures that the application can be developed and tested in isolation. Overall, this project serves as a solid foundation for building interactive and dynamic web applications.

##Conclusion