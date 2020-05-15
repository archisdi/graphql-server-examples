const graphql = require('graphql');
const axios = require('axios');
// const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

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
                return axios.default.get(`http://localhost:3000/users/${id}`)
                .then(({ data }) => data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
