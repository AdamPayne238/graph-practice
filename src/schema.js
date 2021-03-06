const { gql } = require('apollo-server');

const typeDefs = gql`

  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    city: String!
    state: String!
    image_url: String
    gender: String
    personal_url: String
    blog_url: String
    twitter_url: String
    portfolio_url: String
    linkedin_url: String
    github_url: String
    bio: String
    payment_info: Boolean
  }

  type Query {
    info: String!
    users: [User!]!
    user(
      id: ID!
    ): User!
    me: User!
  }

  type Mutation {

    signup(
      first_name: String!
      last_name: String!
      email: String!
      password: String!
      city: String!
      state: String!
      image_url: String
      gender: String
      personal_url: String
      blog_url: String
      twitter_url: String
      portfolio_url: String
      linkedin_url: String
      github_url: String
      bio: String
      payment_info: Boolean
    ): AuthPayload!
    
    login(
      email: String!
      password: String!
    ): AuthPayload!
    
    update(
      first_name: String
      last_name: String
      password: String
      email: String
      city: String
      state: String
      image_url: String
      gender: String
      personal_url: String
      blog_url: String
      twitter_url: String
      portfolio_url: String
      linkedin_url: String
      github_url: String
      bio: String
      payment_info: Boolean
    ): User!
    checkEmail(
      email: String!
    ): String!

    deleteUser: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
