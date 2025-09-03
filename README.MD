# Todo API

A RESTful API for managing todos with user authentication, categories, and task management. Built with Node.js, Express, Prisma ORM, and MySQL.

## Project Structure

```
todo-api/
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies and scripts
├── package-lock.json        # Dependency lock file
├── server.js                # Express server setup
├── README.MD                # Project documentation
├── config/
│   └── db.js                # Prisma client configuration
├── controllers/
│   ├── auth.controller.js    # Authentication logic
│   ├── category.controller.js # Category CRUD operations
│   └── task.controller.js    # Task CRUD operations
├── middlewares/
│   ├── protect.middleware.js # JWT authentication middleware
│   └── validator.middlewares.js # Validation error handling
├── routes/
│   ├── auth.route.js        # Authentication routes
│   ├── category.route.js    # Category routes
│   └── task.route.js        # Task routes
├── utils/
│   └── validators/          # Input validation rules
│       ├── auth.validator.js
│       ├── category.validator.js
│       └── task.validator.js
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
│       ├── migration_lock.toml
│       └── 20250903174431_init/
│           └── migration.sql
└── generated/
    └── prisma/              # Generated Prisma client files
        ├── client.js
        ├── index.js
        ├── package.json
        ├── schema.prisma
        └── runtime/
```

## Features

- **User Authentication**: JWT-based authentication with signup and login
- **Task Management**: Create, read, update, and delete tasks
- **Category Management**: Organize tasks by categories
- **User-specific Data**: Each user can only access their own tasks and categories
- **Data Validation**: Comprehensive input validation using express-validator
- **Database Management**: MySQL database with Prisma ORM
- **Error Handling**: Centralized error handling middleware

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Development**: nodemon for auto-restart
- **Logging**: morgan for HTTP request logging

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/todo_db"
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRES_IN="30d"
   NODE_ENV="development"
   PORT=3000
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000` (or the port specified in your .env file).

## API Endpoints

### Authentication Endpoints

- **POST** `/api/auth/signup` - Create new user account
- **POST** `/api/auth/login` - Login user

### Task Endpoints (Protected)

All task endpoints require Bearer token authentication.

- **GET** `/api/tasks` - Get all user tasks
- **POST** `/api/tasks` - Create new task
- **GET** `/api/tasks/:id` - Get single task
- **PUT** `/api/tasks/:id` - Update task
- **DELETE** `/api/tasks/:id` - Delete task

### Category Endpoints (Protected)

- **GET** `/api/categories` - Get all user categories
- **POST** `/api/categories` - Create new category
- **GET** `/api/categories/:id` - Get single category
- **PUT** `/api/categories/:id` - Update category
- **DELETE** `/api/categories/:id` - Delete category
- **GET** `/api/categories/:id/tasks` - Get all tasks for category

## Development

### Available Scripts

- `npm run dev` - Start development server with nodemon

## Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with expirable tokens
- **Input Validation**: Comprehensive validation on all endpoints
- **User Isolation**: Users can only access their own data
- **SQL Injection Protection**: Prisma ORM provides built-in protection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Author

Mahmoud

---

For any questions or issues, please open an issue in the repository.