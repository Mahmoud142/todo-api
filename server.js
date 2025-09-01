const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const morgan = require('morgan');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes
const authRoute = require('./routes/auth.route');
const taskRoute = require('./routes/task.route');
const categoryRoute = require('./routes/category.route');

// mounting
app.use('/api/auth', authRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/categories', categoryRoute);

// error handling middleware
app.use((err, req, res, next) => {
  // console.error("Error:", err);
  // console.log(err);
  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
    statusCode: err.statusCode || 500,
    error: "Internal Server Error from error handling middleware",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});