const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        users: [Users!]
        usersByCity(city: String!): [Users!]
    }

    type Error {
        message: String!
    }

    type Result {
        user: Users
        error: String
    }

    type Mutation {
        addUser(name: String,email: String,location: String,password: String): Users!
        login(input: LoginInput!): String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Users {
        _id: ID!
        name: String!
        email: String!
        location: String!
        password: String!

    }
`);

module.exports = schema;
