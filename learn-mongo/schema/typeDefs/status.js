const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} =  require('graphql');
const UserType = require('./user');

const StatusType = new GraphQLObjectType({
  name: 'status',
  fields: (data) => {
    console.log("FIELDS", data);
    return ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    data: { type: UserType },
    error: { type: GraphQLString },
  })}
});

module.exports = StatusType;