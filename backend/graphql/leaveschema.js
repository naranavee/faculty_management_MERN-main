const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Leave {
    id: ID!
    reason: String!
    date: String!
    approved: Boolean!
  }

  type Query {
    getLeaves: [Leave]
    getLeave(id: ID!): Leave
  }

  type Mutation {
    addLeave(facultyId: ID!, reason: String!, date: String!): Leave
    approveLeave(leaveId: ID!): Leave
    deleteLeave(leaveId: ID!): Leave
  }
`;

module.exports = typeDefs;
