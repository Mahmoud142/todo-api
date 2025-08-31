const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 3000;



const tasksRoute = require('./routes/tasks.route');
app.use('/api', tasksRoute);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});