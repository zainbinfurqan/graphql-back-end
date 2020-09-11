const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const database = require('./configuration/database')
const cors = require('cors')
const app = express()
app.use(cors());
const PORT = process.env.PORT || 4000

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

app.listen(PORT, () => { console.log(`server start on port `, PORT) });