const { getUserId, checkAdmin } = require('../utils')

/*
  Test query

  @return {String} 
*/
function info() {
  return 'Welcome to Quality Hub'
}

/*
  @param {ID} id: id of user

  Get info of a user by their ID

  @return {Object}  - Type User with specified ID
*/
async function user (parents, args, context, info) {
  return await context.prisma.user({id: args.id})
}

async function users (parent, args, context, info) {
  await checkAdmin(context);
  return await context.prisma.users()
}

async function me (parents, args, context, info) {
  return await context.prisma.user({ id: getUserId(context)})
}

module.exports = {
  user,
  users,
  info,
  me,
}
