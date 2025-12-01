# 📝 Notes App - Test Task

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-9.14.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Ant Design](https://img.shields.io/badge/Ant_Design-5.0.1-0170FE?style=for-the-badge&logo=ant-design&logoColor=white)

**A markdown-based notes application with real-time synchronization**

*Test task for BIRCH company - A simple notes application with markdown editing and Firebase integration*

</div>

---

## 📖 About

**Notes App** is a markdown-based notes application that allows users to create, edit, and manage notes with real-time synchronization using Firebase Firestore.

This project was developed as a **test task for BIRCH company**. The application provides a clean, intuitive interface for writing and organizing notes with markdown support, automatic saving, and search functionality.

**Live Demo**: [birch-notes.web.app](https://birch-notes.web.app/)

---


## 🛠 Tech Stack

### Core Technologies

<div align="center">

| Category             | Technology                                                                                                | Version |
| -------------------- | --------------------------------------------------------------------------------------------------------- | ------- |
| **Library**          | ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)                   | 18.2.0  |
| **Language**         | ![TypeScript](https://img.shields.io/badge/TypeScript-4.9.3-3178C6?logo=typescript&logoColor=white)     | 4.9.3   |
| **Backend**          | ![Firebase](https://img.shields.io/badge/Firebase-9.14.0-FFCA28?logo=firebase&logoColor=black)           | 9.14.0  |
| **UI Framework**     | ![Ant Design](https://img.shields.io/badge/Ant_Design-5.0.1-0170FE?logo=ant-design&logoColor=white)    | 5.0.1   |
| **Styling**          | CSS Modules                                                                                                | -       |

</div>

### Key Libraries

<div align="center">

| Library              | Purpose                      | Version |
| -------------------- | ---------------------------- | ------- |
| **SimpleMDE**        | Markdown editor              | 2.18.0  |
| **Marked**           | Markdown parser              | 4.2.3   |
| **Lodash Debounce**  | Debounce function            | 4.0.8   |
| **React SVG**        | SVG icon rendering           | 15.1.13 |
| **UUID**             | Unique ID generation         | 9.0.0   |

</div>

---

## 🎯 Functionality

### Creating Notes

- Click the "Add" button in the toolbar
- A new note is created with default title "Новая заметка" and content "Текст новой заметки"
- The note is immediately saved to Firebase
- The new note appears in the sidebar list

### Editing Notes

- Click the "Edit" button to enter edit mode
- Edit the note title in the input field
- Edit the note content in the markdown editor
- Changes are automatically saved after 500ms of inactivity
- Click "Edit" again to return to view mode

### Viewing Notes

- Click on any note in the sidebar to view it
- Notes are displayed in rendered markdown format
- The active note is highlighted in the sidebar
- Title and creation date are shown for each note

### Deleting Notes

- Select a note to delete
- Click the "Delete" button in the toolbar
- Confirm deletion in the modal dialog
- The note is removed from Firebase and the list

### Searching Notes

- Use the search bar in the toolbar
- Type to filter notes by title
- Search is case-insensitive
- Results update in real-time as you type
- Clear search to see all notes again

### Auto-save

- Changes to title and content are automatically saved
- Debounce delay of 500ms prevents excessive API calls
- Saves occur in the background without user intervention
- Real-time synchronization across all devices

---

## 🔥 Firebase Integration

### Firestore Database

- **Collection**: `notes`
- **Document Structure**:
  ```typescript
  {
    id: string
    title: string
    markup: string (markdown content)
    createdAt: string
  }
  ```

### Real-time Synchronization

- Uses `onSnapshot` listener for real-time updates
- Notes automatically sync when changes occur
- No page refresh needed
- Instant updates across all connected clients

---

## 🎨 User Interface

### Layout

- **Header**: Toolbar with action buttons and search
- **Sidebar**: List of all notes with titles and dates
- **Content Area**: Note editor or markdown preview

### Components

- **Toolbar**: Add, Edit, Delete buttons and search
- **Sidebar**: Note list with active state highlighting
- **Workspace**: Markdown editor or rendered preview
- **Modal**: Confirmation dialog for deletion

### Modes

- **View Mode**: Read-only markdown rendering
- **Edit Mode**: Editable title and markdown editor

---

## 📝 TypeScript Implementation

The project is fully typed with TypeScript:

- **Note Types**: Defined interface for note structure
- **Component Props**: Typed props for all components
- **Context Types**: Type-safe React context
- **Firebase Types**: Proper typing for Firestore documents

---

## 🔧 Development Highlights

### Auto-save with Debounce

- Implements debounced saving to optimize Firebase writes
- 500ms delay prevents excessive API calls
- Separate debounce for title and content updates

### Real-time Updates

- Firebase `onSnapshot` provides instant synchronization
- Changes reflect immediately across all devices
- No manual refresh required

### Markdown Support

- SimpleMDE editor for writing markdown
- Marked library for parsing and rendering
- Full markdown syntax support

### State Management

- React Context for global state
- Local state for component-specific data
- Firebase as the source of truth

## 👨‍💻 Development Notes

This project was developed as a **test task for BIRCH company** demonstrating:

- React development with TypeScript
- Firebase Firestore integration
- Real-time data synchronization
- Markdown editing and rendering
- Auto-save functionality with debounce
- Search and filtering
- Clean, intuitive UI with Ant Design

The application showcases proficiency in:
- React hooks and context API
- Firebase SDK v9+ modular API
- Real-time listeners
- Debounced operations
- Markdown processing
- Component composition

---

