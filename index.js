require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3000;
const productRouter = require('./routes/productsRouter')
const authRouter = require('./routes/authenticationRouter')
const sendMailForgotPasswordRouter = require('./routes/sendMailForgotPasswordRouter')
const db_url = process.env.MONGODB_URL

// global.__basedir = __dirname;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json())

//Connect Mongoose
mongoose.connect(db_url)
.then(res => {
  console.log('Connected susscessfully');
})

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Api Routes
app.use('/api/', productRouter);
app.use('/auth/', authRouter);
app.use('/forgot-password/', sendMailForgotPasswordRouter)

app.get('/', (req, res) => {
  res.send({message: "SERVER ON"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})