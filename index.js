const express = require('express');
const { databaseConnection } = require('./utils/database');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');

databaseConnection();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
    origin:'http://localhost:5173',
    credentials: true, 
}
app.use(cors(corsOption))

app.get('/', (req, res) => {
    res.status(200).json({
        message: "HI",
        success: true
    });
});

// API
app.use("/user", userRouter);

app.listen(PORT, (err) => {
    if (err) {
        console.error('Failed to start the server:', err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
