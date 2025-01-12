
# NoteBook

NoteBook is a comprehensive note-taking web application built using a modern web stack. It allows users to create, edit, organize, and search personal notes efficiently.

## Features

- **User Authentication:** Secure login and registration with hashed passwords using bcrypt.
- **CRUD Operations:** Create, read, update, and delete notes with ease.
- **Tagging System:** Organize notes by adding tags for better categorization.
- **Search Functionality:** Quickly find notes using a powerful search feature.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- CSS Modules for styling

### Backend
- Node.js with Express.js
- bcrypt for password hashing
- RESTful API design

### Database
- MongoDB for storing user and note data

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/subashinsinex/NoteBook.git
   cd NoteBook
   ```

2. **Setup Backend:**
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Configure the `.env` file with the following:
     ```
     PORT=5000
     DB_HOST=your_database_host
     DB_USER=your_database_user
     DB_PASSWORD=your_database_password
     DB_NAME=your_database_name
     JWT_SECRET=your_jwt_secret
     ```
   - Run database migrations:
     ```bash
     npx sequelize-cli db:migrate
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Setup Frontend:**
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Configure the `.env` file with the following:
     ```
     REACT_APP_API_URL=http://localhost:5000
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

4. **Access the Application:**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user
- **POST** `/api/auth/login`: Log in a user

### Notes
- **GET** `/api/notes`: Retrieve all notes for the logged-in user
- **POST** `/api/notes`: Create a new note
- **PUT** `/api/notes/:id`: Update an existing note
- **DELETE** `/api/notes/:id`: Delete a note

## Folder Structure

```
NoteBook/
├── backend/         # Node.js server files
│   ├── models/      # Database models
│   ├── routes/      # API route definitions
│   ├── controllers/ # Request handlers
│   └── config/      # Database and environment configuration
├── frontend/        # React frontend files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page-level components
│   │   ├── services/    # API service utilities
│   │   └── styles/      # CSS Modules for styling
└── README.md        # Documentation
```

## Contributing

We welcome contributions! Here’s how you can help:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your commit message here"
   ```
4. Push the branch to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

## Future Enhancements

- Add support for dark mode.
- Enable sharing notes with other users.
- Implement reminders and notifications for important notes.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out NoteBook! If you have any questions or feedback, feel free to reach out or open an issue in the repository.
