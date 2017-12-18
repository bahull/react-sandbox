const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const port = process.env.PORT || 3001;
const cors = require('cors');
const { json } = require('body-parser');
// const index = require('./routes/index');
const app = express();
app.use(cors());
app.use(json());
// app.use(index);
let currentMessages = [];
const server = http.createServer(app);
const io = socketIo(server);
io.on('connection', socket => {
  console.log('New client connected'),
    setInterval(() => getApiAndEmit(socket), 3000);
  socket.on('disconnect', () => console.log('Client disconnected'));
});
const getApiAndEmit = async socket => {
  try {
    // const res = await axios
    //   .get
    //   // 'https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558'
    //   ();
    socket.emit('FromAPI', currentMessages);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>');
});

app.post('/api/newMessages', function(req, res) {
  console.log(req.body.messages);
  currentMessages.push(req.body.messages);
  res.status(200).send(currentMessages.data);
});
server.listen(port, () => console.log(`Listening on port ${port}`));
