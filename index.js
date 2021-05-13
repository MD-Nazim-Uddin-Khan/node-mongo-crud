const express = require('express')
const password = 'sDkg4htoJatqX5vC';
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;

const uri = "mongodb+srv://organicUser:sDkg4htoJatqX5vC@cluster0.zcidc.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://organicUser:<password>@cluster0.zcidc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//     const collection = client.db("organicdb").collection("products");

//     app.post("/addProduct", (req, res) => {

//         collection.insertOne(product)
//         .then(result =>{
//             console.log('one product added')
//         })
//     })
//     console.log('DataBase connected')
//     client.close();
// });

client.connect(err => {
    const productCollection = client.db("organicdb").collection("products");

    app.get('/products', (req, res) =>{
        productCollection.find({})
        .toArray( (err, documents) =>{
            res.send(documents)
        })
    })

    app.post("/addProduct", (req, res)=>{
        const product = req.body;
        productCollection.insertOne(product)
        .then(result =>{
            console.log('data added successfully');
            res.send('success')
        })
    })

    app.get('/product/:id', (req, res) =>{
        productCollection.find({_id: ObjectId(req.params.id)})
        .toArray( (err, documents) =>{
            res.send(documents[0])
        })
    })

    app.delete('/delete/:id', (req, res)=>{
        productCollection.deleteOne({_id: ObjectId(req.params.id)})
        .then(result=>{
            console.log(result);
        })
    })
});


app.listen(3000);