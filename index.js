require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3000;
const path = require('path')
const router = require('./routes/productsRouter')
const db_url = process.env.MONGODB_URL

global.__basedir = __dirname;

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
app.use(express.static('uploads')); 
app.use("/files",  express.static(path.join(__dirname, './uploads')))

app.get('/', (req, res) => {
  res.send({message: "SERVER ON"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})