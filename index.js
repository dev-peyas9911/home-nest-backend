const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());

// API
app.get('/', (req, res) => {
    res.send('Homenest Server is running.')
})

app.listen(port, () => {
    console.log(`Homenest server is running on port ${port}`)
})