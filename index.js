// import express, { json } from 'express';
// import cors from 'cors';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
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
        const propertiesCollection = db.collection('properties');
        const reviewsCollection = db.collection('reviews');

        // Save a property data in db
        app.post('/properties', async (req, res) => {
            const propertyData = req.body;
            console.log(propertyData);
            const result = await propertiesCollection.insertOne(propertyData);
            res.send(result);
        })

        // Get all properties from db
        // app.get('/properties', async (req, res) => {
        //     const result = await propertiesCollection.find().toArray();
        //     res.send(result);
        // })
        app.get('/properties', async (req, res) => {
            const { search, sort } = req.query;

            // 1. Build Search Query
            let query = {};
            if (search) {
                query.name = { $regex: search, $options: 'i' }; // 'i' makes it case-insensitive
            }

            // 2. Build Sort Options
            let sortOptions = {};
            if (sort === 'priceLow') sortOptions.price = 1;      // Ascending
            if (sort === 'priceHigh') sortOptions.price = -1;    // Descending
            if (sort === 'newest') sortOptions._id = -1;         // Newest First

            try {
                const result = await propertiesCollection
                    .find(query)
                    .sort(sortOptions)
                    .toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Error fetching properties" });
            }
        });

        // GET properties for a specific user
        app.get('/my-properties', async (req, res) => {
            const email = req.query.email;
            if (!email) {
                return res.status(400).send({ message: "Email is required" });
            }
            const query = { userEmail: email };
            const result = await propertiesCollection.find(query).toArray();
            res.send(result);
        });

        // Get single properties from db by id
        app.get('/properties/:id', async (req, res) => {
            const id = req.params.id;
            const result = await propertiesCollection.findOne({ _id: new ObjectId(id) })
            res.send(result);
        })

        // Get latest featured properties from db
        app.get('/featured-properties', async (req, res) => {
            // .sort({ _id: -1 }) sorts by newest
            // .limit(6) restricts the result to 6 items
            const result = await propertiesCollection
                .find()
                .sort({ _id: -1 })
                .limit(6)
                .toArray();
            res.send(result);
        });

        // UPDATE a property
        app.patch('/properties/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    category: req.body.category,
                    price: parseFloat(req.body.price),
                    location: req.body.location,
                    image: req.body.image,
                }
            };
            const result = await propertiesCollection.updateOne(filter, updatedDoc);
            res.send(result);
        });

        // DELETE a property by ID
        app.delete('/properties/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await propertiesCollection.deleteOne(query);
            res.send(result);
        });

        // POST a new review
        app.post('/reviews', async (req, res) => {
            const review = req.body;

            // Optional: Add server-side timestamp
            review.reviewDate = new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });

            const result = await reviewsCollection.insertOne(review);
            res.send(result);
        });

        // GET reviews submitted by a specific user
        app.get('/reviews', async (req, res) => {
            const email = req.query.email;
            if (!email) {
                return res.status(400).send({ message: "Email is required" });
            }
            const query = { reviewerEmail: email };
            const result = await reviewsCollection.find(query).sort({ _id: -1 }).toArray();
            res.send(result);
        });

        // GET all reviews for a specific property
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { propertyId: id };

            try {
                // Sort by newest first to show recent activity
                const result = await reviewsCollection
                    .find(query)
                    .sort({ _id: -1 })
                    .toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Error fetching reviews" });
            }
        });


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