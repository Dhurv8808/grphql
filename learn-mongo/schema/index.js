const {
  GraphQLSchema,
  GraphQLObjectType,
} =  require('graphql');
const { USER_LIST, USER_DETAILS } = require('./queries/user');
const { CREATE_USER, UPDATE_USER } = require('./mutations/user');

const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  fields: {
    getUserList: USER_LIST,
    userDetails: USER_DETAILS
  }
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    createUser: CREATE_USER,
    updateUser:  UPDATE_USER,
  }
});

module.exports = new GraphQLSchema({ query: rootQuery, mutation });
