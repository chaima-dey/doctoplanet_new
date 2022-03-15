const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const ConnectDB = require("./database/connectDB")
const { v4: uuidv4 } = require('uuid');
options = {
  cors: true,
};
const io = require("socket.io")(server, options);

// ConnectDB
ConnectDB()

// Middlewear
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/assets', express.static('assets'));
 

// handle production
  app.use(express.static(__dirname + "/build/"));

 
 
 
// Routes
app.use("/user", require("./routes/UserRoute"));
app.use("/consultation", require("./routes/ConsulRoutes"));
app.use("/", require("./routes/MedicamentRoutes"));

 
app.get('/call',(req,res)=>{
  res.send(uuidv4())
})

io.on("connection", async (socket) => {
 socket.on("join-room",(roomID,userID)=>{
  socket.join(roomID); 
  socket.to(roomID).emit('user-joined', userID);


  socket.on('disconnect', () => {
    socket.to(roomID).emit('user-disconnected', userID)
  })
 })


})

app.get(/.*/, (req, res) => {
  var pathName = req.path.split('/');
  if(pathName[1] == "uploads")
  res.sendFile(__dirname + req.path)
  else res.sendFile(__dirname + "/build/index.html");
});





// INIT PORT
const PORT = process.env.PORT || 5000;

// RUNNIG THE SERVER
server.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});