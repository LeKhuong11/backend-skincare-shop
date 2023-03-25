const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3000;
const router = require('./routes/productsRouter')
const db_url = 'mongodb+srv://khuongdev11:khuongle1102@cluster0.ttgcd6s.mongodb.net/skincare_db?retryWrites=true&w=majority'

global.__basedir = __dirname;

var corsOptions = {
  origin: "https://backend-skincare-shop.vercel.app"
};
app.use(cors(corsOptions));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json())

mongoose.connect(db_url)
    .then(res => {
        console.log('connected susscessfully');
    })

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

    
app.use('/api/', router);

app.get('/', (req, res) => {
  res.send({message: "SERVER ON"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})