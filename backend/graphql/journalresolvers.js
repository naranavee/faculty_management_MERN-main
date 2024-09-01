const Journal = require("../models/Journal");
const Faculty = require("../models/Faculty");

const resolvers = {
  Query: {
    getJournals: async () => {
      return await Journal.find();
    },
    getJournal: async (_, { id }) => {
      return await Journal.findById(id);
    },
  },
  Mutation: {
    createJournal: async (
      _,
      { name, department, title, volume, issue, date, otherInfo, facultyId }
    ) => {
      try {
        // Verify faculty exists
        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
          throw new Error("Faculty not found");
        }

        // Create a new journal entry
        const newJournal = new Journal({
          name,
          department,
          title,
          volume,
          issue,
          date,
          otherInfo,
        });

        // Save the journal entry
        await newJournal.save();

        // Add journal to faculty's list of journals
        faculty.journals.push(newJournal._id);
        await faculty.save();

        return newJournal;
      } catch (error) {
        console.error(error);
        throw new Error("Server error");
      }
    },
    deleteJournal: async (_, { journalId }) => {
      try {
        const journal = await Journal.findByIdAndDelete(journalId);
        if (!journal) {
          throw new Error("Journal not found");
        }

        return journal;
      } catch (error) {
        console.error(error);
        throw new Error("Server error");
      }
    },
    approveJournal: async (_, { journalId }) => {
      try {
        const journal = await Journal.findById(journalId);
        if (!journal) {
          throw new Error("Journal not found");
        }

        // Update the approval status
        journal.approved = true;
        await journal.save();

        return journal;
      } catch (error) {
        console.error(error);
        throw new Error("Server error");
      }
    },
  },
};

module.exports = resolvers;
