const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Faculty {
    id: ID!
    name: String!
    email: String!
    password: String!
    gender: String!
    mobile: String!
    dob: String!
    doj: String!
    address: String!
    designation: String!
    department: String!
    qualification: String!
    salary: Float!
    married: String!
    leaves: [Leave]
    journals: [Journal]
    workshops: [Workshop]
  }

  type Query {
    getAllFaculty: [Faculty]
    singleFaculty(id: ID!): Faculty
  }

  type Mutation {
    registerFaculty(
      name: String!
      email: String!
      password: String!
      gender: String!
      mobile: String!
      dob: String!
      doj: String!
      address: String!
      designation: String!
      department: String!
      qualification: String!
      salary: Float!
      married: String!
    ): Faculty

    loginFaculty(email: String!, password: String!): Faculty

    updateFaculty(
      id: ID!
      name: String
      email: String
      password: String
      gender: String
      mobile: String
      dob: String
      doj: String
      address: String
      designation: String
      department: String
      qualification: String
      salary: Float
      married: String
    ): Faculty

    deleteFaculty(id: ID!): String
  }
`;

module.exports = typeDefs;
