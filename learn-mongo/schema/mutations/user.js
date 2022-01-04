const { GraphQLString } =  require('graphql');
const UserType = require('../typeDefs/user');
const StatusType = require('../typeDefs/status');

module.exports.CREATE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    let data = await parent.dbConfig.User.create({
      name: args.name,
      email: args.email,
      userName: args.userName,
      password: args.password
    });

    return data;
  }
};

module.exports.UPDATE_USER = {
  type: StatusType,
  args: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const params = createParams(args);
    const data = await parent.dbConfig.User.findByIdAndUpdate(params.id, params.params);

    return {
      success: true,
      message: "user updated sucessfully",
      data
    };
  }
}

const createParams = (args) => {
  const {id, ...params} = args;

  const _params = {}
  for (const [key, value] of Object.entries(params)) {
    _params[key] = value;
  }

  return { id, params: _params};
}