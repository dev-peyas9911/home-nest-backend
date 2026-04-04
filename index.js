// import express, { json } from 'express';
// import cors from 'cors';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb')
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors(
    {
        origin: [process.env.CLIENT_DOMAIN],
        credentials: true,
        optionSuccessStatus: 200,
    }
));
app.use(express.json());


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})
async function run() {
    try {
        const db = client.db('homenestDB')


        // Send a ping to confirm a successful connection
        await client.db('admin').command({ ping: 1 })
        console.log(
            'Pinged your deployment. You successfully connected to MongoDB!'
        )

    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir)


// API
app.get('/', (req, res) => {
    res.send('Homenest Server is running.')
})

app.listen(port, () => {
    console.log(`Homenest server is running on port ${port}`)
})