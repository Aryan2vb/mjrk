const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const customerRoutes = require('./routes/customerRoutes');
const customerRoutes = require('./routes/customerRoutes');


dotenv.config();

const app = express();
app.use(express.json());

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Use customer routes
app.use('/api', customerRoutes);

// Default route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to Customer Management API!');
});
app.get('hello',async (req,res)=>{
    res.status(200).send('Sab Changa Si');
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});