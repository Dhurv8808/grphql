const { GraphQLList, GraphQLString } =  require('graphql');
const UserType = require('../typeDefs/user');

module.exports.USER_LIST = {
  type: new GraphQLList(UserType),
  resolve: async (parent, args, context) => {
    const _context = await context();
    console.log(_context.req.headers.host);
    let data = await parent.dbConfig.User.find({});
    return data;
  }
}

module.exports.USER_DETAILS = {
  type: new GraphQLList(UserType),
  args: {
    id: { type: GraphQLString },
  },
  resolve: async (parent, args, context) => {
    let data = parent.dbConfig.User.find({_id: args.id});
    return data;
  }
}
