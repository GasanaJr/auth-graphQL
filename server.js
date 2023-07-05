const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const schema = require("./graphql/schema");
const { graphqlHTTP } = require("express-graphql");
const resolvers = require("./graphql/resolver");
const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());
app.use("/user", userRouter);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
