const express = require("express");
const connectDB = require("./config/db");
const FacultyRoutes = require("./routes/FacultyRoutes");
const JournalRoutes = require("./routes/JournalRoutes");
const LeavesRoutes = require("./routes/LeaveRoutes");
const WorkshopsRoutes = require("./routes/WorkshopRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const leaveTypeDefs = require("./graphql/leaveschema");
const leaveResolvers = require("./graphql/leaveresolvers");
const workshopTypeDefs = require("./graphql/workshopschema");
const workshopResolvers = require("./graphql/workshopresolvers");
const journalTypeDefs = require("./graphql/journalschema");
const journalResolvers = require("./graphql/journalresolvers");
const facultyTypeDefs = require("./graphql/facultyschema");
const facultyResolvers = require("./graphql/facultyresolvers");

const app = express();
connectDB();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs: [leaveTypeDefs, workshopTypeDefs, journalTypeDefs, facultyTypeDefs],
  resolvers: [
    leaveResolvers,
    workshopResolvers,
    journalResolvers,
    facultyResolvers,
  ],
});

async function startServer() {
  // Start Apollo Server
  await server.start();

  // Apply Apollo Middleware
  server.applyMiddleware({ app });

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // REST routes
  app.use("/faculty", FacultyRoutes);
  app.use("/journal", JournalRoutes);
  app.use("/leaves", LeavesRoutes);
  app.use("/workshop", WorkshopsRoutes);

  app.listen(8080, () => {
    console.log(`Server Running on port 8080${server.graphqlPath}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
