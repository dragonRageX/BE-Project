const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// ➡️ Middleware
app.use(cors());
app.use(express.json());  // Built-in body parser for JSON

// ➡️ Routes
app.post('/api/predict', async (req, res) => {
    const { risk_appetite, income, age } = req.body;

    if (!risk_appetite || !income || !age) {
        return res.status(400).json({ error: 'Missing required fields: risk_appetite, income, age' });
    }

    try {
        // 🔗 Send data to Flask server
        const flaskResponse = await axios.post('http://localhost:5000/predict', {
            risk_appetite,
            income,
            age
        });

        const predictionResults = flaskResponse.data;

        // 🔙 Send results back to client
        res.status(200).json(predictionResults);

    } catch (error) {
        console.error('Error contacting Flask server:', error.message);
        res.status(500).json({ error: 'Failed to get response from AI-ML server' });
    }
});

// ➡️ Health Check
app.get('/', (req, res) => {
    res.send('🚀 Express.js API Server is running!');
});

// ➡️ Start Server
app.listen(PORT, () => {
    console.log(`✅ Express.js server listening on http://localhost:${PORT}`);
});
