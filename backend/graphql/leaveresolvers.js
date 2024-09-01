const Leave = require("../models/Leaves");
const Faculty = require("../models/Faculty");

const resolvers = {
  Query: {
    getLeaves: async () => {
      try {
        return await Leave.find();
      } catch (error) {
        throw new Error("Error fetching leaves");
      }
    },
    getLeave: async (_, { id }) => {
      try {
        return await Leave.findById(id);
      } catch (error) {
        throw new Error("Error fetching leave");
      }
    },
  },
  Mutation: {
    addLeave: async (_, { facultyId, reason, date }) => {
      try {
        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
          throw new Error("Faculty not found");
        }

        const newLeave = new Leave({ reason, date });
        await newLeave.save();

        faculty.leaves.push(newLeave._id);
        await faculty.save();

        return newLeave;
      } catch (error) {
        throw new Error(`Error creating leave: ${error.message}`);
      }
    },
    approveLeave: async (_, { leaveId }) => {
      try {
        const leave = await Leave.findById(leaveId);
        if (!leave) {
          throw new Error("Leave not found");
        }

        leave.approved = true;
        await leave.save();

        return leave;
      } catch (error) {
        throw new Error(`Error approving leave: ${error.message}`);
      }
    },
    deleteLeave: async (_, { leaveId }) => {
      try {
        const leave = await Leave.findByIdAndDelete(leaveId);
        if (!leave) {
          throw new Error("Leave not found");
        }

        return leave;
      } catch (error) {
        throw new Error(`Error deleting leave: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
