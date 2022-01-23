// require('custom-env').env(process.env.NODE_ENV);
const express = require('express'),
  app = express(),
  cors = require("cors"),
  mongodb = require('./models');
  authRoute = require("./routes")
  schema = require('./schema'),
  { graphqlHTTP } = require('express-graphql'),
  http = require('http').createServer(app),
  io = require('socket.io')(http, {
    cros: {
      origin: "*"
    }
  });

app.use(cors());
app.use(express.json());

const user = [];

io.on('connection', socket => {
  socket.on('user-connected', userId => {
    user[userId] = socket.id;
  });

  socket.on('send-message', async (data) => {
    const receiverData = await mongodb.User.findOne({_id: data.reciverId });
    if (receiverData) {
      const senderData = await mongodb.User.findOne({_id: data.senderId });
      if (senderData) {
        var message = "New message received " + senderData.name + " Message: " + data.message;

        io.to(user[receiverData.id]).emit("messageReceived", message);
      }
    }
  });
});

// console.log(mongodb);
const rootValue = {
  dbConfig: mongodb,
}

const context = (req, res) => {
  // console.log(req.headers);

  return {req, res};
}

app.use(
  '/graphql',
  graphqlHTTP( async (req, res) => ({
    schema,
    rootValue,
    graphiql: true,
    context: () => context(req, res)
  })),
);

app.get('/', (req, res) => {
  res.send('App listing on 5000')
})

app.use(authRoute)

// require('./routes')(app);

// module.exports = app.listen(process.env.PORT, console.log(`App listing on ${process.env.PORT}`));
module.exports = http.listen(5000, console.log(`App listing on 5000`));
