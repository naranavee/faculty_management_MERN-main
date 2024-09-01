const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Workshop {
    id: ID!
    mail: String!
    name: String!
    venue: String!
    started: String!
    ended: String!
    days: String!
    approved: Boolean!
  }

  type Query {
    getWorkshops: [Workshop]
    getWorkshop(id: ID!): Workshop
  }

  type Mutation {
    createWorkshop(
      mail: String!
      name: String!
      venue: String!
      started: String!
      ended: String!
      days: String!
      facultyId: ID!
    ): Workshop
    deleteWorkshop(workshopId: ID!): Workshop
    approveWorkshop(workshopId: ID!): Workshop
  }
`;

module.exports = typeDefs;
