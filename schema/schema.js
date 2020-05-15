const graphql = require('graphql');
const axios = require('axios');
// const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const companyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
    }
});

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
        company: {
            type: companyType,
            resolve(parentValue, args) {
                return axios.default.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(({ data }) => data);
            }
        }
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
        },
        company: {
            type: companyType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, { id }) {
                return axios.default.get(`http://localhost:3000/companies/${id}`)
                .then(({ data }) => data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
