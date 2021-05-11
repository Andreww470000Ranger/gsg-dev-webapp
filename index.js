const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();
// Connections
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log('connected'));

app.use(express.json());
// Routes middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('listening on port 3000'));
//dpdNHEMRRp7oBMPx