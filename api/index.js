var Express = require("express")
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors")
const multer = require("multer");
const request = require("request");
const { response } = require("express");
const { ObjectId } = require("mongodb");
const req = require("express/lib/request");
const res = require("express/lib/response");


var app = Express()
app.use(cors())
app.use(Express.json());

var CONNECTION_STRING = "mongodb+srv://biernat521:Baza1234@cluster0.hpy809g.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"

var DATABASENAME = "apitestdb"
var database

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Mongo DB Connection Error:", error);
            return;
        }
        database = client.db(DATABASENAME);
        console.log("Mongo DB Connection Success");
    })
})


// app.get('/api/apitestdb/GetNotes', (request, response) => {
//     database.collection('collecttest').find({}).toArray((error, result) => {
//         if (error) {
//             console.error('Error fetching data:', error);
//             response.status(500).json({ error: 'An error occurred while fetching data' });
//         } else {
//             response.status(200).json({ data: result, message: 'Successfully fetched list' });
//         }
//     });
// });

app.get('/api/apitestdb/GetNotes', (request, response) => {
    // Get pageNumber and itemsPerPage from query parameters (default to 1 and 10 if not provided)
    const pageNumber = parseInt(request.query.pageNumber) || 1;
    const itemsPerPage = parseInt(request.query.itemsPerPage) || 12;

    // Calculate the skip value to skip records based on pageNumber and itemsPerPage
    const skip = (pageNumber - 1) * itemsPerPage;

    database.collection('collecttest').find({})
        .skip(skip)  // Skip the appropriate number of records
        .limit(itemsPerPage) // Limit the number of records per page
        .toArray((error, result) => {
            if (error) {
                console.error('Error fetching data:', error);
                response.status(500).json({ error: 'An error occurred while fetching data' });
            } else {
                response.status(200).json({ data: result, message: 'Successfully fetched list' });
            }
        });
});


app.get('/api/apitestdb/GetNotes/:id', (request, response) => {
    database.collection("collecttest").findOne({ id: request.params.id })
        .then(doc => { response.status(200).json(doc) })
        .catch(err => {
            response.status(500).json({ error: 'Could not fetch' })
        })
});

app.delete("/api/apitestdb/DeleteNote/:id", (request, response) => {
    if (ObjectId.isValid(request.params.id)) {
        database.collection("collecttest")
            .deleteOne({ _id: ObjectId(request.params.id) })
            .then(result => {
                response.status(200).json(result)
            })
            .catch(err => {
                response.status(500).json({ error: 'Could not fetch the doxument' })
            })
    } else {
        response.status(500).json({ error: `Not valid doc id ${request.params.id}` })
    }
})

app.patch("/api/apitestdb/update/:id", (request, response) => {
    const update = request.body;

    if (ObjectId.isValid(request.params.id)) {
        database.collection('collecttest')
            .updateOne({ _id: ObjectId(request.params.id) }, { $set: { liked: update.liked } })
            .then(result => {
                response.status(200).json(result);
            })
            .catch(err => {
                response.status(500).json({ error: 'Could not get' });
            });
    } else {
        response.status(500).json({ error: 'Not valid' });
    }
});

app.post("/api/apitestdb/create", (request, response) => {
    const book = request.body;

    // Find the maximum 'id' value in the collection
    database.collection("collecttest").aggregate([
        {
            $group: {
                _id: null,
                maxId: { $max: { $toInt: "$id" } } // Convert 'id' to integer for aggregation
            }
        }
    ]).toArray((err, result) => {
        if (err) {
            response.status(500).json({ error: err });
        } else {
            const maxId = (result[0]?.maxId || 0) + 1; // Get the maximum 'id' or use 0 if none exists
            book.id = maxId.toString(); // Set the 'id' field in the book object

            // Insert the new document with the incremented 'id'
            database.collection("collecttest")
                .insertOne(book)
                .then(result => {
                    response.status(201).json(result);
                })
                .catch(err => {
                    response.status(500).json({ error: err });
                });
        }
    });
});


// languages


app.get('/api/langs', (request, response) => {
    // Get pageNumber and itemsPerPage from query parameters (default to 1 and 10 if not provided)
    const pageNumber = parseInt(request.query.pageNumber) || 1;
    const itemsPerPage = parseInt(request.query.itemsPerPage) || 12;

    // Calculate the skip value to skip records based on pageNumber and itemsPerPage
    const skip = (pageNumber - 1) * itemsPerPage;

    database.collection('languages').find({})
        .skip(skip)  // Skip the appropriate number of records
        .limit(itemsPerPage) // Limit the number of records per page
        .toArray((error, result) => {
            if (error) {
                console.error('Error fetching data:', error);
                response.status(500).json({ error: 'An error occurred while fetching data' });
            } else {
                response.status(200).json({ data: result, message: 'Successfully fetched list' });
            }
        });
});

app.delete("/api/lang/delete/:id", (request, response) => {
    if (ObjectId.isValid(request.params.id)) {
        database.collection("languages")
            .deleteOne({ _id: ObjectId(request.params.id) })
            .then(result => {
                response.status(200).json(result)
            })
            .catch(err => {
                response.status(500).json({ error: 'Could not fetch the doxument' })
            })
    } else {
        response.status(500).json({ error: `Not valid doc id ${request.params.id}` })
    }
})

app.post("/api/lang/create", (request, response) => {
    const book = request.body;

    // Find the maximum 'id' value in the collection
    database.collection("languages").aggregate([
        {
            $group: {
                _id: null,
                maxId: { $max: { $toInt: "$id" } } // Convert 'id' to integer for aggregation
            }
        }
    ]).toArray((err, result) => {
        if (err) {
            response.status(500).json({ error: err });
        } else {
            const maxId = (result[0]?.maxId || 0) + 1; // Get the maximum 'id' or use 0 if none exists
            book.id = maxId.toString(); // Set the 'id' field in the book object

            // Insert the new document with the incremented 'id'
            database.collection("languages")
                .insertOne(book)
                .then(result => {
                    response.status(201).json(result);
                })
                .catch(err => {
                    response.status(500).json({ error: err });
                });
        }
    });
});



// carriers


app.get('/api/carriers', (request, response) => {
    // Get pageNumber and itemsPerPage from query parameters (default to 1 and 10 if not provided)
    const pageNumber = parseInt(request.query.pageNumber) || 1;
    const itemsPerPage = parseInt(request.query.itemsPerPage) || 12;

    // Calculate the skip value to skip records based on pageNumber and itemsPerPage
    const skip = (pageNumber - 1) * itemsPerPage;

    database.collection('carriers').find({})
        .skip(skip)  // Skip the appropriate number of records
        .limit(itemsPerPage) // Limit the number of records per page
        .toArray((error, result) => {
            if (error) {
                console.error('Error fetching data:', error);
                response.status(500).json({ error: 'An error occurred while fetching data' });
            } else {
                response.status(200).json({ data: result, message: 'Successfully fetched list' });
            }
        });
});

app.get('/api/carrier/:id', (request, response) => {
    database.collection("carriers").findOne({ id: request.params.id })
        .then(doc => { response.status(200).json(doc) })
        .catch(err => {
            response.status(500).json({ error: 'Could not fetch' })
        })
});

app.post("/api/carrier/create", (request, response) => {
    const book = request.body;

    // Find the maximum 'id' value in the collection
    database.collection("carriers").aggregate([
        {
            $group: {
                _id: null,
                maxId: { $max: { $toInt: "$id" } } // Convert 'id' to integer for aggregation
            }
        }
    ]).toArray((err, result) => {
        if (err) {
            response.status(500).json({ error: err });
        } else {
            const maxId = (result[0]?.maxId || 0) + 1; // Get the maximum 'id' or use 0 if none exists
            book.id = maxId.toString(); // Set the 'id' field in the book object

            // Insert the new document with the incremented 'id'
            database.collection("carriers")
                .insertOne(book)
                .then(result => {
                    response.status(201).json(result);
                })
                .catch(err => {
                    response.status(500).json({ error: err });
                });
        }
    });
});



// preferences


app.get('/api/preferences', (request, response) => {
    database.collection('preferences').find({})
        .toArray((error, result) => {
            if (error) {
                console.error('Error fetching data:', error);
                response.status(500).json({ error: 'An error occurred while fetching data' });
            } else {
                response.status(200).json({ data: result, message: 'Successfully fetched list' });
            }
        });
});



// user


app.get('/api/user', (request, response) => {
    database.collection('user').find({})
        .toArray((error, result) => {
            if (error) {
                console.error('Error fetching data:', error);
                response.status(500).json({ error: 'An error occurred while fetching data' });
            } else {
                response.status(200).json({ data: result, message: 'Successfully fetched list' });
            }
        });
});



// details


app.get('/api/details', (request, response) => {
    database.collection('details').find({})
        .toArray((error, result) => {
            if (error) {
                console.error('Error fetching data:', error);
                response.status(500).json({ error: 'An error occurred while fetching data' });
            } else {
                response.status(200).json({ data: result, message: 'Successfully fetched list' });
            }
        });
});