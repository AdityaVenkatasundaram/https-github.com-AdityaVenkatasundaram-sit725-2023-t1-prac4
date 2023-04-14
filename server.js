var express = require("express")
var app = express()
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://adityacalvin:Usainbolt958@cluster0.titln9f.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient();
let dbcollection;
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
{
    title: "Kitten 2",
    image: "kitten2.jpg",
    link: "About Kitten 2",
    desciption: "Demo desciption about kitten 2"
},
{
    title: "Kitten 3",
    image: "kitten3.jpg",
    link: "About Kitten 3",
    desciption: "Demo desciption about kitten 3"

}
];

app.get('/api/projects',(req,res) => {

    res.json({statusCode: 200, data: cardList, message:"Success"})

})

function dbconnection(collectionName) {
    client.connect(err => {
        dbconnection = client.db().collection(collectionName);
        if (!err) {
            console.log('DB Connected');
            console.log(dbcollection);
        }
        else {
            console.error(err);
        }
    })
}

app.post('/api/projects', (res, req) => {
    let cat = req.body;
    insert(cat, (err, result) => {
        if (err) {
            res.json({statusCode: 400, message: err});
        }
        else {
            res.json({statuscode: 200, data: result, message: 'Cat successfully added'});
        }
    })
})

function insert(cat, callback) {
    dbconnection.insertOne(cat, callback);
}
var port = process.env.port || 3000;
app.listen(port,()=>{
    console.log("App listening to: "+port)
    dbconnection('Cats');
})