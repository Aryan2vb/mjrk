const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const customerRoutes = require('./routes/customerRoutes');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const dbURI = process.env.MONGO_URI;
if (!dbURI) {
    console.error('MONGODB_URI is not defined');
    process.exit(1); // Exit the app if URI is not set
}


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
app.get('/hello', (req,res)=>{
    res.status(200).send('Sab Changa Si');

})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});