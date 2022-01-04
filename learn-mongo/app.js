// require('custom-env').env(process.env.NODE_ENV);
const express = require('express'),
  app = express(),
  cors = require("cors"),
  mongodb = require('./models');
  authRoute = require("./routes")
  schema = require('./schema'),
  { graphqlHTTP } = require('express-graphql');

app.use(cors());
app.use(express.json());

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

// app.use(authRoute)

// require('./routes')(app);

// module.exports = app.listen(process.env.PORT, console.log(`App listing on ${process.env.PORT}`));
module.exports = app.listen(5000, console.log(`App listing on 5000`));
