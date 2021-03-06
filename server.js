const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json({ extended: false}));

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome Conctact Keeper...' });
})

//Connect DataBase
connectDB()

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running '+PORT))