const Faculty = require("../models/Faculty"); // Adjust the path according to your project structure

const resolvers = {
  Query: {
    getAllFaculty: async () => {
      try {
        return await Faculty.find()
          .populate("journals")
          .populate("workshops")
          .populate("leaves");
      } catch (error) {
        throw new Error("Server error");
      }
    },
    singleFaculty: async (_, { id }) => {
      try {
        return await Faculty.findById(id)
          .populate("journals")
          .populate("workshops")
          .populate("leaves");
      } catch (error) {
        throw new Error("Server error");
      }
    },
  },
  Mutation: {
    registerFaculty: async (_, args) => {
      try {
        const existingFaculty = await Faculty.findOne({ email: args.email });
        if (existingFaculty) {
          throw new Error("Faculty already exists");
        }

        const newFaculty = new Faculty(args);
        await newFaculty.save();
        return newFaculty;
      } catch (error) {
        throw new Error("Server error");
      }
    },

    loginFaculty: async (_, { email, password }) => {
      try {
        const faculty = await Faculty.findOne({ email });
        if (!faculty || faculty.password !== password) {
          throw new Error("Invalid email or password");
        }
        return faculty;
      } catch (error) {
        throw new Error("Server error");
      }
    },

    updateFaculty: async (_, args) => {
      try {
        const updatedFaculty = await Faculty.findByIdAndUpdate(args.id, args, {
          new: true,
        });
        if (!updatedFaculty) {
          throw new Error("Faculty not found");
        }
        return updatedFaculty;
      } catch (error) {
        throw new Error("Server error");
      }
    },

    deleteFaculty: async (_, { id }) => {
      try {
        const deletedFaculty = await Faculty.findByIdAndDelete(id);
        if (!deletedFaculty) {
          throw new Error("Faculty not found");
        }
        return "Faculty deleted successfully";
      } catch (error) {
        throw new Error("Server error");
      }
    },
  },
};

module.exports = resolvers;
