const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// routes
const authRoute = require('./routes/auth.route');


// mounting
app.use('/api', authRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});