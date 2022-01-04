const {
  GraphQLObjectType,
  GraphQLString,
} =  require('graphql');

const UserType = new GraphQLObjectType({
  name: 'user',
  description: 'User type definition',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
  })
});

module.exports = UserType;