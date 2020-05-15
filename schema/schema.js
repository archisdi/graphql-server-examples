const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const users = [
    { id: '1', firstName: 'archie', age: 23 },
    { id: '2', firstName: 'lia', age: 24 },
    { id: '3', firstName: 'angel', age: 20 }
]

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: userType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, { id }) {
                return _.find(users, { id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
