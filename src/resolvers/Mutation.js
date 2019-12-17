const bcrypt = require('bcryptjs');

const { generateToken, checkFields, getUserId, checkAdmin } = require('../utils')

async function signup(parent, args, context, info) {
  const {first_name, last_name, password, email, city, state} = args;
  checkFields({first_name, last_name, password, email, city, state });
  const hash = bcrypt.hashSync(args.password, 10)
  args.password = hash;
  const user = await context.prisma.createUser(args)
  const token = generateToken(user);

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({email: args.email})
  const token = generateToken(user)
  const passwordMatch = await bcrypt.compare(args.password, user.password)
  if (!user || !passwordMatch) {
    throw new Error('Invalid Login')
  }
  return {
    token,
    user,
  }
}

async function update(parent, args, context, info) {
  const id = getUserId(context);
  const updatedUser = await context.prisma.updateUser({
    data: args,
    where: {
      id
    }
  })
  return updatedUser
}

async function deleteUser (parent, args, context, info) {
  const id = getUserId(context);
  return await context.prisma.deleteUser({id})
}

async function checkEmail (parent, args, context, info) {
  const user = await context.prisma.user({email: args.email});
  if (user) {
    throw new Error("Email has been taken.")
  } else {
    return "This email is available!"
  }
}

module.exports = {
  signup,
  login,
  update,
  deleteUser,
  checkEmail
}
