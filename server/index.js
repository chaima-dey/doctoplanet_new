const express = require("express");
const cors = require("cors");
const app = express();
 
const ConnectDB = require("./database/connectDB")
const { v4: uuidv4 } = require('uuid');
const server = require("http").createServer(app);
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
app.use("/stripe/", require("./routes/StripeRoute"));
app.use("/", require("./routes/MedicamentRoutes"));

 
app.get('/call',(req,res)=>{
  res.send(uuidv4())
})

 
app.get(/.*/, (req, res) => {
  var pathName = req.path.split('/');
  if(pathName[1] == "uploads")
  res.sendFile(__dirname + req.path)
  else res.sendFile(__dirname + "/build/index.html");
});

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    socket.on("join room", roomID => {
      socket.join(roomID); 
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 2) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);

        socket.on('disconnect', () => {
       
          const roomID = socketToRoom[socket.id];
          io.to(roomID).emit('user-leave')
          let room = users[roomID];
          if (room) {
              room = room.filter(id => id !== socket.id);
              users[roomID] = room;
          }
      });
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

   

});



// INIT PORT
const PORT = process.env.PORT || 5000;

// RUNNIG THE SERVER
server.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});