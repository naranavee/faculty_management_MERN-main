const Workshop = require("../models/Workshops");
const Faculty = require("../models/Faculty");

const resolvers = {
  Query: {
    getWorkshops: async () => {
      return await Workshop.find();
    },
    getWorkshop: async (_, { id }) => {
      return await Workshop.findById(id);
    },
  },
  Mutation: {
    createWorkshop: async (
      _,
      { mail, name, venue, started, ended, days, facultyId }
    ) => {
      try {
        // Verify faculty exists
        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
          throw new Error("Faculty not found");
        }

        // Create a new workshop entry
        const newWorkshop = new Workshop({
          mail,
          name,
          venue,
          started,
          ended,
          days,
        });

        // Save the workshop entry
        await newWorkshop.save();

        // Add workshop to faculty's list of workshops
        faculty.workshops.push(newWorkshop._id);
        await faculty.save();

        return newWorkshop;
      } catch (error) {
        console.error(error);
        throw new Error("Server error");
      }
    },
    deleteWorkshop: async (_, { workshopId }) => {
      try {
        const workshop = await Workshop.findByIdAndDelete(workshopId);
        if (!workshop) {
          throw new Error("Workshop not found");
        }

        return workshop;
      } catch (error) {
        console.error(error);
        throw new Error("Server error");
      }
    },
    approveWorkshop: async (_, { workshopId }) => {
      try {
        const workshop = await Workshop.findById(workshopId);
        if (!workshop) {
          throw new Error("Workshop not found");
        }

        // Update the approval status
        workshop.approved = true;
        await workshop.save();

        return workshop;
      } catch (error) {
        console.error(error);
        throw new Error("Server error");
      }
    },
  },
};

module.exports = resolvers;
