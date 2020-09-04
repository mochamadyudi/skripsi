const express = require( 'express')
const path = require( 'path')
const cors = require( 'cors')
const bodyParser = require( 'body-parser')
const connectDB = require( './config/db')
const app = express();

//Connect DB
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
//form-urlencoded
//Initalize middleware
app.use(express.json({ extended: true }));

app.use((req, res, next) => {
  const allowedOrigin = [
      'http://localhost:3000',
      'http://localhost:3001',
      'vodonesia.herokuapp.com',
      'vodonesia.id'
  ];
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || allowedOrigin);
  res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Credentials", 'true');
  next();
});


//Define routes
app.use("/api/auth", cors(),require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/v1/villa",require("./routes/api/villa"));
app.use("/api/v1/admin",require("./routes/api/v1/admin"));
app.use("/api/v1/order/",require("./routes/api/v1/order/order"));
app.use("/api/v1/cart/",require("./routes/api/v1/carts/cart"));
app.use("/api/v1/pay/",require("./routes/api/v1/payment/payment"));
app.use("/api/v1/statistic",require("./routes/api/v1/statistic"));
app.use("/api/v1/pariwisata",require('./routes/api/v1/travels/travels'))
app.use('/api/v1/rooms', require('./routes/api/rooms'))

app.use('/api/v1/uploadImage',async (req,res)=>{
    if (req.files === null){
        return res.status(500).json({msg: 'No file uploaded'})
    }
    const file = req.files.file
    await file.mv(`${__dirname}/client/public/uploads/${file.name}`,
        err =>{
            if (err){
                console.error(err)
                return res.status(500).send(err)
            }
        })
    res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
})

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5005;
app.listen(PORT,()=>{
    console.log(`App Launcher on port ${PORT}`)
});