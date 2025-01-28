# User Management Dashboard

This project is a **User Management Dashboard** built using the following technologies:

- **Vite** for fast development and build setup.
- **React** for building the user interface.
- **Material UI (MUI)** for styling and components.
- **React Router** for navigation.
- **Axios** for handling HTTP requests.
- **localStorage** for client-side data persistence.

---

## Features

1. **User List Management:**
   - Displays a list of users fetched from an API.
   - Supports creating, updating, and deleting users.

2. **Form Management:**
   - Create new users.
   - Edit existing users.

3. **Notification System:**
   - Displays success or error messages for actions like adding, updating, and deleting users.

4. **Context Management:**
   - Uses `React Context API` for state management.
   - Stores user data in `localStorage` for persistence across page reloads.

5. **Dynamic Routing:**
   - Includes routes for creating, editing, and listing users.

6. **Material UI Theming:**
   - Customizes the UI theme using Material UI's `ThemeProvider`.

---

## Project Structure

```
project-root/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components (UserList, UserForm, Notification)
│   ├── context/         # UserContext for global state management
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point for the app
│   ├── index.css        # Global styles
│   └── theme.js         # Material UI theme configuration (optional)
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:5173
   ```

---

## Usage

### User Management
- Navigate to `/users` to view the list of users.
- Use the "Create" button to add a new user.
- Edit or delete existing users using the appropriate buttons in the user list.

### Notifications
- Success or error messages will appear as a snackbar at the bottom of the page.

### Local Storage
- User data is persisted in the browser's localStorage. Reloading the page will retain the data.

---

## Key Files and Components

### `main.jsx`
Sets up the application by wrapping the `App` component with the `UserProvider` context.

### `App.jsx`
Defines the main layout and routing for the application, including the Material UI theme and notification system.

### `UserContext.jsx`
Manages global user state using `React Context API`. Handles user data fetching, adding, updating, and deleting.

### Components
- **`UserList`:** Displays a list of users with options to edit or delete them.
- **`UserForm`:** Handles creating and updating user information.
- **`Notification`:** Snackbar for displaying messages.

---

## Theme Configuration
The Material UI theme is customized in `App.jsx` with the following settings:

- Primary Color: `#2196f3`
- Secondary Color: `#f44336`
- Background: `#fafafa`
- Text: `#212121`

---

## Dependencies

### Core Dependencies
- **React**: `^18.x`
- **Vite**: `^4.x`
- **Material UI**: `^5.x`
- **React Router DOM**: `^6.x`
- **Axios**: `^1.x`

### Dev Dependencies
- **@vitejs/plugin-react**: `^4.x`

---

## Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the project for production.
- `npm run preview` - Preview the production build.

---

## API Usage

User data is fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).

- **GET** `/users` - Fetch the list of users.

---

## Future Enhancements

- Implement user authentication.
- Add pagination for the user list.
- Improve error handling and validation.
- Integrate a real backend API for user management.

---


