
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dinderdog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Dog Profile Schema
const profileSchema = new mongoose.Schema({
    name: String,
    breed: String,
    age: Number,
    ownerEmail: String,
    location: String,
    preferences: String,
    photos: [String]
});

const Profile = mongoose.model('Profile', profileSchema);

// Create Profile Endpoint
app.post('/api/profile', async (req, res) => {
    try {
        const profile = new Profile(req.body);
        await profile.save();
        res.status(201).send({ message: 'Profile created successfully!' });
    } catch (err) {
        res.status(500).send({ message: 'Error creating profile', error: err });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
