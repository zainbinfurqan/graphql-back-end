const { GraphQLObjectType, GraphQLInt, GraphQLString,
    GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLID } = require('graphql');
const axios = require('axios');
const userSchema = require('./models/users');
const mongoose = require('mongoose');

const GetUserType = new GraphQLObjectType({
    name: 'getUsers',
    fields: () => ({
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phoneNo: { type: GraphQLInt },
    })
})

const SetUserType = new GraphQLObjectType({
    name: 'setUsers',
    fields: () => ({
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getUsers: {
            type: new GraphQLList(GetUserType),
            resolve(parents, arg) {
                const response = userSchema.find()
                return response
            }
        },
    }
});


const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        createUser: {
            type: SetUserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parents, args) {
                let payload = { ...args }
                console.log(payload)
                const response = new userSchema(payload)
                response.save()
                return response
            }
        },
        updateUser: {
            type: SetUserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(parents, args) {
                let payload = { ...args }
                console.log(payload)
                const response = userSchema.findOneAndUpdate(payload)
                return response
            }
        },
        deleteUser: {
            type: SetUserType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parents, args) {
                let payload = { ...args }
                console.log(payload)
                const response = userSchema.findOneAndDelete({ _id: mongoose.Types.ObjectId(args.id) })
                return response
            }
        },
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})