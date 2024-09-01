const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Journal {
    id: ID!
    name: String!
    department: String!
    title: String!
    volume: String!
    issue: String!
    date: String!
    otherInfo: String!
    approved: Boolean!
  }

  type Query {
    getJournals: [Journal]
    getJournal(id: ID!): Journal
  }

  type Mutation {
    createJournal(
      name: String!
      department: String!
      title: String!
      volume: String!
      issue: String!
      date: String!
      otherInfo: String!
      facultyId: ID!
    ): Journal
    deleteJournal(journalId: ID!): Journal
    approveJournal(journalId: ID!): Journal
  }
`;

module.exports = typeDefs;
