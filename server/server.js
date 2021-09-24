//and now for something completely different
// this is the best way to do it with a server.js file

// using apollo-server-express here because it's a good choice
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');

const routes = require("./routes");


// more middleware
const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');
const { Router } = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: authMiddleware 
});

// this is where we connect to the database
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});